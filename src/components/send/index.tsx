/* eslint-disable no-restricted-syntax */
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
import type { Codec, SignerPayloadJSON } from '@polkadot/types/types';

import { hexToU8a, isHex } from '@polkadot/util';

import { GenericExtrinsicPayload } from '@polkadot/types';
import type { ExtrinsicPayload } from '@polkadot/types/interfaces';
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
import { signTransaction } from '../../messaging';
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
import activeAccount from '../../redux/slices/activeAccount';

const errorMessages = {
    invalidAddress: 'Invalid address',
    enterAddress: 'Enter address',
    enterAmount: 'Enter amount',
    sameAddressError: 'Addresses must not be same',
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

const { addressModifier, validateAddress } = helpers;
const { getBalance, convertTransactionFee, getTransactionFee } = services;

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
    const [toAddressError, setToAddressError] = useState(false);
    const [isCorrect, setIsCorrect] = useState(true);
    const [transactionFee, setTransactionFee] = useState<any>(0);
    const [error, setError] = useState({
        amountError: false,
        address: false,
    });

    const [amount, setAmount] = useState<any>('');
    const [receiverAddress, setReceiverAddress] = useState('');
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
        console.log(
            'ED of the chain',
            api.consts.balances.existentialDeposit.toString()
        );

        console.log('ED decimal places', api.registry.chainDecimals);
        const ED: number =
            Number(api.consts.balances.existentialDeposit.toString()) /
            10 ** api.registry.chainDecimals[0];

        console.log('ED of the chain in number', ED);
        async function get(): Promise<void> {
            const info = await api.tx.balances
                .transfer(currentUser.activeAccount.publicKey, 10)
                .paymentInfo(currentUser.activeAccount.publicKey);
            console.log('Token name ====>>>>', currentUser);
            const res = await convertTransactionFee(
                currentUser.activeAccount.tokenName,
                info.partialFee.toHuman()
            );
            console.log('Res tx fee', res, res / 5);
            setTransactionFee(res + res / 5);
        }
        get();
    });

    const accountToChangeHandler = (e: string): void => {
        setIsCorrect(true);
        setToAddressError(false);
        // const res = validate(e, currentUser.activeAccount.publicKey)
        const res = e === currentUser.activeAccount.publicKey;
        setToAddressError(res);
        console.log('EE', e);
        setReceiverAddress(e);

        // setIsCorrect(true);
        // accountDispatch({
        //     type: 'USER_INPUT',
        //     val: e,
        //     valid: currentUser.activeAccount.publicKey,
        // });
    };

    const accountToIsValid = (): void => {
        accountDispatch({ type: 'IS_BLUR' });
    };

    const [isInputEmpty, setIsInputEmpty] = useState(true);

    const amountHandler = (e: string): boolean => {
        const reg = /^-?\d+\.?\d*$/;
        const test = reg.test(e);

        if (!test && e.length !== 0) {
            console.log('Regex fail');
            return false;
        }
        console.log('Transaction fee ===>>>', transactionFee);
        console.log('Total balance + fee', {
            data: Number(e) + transactionFee,
        });
        console.log(
            'Total transferrable',
            currentUser.activeAccount.balance - transactionFee
        );
        if (Number(e) + transactionFee >= currentUser.activeAccount.balance) {
            console.log('Balance too low');
            return false;
        }
        console.log('Amount handler working');
        // const temp: string = e as unknown as string;
        setInsufficientBal(false);
        if (e.length === 0) {
            setAmount(e);
            setIsInputEmpty(true);
        } else {
            setAmount(e);
            setIsInputEmpty(false);
        }
        setInsufficientBal(true);
        return true;
        // if (e.length === 0) {
        //     console.log('In amount handler IF');
        //     amountDispatch({
        //         type: 'USER_INPUT',
        //         val: Number(e),
        //         amountIsValid: currentUser.activeAccount.balance,
        //     });
        //     setIsInputEmpty(true);
        // } else {
        //     amountDispatch({
        //         type: 'USER_INPUT',
        //         val: Number(e),
        //         amountIsValid: currentUser.activeAccount.balance,
        //     });
        //     setIsInputEmpty(false);
        // }
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
        setTransactionFee(Number(txFee) + Number(txFee) / 5);
        console.log(
            'Transaction fee with margin',
            Number(txFee) + Number(txFee) / 5
        );
        setAmount(
            (
                currentUser.activeAccount.balance -
                (Number(txFee) + Number(txFee / 5))
            ).toFixed(5)
        );
        setIsInputEmpty(false);
    };

    // Check the sender existential deposit
    const validateTxErrors = async (): Promise<[boolean, number]> => {
        console.log('Validate tx errors running', receiverAddress);
        // try {
        const decimalPlaces = await api.registry.chainDecimals[0];

        // const recipientBalance = await getBalance(api, accountToSate.value);
        // if (currentUser.activeAccount.
        // rpcUrl === constants.ACALA_MANDALA_CONFIG.RPC_URL) {
        //   recipientBalance = await
        //   getBalanceWithMultipleTokens(api, accountToSate.value);
        // } else {
        const recipientBalance = await getBalance(api, receiverAddress);
        // }
        const senderBalance = currentUser.activeAccount.balance;
        console.log(
            'TYPE [][]',
            typeof recipientBalance,
            typeof amountState.value
        );
        console.log(
            'Recipient balance + amount to state',
            Number(recipientBalance) + Number(amount)
        );

        console.log(
            'Sender balance after tx',
            (senderBalance - amount) * 10 ** decimalPlaces
        );
        console.log('ED of the chain', api.consts.balances.existentialDeposit);

        const decimalPlacesForTxFee: number = await api.registry
            .chainDecimals[0];
        const info = await api.tx.balances
            .transfer(
                currentUser.activeAccount.publicKey,
                // eslint-disable-next-line no-undef
                BigInt(amount * 10 ** decimalPlacesForTxFee)
            )
            .paymentInfo(receiverAddress as string);

        console.log('After info');
        const txFee = await convertTransactionFee(
            currentUser.activeAccount.tokenName,
            info.partialFee.toHuman()
        );

        console.log('Hello', Number(amount) + Number(txFee + txFee / 10));

        // checking if balance is enough to send the amount with network fee
        if (
            currentUser.activeAccount.balance <
            Number(amount) + Number(txFee)
        ) {
            setInsufficientBal(true);
            console.log('hello');
            return [false, txFee];
        }

        const ED: number =
            Number(api.consts.balances.existentialDeposit.toString()) /
            10 ** decimalPlaces;
        console.log('Hello ED', ED);
        console.log('Hello amount sending', recipientBalance + amount);
        console.log('Sending amount ====>>>', recipientBalance, amount);
        if (Number(ED) > Number(recipientBalance + amount)) {
            console.log('Open ED modal');
            // Show warning modal
            setSubTextForWarningModal(
                `The receiver have insufficient balance
                 to receive the transaction.
                 Do you still want to confirm?`
            );
            setIsWarningModalOpen(true);
            return [false, txFee];
            // alert('Existential deposit warning.
            // The receiver have insufficient
            //  balance to receive the transaction');
            // alert('Warning modal, the transaction might get failed');
        }

        console.log('ED', api.consts.balances.existentialDeposit);
        console.log('ED type', typeof api.consts.balances.existentialDeposit);
        console.log(
            'Sender balance - amount state value',
            senderBalance - amountState.value
        );
        console.log('Sender balance ED', ED);
        console.log(
            'Test ED ===>>',
            Number(senderBalance - amount - txFee) < Number(ED)
        );
        console.log(
            'Hi sender balance after tx',
            Number(senderBalance - amount - txFee)
        );
        console.log('Hi ED', ED);
        if (Number(senderBalance - amount - txFee) < Number(ED)) {
            console.log('IN IF [][] account reap');
            // alert('The sender account might get reaped');
            setSubTextForWarningModal('The sender account might get reaped');
            setIsWarningModalOpen(true);
            return [false, txFee];
        }
        return [true, txFee];
    };

    // publicKey: string, password: string, sender: object
    const doTransaction = async (
        address = '',
        password = ''
    ): Promise<void> => {
        // const keyring1 = new Keyring({ type: 'sr25519' });
        console.log('Address', address);
        console.log('Password', password);
        const decimalPlaces = await api.registry.chainDecimals[0];
        console.log('Decimals', decimalPlaces);
        const decimals: number = decimalPlaces;
        console.log('b');
        setLoading2(true);
        console.log('c');
        // const sender = keyring.addFromUri(deSeed);
        // const decimals =
        //     decimalPlaces.length > 1 ? decimalPlaces[0] : decimalPlaces;

        const amountSending = amount * 10 ** decimals;
        console.log('Amount sending ====>>>', amountSending);
        const tx = api.tx.balances.transfer(
            receiverAddress as string,
            BigInt(amountSending)
        );

        console.log('Tx [][]', tx);
        const nonce = await api.rpc.system.accountNextIndex(address);
        console.log('Nonce', nonce);

        const signer = api.createType('SignerPayload', {
            method: tx,
            nonce,
            genesisHash: api.genesisHash,
            blockHash: api.genesisHash,
            runtimeVersion: api.runtimeVersion,
            version: api.extrinsicVersion,
        });

        console.log('Signer [][]', signer);
        const txPayload: any = api.createType(
            'ExtrinsicPayload',
            signer.toPayload(),
            { version: api.extrinsicVersion }
        );

        const txHex = txPayload.toU8a(true);

        console.log(
            'execute transaction params ==>>',
            address,
            password,
            txHex
        );

        const response = await signTransaction(address, password, txHex);

        console.log('execute transaction returns ==>>', response);

        const { signature } = response;

        tx.addSignature(address, signature, txPayload);

        type signAndSendResponseType = {
            status: ExtrinsicStatus;
            events: EventRecord[];
        };

        await tx
            .send(({ status, events }) => {
                console.log('Tx hash', tx.hash.toHex());
                // await tx.signAndSend(
                // sender,
                // ({ status, events }: signAndSendResponseType) => {
                // if (status.isInBlock) txStatus = status.isInBlock;
                const txResSuccess = events.filter(({ event }: EventRecord) =>
                    api.events.system.ExtrinsicSuccess.is(event)
                );
                const txResFail = events.filter(({ event }: EventRecord) =>
                    api.events.system.ExtrinsicFailed.is(event)
                );
                console.log('Tx res Success', txResSuccess.length);
                console.log('Tx res Fail', txResFail.length);
                if (status.isInBlock) {
                    if (txResFail.length >= 1) {
                        console.log('In IF tx fail');
                        // dispatch(addTransaction(data));
                        setLoading2(false);
                        dispatch(setConfirmSendModal(false));
                        dispatch(setIsResponseModalOpen(true));
                        setIsSendModalOpen(false);
                        dispatch(setResponseImage(UnsuccessCheckIcon));
                        dispatch(
                            setMainTextForSuccessModal('Transaction Failed!')
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
            })
            .then((res) => {
                console.log('Res', res);
            })
            .catch((err) => {
                console.log('Error =====>>>', err);
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
        console.log('isValidAddressPolkadotAddress running', address);
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
        console.log('User Balance', currentUser.activeAccount.balance);
        console.log('Amount + transactionfee', amount + transactionFee);
        if (currentUser.activeAccount.balance < amount + transactionFee) {
            throw new Error('Insufficient funds');
        }
        // if (!accountToSate.value) {
        //     setError((prevState) => ({
        //         ...prevState,
        //         address: true,
        //     }));
        //     throw new Error('Please enter address');
        // }
        // setError((prevState) => ({
        //     ...prevState,
        //     address: false,
        // }));
        if (!isValidAddressPolkadotAddress(address)) return false;
        // if (!amountState.value) {
        //     setError((prevState) => ({
        //         ...prevState,
        //         amountError: true,
        //     }));
        //     throw new Error('Please enter amount');
        // }
        // setError((prevState) => ({
        //     ...prevState,
        //     amountError: false,
        // }));
        return true;
    };

    const SendTx = (txFee: number): void => {
        setTransactionFee(txFee);
        setLoading1(false);
        setIsWarningModalOpen(false);
        dispatch(setConfirmSendModal(true));
    };

    const handleSubmit = async (): Promise<void> => {
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
            if (!validateInputValues(receiverAddress))
                throw new Error('An error occurred');
            const decimalPlaces = await api.registry.chainDecimals;
            console.log('Before validate tx errors');
            const isTxValid = await validateTxErrors();
            console.log('Validate tx ran');
            console.log('isTxValid------------------', { isTxValid });
            if (isTxValid[0]) {
                console.log('After validate tx errors');
                console.log('Before info');
                SendTx(isTxValid[1]);
                const info = await getTransactionFee(
                    api,
                    currentUser.activeAccount.publicKey,
                    receiverAddress,
                    decimalPlaces[0],
                    amount
                );

                console.log('After info');
                const txFee = await convertTransactionFee(
                    currentUser.activeAccount.tokenName,
                    info.partialFee.toHuman()
                );
                // const txFee = 0.1;
                console.log('After tx');
                console.log('TX fee', txFee);
                // data.txFee = txFee;
                // data.chainName = currentUser.activeAccount.chainName;
                setTransactionFee(txFee);
                setLoading1(false);
                // checking if balance is enough
                // to send the amount with network fee
                if (
                    currentUser.activeAccount.balance <
                    Number(amount) + Number(txFee)
                ) {
                    setInsufficientBal(true);
                    console.log('hello');
                } else {
                    dispatch(setConfirmSendModal(true));
                }
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
        console.log('Value here ====>>>', value);
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
        receiverAddress,
        toAddressError,
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
        amount,
    };

    const btn = {
        id: 'send-next',
        text: 'Next',
        width: '300px',
        handleClick: handleSubmit,
        disabled:
            loading1 ||
            isInputEmpty ||
            receiverAddress.length === 0 ||
            toAddressError,
        // disabled: !formIsValid || loading1 || isInputEmpty,
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
        accountTo: receiverAddress,
        amount,
        open: currentUser.modalHandling.confirmSendModal,
        transactionFee,
        tokenName: currentUser.activeAccount.tokenName,
        fromAccountName: currentUser.activeAccount.accountName,

        handleClose: () => dispatch(setConfirmSendModal(false)),
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
