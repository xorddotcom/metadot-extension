/* eslint-disable no-unused-vars */
/* eslint import/no-cycle: [2, { maxDepth: 1 }] */
import '@polkadot/api-augment';
import React, { useEffect, useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { ApiPromise as ApiPromiseType } from '@polkadot/api';
import { decodeAddress, encodeAddress } from '@polkadot/keyring';
import { EventRecord, ExtrinsicStatus } from '@polkadot/types/interfaces';
import type { Codec } from '@polkadot/types/types';

import { hexToU8a, isHex } from '@polkadot/util';

import {
    accountReducerStateType,
    amountReducerStateType,
    actionAccountReducerType,
    actionAmountReducerType,
} from './types';
import { helpers } from '../../utils';
import { RootState } from '../../redux/store';
import services from '../../utils/services';
import Header from '../common/header';
import Button from '../common/button';
import { Wrapper as AuthWrapper } from '../common/wrapper';
import { WarningModal, AuthModal } from '../common/modals';
import { MainContent, CenterContent } from './style';
import ConfirmSend from '../common/modals/confirmSend';
import {
    setAuthScreenModal,
    setIsResponseModalOpen,
    setMainTextForSuccessModal,
    setSubTextForSuccessModal,
    setConfirmSendModal,
    setResponseImage,
} from '../../redux/slices/modalHandling';
import FromInput from './fromInput';
import ToInput from './toInput';
import AmountInput from './amountInput';
import UnsuccessCheckIcon from '../../assets/images/modalIcons/failed.svg';
import SuccessCheckIcon from '../../assets/images/success.png';

const errorMessages = {
    invalidAddress: 'Invalid address',
    enterAddress: 'Enter address',
    enterAmount: 'Enter amount',
};

type Sender = KeyringPair | string;

const accountReducer = (
    state: accountReducerStateType,
    action: actionAccountReducerType
): accountReducerStateType => {
    if (action.type === 'USER_INPUT') {
        return { value: action.val, isValid: action.val !== action.valid };
    }
    if (action.type === 'IS_BLUR') {
        return { value: state.value, isValid: action.val !== action.valid };
    }
    return { value: '', isValid: false };
};

const amountReducer = (
    state: amountReducerStateType,
    action: actionAmountReducerType
): any => {
    if (action.type === 'USER_INPUT' && action.amountIsValid && action.val) {
        return {
            value: action.val,
            isValid: action.amountIsValid >= action.val,
        };
    }

    if (action.type === 'MAX_INPUT' && action.bal && action.txFee) {
        return {
            value: action.bal - action.txFee,
            isValid: true,
        };
    }

    if (action.type === 'IS_BLUR' && action.amountIsValid) {
        return {
            value: state.value,
            isValid: action.amountIsValid >= state.value,
        };
    }
    return { value: '', isValid: false };
};

const { addressModifier } = helpers;
const { getBalance, convertTransactionFee } = services;

const Send: React.FunctionComponent = () => {
    // eslint-disable-next-line no-unused-vars
    const [insufficientBal, setInsufficientBal] = useState(false);
    const [loading1, setLoading1] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [loading2, setLoading2] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // fill this state  from redux
    // eslint-disable-next-line no-unused-vars
    const [accountFrom, setAccountFrom] = useState('');
    const [isCorrect, setIsCorrect] = useState(true);
    const [transactionFee, setTransactionFee] = useState<any>(0);
    const [error, setError] = useState({
        amountError: false,
        address: false,
    });

    // eslint-disable-next-line no-unused-vars
    const [isLoading, setIsLoading] = useState(false);

    const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
    const [subTextForWarningModal, setSubTextForWarningModal] = useState('abc');

    const currentUser = useSelector((state: RootState) => state);
    const { accountName } = currentUser.activeAccount;
    const { publicKey } = currentUser.activeAccount;
    const api = currentUser.api.api as unknown as ApiPromiseType;
    const { rpcUrl } = currentUser.activeAccount;
    const [isSendModalOpen, setIsSendModalOpen] = useState(false);

    // const [accountTo, setAccountTo] = useState('');
    const [accountToSate, accountDispatch]: any = useReducer(accountReducer, {
        value: '',
        isValid: null,
    });
    // const [amount, setAmount] = useState('');
    const [amountState, amountDispatch] = useReducer(amountReducer, {
        value: '',
        isValid: null,
    });
    const [formIsValid, setFormIsValid] = useState(false);

    const { isValid } = accountToSate;
    const { isValid: amountIsValid } = amountState;

    useEffect(() => {
        setTimeout(() => {
            setFormIsValid(isValid && amountState.isValid);
        }, 600);

        return () => {
            clearTimeout();
        };
    }, [isValid, amountIsValid, amountState.isValid]);

    // Getting estimated Transaction fee
    useEffect(() => {
        async function get(): Promise<void> {
            const info = await api.tx.balances
                .transfer(currentUser.activeAccount.publicKey, 10)
                .paymentInfo(currentUser.activeAccount.publicKey);
            const res = await convertTransactionFee(
                currentUser.activeAccount.tokenName,
                info.partialFee.toHuman()
            );
            console.log('Res tx fee', res, res / 10);
            setTransactionFee(res);
        }
        get();
    });

    const accountToChangeHandler = (e: string): void => {
        setIsCorrect(true);
        accountDispatch({
            type: 'USER_INPUT',
            val: e,
            valid: currentUser.activeAccount.publicKey,
        });
    };

    const accountToIsValid = (): void => {
        accountDispatch({ type: 'IS_BLUR' });
    };

    const [isInputEmpty, setIsInputEmpty] = useState(false);

    const amountHandler = (e: string): void => {
        // const temp: string = e as unknown as string;
        setInsufficientBal(false);
        if (e.length === 0) {
            amountDispatch({
                type: 'USER_INPUT',
                val: Number(e),
                amountIsValid: currentUser.activeAccount.balance,
            });
            setIsInputEmpty(true);
        } else {
            amountDispatch({
                type: 'USER_INPUT',
                val: Number(e),
                amountIsValid: currentUser.activeAccount.balance,
            });
            setIsInputEmpty(false);
        }
    };

    const amountIsValidHandler = (): void => {
        amountDispatch({ type: 'IS_BLUR' });
    };

    const maxInputHandler = async (): Promise<void> => {
        const info = await api.tx.balances
            .transfer(currentUser.activeAccount.publicKey, 10)
            .paymentInfo(currentUser.activeAccount.publicKey);

        const txFee = Number(
            await convertTransactionFee(
                currentUser.activeAccount.tokenName,
                info.partialFee.toHuman()
            )
        );

        amountDispatch({
            type: 'MAX_INPUT',
            bal: currentUser.activeAccount.balance,
            txFee: Number(txFee) + Number(txFee) / 10,
        });
    };

    // Check the sender existential deposit
    const validateTxErrors = async (): Promise<[boolean, number]> => {
        // try {
        const decimalPlaces = await api.registry.chainDecimals[0];

        // const recipientBalance = await getBalance(api, accountToSate.value);
        // if (currentUser.activeAccount.
        // rpcUrl === constants.ACALA_MANDALA_CONFIG.RPC_URL) {
        //   recipientBalance = await
        //   getBalanceWithMultipleTokens(api, accountToSate.value);
        // } else {
        const recipientBalance = await getBalance(
            api,
            accountToSate.value as string
        );
        // }
        const senderBalance = currentUser.activeAccount.balance;
        console.log(
            'TYPE [][]',
            typeof recipientBalance,
            typeof amountState.value
        );
        console.log(
            'Recipient balance + amount to state',
            Number(recipientBalance) + Number(amountState.value)
        );

        console.log(
            'Sender balance after tx',
            (senderBalance - amountState.value) * 10 ** decimalPlaces
        );
        console.log('ED of the chain', api.consts.balances.existentialDeposit);

        const decimalPlacesForTxFee: number = await api.registry
            .chainDecimals[0];
        const info = await api.tx.balances
            .transfer(
                currentUser.activeAccount.publicKey,
                // eslint-disable-next-line no-undef
                BigInt(amountState.value * 10 ** decimalPlacesForTxFee)
            )
            .paymentInfo(accountToSate.value as string);

        console.log('After info');
        const txFee = await convertTransactionFee(
            currentUser.activeAccount.tokenName,
            info.partialFee.toHuman()
        );

        // checking if balance is enough to send the amount with network fee
        if (
            currentUser.activeAccount.balance <
            Number(amountState.value) + Number(txFee)
        ) {
            setInsufficientBal(true);
            console.log('hello');
            return [false, txFee];
        }

        if (
            (api.consts.balances.existentialDeposit as unknown as number) >
            (recipientBalance + amountState.value) * 10 ** decimalPlaces
        ) {
            // Show warning modal
            setSubTextForWarningModal(
                `The receiver have insufficient balance
                 to receive the transaction,
                 Do you still want to confirm?`
            );
            setIsWarningModalOpen(true);
            return [false, txFee];
            // alert('Existential deposit warning.
            // The receiver have insufficient
            //  balance to receive the transaction');
            // alert('Warning modal, the transaction might get failed');
        }

        if (
            (senderBalance - amountState.value) * 10 ** decimalPlaces <
            (api.consts.balances.existentialDeposit as unknown as number)
        ) {
            // alert('The sender account might get reaped');
            setSubTextForWarningModal('The sender account might get reaped');
            setIsWarningModalOpen(true);
            return [false, txFee];
        }
        return [true, txFee];
    };

    // publicKey: string, password: string, sender: object
    const doTransaction = async (
        sender: Sender,
        address = '',
        password = ''
    ): Promise<void> => {
        console.log('sender unlocked-------------', sender);
        // const keyring1 = new Keyring({ type: 'sr25519' });

        const decimalPlaces = await api.registry.chainDecimals[0];

        const decimals: number = decimalPlaces;
        console.log('b');
        setLoading2(true);
        console.log('c');
        // const sender = keyring.addFromUri(deSeed);
        // const decimals =
        //     decimalPlaces.length > 1 ? decimalPlaces[0] : decimalPlaces;

        const amountSending = amountState.value * 10 ** decimals;

        const tx = api.tx.balances.transfer(
            accountToSate.value as string,
            BigInt(amountSending)
        );

        type signAndSendResponseType = {
            status: ExtrinsicStatus;
            events: EventRecord[];
        };
        const result = await tx
            .signAndSend(
                sender,
                ({ status, events }: signAndSendResponseType) => {
                    // if (status.isInBlock) txStatus = status.isInBlock;
                    const txResSuccess = events.filter(
                        ({ event }: EventRecord) =>
                            api.events.system.ExtrinsicSuccess.is(event)
                    );
                    const txResFail = events.filter(({ event }: EventRecord) =>
                        api.events.system.ExtrinsicFailed.is(event)
                    );
                    console.log('Tx res Success', txResSuccess.length);
                    console.log('Tx res Fail', txResFail.length);
                    if (status.isInBlock) {
                        if (txResFail.length >= 1) {
                            // dispatch(addTransaction(data));
                            setLoading2(false);
                            dispatch(setConfirmSendModal(false));
                            dispatch(setIsResponseModalOpen(true));
                            setIsSendModalOpen(false);
                            dispatch(setResponseImage(UnsuccessCheckIcon));
                            dispatch(
                                setMainTextForSuccessModal(
                                    'Transaction Failed!'
                                )
                            );
                            dispatch(setSubTextForSuccessModal(''));
                            setTimeout(() => {
                                dispatch(setIsResponseModalOpen(false));
                            }, 4000);
                            // navigate to dashboard on success
                            navigate('/');
                        }
                        if (txResSuccess.length >= 1) {
                            console.log('Tx successfull');
                            // dispatch(addTransaction(data));
                            setLoading2(false);
                            dispatch(setConfirmSendModal(false));
                            setIsSendModalOpen(false);
                            dispatch(setIsResponseModalOpen(true));
                            dispatch(setResponseImage(SuccessCheckIcon));
                            dispatch(
                                setMainTextForSuccessModal(
                                    'Transaction Successful!'
                                )
                            );
                            dispatch(setSubTextForSuccessModal(''));
                            setTimeout(() => {
                                dispatch(setIsResponseModalOpen(false));
                            }, 4000);
                            navigate('/');
                        }
                    }
                }
            )
            .then((res) => {
                console.log('Res', res);
            })
            .catch((err) => {
                console.log('Tx hash', tx.hash.toHex());
                // dispatch(addTransaction(data));
                setLoading2(false);
                dispatch(setConfirmSendModal(false));
                setIsSendModalOpen(false);
                dispatch(setIsResponseModalOpen(true));
                dispatch(setResponseImage(UnsuccessCheckIcon));
                dispatch(setMainTextForSuccessModal('Transaction Failed!'));
                dispatch(setSubTextForSuccessModal(''));
                setTimeout(() => {
                    dispatch(setIsResponseModalOpen(false));
                }, 4000);
                // navigate to dashboard on success
                navigate('/');
            });
    };

    const isValidAddressPolkadotAddress = (address: string): boolean => {
        try {
            encodeAddress(
                isHex(address) ? hexToU8a(address) : decodeAddress(address)
            );
            setIsCorrect(true);
            return true;
        } catch (err) {
            setIsCorrect(false);
            return false;
        }
    };

    const validateInputValues = (address: string): boolean => {
        if (currentUser.activeAccount.balance < amountState.value) {
            throw new Error('Insufficient funds');
        }
        if (!accountToSate.value) {
            setError((prevState) => ({
                ...prevState,
                address: true,
            }));
            throw new Error('Please enter address');
        }
        setError((prevState) => ({
            ...prevState,
            address: false,
        }));
        if (!isValidAddressPolkadotAddress(address)) return false;
        if (!amountState.value) {
            setError((prevState) => ({
                ...prevState,
                amountError: true,
            }));
            throw new Error('Please enter amount');
        }
        setError((prevState) => ({
            ...prevState,
            amountError: false,
        }));
        return true;
    };

    const SendTx = (txFee: number): void => {
        setTransactionFee(txFee);
        setLoading1(false);
        setIsWarningModalOpen(false);
        dispatch(setConfirmSendModal(true));

        // // checking if balance is enough to send the amount with network fee
        // if (currentUser.activeAccount.balance <
        //  (Number(amountState.value) + Number(txFee))) {
        //   setInsufficientBal(true);
        //   console.log('hello');
        // } else {
        //   dispatch(setConfirmSendModal(true));
        // }
    };

    // eslint-disable-next-line no-unused-vars
    const handleSubmit = async (): Promise<void> => {
        console.log('User balance', currentUser.activeAccount.balance);
        console.log('Redux state api []][]', rpcUrl);
        console.log('Check existential deposit', accountToSate);
        // if (rpcUrl === constants.ACALA_MANDALA_CONFIG.RPC_URL) {
        //   const bal = await getBalanceWithMultipleTokens(
        // api, accountToSate.value);
        //   console.log('Recipient balance', bal);
        // } else {
        //   const bal = await getBalance(api, accountToSate.value);
        //   console.log('Recipient balance', bal);
        // }
        console.log('Submit working');
        try {
            setLoading1(true);
            if (!validateInputValues(accountToSate.value as string))
                throw new Error('An error occurred');
            // const decimalPlaces = await api.registry.chainDecimals;
            console.log('Before validate tx errors');
            const isTxValid = await validateTxErrors();
            console.log('isTxValid------------------', { isTxValid });
            if (isTxValid[0]) {
                console.log('After validate tx errors');
                console.log('Before info');
                SendTx(isTxValid[1]);
                // const info = await
                // getTransactionFee(api, currentUser.activeAccount.publicKey,
                // accountToSate.value, decimalPlaces, amountState.value);
                // const info = await api.tx.balances
                //   .transfer(currentUser.activeAccount.publicKey,
                //  amountState.value * 10 ** decimalPlaces)
                //   .paymentInfo(accountToSate.value);

                // console.log('After info');
                // const txFee = await
                // convertTransactionFee(info.partialFee.toHuman());
                // // const txFee = 0.1;
                // console.log('After tx');
                // console.log('TX fee', txFee);
                // data.txFee = txFee;
                // data.chainName = currentUser.activeAccount.chainName;
                // setTransactionFee(txFee);
                // setLoading1(false);
                // // checking if balance is enough
                // to send the amount with network fee
                // if (currentUser.activeAccount.balance
                // < (Number(amountState.value) + Number(txFee))) {
                //   setInsufficientBal(true);
                //   console.log('hello');
                // } else {
                //   dispatch(setConfirmSendModal(true));
                // }
            } else {
                console.log('abc abc abc');
                setLoading1(false);
            }
        } catch (err) {
            console.log('In catch', err);
            setLoading1(false);
        }
    };

    const trimBalance = (value: number): string => {
        const val = value.toString();
        const trimmedValue = val.slice(0, val.indexOf('.') + 6);
        return trimmedValue;
    };

    const fromInput = {
        addressModifier,
        accountName,
        publicKey,
    };

    const toInput = {
        accountToSate,
        publicKey,
        isCorrect,
        errorMessages,
        error,
        accountToChangeHandler,
        accountToIsValid,
    };

    const amountInput = {
        amountState,
        amountHandler,
        maxInputHandler,
        amountIsValidHandler,
        insufficientBal,
        currentUser,
        trimBalance,
        errorMessages,
        error,
        transactionFee,
    };

    const btn = {
        id: 'send-next',
        text: 'Next',
        width: '300px',
        handleClick: handleSubmit,
        disabled: !formIsValid || loading1 || isInputEmpty,
        isLoading: loading1,
    };

    const confirmSend = {
        id: 'confirm-send',
        style: {
            width: '300px',
            background: '#141414',
            position: 'relative',
            p: 2,
            px: 2,
            pb: 3,
            mt: 10,
        },
        accountFrom: currentUser.activeAccount.publicKey,
        accountTo: accountToSate.value,
        amount: amountState.value,
        open: currentUser.modalHandling.confirmSendModal,
        transactionFee,
        tokenName: currentUser.activeAccount.tokenName,
        fromAccountName: currentUser.activeAccount.accountName,

        handleClose: () => dispatch(setConfirmSendModal(false)),
        // handleConfirm: doTransaction,
        loading2,
    };

    const warningModal = {
        open: isWarningModalOpen,
        handleClose: () => setIsWarningModalOpen(false),
        onConfirm: () => SendTx(transactionFee),
        style: {
            width: '290px',
            background: '#141414',
            position: 'relative',
            bottom: 30,
            p: 2,
            px: 2,
            pb: 3,
        },
        mainText: 'Existential Deposit Warning',
        subText: subTextForWarningModal,
    };

    return (
        <AuthWrapper>
            <Header
                centerText="Send"
                backHandler={() => console.log('object')}
            />

            <MainContent>
                <FromInput {...fromInput} />
                <ToInput {...toInput} />
                <AmountInput {...amountInput} />
            </MainContent>
            <CenterContent>
                <Button {...btn} />
            </CenterContent>
            <ConfirmSend {...confirmSend} />
            <AuthModal
                publicKey={currentUser.activeAccount.publicKey}
                open={currentUser.modalHandling.authScreenModal}
                handleClose={() => {
                    dispatch(setAuthScreenModal(false));
                    dispatch(setConfirmSendModal(true));
                }}
                onConfirm={doTransaction}
                style={{
                    width: '290px',
                    background: '#141414',
                    position: 'relative',
                    bottom: 30,
                    p: 2,
                    px: 2,
                    pb: 3,
                }}
            />
            <WarningModal {...warningModal} />
        </AuthWrapper>
    );
};

export default Send;
