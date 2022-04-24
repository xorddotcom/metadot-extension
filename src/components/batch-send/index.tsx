import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { ApiPromise as ApiPromiseType } from '@polkadot/api';
import { EventRecord } from '@polkadot/types/interfaces';
import { Header } from '../common';
import { Wrapper, HorizontalContentDiv } from '../common/wrapper';
import BatchCreateView from './create-view';
import BatchConfirmView from './confirm-view';
import { SubHeading } from '../common/text';
import { SEND, DASHBOARD } from '../../constants';
import useDispatcher from '../../hooks/useDispatcher';
import useResponseModal from '../../hooks/useResponseModal';
import { WarningModal, AuthModal, SelectTokenModal } from '../common/modals';

import { images, accounts } from '../../utils';
import services from '../../utils/services';

import { Recepient } from './types';
import { BalancesType } from '../../redux/types';
import { RootState } from '../../redux/store';
import {
    setAuthScreenModal,
    setIsResponseModalOpen,
    setConfirmSendModal,
} from '../../redux/slices/modalHandling';

const { ToggleOn, UnsuccessCheckIcon, SuccessCheckPngIcon } = images;
const { getBatchTransactionFee } = services;
const { signTransaction, isPasswordSaved } = accounts;

const BatchSend: React.FunctionComponent = () => {
    const navigate = useNavigate();
    const location = useLocation().state as {
        tokenName: string;
        balance: number;
        isNative: boolean;
        decimal: number;
        // tokenImage: any;
    };
    const { tokenName } = location;

    console.log('location in batch', location);
    const generalDispatcher = useDispatcher();
    const currReduxState = useSelector((state: RootState) => state);
    const api = currReduxState.api.api as unknown as ApiPromiseType;
    const allTokens = currReduxState.activeAccount.balances;

    const { authScreenModal } = currReduxState.modalHandling;
    const { publicKey } = currReduxState.activeAccount;

    const [step, setStep] = React.useState(0);
    const [recepientList, setRecepientList] = React.useState<Recepient[]>([
        { amount: '', address: '', token: location.tokenName },
        { amount: '', address: '', token: location.tokenName },
    ]);

    const [tokenList, setTokenList] = React.useState<BalancesType[]>([]);
    const [openNetworkModal, setOpenNetworkModal] = React.useState(false);
    const [activeRecepientIndex, setActiveRecepientIndex] =
        React.useState<number>(0);
    const handleNetworkModalClose = (): void => {
        setOpenNetworkModal(false);
    };
    const handleNetworkModalOpen = (index: number): void => {
        setActiveRecepientIndex(index);
        setOpenNetworkModal(true);
    };

    const handleNetworkSelect = (value: BalancesType): void => {
        console.log('select network');
        const newState = [...recepientList];
        newState[activeRecepientIndex].token = value.name;
        setRecepientList([...newState]);
        setOpenNetworkModal(false);
    };

    const [savePassword, setSavePassword] = React.useState(false);
    const [passwordSaved, setPasswordSaved] = React.useState(false);

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
        isPasswordSaved(publicKey).then((res) => {
            setPasswordSaved(!res);
            setSavePassword(!res);
        });
    }, []);

    const handleSendSwitch = (): void => {
        const { balance, isNative, decimal } = location;
        navigate(SEND, { state: { tokenName, balance, isNative, decimal } });
    };

    const addRecepient = (recepient: Recepient, overWrite = false): void => {
        if (Array.isArray(recepient)) {
            if (overWrite) {
                setRecepientList(recepient);
            } else {
                const newRecepientList = recepientList.concat(recepient);
                setRecepientList(newRecepientList);
            }
        } else {
            setRecepientList([...recepientList, recepient]);
        }
    };

    const [showDeleteModal, setShowDeleteModal] = React.useState(false);
    const deleteWarning = {
        open: showDeleteModal,
        handleClose: () => {
            setShowDeleteModal(false);
        },
        onConfirm: () => {
            const { balance, isNative, decimal } = location;
            navigate(SEND, {
                state: { tokenName, balance, isNative, decimal },
            });
            setShowDeleteModal(false);
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
        mainText: 'Minimum Batch Requirement',
        subText:
            'A Batch Transaction requires 2 or more Recipients. Would you like to switch to Single Transaction screen instead?',
    };

    const deleteRecepient = (index: number): void => {
        if (recepientList.length === 2) {
            setShowDeleteModal(true);
        } else {
            const newState = [...recepientList];
            newState.splice(index, 1);
            setRecepientList(newState);
        }
    };

    const addressChangeHandler = (value: string, index: number): void => {
        const newState = [...recepientList];
        newState[index].address = value;
        setRecepientList([...newState]);
    };

    const amountChangeHandler = (value: string, index: number): void => {
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
            const newState = [...recepientList];
            newState[index].amount = value;
            setRecepientList([...newState]);
        }
    };

    const getTotalAmount = (value: string, index: number): string => {
        const newState = [...recepientList];
        newState[index].amount = value;
        const val = newState.reduce((a, b) => {
            return {
                amount: String(Number(a.amount) + Number(b.amount)),
                address: a.address,
                token: a.token,
            };
        });
        return val.amount;
    };

    const openAuthModal = (): void => {
        generalDispatcher(() => setAuthScreenModal(true));
    };

    const setValidation = (value: boolean, index: number): void => {
        const newState = [...recepientList];
        newState[index].validateAddress = value;
        setRecepientList([...newState]);
    };

    const setValidateReaping = (value: boolean, index: number): void => {
        const newState = [...recepientList];
        newState[index].validateReaping = value;
        setRecepientList([...newState]);
    };

    const setRecepientAmountError = (value: boolean, index: number): void => {
        const newState = [...recepientList];
        newState[index].empytAmount = value;
        setRecepientList([...newState]);
    };

    const setRecepientAddressError = (value: boolean, index: number): void => {
        const newState = [...recepientList];
        newState[index].empytAaddress = value;
        setRecepientList([...newState]);
    };

    const setListErrors = (): void => {
        const newState = [...recepientList];
        newState.forEach((value, index) => {
            newState[index].validateReaping = true;
            newState[index].validateAddress = true;
            newState[index].empytAmount = false;
        });
        setRecepientList([...newState]);
    };

    const getTxFees = async (): Promise<number> => {
        const estimatedTxFee = await getBatchTransactionFee(
            api,
            publicKey,
            recepientList,
            tokenName
        );
        const txFeeWithFivePercentMargin = estimatedTxFee + estimatedTxFee / 5;
        return txFeeWithFivePercentMargin;
    };

    const signTransactionHandler = async (
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
                'substrate',
                false
            );
        } catch (err) {
            throw new Error('Invalid Password!');
        }
        tx.addSignature(address, signature, txPayload);
        return tx;
    };

    const [isButtonLoading, setIsButtonLoading] = React.useState(false);
    const sendTransaction = async (
        address: string,
        password: string
    ): Promise<boolean> => {
        try {
            setIsButtonLoading(true);
            console.log('sending transaction ==>>', recepientList);
            const txs = recepientList.map((recepient) => {
                if (api.registry.chainTokens[0] === recepient.token) {
                    return api.tx.balances.transfer(
                        recepient.address,
                        BigInt(
                            Number(recepient.amount) *
                                10 ** api.registry.chainDecimals[0]
                        )
                    );
                }

                return api.tx.currencies.transfer(
                    recepient.address,
                    {
                        Token: recepient.token,
                    },
                    BigInt(
                        Number(recepient.amount) *
                            10 ** api.registry.chainDecimals[0]
                    )
                );
            });

            const batchTx = api.tx.utility.batch(txs);

            const signedTx = await signTransactionHandler(
                batchTx,
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
                            console.log('from 1');
                            openResponseModalForTxSuccess();
                            setTimeout(() => {
                                generalDispatcher(() =>
                                    setIsResponseModalOpen(false)
                                );
                            }, 2000);
                            generalDispatcher(() => setConfirmSendModal(false));

                            setIsButtonLoading(false);
                            navigate(DASHBOARD);
                        }
                        if (txResSuccess.length >= 1) {
                            console.log('from 2');
                            openResponseModalForTxSuccess();
                            setTimeout(() => {
                                generalDispatcher(() =>
                                    setIsResponseModalOpen(false)
                                );
                            }, 2000);
                            generalDispatcher(() => setConfirmSendModal(false));
                            setIsButtonLoading(false);
                            navigate(DASHBOARD);
                        }
                    }
                })
                .catch(() => {
                    console.log('from 3');
                    openResponseModalForTxFailed();
                    setTimeout(() => {
                        generalDispatcher(() => setIsResponseModalOpen(false));
                    }, 4000);
                    navigate(DASHBOARD);
                    setIsButtonLoading(false);
                    return false;
                });
            return true;
        } catch (error) {
            console.log('error ==>>', error);
            return false;
        }
    };

    const [existentialDeposit, setExistentialDeposit] = React.useState(0);

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

    React.useEffect(() => {
        if (tokenName) {
            const TokenList = allTokens.filter((token) => {
                return token.name !== tokenName;
            });
            setTokenList(TokenList);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tokenName]);

    return (
        <Wrapper width="89%">
            <SelectTokenModal
                open={openNetworkModal}
                handleClose={handleNetworkModalClose}
                tokenList={tokenList}
                handleSelect={handleNetworkSelect}
                style={{
                    position: 'relative',
                    width: '326px',
                    height: '386px',
                    background: '#141414',
                    pb: 3,
                    overflowY: 'scroll',
                    overflowX: 'hidden',
                    marginBottom: '220px',
                }}
            />
            <WarningModal {...deleteWarning} />
            <Header
                centerText={step === 1 ? 'Batch' : 'Send'}
                overWriteBackHandler={
                    step === 1 ? () => setStep(0) : () => navigate(DASHBOARD)
                }
            />
            <HorizontalContentDiv justifyContent="flex-end" marginTop="28px">
                <SubHeading onClick={handleSendSwitch}>
                    Batch Transactions
                </SubHeading>
                <img
                    src={ToggleOn}
                    alt="Toggle"
                    style={{ marginLeft: '10px', marginRight: '6px' }}
                    aria-hidden
                    onClick={handleSendSwitch}
                />
            </HorizontalContentDiv>
            {step === 0 ? (
                <BatchCreateView
                    handleNetworkModalOpen={handleNetworkModalOpen}
                    recepientList={recepientList}
                    setStep={setStep}
                    addressChangeHandler={addressChangeHandler}
                    amountChangeHandler={amountChangeHandler}
                    addRecepient={addRecepient}
                    deleteRecepient={deleteRecepient}
                    setValidation={setValidation}
                    getTransactionFees={getTxFees}
                    setValidateReaping={setValidateReaping}
                    setListErrors={setListErrors}
                    setRecepientAmountError={setRecepientAmountError}
                    setRecepientAddressError={setRecepientAddressError}
                />
            ) : (
                <BatchConfirmView
                    recepientList={recepientList}
                    addressChangeHandler={addressChangeHandler}
                    amountChangeHandler={amountChangeHandler}
                    deleteRecepient={deleteRecepient}
                    sendTransaction={openAuthModal}
                    isButtonLoading={isButtonLoading}
                    getTotalAmount={getTotalAmount}
                    getTransactionFees={getTxFees}
                    existentialDeposit={existentialDeposit}
                />
            )}

            <AuthModal
                publicKey={publicKey}
                open={authScreenModal}
                handleClose={() => {
                    generalDispatcher(() => setAuthScreenModal(false));
                }}
                onConfirm={sendTransaction}
                functionType={
                    passwordSaved ? 'PasswordSaved' : 'PasswordNotSaved'
                }
                savePassword={savePassword}
                setSavePassword={setSavePassword}
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
        </Wrapper>
    );
};

export default BatchSend;
