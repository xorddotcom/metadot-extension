import React from 'react';
import { useSelector } from 'react-redux';

import { decodeAddress, encodeAddress } from '@polkadot/keyring';
import type { ApiPromise as ApiPromiseType } from '@polkadot/api';
import { hexToU8a, isHex } from '@polkadot/util';
import { RootState } from '../../redux/store';
import { images, fonts, helpers } from '../../utils';
import services from '../../utils/services';

import { VerticalContentDiv, HorizontalContentDiv } from '../common/wrapper';
import FromInput from '../common/from-input';
import { Button } from '../common';
import { SubHeading } from '../common/text';
import { WarningModal } from '../common/modals';

import FileInput from './components/file-input';
import RecepientCard from './components/recepient-card';
import { AddCircle, GoUpCircle } from './style';
import { CreateBatchViewProps } from './types';
import { getExistentialDepositConfig } from '../../utils/existentialDeposit';

const { GoUpIcon, PlusIcon } = images;
const { mainHeadingfontFamilyClass } = fonts;
const { trimContent } = helpers;
const { getBalancesForBatch } = services;

const BatchView: React.FunctionComponent<CreateBatchViewProps> = ({
    recepientList,
    setStep,
    addressChangeHandler,
    amountChangeHandler,
    addRecepient,
    deleteRecepient,
    setValidation,
    getTransactionFees,
    handleNetworkModalOpen,
    setListErrors,
    setRecepientAmountError,
    setRecepientAddressError,
}) => {
    const { activeAccount } = useSelector((state: RootState) => state);
    const { balance, tokenName } = activeAccount;
    const [insufficientBal, setInsufficientBal] = React.useState('');
    const [senderReapWarnMsg, setSenderReapWarnMsg] = React.useState('');
    const [senderReaped, setSenderReaped] = React.useState(false);
    const [isButtonLoading, setIsButtonLoading] = React.useState(false);
    const [reapingAddressList, setReapingAddressList] = React.useState<
        number[]
    >([]);

    const currReduxState = useSelector((state: RootState) => state);
    const api = currReduxState.api.api as unknown as ApiPromiseType;
    const allTokens = currReduxState.activeAccount.balances;

    const isValidAddressPolkadotAddress = (address: string): boolean => {
        try {
            encodeAddress(
                isHex(address) ? hexToU8a(address) : decodeAddress(address)
            );
            return true;
        } catch (err) {
            return false;
        }
    };

    const validateAmountAndAddresses = (): boolean => {
        const invalidAmounts = [];
        const invalidAddress = [];

        recepientList.forEach((item, index) => {
            if (item.amount === '') {
                setRecepientAmountError(true, index);
                invalidAmounts.push(index);
            } else {
                setRecepientAmountError(false, index);
            }

            if (item.address === '') {
                setRecepientAddressError(true, index);
                invalidAddress.push(index);
            } else if (!isValidAddressPolkadotAddress(item.address)) {
                setValidation(false, index);
                invalidAddress.push(item.address);
            } else {
                setValidation(true, index);
                setRecepientAddressError(false, index);
            }
        });
        if (invalidAmounts.length > 0 || invalidAddress.length > 0)
            return false;
        return true;
    };

    const validateSenderBalance = async (): Promise<boolean> => {
        // validate sender reaping
        const transactionFee = await getTransactionFees();
        const balancePerToken: any = {};
        recepientList.forEach((recepient) => {
            console.log(recepient, balancePerToken, 'kuch likh');
            if (balancePerToken[recepient.token] === undefined) {
                balancePerToken[recepient.token] = Number(recepient.amount);
            } else {
                balancePerToken[recepient.token] =
                    Number(balancePerToken[recepient.token]) +
                    Number(recepient.amount);
            }
        });
        console.log(balancePerToken, 'balance per token');
        const insufficientBalanceErrorinToken: string[] = [];

        // eslint-disable-next-line consistent-return
        allTokens.forEach((item) => {
            if (item.name in balancePerToken) {
                const txFee = item.isNative ? Number(transactionFee) : 0;
                if (
                    Number(item.balance) <
                    Number(balancePerToken[item.name]) + txFee
                ) {
                    insufficientBalanceErrorinToken.push(item.name);
                }
            }
        });
        if (insufficientBalanceErrorinToken.length > 0) {
            const errMessage = `Insufficient Funds in ${insufficientBalanceErrorinToken}`;
            setInsufficientBal(errMessage);
            return false;
        }

        return true;
    };

    const [showReceiverReapWarning, setShowReceiverReapWarning] =
        React.useState(false);
    const fetchExistentialDeposit = (token: { name: string }): number => {
        const decimalPlaces = api?.registry?.chainDecimals[0];
        let ED: number;
        if (!(api.registry.chainTokens[0] === token.name)) {
            ED = Number(
                getExistentialDepositConfig(
                    api.runtimeChain.toString(),
                    token.name.toUpperCase()
                )
            );
        } else {
            ED =
                Number(api?.consts?.balances?.existentialDeposit.toString()) /
                10 ** decimalPlaces;
        }
        return ED;
    };

    const validateReceiverAccountsReaping = async (): Promise<void> => {
        const recepientBalances = await getBalancesForBatch(api, recepientList);

        const reapReceiverAccounts: number[] = [];
        const tempList = recepientList.map((el) => el.token);

        recepientBalances.forEach((recepientBalance, index) => {
            if (
                fetchExistentialDeposit({ name: recepientList[index].token }) >
                Number(
                    Number(recepientBalance) +
                        Number(recepientList[index].amount)
                )
            ) {
                console.log(index + 1, 'yehg ander lo');
                reapReceiverAccounts.push(index + 1);
            }
        });

        if (reapReceiverAccounts.length > 0) {
            setReapingAddressList(reapReceiverAccounts);
            setShowReceiverReapWarning(true);
        } else {
            setIsButtonLoading(false);
            setStep(1);
        }
    };

    const validateSenderReaping = async (): Promise<void> => {
        const transactionFee = await getTransactionFees();
        const balancePerToken: any = {};
        recepientList.forEach((recepient) => {
            console.log(recepient, balancePerToken);

            if (balancePerToken[recepient.token] === undefined) {
                balancePerToken[recepient.token] = Number(recepient.amount);
            } else {
                balancePerToken[recepient.token] =
                    Number(balancePerToken[recepient.token]) +
                    Number(recepient.amount);
            }
        });
        const reapingTokensPerAddress: string[] = [];
        allTokens.forEach((item, value) => {
            const txFee = item.isNative ? Number(transactionFee) : 0;
            if (
                Number(item.balance) -
                    Number(balancePerToken[item.name]) +
                    txFee <
                fetchExistentialDeposit(item)
            ) {
                reapingTokensPerAddress.push(item.name);
            }
        });
        if (reapingTokensPerAddress.length > 0) {
            const errMsg = `Your Token(s): ${reapingTokensPerAddress} might get reaped. Do you still wish to continue`;
            setSenderReapWarnMsg(errMsg);
        } else {
            await validateReceiverAccountsReaping();
        }
    };

    const handleSubmit = async (): Promise<void> => {
        setInsufficientBal('');
        setSenderReaped(false);
        setIsButtonLoading(true);
        const amountsAndAddressValidated = validateAmountAndAddresses();
        const balanceValidated = await validateSenderBalance();

        if (amountsAndAddressValidated && balanceValidated) {
            await validateSenderReaping();
        } else {
            setIsButtonLoading(false);
        }
    };

    const receiverReapModalwarning = {
        open: showReceiverReapWarning,
        handleClose: () => {
            setIsButtonLoading(false);
            setShowReceiverReapWarning(false);
        },
        onConfirm: () => {
            setStep(1);
            setShowReceiverReapWarning(false);
        },
        style: {
            width: '290px',
            background: '#141414',
            position: 'relative',
            bottom: 30,
            p: 2,
            px: 2,
            pb: 3,
        },
        mainText: 'Account Reap Warning',
        subText: `These recipient account(s) ${reapingAddressList} might get reaped. Do you still wish to continue?`,
    };

    const senderReapModalwarning = {
        open: senderReapWarnMsg.length > 0,
        handleClose: () => {
            setIsButtonLoading(false);
            setSenderReapWarnMsg('');
        },
        onConfirm: () => {
            validateReceiverAccountsReaping();
            setSenderReapWarnMsg('');
        },
        style: {
            width: '290px',
            background: '#141414',
            position: 'relative',
            bottom: 30,
            p: 2,
            px: 2,
            pb: 3,
        },
        mainText: 'Account Reap Warning',
        subText: senderReapWarnMsg,
    };

    const checkButttonStatus = (): boolean => {
        if (
            recepientList.some((e) => e.address === '' || e.amount === '') &&
            recepientList.length > 2
        )
            return true;

        return false;
    };

    const setErrorsFalse = (): void => {
        setListErrors();
        setInsufficientBal('');
        setSenderReaped(false);
    };

    return (
        <>
            <WarningModal {...receiverReapModalwarning} />
            <WarningModal {...senderReapModalwarning} />
            <VerticalContentDiv>
                <FromInput />
            </VerticalContentDiv>
            <FileInput
                recepientList={recepientList}
                addRecepient={addRecepient}
            />
            {recepientList.map((item, index) => (
                <RecepientCard
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    recepient={item}
                    index={index}
                    addressChangeHandler={addressChangeHandler}
                    amountChangeHandler={amountChangeHandler}
                    deleteRecepient={deleteRecepient}
                    setErrorsFalse={setErrorsFalse}
                    handleNetworkModalOpen={handleNetworkModalOpen}
                />
            ))}

            {insufficientBal.length > 0 && (
                <SubHeading
                    color="#F63A3A"
                    fontSize="12px"
                    opacity="0.7"
                    lineHeight="10px"
                    marginTop="20px"
                >
                    {insufficientBal}
                </SubHeading>
            )}

            {/* <HorizontalContentDiv justifyContent="flex-end" marginTop="12px">
                <SubHeading
                    className={mainHeadingfontFamilyClass}
                    lineHeight="0px"
                    color="#FAFAFA"
                    opacity="0.7"
                    fontSize="12px"
                >
                    Balance:{' '}
                    {`${trimContent(balances[0].balance, 6)} ${tokenName}`}
                </SubHeading>
            </HorizontalContentDiv> */}
            {senderReaped && (
                <SubHeading
                    color="#F63A3A"
                    fontSize="12px"
                    opacity="0.7"
                    lineHeight="0px"
                    marginTop="20px"
                >
                    Sender might get reaped
                </SubHeading>
            )}

            <HorizontalContentDiv
                justifyContent="space-between"
                marginTop="50px"
            >
                <HorizontalContentDiv
                    onClick={() =>
                        addRecepient({ address: '', amount: '', token: '' })
                    }
                >
                    <AddCircle>
                        <img src={PlusIcon} alt="plus" />
                    </AddCircle>
                    <SubHeading color="#2E9B9B" fontSize="14px" ml="12px">
                        Add Recipient
                    </SubHeading>
                </HorizontalContentDiv>
                <GoUpCircle onClick={() => window.scrollTo(0, 0)}>
                    <img src={GoUpIcon} alt="go up" />
                </GoUpCircle>
            </HorizontalContentDiv>

            <HorizontalContentDiv
                justifyContent="space-between"
                marginTop="30px"
            >
                <Button
                    id="next-button"
                    text="Next"
                    handleClick={() => {
                        // setStep(1);
                        handleSubmit();
                    }}
                    style={{
                        width: '100%',
                        height: 50,
                        borderRadius: 40,
                    }}
                    disabled={checkButttonStatus()}
                    isLoading={isButtonLoading}
                />
            </HorizontalContentDiv>
        </>
    );
};

export default BatchView;
