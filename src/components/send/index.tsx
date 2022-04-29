import '@polkadot/api-augment';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import type { ApiPromise as ApiPromiseType } from '@polkadot/api';
import { decodeAddress, encodeAddress } from '@polkadot/keyring';
import { EventRecord } from '@polkadot/types/interfaces';

import { hexToU8a, isHex, u8aToHex } from '@polkadot/util';

import { images } from '../../utils';
import { RootState } from '../../redux/store';
import accounts from '../../utils/accounts';
import services from '../../utils/services';
import sendScreenService from '../../utils/sendScreenService';
import { Wrapper, HorizontalContentDiv } from '../common/wrapper';
import { WarningModal, AuthModal } from '../common/modals';
import {
    setAuthScreenModal,
    setIsResponseModalOpen,
    setConfirmSendModal,
} from '../../redux/slices/modalHandling';
import { addTransaction } from '../../redux/slices/transactions';
import { DASHBOARD, BATCH_SEND } from '../../constants';
import useDispatcher from '../../hooks/useDispatcher';
import useResponseModal from '../../hooks/useResponseModal';
import SendView from './view';
import { SubHeading } from '../common/text';
import { Header } from '../common';

const { UnsuccessCheckIcon, SuccessCheckPngIcon, ToggleOff, ToggleOn } = images;

const { signTransaction, isPasswordSaved } = accounts;

const { fetchExistentialDeposit, signTransactionFunction, setToggleButtons } =
    sendScreenService;

const errorMessages = {
    invalidAddress: 'Invalid address',
    enterAddress: 'Enter address',
    enterAmount: 'Enter amount',
};

const {
    getBalance,
    getTransactionFee,
    addressMapper,
    isValidAddressPolkadotAddress,
} = services;

const Send: React.FunctionComponent = () => {
    const generalDispatcher = useDispatcher();
    const navigate = useNavigate();

    const currReduxState = useSelector((state: RootState) => state);
    const { activeAccount, modalHandling } = useSelector(
        (state: RootState) => state
    );

    const { publicKey, balances } = activeAccount;

    const location = useLocation().state as {
        tokenName: string;
        balance: number;
        isNative: boolean;
        decimal: number;
        // tokenImage: any;
    };

    const [insufficientBal, setInsufficientBal] = useState(false);
    const [switchChecked, setSwitchChecked] = useState(false);
    const [switchCheckedSecond, setSwitchCheckedSecond] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [toAddressError, setToAddressError] = useState(false);
    const [isCorrect, setIsCorrect] = useState(true);
    const [transactionFee, setTransactionFee] = useState<number>(0);
    const [amount, setAmount] = useState<any>('');
    const [receiverAddress, setReceiverAddress] = useState('');
    const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
    const [subTextForWarningModal, setSubTextForWarningModal] = useState('abc');
    const [isInputEmpty, setIsInputEmpty] = useState(true);
    const [existentialDeposit, setExistentialDeposit] = useState(0);
    const [transferAll, setTransferAll] = useState({
        transferAll: false,
        keepAlive: false,
    });
    const [insufficientTxFee, setInsufficientTxFee] = useState(false);
    const [disableToggleButtons, setDisableToggleButtons] = useState({
        firstToggle: false,
        secondToggle: false,
    });
    const [savePassword, setSavePassword] = useState(false);
    const [passwordSaved, setPasswordSaved] = useState(false);

    const { tokenName, isNative, decimal } = location;
    const { authScreenModal } = modalHandling;
    const api = currReduxState.api.api as unknown as ApiPromiseType;

    const openResponseModalForTxFailed = useResponseModal({
        isOpen: true,
        modalImage: UnsuccessCheckIcon,
        mainText: 'Transaction Failed!',
        subText: '',
    });

    const openResponseModalForTxSuccess = useResponseModal({
        isOpen: true,
        modalImage: SuccessCheckPngIcon,
        mainText: 'Transaction Successful!',
        subText: '',
    });

    useEffect(() => {
        async function get(): Promise<void> {
            const estimatedTxFee = await getTransactionFee(
                api,
                publicKey,
                publicKey,
                amount,
                balances[0]?.name
            );
            const txFeeWithFivePercentMargin =
                estimatedTxFee + estimatedTxFee / 5;
            setTransactionFee(txFeeWithFivePercentMargin);
        }
        get();
    }, []);

    useEffect(() => {
        const res = fetchExistentialDeposit(api, isNative, tokenName);
        setExistentialDeposit(res);
    }, []);

    useEffect(() => {
        isPasswordSaved(publicKey).then((res) => {
            setPasswordSaved(!res);
            setSavePassword(!res);
        });
    }, []);

    useEffect(() => {
        setToggleButtons(
            location.balance,
            balances[0].balance,
            transactionFee,
            existentialDeposit,
            setDisableToggleButtons,
            isNative
        );
    }, [transactionFee, existentialDeposit]);

    const validateTxErrors = async (txFee: number): Promise<void> => {
        try {
            const tokens = await api?.registry?.chainTokens;

            const recipientBalance: any = await getBalance(
                api,
                receiverAddress
            );
            const filterBalance = recipientBalance.filter((e: any) => {
                return e.name === tokenName;
            });
            const senderBalance = location.balance;

            const ED = existentialDeposit;

            if (Number(ED) > Number(filterBalance[0].balance + amount)) {
                // Show warning modal
                setSubTextForWarningModal(
                    `The receiver have insufficient balance
                 to receive the transaction.
                 Do you still want to confirm?`
                );
                setIsWarningModalOpen(true);
            }
            if (
                Number(senderBalance) -
                    Number(amount) -
                    Number(isNative ? txFee : 0) <
                Number(ED)
            ) {
                // if (tokens.length > 1) {
                setSubTextForWarningModal(
                    `The ${
                        tokens.length > 1 ? 'sending token' : 'sender account'
                    } might get reaped`
                );
                setIsWarningModalOpen(true);
            }
        } catch (err) {
            console.log('In validate tx errors', err);
        }
    };

    const doTransactionCallBackForSuccess = (): void => {
        console.log('tx for success');
        setLoading2(false);
        generalDispatcher(() => setConfirmSendModal(false));
        openResponseModalForTxSuccess();
        setTimeout(() => {
            generalDispatcher(() => setIsResponseModalOpen(false));
        }, 2000);
        navigate(DASHBOARD);
    };

    const doTransactionCallBackForFail = (
        address: string,
        signedTx: any
    ): void => {
        console.log('tx for fail');
        const transactionRecord = [
            {
                accountFrom: addressMapper(
                    address,
                    api.registry.chainSS58 as number
                ),
                accountTo: [
                    addressMapper(
                        receiverAddress,
                        api.registry.chainSS58 as number
                    ),
                ],
                amount: [amount],
                hash: signedTx.hash.toString(),
                operation: 'Send',
                status: 'Failed',
                chainName: api.runtimeChain.toString(),
                tokenName: [tokenName],
                transactionFee: '0',
                timestamp: new Date().toString(),
            },
        ];

        generalDispatcher(() =>
            addTransaction({
                transactions: transactionRecord,
                publicKey: address,
            })
        );
        setLoading2(false);
        generalDispatcher(() => setConfirmSendModal(false));
        openResponseModalForTxFailed();
        setTimeout(() => {
            generalDispatcher(() => setIsResponseModalOpen(false));
        }, 4000);
        navigate(DASHBOARD);
    };

    const doTransactionCallBackForCatch = (): boolean => {
        setLoading2(false);
        generalDispatcher(() => setConfirmSendModal(false));
        openResponseModalForTxFailed();
        setTimeout(() => {
            generalDispatcher(() => setIsResponseModalOpen(false));
        }, 4000);
        navigate(DASHBOARD);
        return false;
    };

    const transactionCallBack = (
        events: any,
        address: string,
        signedTx: any,
        status: any
    ): void => {
        const txResSuccess = events.filter(({ event }: EventRecord) =>
            api?.events?.system?.ExtrinsicSuccess.is(event)
        );
        console.log('tx res success', txResSuccess.length);
        const txResFail = events.filter(({ event }: EventRecord) =>
            api?.events?.system?.ExtrinsicFailed.is(event)
        );
        if (status.isInBlock) {
            if (txResFail.length >= 1) {
                doTransactionCallBackForFail(address, signedTx);
            }
            if (txResSuccess.length >= 1) {
                doTransactionCallBackForSuccess();
            }
        }
    };
    const doTransaction = async (
        address = '',
        password = ''
    ): Promise<boolean> => {
        try {
            setLoading2(true);
            const amountSending = amount * 10 ** decimal;
            console.log('Amount sending', amountSending);
            const txSingle = api?.tx?.balances?.transfer(
                receiverAddress as string,
                BigInt(amountSending)
            );

            const txMultiple = api?.tx?.currencies?.transfer(
                receiverAddress as string,
                {
                    Token: tokenName,
                },
                BigInt(amountSending)
            );

            const tx = isNative ? txSingle : txMultiple;

            const signedTx = await signTransactionFunction(
                tx,
                address,
                password,
                api,
                savePassword,
                setLoading2
            );

            await signedTx
                .send(({ status, events }: any) => {
                    transactionCallBack(events, address, signedTx, status);
                })
                .catch(() => {
                    doTransactionCallBackForCatch();
                });
            return true;
        } catch (err) {
            console.log('do transaction error', err);
            return false;
        }
    };

    const SendTx = (txFee: number): void => {
        setTransactionFee(txFee);
        setLoading1(false);
        setIsWarningModalOpen(false);
        generalDispatcher(() => setConfirmSendModal(true));
    };

    const doTransactionTransferAll = async (
        address: '',
        password: ''
    ): Promise<boolean> => {
        console.log('transfer all running', location);
        try {
            setLoading2(true);

            let tx;
            if (isNative) {
                tx = await api?.tx?.balances?.transferAll(
                    receiverAddress,
                    transferAll.keepAlive
                );
            } else {
                tx = await api?.tx?.currencies?.transferAll(
                    receiverAddress,
                    { Token: tokenName },
                    transferAll.keepAlive
                );
            }

            const signedTx = await signTransactionFunction(
                tx,
                address,
                password,
                api,
                savePassword,
                setLoading2
            );

            await signedTx
                .send(({ status, events }: any) => {
                    transactionCallBack(events, address, signedTx, events);
                })
                .catch(() => {
                    doTransactionCallBackForCatch();
                });
            return true;
        } catch (err) {
            console.log(
                'Do transaction transfer all catch ========>>>>>>>>>',
                err
            );
            return false;
        }
    };
    const handleSubmit = async (): Promise<void | boolean> => {
        try {
            const txFee = await getTransactionFee(
                api,
                publicKey,
                receiverAddress,
                amount,
                balances[0]?.name
            );
            if (transferAll.transferAll) {
                if (!isNative && txFee > Number(balances[0]?.balance)) {
                    setInsufficientTxFee(true);
                    throw new Error('Tx fee');
                }
                validateTxErrors(txFee);
                if (transferAll.transferAll && !transferAll.keepAlive) {
                    setSubTextForWarningModal(
                        `The ${
                            api.registry.chainTokens.length > 1
                                ? 'sending token'
                                : 'sender account'
                        } might get reaped`
                    );
                    setIsWarningModalOpen(true);
                    return false;
                }
                generalDispatcher(() => setConfirmSendModal(true));
                return true;
            }
            setLoading1(true);
            if (!isValidAddressPolkadotAddress(receiverAddress)) {
                setIsCorrect(false);
                throw new Error('An error occurred');
            }

            if (isNative) {
                if (location.balance < Number(amount) + Number(txFee)) {
                    setInsufficientBal(true);
                    throw new Error('Insufficient balance');
                } else {
                    generalDispatcher(() => setConfirmSendModal(true));
                }
            } else if (txFee > Number(balances[0]?.balance)) {
                setInsufficientTxFee(true);
                throw new Error('Not enough funds to pay gas fee');
            } else if (amount > location.balance) {
                setInsufficientBal(true);
                throw new Error('Insufficient balance');
            } else {
                generalDispatcher(() => setConfirmSendModal(true));
            }
            const isTxValid = await validateTxErrors(txFee);

            setTransactionFee(txFee);
            setLoading1(false);
            return true;
        } catch (err) {
            console.log('in catch handle submit', err);
            setLoading1(false);
            return false;
        }
    };
    const setAmountOnToggle = (toggleOn: boolean, keepAlive: boolean): void => {
        setInsufficientTxFee(false);
        setInsufficientBal(false);
        const val = fetchExistentialDeposit(api, isNative, tokenName);
        if (toggleOn) {
            const res = isNative
                ? location.balance - transactionFee
                : location.balance;
            const data = keepAlive
                ? (res - val).toFixed(4)
                : Number(res).toFixed(4);
            setAmount(Number(data) > 0 ? data : 0);
            setIsInputEmpty(false);
        } else setAmount('');
    };

    const handleBatchSwitch = (): void => {
        navigate(BATCH_SEND, { state: location });
    };

    const resetToggles = (): void => {
        setSwitchChecked(false);
        setSwitchCheckedSecond(false);
        setTransferAll({
            transferAll: false,
            keepAlive: false,
        });
        setAmount('');
    };

    const toInput = {
        setAmount,
        isCorrect,
        errorMessages,
        onChange: (e: string): void => {
            setIsCorrect(true);
            setToAddressError(false);
            setReceiverAddress(e);
        },
        receiverAddress,
    };

    const amountInput = {
        onChange: (e: string): boolean => {
            setSwitchChecked(false);
            setSwitchCheckedSecond(false);
            setTransferAll({
                transferAll: false,
                keepAlive: false,
            });
            setTransferAll({
                transferAll: false,
                keepAlive: false,
            });
            setInsufficientBal(false);
            setInsufficientTxFee(false);
            if (e[0] === '0' && e[1] === '0') {
                return false;
            }
            if (e.length < 14) {
                let decimalInStart = false;
                if (e[0] === '.') {
                    // eslint-disable-next-line no-param-reassign
                    e = `0${e}`;
                    decimalInStart = true;
                }
                const reg = /^-?\d+\.?\d*$/;
                const test = reg.test(e);

                if (!test && e.length !== 0 && !decimalInStart) {
                    return false;
                }
                if (Number(e) + transactionFee >= location.balance) {
                    setInsufficientBal(true);
                }
                setInsufficientBal(false);
                if (e.length === 0) {
                    setAmount(e);
                    setIsInputEmpty(true);
                } else {
                    setAmount(e);
                    setIsInputEmpty(false);
                }
                return true;
            }
            return false;
        },
        insufficientBal,
        setInsufficientBal,
        errorMessages,
        transactionFee,
        amount,
        transferAll,
        setTransferAll,
        setAmountOnToggle,
        existentialDeposit,
        disableToggleButtons,
        setDisableToggleButtons,
        tokenName,
        balance: location.balance,
        insufficientTxFee,
        setSwitchChecked,
        setSwitchCheckedSecond,
    };

    const ED = {
        onChange: (e: string): boolean => {
            setTransferAll({
                transferAll: false,
                keepAlive: false,
            });
            setSwitchChecked(false);
            setSwitchCheckedSecond(false);
            if (e[0] === '0' && e[1] === '0') {
                return false;
            }
            if (e.length < 14) {
                let decimalInStart = false;
                if (e[0] === '.') {
                    // eslint-disable-next-line no-param-reassign
                    e = `0${e}`;
                    decimalInStart = true;
                }
                const reg = /^-?\d+\.?\d*$/;
                const test = reg.test(e);

                if (!test && e.length !== 0 && !decimalInStart) {
                    return false;
                }
                if (Number(e) + transactionFee >= location.balance) {
                    setInsufficientBal(true);
                }
                setInsufficientBal(false);
                if (e.length === 0) {
                    setAmount(e);
                    setIsInputEmpty(true);
                } else {
                    setAmount(e);
                    setIsInputEmpty(false);
                }
                return true;
            }
            return false;
        },
        setTransferAll,
        setAmountOnToggle,
        disableToggleButtons,
        existentialDeposit,
        transferAll,
        setInsufficientBal,
        tokenName,
        setSwitchChecked,
        setSwitchCheckedSecond,
        switchChecked,
        switchCheckedSecond,
    };

    const nextBtn = {
        id: 'send-next',
        text: 'Next',
        style: {
            width: '100%',
            height: 50,
            borderRadius: 40,
        },
        handleClick: handleSubmit,
        disabled:
            loading1 ||
            isInputEmpty ||
            receiverAddress.length === 0 ||
            toAddressError,
        isLoading: loading1,
    };

    const confirmSend = {
        accountTo: receiverAddress,
        amount,
        transactionFee,
        locationTokenName: tokenName,
        isNative,
        handleClose: () => generalDispatcher(() => setConfirmSendModal(false)),
        loading2,
    };

    const warningModal = {
        open: isWarningModalOpen,
        handleClose: () => {
            setIsWarningModalOpen(false);
            generalDispatcher(() => setConfirmSendModal(false));
        },
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

    const fromInput = {
        resetToggles,
        setAmount,
    };

    const sendView = {
        toInput,
        amountInput,
        ED,
        confirmSend,
        nextBtn,
        setTransferAll,
        setAmountOnToggle,
        fromInput,
    };

    const authModal = {
        publicKey,
        open: authScreenModal,
        handleClose: () => {
            generalDispatcher(() => setAuthScreenModal(false));
            generalDispatcher(() => setConfirmSendModal(true));
        },
        onConfirm:
            transferAll.transferAll && isNative
                ? doTransactionTransferAll
                : doTransaction,
        functionType: passwordSaved ? 'PasswordSaved' : 'PasswordNotSaved',
        savePassword,
        setSavePassword,
        style: {
            width: '290px',
            background: '#141414',
            position: 'relative',
            bottom: 30,
            p: 2,
            px: 2,
            pb: 3,
        },
    };

    const imageProps = {
        src: ToggleOff,
        style: { marginLeft: '10px' },
        ariaHidden: true,
        onClick: handleBatchSwitch,
    };

    return (
        <Wrapper width="89%">
            <Header
                centerText="Send"
                overWriteBackHandler={() => navigate(DASHBOARD)}
            />

            <HorizontalContentDiv justifyContent="flex-end" marginTop="28px">
                <SubHeading onClick={handleBatchSwitch}>
                    Batch Transactions
                </SubHeading>
                <img {...imageProps} alt="Toggle" />
            </HorizontalContentDiv>

            <SendView {...sendView} />

            <AuthModal {...authModal} />
            <WarningModal {...warningModal} />
        </Wrapper>
    );
};

export default Send;
