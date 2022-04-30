import React, { useEffect, useState } from 'react';

import type { ApiPromise as ApiPromiseType } from '@polkadot/api';
import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import { useSelector } from 'react-redux';
import { fonts, images, helpers } from '../../../../utils';
import { getExistentialDepositConfig } from '../../../../utils/existentialDeposit';
import services from '../../../../utils/services';

import { MainText, SubHeading } from '../../text';
import { ResponseModalProps } from './types';
import { HorizontalContentDiv } from '../../wrapper';
import ToInput from '../../to-input';
import Input from '../../input';
import Button from '../../button';
import { RootState } from '../../../../redux/store';
import { WarningModal } from '..';

const { getBalancesForBatch, getBalanceWithSingleToken } = services;

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;
const { crossIcon } = images;
const { isValidAddressPolkadotAddress, trimContent } = helpers;

const EditRecepientModal: React.FunctionComponent<ResponseModalProps> = (
    props
) => {
    const {
        open,
        handleClose,
        addressChangeHandler,
        amountChangeHandler,
        activeRecepient,
        getTotalAmount,
        getTransactionFees,
    } = props;

    console.log(props, 'dikha do bhai');

    const [amount, setAmount] = React.useState('');
    const [address, setAddress] = React.useState('');

    React.useEffect(() => {
        if (activeRecepient.address && activeRecepient.amount) {
            setAmount(activeRecepient.amount);
            setAddress(activeRecepient.address);
        }
    }, [activeRecepient.address, activeRecepient.amount]);

    const style = {
        background: '#141414',
        border: '0.8px solid #2E9B9B',
        padding: '22px 15px 22px 15px',
    };
    const errorMessages = {
        invalidAddress: 'Invalid address',
        enterAddress: 'Enter address',
        enterAmount: 'Enter amount',
    };

    const [addressError, setAddressError] = React.useState(false);
    const [amountError, setAmountError] = React.useState(false);
    const [addressErrorMessage, setAddressErrorMessage] = React.useState('');
    const [amountErrorMessage, setAmountErrorMessage] = React.useState('');

    const [receiverReapModal, setReceiverReapModal] = React.useState(false);
    const [senderReapModal, setSenderReapModal] = React.useState(false);
    const [isButtonLoading, setIsButtonLoading] = React.useState(false);

    const currReduxState = useSelector((state: RootState) => state);
    const api = currReduxState.api.api as unknown as ApiPromiseType;

    const { activeAccount } = useSelector((state: RootState) => state);
    const { balances, balance, tokenName, publicKey } = activeAccount;

    const [balanceOfSelectedToken, setBalanceOfSelectedToken] = useState(
        balances[0].balance
    );

    useEffect(() => {
        const getBalForSelectedToken = async (): Promise<void> => {
            const isNativeToken = balances.filter(
                (bal) => bal.name === activeRecepient.token
            );
            console.log('isNativeToken', isNativeToken);
            if (!isNativeToken[0].isNative) {
                const receiverBalance = await getBalancesForBatch(api, [
                    {
                        address: publicKey,
                        token: activeRecepient.token,
                    },
                ]);
                console.log('receiverBalance', receiverBalance);
                setBalanceOfSelectedToken(receiverBalance[0]);
            } else {
                const nativeBalance = await getBalanceWithSingleToken(
                    api,
                    publicKey
                );
                console.log('nativeBalance', nativeBalance);
                setBalanceOfSelectedToken(nativeBalance.balance);
            }
        };
        getBalForSelectedToken();
    }, [activeRecepient.token]);

    const confirmSubmit = (): void => {
        addressChangeHandler(address, activeRecepient.index);
        amountChangeHandler(amount, activeRecepient.index);

        setIsButtonLoading(false);
        handleClose();
    };

    const styledToInput = {
        id: 'InputField',
        placeholder: address,
        type: 'String',
        value: address,
        className: subHeadingfontFamilyClass,
        onChange: (value: string) => {
            setAddress(value);
            setAddressError(false);
            setAmountError(false);
        },
        blockInvalidChar: true,
    };

    const styledAmountInput = {
        id: 'InputField',
        placeholder: 'Enter Amount',
        type: 'Number',
        value: amount,
        className: subHeadingfontFamilyClass,
        onChange: (value: string) => {
            setAddressError(false);
            setAmountError(false);
            if (value[0] === '0' && value[1] === '0') {
                return;
            }
            if (value.length < 14) {
                let decimalInStart = false;
                if (value[0] === '.') {
                    // eslint-disable-next-line no-param-reassign
                    value = `0${value}`;
                    decimalInStart = true;
                }
                const reg = /^-?\d+\.?\d*$/;
                const test = reg.test(value);

                if (!test && value.length !== 0 && !decimalInStart) {
                    return;
                }
                setAmount(value);
            }
        },
        blockInvalidChar: true,
        tokenLogo: true,
        tokenName: activeRecepient.token,
        tokenImage: `https://token-resources-git-dev-acalanetwork.vercel.app/tokens/${activeRecepient.token}.png`,
    };

    const btnCancel = {
        text: 'Cancel',
        style: {
            width: '115px',
            height: '35px',
            borderRadius: 40,
            fontSize: '14px',
        },
        handleClick: () => handleClose(),
        lightBtn: true,
    };

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

    const validateAddress = (): boolean => {
        if (isValidAddressPolkadotAddress(address)) {
            setAddressError(false);
            return true;
        }

        setAddressError(true);
        setAddressErrorMessage('Account can not be validated');
        return false;
    };
    const validateTotalAmount = async (): Promise<boolean> => {
        const totalAmount = getTotalAmount(amount, activeRecepient.index);

        const transactionFee = await getTransactionFees();
        console.log(totalAmount, transactionFee, '---> amount and fee');
        if (Number(balance) < Number(totalAmount) + Number(transactionFee)) {
            setAmountError(true);
            setAmountErrorMessage('Insufficient Funds');
            return false;
        }

        setAmountError(false);
        return true;
    };

    const validateReapingReceiver = async (): Promise<void> => {
        const receiverBalance = await getBalancesForBatch(api, [
            {
                address,
                amount,
                token: activeRecepient.token,
            },
        ]);
        const ed = fetchExistentialDeposit({ name: activeRecepient.token });
        if (Number(ed) > Number(Number(receiverBalance) + Number(amount))) {
            setReceiverReapModal(true);
        } else {
            confirmSubmit();
        }
    };

    const validateSenderReaping = async (): Promise<void> => {
        const totalAmount = getTotalAmount(amount, activeRecepient.index);
        const transactionFee = await getTransactionFees();
        const ed = fetchExistentialDeposit({ name: activeRecepient.token });
        if (
            Number(balance) - Number(totalAmount) - Number(transactionFee) <
            Number(ed)
        ) {
            setSenderReapModal(true);
        } else {
            validateReapingReceiver();
        }
    };

    const handleConfirm = async (): Promise<void> => {
        // validation lagani hai yahan
        setIsButtonLoading(true);
        if (address === '') {
            setAddressError(true);
            setAddressErrorMessage('Enter Recepient Address');
            setIsButtonLoading(false);
            return;
        }
        if (amount === '') {
            setAmountError(true);
            setAmountErrorMessage('Enter Amount');
            setIsButtonLoading(false);
            return;
        }
        const addressValidated = validateAddress();
        const amountValidated = await validateTotalAmount();
        // const reapingValidated = await validateReapingReceiver();

        if (addressValidated && amountValidated) {
            validateSenderReaping();
        } else {
            setIsButtonLoading(false);
        }
    };

    const btnConfirm = {
        text: 'Confirm',
        style: {
            width: '115px',
            height: '35px',
            borderRadius: 40,
            fontSize: '14px',
        },
        handleClick: handleConfirm,
        isLoading: isButtonLoading,
    };

    const receiverReapModalwarning = {
        open: receiverReapModal,
        handleClose: () => {
            setIsButtonLoading(false);
            setReceiverReapModal(false);
        },
        onConfirm: () => {
            confirmSubmit();
            setIsButtonLoading(false);
            setReceiverReapModal(false);
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
            'The Recipient account might get reaped. Do you still wish to continue?',
    };

    const senderReapModalwarning = {
        open: senderReapModal,
        handleClose: () => {
            setIsButtonLoading(false);
            setSenderReapModal(false);
        },
        onConfirm: () => {
            validateReapingReceiver();
            setSenderReapModal(false);
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

    return (
        <div>
            <WarningModal {...receiverReapModalwarning} />
            <WarningModal {...senderReapModalwarning} />
            <Modal
                style={{
                    backgroundColor: 'rgba(33, 33, 33, 0.2)',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                open={open}
                onClose={handleClose}
            >
                <Box sx={style} className="edit-recepient-modal-style">
                    <HorizontalContentDiv justifyContent="flex-end">
                        {' '}
                        <img
                            src={crossIcon}
                            alt="cross"
                            aria-hidden
                            onClick={handleClose}
                            style={{ cursor: 'pointer' }}
                        />
                    </HorizontalContentDiv>
                    <SubHeading
                        className={mainHeadingfontFamilyClass}
                        textAlignLast="center"
                        textAlign="center"
                        marginTop="0px"
                    >
                        Edit
                    </SubHeading>

                    <SubHeading
                        className={mainHeadingfontFamilyClass}
                        marginTop="25px"
                        lineHeight="0px"
                    >
                        To
                    </SubHeading>
                    <Input {...styledToInput} />
                    <SubHeading
                        color="#F63A3A"
                        fontSize="12px"
                        opacity={addressError ? '0.7' : '0'}
                        lineHeight="0px"
                        marginTop="8px"
                        mb="25px"
                    >
                        {addressErrorMessage}
                    </SubHeading>

                    <SubHeading
                        className={mainHeadingfontFamilyClass}
                        marginTop="25px"
                        lineHeight="0px"
                    >
                        Amount
                    </SubHeading>
                    <Input {...styledAmountInput} />

                    <SubHeading
                        color="#F63A3A"
                        fontSize="12px"
                        opacity={amountError ? '0.7' : '0'}
                        lineHeight="0px"
                        marginTop="8px"
                        mb="25px"
                    >
                        {amountErrorMessage}
                    </SubHeading>

                    <HorizontalContentDiv justifyContent="space-between">
                        <SubHeading
                            className={mainHeadingfontFamilyClass}
                            lineHeight="0px"
                            color="#FAFAFA"
                            opacity="0.6"
                            fontSize="12px"
                        >
                            $0.00
                        </SubHeading>

                        <SubHeading
                            className={mainHeadingfontFamilyClass}
                            lineHeight="0px"
                            color="#FAFAFA"
                            opacity="0.7"
                            fontSize="12px"
                        >
                            Balance:{' '}
                            {`${trimContent(balanceOfSelectedToken, 6)} ${
                                activeRecepient.token
                            }`}
                        </SubHeading>
                    </HorizontalContentDiv>

                    <HorizontalContentDiv
                        justifyContent="space-between"
                        marginTop="35px"
                    >
                        <Button id="cancel" {...btnCancel} />
                        <Button id="confirm" {...btnConfirm} />
                    </HorizontalContentDiv>
                </Box>
            </Modal>
        </div>
    );
};

export default EditRecepientModal;
