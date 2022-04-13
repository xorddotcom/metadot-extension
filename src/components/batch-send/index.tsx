import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

import { images, accounts } from '../../utils';
import services from '../../utils/services';

import { Recepient } from './types';
import { RootState } from '../../redux/store';

import { AuthModal } from '../common/modals';
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
    const generalDispatcher = useDispatcher();
    const currReduxState = useSelector((state: RootState) => state);
    const api = currReduxState.api.api as unknown as ApiPromiseType;
    const { authScreenModal } = currReduxState.modalHandling;
    const { publicKey, tokenName } = currReduxState.activeAccount;

    const [step, setStep] = React.useState(0);
    const [recepientList, setRecepientList] = React.useState<Recepient[]>([
        { amount: '', address: '' },
        { amount: '', address: '' },
    ]);
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
        navigate(SEND);
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

    const deleteRecepient = (index: number): void => {
        const newState = [...recepientList];
        newState.splice(index, 1);
        setRecepientList(newState);
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
        // newState[index].validateReaping = false;
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
        setIsButtonLoading(true);
        console.log('sending transaction ==>>', recepientList);
        const txs = recepientList.map((recepient) => {
            return api.tx.balances.transfer(
                recepient.address,
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
                const txResSuccess = events.filter(({ event }: EventRecord) =>
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

    return (
        <Wrapper width="89%">
            <Header
                centerText="Send"
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
                    style={{ marginLeft: '10px' }}
                    aria-hidden
                    onClick={handleSendSwitch}
                />
            </HorizontalContentDiv>
            {step === 0 ? (
                <BatchCreateView
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
