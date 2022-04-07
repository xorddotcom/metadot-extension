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
} from '../../redux/slices/modalHandling';

const { ToggleOn, UnsuccessCheckIcon, SuccessCheckPngIcon } = images;
const { getTransactionFee } = services;
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
        { amount: '0.001', address: 'abc' },
        { amount: '0.002', address: 'xyz' },
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
        setRecepientList([...recepientList]);
    };

    const amountChangeHandler = (value: string, index: number): void => {
        const newState = [...recepientList];
        newState[index].amount = value;
        setRecepientList([...recepientList]);
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
        setRecepientList([...recepientList]);
    };

    const getTxFees = async (amount: string): Promise<number> => {
        const estimatedTxFee = await getTransactionFee(
            api,
            publicKey,
            publicKey,
            Number(amount),
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

    return (
        <Wrapper width="88%">
            <Header
                centerText="Batch"
                overWriteBackHandler={step === 1 ? () => setStep(0) : undefined}
            />
            <HorizontalContentDiv
                justifyContent="flex-end"
                onClick={handleSendSwitch}
                marginTop="28px"
            >
                <SubHeading>Batch Transaction</SubHeading>
                <img
                    src={ToggleOn}
                    alt="Toggle"
                    style={{ marginLeft: '10px' }}
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
