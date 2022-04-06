import '@polkadot/api-augment';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import type { ApiPromise as ApiPromiseType } from '@polkadot/api';
import { decodeAddress, encodeAddress } from '@polkadot/keyring';
import { EventRecord } from '@polkadot/types/interfaces';

import { hexToU8a, isHex } from '@polkadot/util';

import { images } from '../../utils';
import { RootState } from '../../redux/store';
import accounts from '../../utils/accounts';
import services from '../../utils/services';
import { Wrapper as AuthWrapper } from '../common/wrapper';
import { WarningModal, AuthModal } from '../common/modals';
import {
    setAuthScreenModal,
    setIsResponseModalOpen,
    setConfirmSendModal,
} from '../../redux/slices/modalHandling';
import { addTransaction } from '../../redux/slices/transactions';
import { DASHBOARD } from '../../constants';
import useDispatcher from '../../hooks/useDispatcher';
import useResponseModal from '../../hooks/useResponseModal';
import SendView from './view';

const { UnsuccessCheckIcon, SuccessCheckPngIcon } = images;

const { signTransaction } = accounts;

const errorMessages = {
    invalidAddress: 'Invalid address',
    enterAddress: 'Enter address',
    enterAmount: 'Enter amount',
};

const { getBalance, getTransactionFee, addressMapper } = services;

const Send: React.FunctionComponent = () => {
    const generalDispatcher = useDispatcher();
    const navigate = useNavigate();

    const location = useLocation().state as {
        tokenName: string;
        balance: number;
        isNative: boolean;
        decimal: number;
    };

    const [insufficientBal, setInsufficientBal] = useState(false);
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
    const [disableToggleButtons, setDisableToggleButtons] = useState({
        firstToggle: false,
        secondToggle: false,
    });
    const currReduxState = useSelector((state: RootState) => state);
    const { activeAccount, modalHandling } = useSelector(
        (state: RootState) => state
    );

    // const { publicKey, balance, tokenName } = activeAccount;

    const { publicKey, balances } = activeAccount;
    const { balance, tokenName } = location;
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

    // Getting estimated Transaction fee
    useEffect(() => {
        async function get(): Promise<void> {
            const estimatedTxFee = await getTransactionFee(
                api,
                publicKey,
                publicKey,
                amount,
                tokenName
            );
            const txFeeWithFivePercentMargin =
                estimatedTxFee + estimatedTxFee / 5;
            setTransactionFee(txFeeWithFivePercentMargin);
        }
        get();
    }, []);

    useEffect(() => {
        async function getED(): Promise<void> {
            const decimalPlaces = await api.registry.chainDecimals[0];
            const ED: number =
                Number(api?.consts?.balances?.existentialDeposit.toString()) /
                10 ** decimalPlaces;

            setExistentialDeposit(ED);
        }
        getED();
    }, []);

    useEffect(() => {
        console.log('balance', balance);
        console.log('tx fee', transactionFee);
        console.log('location state ====>>>>', location);
    }, [transactionFee]);

    useEffect(() => {
        if (balance - transactionFee > existentialDeposit) {
            console.log('');
        } else if (balance.toString() === existentialDeposit.toString()) {
            setDisableToggleButtons({
                firstToggle: true,
                secondToggle: true,
            });
        } else if (balance < transactionFee) {
            setDisableToggleButtons({
                firstToggle: true,
                secondToggle: true,
            });
        }
        // else if (balance.toString() === existentialDeposit.toString()) {
        //     setDisableToggleButtons((prevState) => ({
        //         ...prevState,
        //         firstToggle: true,
        //     }));
        // }
    }, [transactionFee, existentialDeposit]);

    const maxInputHandler = async (): Promise<void> => {
        setInsufficientBal(false);
        const txFeeForMaxAmount = await getTransactionFee(
            api,
            publicKey,
            receiverAddress,
            amount,
            tokenName
        );
        const txFeeWithFivePercentMargin =
            txFeeForMaxAmount + txFeeForMaxAmount / 5;
        setTransactionFee(txFeeWithFivePercentMargin);
        setAmount(
            (balance - (txFeeForMaxAmount + txFeeForMaxAmount / 2)).toFixed(5)
        );
        setIsInputEmpty(false);
    };

    const validateTxErrors = async (): Promise<[boolean, number]> => {
        const decimalPlaces = await api?.registry?.chainDecimals[0];

        const recipientBalance = await getBalance(api, receiverAddress);
        const senderBalance = balance;

        const txFee = await getTransactionFee(
            api,
            publicKey,
            receiverAddress,
            amount,
            tokenName
        );

        if (balance < Number(amount) + Number(txFee)) {
            setInsufficientBal(true);
            return [false, txFee];
        }

        const ED = existentialDeposit;
        // const ED: number =
        //     Number(api.consts.balances.existentialDeposit.toString()) /
        //     10 ** decimalPlaces;

        if (Number(ED) > Number(recipientBalance + amount)) {
            // Show warning modal
            setSubTextForWarningModal(
                `The receiver have insufficient balance
                 to receive the transaction.
                 Do you still want to confirm?`
            );
            setIsWarningModalOpen(true);
            return [false, txFee];
        }
        if (
            Number(senderBalance) - Number(amount) - Number(txFee) <
            Number(ED)
        ) {
            setSubTextForWarningModal('The sender account might get reaped');
            setIsWarningModalOpen(true);
            return [false, txFee];
        }
        return [true, txFee];
    };

    const signTransactionFunction = async (
        tx: any,
        address: string,
        password: string
    ): Promise<any> => {
        const nonce = await api?.rpc?.system?.accountNextIndex(address);
        const signer = api?.createType('SignerPayload', {
            method: tx,
            nonce,
            genesisHash: api?.genesisHash,
            blockHash: api?.genesisHash,
            runtimeVersion: api?.runtimeVersion,
            version: api?.extrinsicVersion,
        });
        const txPayload: any = api?.createType(
            'ExtrinsicPayload',
            signer.toPayload(),
            { version: api?.extrinsicVersion }
        );
        const txHex = txPayload.toU8a(true);
        let signature;
        try {
            signature = await signTransaction(
                address,
                password,
                txHex,
                'substrate'
            );
        } catch (err) {
            setLoading2(false);
            throw new Error('Invalid Password!');
        }
        tx.addSignature(address, signature, txPayload);
        return tx;
    };

    const doTransaction = async (
        address = '',
        password = ''
    ): Promise<boolean> => {
        try {
            const tokens = await api.registry?.chainTokens;

            setLoading2(true);

            const amountSending = amount * 10 ** location.decimal;

            const txSingle = api?.tx?.balances?.transfer(
                receiverAddress as string,
                BigInt(amountSending)
            );

            const txMultiple = api?.tx?.currencies.transfer(
                receiverAddress as string,
                {
                    Token: location.tokenName,
                },
                BigInt(amountSending)
            );

            const tx = tokens.length > 1 ? txMultiple : txSingle;

            const signedTx = await signTransactionFunction(
                tx,
                address,
                password
            );

            await signedTx
                .send(({ status, events }: any) => {
                    const txResSuccess = events.filter(
                        ({ event }: EventRecord) =>
                            api?.events?.system?.ExtrinsicSuccess.is(event)
                    );
                    const txResFail = events.filter(({ event }: EventRecord) =>
                        api?.events?.system?.ExtrinsicFailed.is(event)
                    );
                    if (status.isInBlock) {
                        if (txResFail.length >= 1) {
                            const transactionRecord = [
                                {
                                    accountFrom: addressMapper(
                                        address,
                                        api.registry.chainSS58 as number
                                    ),
                                    accountTo: addressMapper(
                                        receiverAddress,
                                        api.registry.chainSS58 as number
                                    ),
                                    amount,
                                    hash: signedTx.hash.toString(),
                                    operation: 'Send',
                                    status: 'Failed',
                                    chainName: api.runtimeChain.toString(),
                                    tokenName: location.tokenName,
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
                                generalDispatcher(() =>
                                    setIsResponseModalOpen(false)
                                );
                            }, 4000);
                            // navigate to dashboard on success
                            navigate(DASHBOARD);
                        }
                        if (txResSuccess.length >= 1) {
                            setLoading2(false);
                            generalDispatcher(() => setConfirmSendModal(false));
                            openResponseModalForTxSuccess();
                            setTimeout(() => {
                                generalDispatcher(() =>
                                    setIsResponseModalOpen(false)
                                );
                            }, 2000);
                            navigate(DASHBOARD);
                        }
                    }
                })
                .catch(() => {
                    setLoading2(false);
                    generalDispatcher(() => setConfirmSendModal(false));
                    openResponseModalForTxFailed();
                    setTimeout(() => {
                        generalDispatcher(() => setIsResponseModalOpen(false));
                    }, 4000);
                    // navigate to dashboard on success
                    navigate(DASHBOARD);
                    return false;
                });
            return true;
        } catch (err) {
            return false;
        }
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
        if (Number(balance) < Number(amount) + Number(transactionFee)) {
            setInsufficientBal(true);
            throw new Error('Insufficient funds');
        }

        if (!isValidAddressPolkadotAddress(address)) return false;

        return true;
    };

    const SendTx = (txFee: number): void => {
        setTransactionFee(txFee);
        setLoading1(false);
        setIsWarningModalOpen(false);
        console.log('send tx open modal');
        generalDispatcher(() => setConfirmSendModal(true));
    };

    const doTransactionTransferAll = async (
        address: '',
        password: ''
    ): Promise<boolean> => {
        try {
            setLoading2(true);

            const tx = await api?.tx?.balances?.transferAll(
                receiverAddress,
                transferAll.keepAlive
            );
            const signedTx = await signTransactionFunction(
                tx,
                address,
                password
            );

            await signedTx
                .send(({ status, events }: any) => {
                    const txResSuccess = events.filter(
                        ({ event }: EventRecord) =>
                            api?.events?.system?.ExtrinsicSuccess.is(event)
                    );
                    const txResFail = events.filter(({ event }: EventRecord) =>
                        api?.events?.system?.ExtrinsicFailed.is(event)
                    );
                    if (status.isInBlock) {
                        if (txResFail.length >= 1) {
                            setLoading2(false);
                            generalDispatcher(() => setConfirmSendModal(false));
                            openResponseModalForTxFailed();
                            setTimeout(() => {
                                generalDispatcher(() =>
                                    setIsResponseModalOpen(false)
                                );
                            }, 4000);
                            // navigate to dashboard on success
                            navigate(DASHBOARD);
                        }
                        if (txResSuccess.length >= 1) {
                            setLoading2(false);
                            generalDispatcher(() => setConfirmSendModal(false));
                            openResponseModalForTxSuccess();
                            setTimeout(() => {
                                generalDispatcher(() =>
                                    setIsResponseModalOpen(false)
                                );
                            }, 2000);
                            navigate(DASHBOARD);
                        }
                    }
                })
                .catch(() => {
                    setLoading2(false);
                    generalDispatcher(() => setConfirmSendModal(false));
                    openResponseModalForTxFailed();
                    setTimeout(() => {
                        generalDispatcher(() => setIsResponseModalOpen(false));
                    }, 4000);
                    // navigate to dashboard on success
                    navigate(DASHBOARD);
                    return false;
                });
            return true;
        } catch (err) {
            return false;
        }
    };

    const handleSubmit = async (): Promise<void> => {
        console.log(
            'chain properties',
            api?.registry?.getChainProperties()?.toString()
        );
        try {
            if (transferAll.transferAll)
                generalDispatcher(() => setConfirmSendModal(true));
            setLoading1(true);
            if (!validateInputValues(receiverAddress)) {
                throw new Error('An error occurred');
            }
            const isTxValid = await validateTxErrors();
            console.log('is tx valid ----->>>>', isTxValid);
            // if (isTxValid[0]) {
            const txFee = await getTransactionFee(
                api,
                publicKey,
                receiverAddress,
                amount,
                tokenName
            );

            setTransactionFee(txFee);
            setLoading1(false);
            // SendTx(isTxValid[1]);

            if (location.isNative) {
                if (location.balance < amount + txFee) {
                    setInsufficientBal(true);
                    throw new Error('Insufficient balance');
                } else {
                    console.log('Open modal 1');
                    generalDispatcher(() => setConfirmSendModal(true));
                }
                console.log('type Native token');
            } else if (!location.isNative) {
                console.log(
                    'type Non native',
                    txFee,
                    balance,
                    amount,
                    location.balance
                );
                console.log('native token balance', balances[0]?.balance);
                if (
                    txFee > Number(balances[0]?.balance) ||
                    amount > location.balance
                ) {
                    console.log('open modal 2');
                    setInsufficientBal(true);
                    throw new Error('Insufficient balance');
                } else generalDispatcher(() => setConfirmSendModal(true));
            }

            // checking if balance is enough
            // to send the amount with network fee
            // if (balance < Number(amount) + Number(txFee)) {
            //     setInsufficientBal(true);
            // } else {
            //     generalDispatcher(() => setConfirmSendModal(true));
            // }
            // } else {
            //     setLoading1(false);
            // }
        } catch (err) {
            console.log('in catch handle submit');
            setLoading1(false);
        }
    };
    const setAmountOnToggle = (toggleOn: boolean, keepAlive: boolean): void => {
        if (toggleOn) {
            const res = balance - transactionFee;
            setAmount(
                keepAlive
                    ? (res - existentialDeposit).toFixed(4)
                    : res.toFixed(4)
            );
            setIsInputEmpty(false);
        } else setAmount('');
    };

    const toInput = {
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
            console.log('Balance', balance);
            console.log('selected token', location.balance);
            console.log('Tx fee', transactionFee);
            // if (amount > e) setAmount(e);
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
                if (Number(e) + transactionFee >= balance) {
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
        maxInputHandler,
        insufficientBal,
        errorMessages,
        transactionFee,
        amount,
        setTransferAll,
        setAmountOnToggle,
        existentialDeposit,
        disableToggleButtons,
        setDisableToggleButtons,
        tokenName,
        balance,
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
        locationTokenName: location.tokenName,
        isNative: location.isNative,
        handleClose: () => generalDispatcher(() => setConfirmSendModal(false)),
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

    const multipleTokens = async (): Promise<void> => {
        // eslint-disable-next-line no-restricted-syntax
        console.clear();
        const tokens = api?.registry?.chainTokens;
        const decimals = api?.registry?.chainDecimals;

        const balancesArray: any[] = [];
        const promises: any[] = [];
        const promises2: any[] = [];
        async function fetch(): Promise<any> {
            tokens.map(async (token: any, index: number) => {
                api?.query?.tokens?.accounts(
                    publicKey,
                    { Token: token },
                    (res: any) => {
                        // console.log(
                        //     'Balance',
                        //     token,
                        //     res.free.toString() / 10 ** decimals[index]
                        // );
                        balancesArray.push({
                            name: token,
                            balance:
                                res.free.toString() / 10 ** decimals[index],
                        });
                    }
                );
                if (index === 0) {
                    api?.query?.system?.account(publicKey).then((res) => {
                        balancesArray.push({
                            name: token,
                            balance:
                                Number(res.data.free.toString()) /
                                10 ** decimals[0],
                        });
                    });
                }

                promises.push(
                    api?.query?.tokens?.accounts(publicKey, { Token: token })
                );
                if (index === 0) {
                    promises[0] = api?.query?.system?.account(publicKey);
                }
                return true;
            });
            console.log('promises', promises);
            const res = await Promise.all(promises);
            const res2: any[] = [];
            console.log('res', res);
            res.map((singleToken: any, i: number): any => {
                console.log(
                    'single token',
                    tokens[i],
                    singleToken.free / 10 ** decimals[i]
                );
                res2.push({
                    name: tokens[i],
                    balance: singleToken.free / 10 ** decimals[i],
                });
                return true;
            });
            return res2;
        }
        console.log('before fetch');
        const val = await fetch();
        console.log('after fetch', val);
    };

    return (
        <AuthWrapper width="89%">
            <SendView
                toInput={toInput}
                amountInput={amountInput}
                confirmSend={confirmSend}
                nextBtn={nextBtn}
                setTransferAll={setTransferAll}
                setAmountOnToggle={setAmountOnToggle}
                multipleTokens={multipleTokens}
                // transactionFee={transactionFee}
                // existentialDeposit={existentialDeposit}
                // disableToggleButtons={disableToggleButtons}
            />
            <AuthModal
                publicKey={publicKey}
                open={authScreenModal}
                handleClose={() => {
                    generalDispatcher(() => setAuthScreenModal(false));
                    console.log('open modal handle close');
                    generalDispatcher(() => setConfirmSendModal(true));
                }}
                onConfirm={
                    transferAll.transferAll
                        ? doTransactionTransferAll
                        : doTransaction
                }
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
