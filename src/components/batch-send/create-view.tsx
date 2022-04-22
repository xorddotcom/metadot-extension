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

const { GoUpIcon, PlusIcon } = images;
const { mainHeadingfontFamilyClass } = fonts;
const { trimContent } = helpers;
const { getBalance } = services;

const BatchView: React.FunctionComponent<CreateBatchViewProps> = ({
    recepientList,
    setStep,
    addressChangeHandler,
    amountChangeHandler,
    addRecepient,
    deleteRecepient,
    setValidation,
    getTransactionFees,
    setValidateReaping,
    setListErrors,
    setRecepientAmountError,
    setRecepientAddressError,
}) => {
    const { activeAccount } = useSelector((state: RootState) => state);
    const { balances, tokenName } = activeAccount;
    const [insufficientBal, setInsufficientBal] = React.useState(false);
    const [senderReaped, setSenderReaped] = React.useState(false);
    const [isButtonLoading, setIsButtonLoading] = React.useState(false);
    const [reapingAddressList, setReapingAddressList] = React.useState<
        number[]
    >([]);
    const [existentialDeposit, setExistentialDeposit] =
        React.useState<number>(0);

    const currReduxState = useSelector((state: RootState) => state);
    const api = currReduxState.api.api as unknown as ApiPromiseType;

    const calculatedAmount = (): string => {
        const dummyArray = [...recepientList];
        const val = dummyArray.reduce((a, b) => {
            return {
                amount: String(Number(a.amount) + Number(b.amount)),
                address: a.address,
            };
        });
        return val.amount;
    };

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

    const validateAddresses = (): boolean => {
        // check empytaddress
        // check valid polkadot address
        const invalidAddress = [];
        recepientList.forEach((item, index) => {
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
        if (invalidAddress.length > 0) return false;
        return true;
    };

    const validateAllAmount = (): boolean => {
        const invalidAmounts = [];

        recepientList.forEach((item, index) => {
            if (item.amount === '') {
                setRecepientAmountError(true, index);
                invalidAmounts.push(index);
            }
        });
        if (invalidAmounts.length > 0) return false;
        return true;
    };

    const validateSenderBalance = async (): Promise<boolean> => {
        // validate sender reaping
        const totalAmount = calculatedAmount();
        const transactionFee = await getTransactionFees();

        if (
            Number(balances[0].balance) <
            Number(totalAmount) + Number(transactionFee)
        ) {
            setInsufficientBal(true);
            return false;
        }

        return true;
    };

    const [showSenderReapWarning, setShowSenderReapWarning] =
        React.useState(false);
    const [showReceiverReapWarning, setShowReceiverReapWarning] =
        React.useState(false);

    const validateReceiverAccountsReaping = async (): Promise<void> => {
        const recipientBalancesPromises = recepientList.map(
            async (recepient) => {
                return getBalance(api, recepient.address);
            }
        );

        const reapReceiverAccounts: number[] = [];
        const recipientBalances = await Promise.all(recipientBalancesPromises);

        recipientBalances.forEach((recipientBalance, index) => {
            if (
                Number(existentialDeposit) >
                Number(
                    Number(recipientBalance) +
                        Number(recepientList[index].amount)
                )
            ) {
                console.log(index + 1, 'yehg ander lo');
                reapReceiverAccounts.push(index + 1);
            }
        });
        console.log(reapReceiverAccounts);
        setReapingAddressList(reapReceiverAccounts);

        if (reapReceiverAccounts.length > 0) setShowReceiverReapWarning(true);
        else {
            setIsButtonLoading(false);
            setStep(1);
        }
    };

    const validateSenderReaping = async (): Promise<void> => {
        const totalAmount = calculatedAmount();
        const transactionFee = await getTransactionFees();
        if (
            Number(balances[0].balance) -
                Number(totalAmount) -
                Number(transactionFee) <
            Number(existentialDeposit)
        ) {
            setShowSenderReapWarning(true);
        } else {
            await validateReceiverAccountsReaping();
        }
    };

    const handleSubmit = async (): Promise<void> => {
        setInsufficientBal(false);
        setSenderReaped(false);
        setIsButtonLoading(true);
        const amountsValidated = validateAllAmount();
        const addressValidated = validateAddresses();
        // const reapingValidated = await validateReaping();
        const balanceValidated = await validateSenderBalance();

        if (amountsValidated && addressValidated && balanceValidated) {
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
        open: showSenderReapWarning,
        handleClose: () => {
            setIsButtonLoading(false);
            setShowSenderReapWarning(false);
        },
        onConfirm: () => {
            validateReceiverAccountsReaping();
            setShowSenderReapWarning(false);
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
        subText:
            'Your account might get reaped. Do you still wish to continue?',
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
        setInsufficientBal(false);
        setSenderReaped(false);
    };

    React.useEffect(() => {
        async function getED(): Promise<void> {
            const decimalPlaces = api.registry.chainDecimals[0];
            const ED: number =
                Number(api?.consts?.balances?.existentialDeposit.toString()) /
                10 ** decimalPlaces;

            setExistentialDeposit(ED);
        }
        getED();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
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
                />
            ))}

            {insufficientBal && (
                <SubHeading
                    color="#F63A3A"
                    fontSize="12px"
                    opacity="0.7"
                    lineHeight="0px"
                    marginTop="20px"
                >
                    Insufficient Funds
                </SubHeading>
            )}

            <HorizontalContentDiv justifyContent="flex-end" marginTop="12px">
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
            </HorizontalContentDiv>
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
                    onClick={() => addRecepient({ address: '', amount: '' })}
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
