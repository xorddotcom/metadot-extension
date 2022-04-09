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
    const { balance, tokenName } = activeAccount;
    const [insufficientBal, setInsufficientBal] = React.useState(false);
    const [senderReaped, setSenderReaped] = React.useState(false);
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

    const checkEmptyAddress = (): boolean => {
        const invalidAddress = [];
        recepientList.forEach((item, index) => {
            if (item.address === '') {
                setRecepientAddressError(true, index);
                invalidAddress.push(index);
            }
        });
        if (invalidAddress.length > 0) return false;
        return true;
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

    const validateBalance = async (): Promise<boolean> => {
        // validate individual recepient amount

        // validate sender reaping
        const totalAmount = calculatedAmount();
        const transactionFee = await getTransactionFees();

        if (Number(balance) < Number(totalAmount) + Number(transactionFee)) {
            setInsufficientBal(true);
            return false;
        }

        if (
            Number(balance) -
                Number(calculatedAmount()) -
                Number(transactionFee) <
            Number(existentialDeposit)
        ) {
            setSenderReaped(true);
            return false;
        }
        return true;
    };

    const validateReaping = async (): Promise<boolean> => {
        // validate receiver reaping
        const invalidSending = [];
        const recipientBalancesPromises = recepientList.map(
            async (recepient) => {
                return getBalance(api, recepient.address);
            }
        );
        const recipientBalances = await Promise.all(recipientBalancesPromises);

        recipientBalances.forEach((recipientBalance, index) => {
            if (
                Number(existentialDeposit) >
                Number(
                    Number(recipientBalance) +
                        Number(recepientList[index].amount)
                )
            ) {
                setValidateReaping(false, index);
                invalidSending.push(recipientBalance);
            } else {
                setValidateReaping(true, index);
            }
        });

        if (invalidSending.length > 0) return false;
        return true;
    };

    const handleSubmit = async (): Promise<void> => {
        setInsufficientBal(false);
        setSenderReaped(false);
        const amountsValidated = validateAllAmount();
        const addressValidated = validateAddresses();
        const reapingValidated = await validateReaping();
        const balanceValidated = await validateBalance();

        if (
            amountsValidated &&
            addressValidated &&
            reapingValidated &&
            balanceValidated
        ) {
            setStep(1);
        }
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

    return (
        <>
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
                    Balance: {`${trimContent(balance, 6)} ${tokenName}`}
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
                        Add Recepient
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
                />
            </HorizontalContentDiv>
        </>
    );
};

export default BatchView;
