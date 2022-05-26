import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { u8aToHex } from '@polkadot/util';
import { EventRecord } from '@polkadot/types/interfaces';

import { FixedPointNumber } from '@acala-network/sdk-core';

import { DASHBOARD } from '../../constants';

import SwapView from './view';
import { Token } from '../common/modals/selectToken/types';
import { WarningModal, AuthModal, SelectTokenModal } from '../common/modals';
import useDispatcher from '../../hooks/useDispatcher';
import useResponseModal from '../../hooks/useResponseModal';
import {
    setAuthScreenModal,
    setIsResponseModalOpen,
    setConfirmSendModal,
} from '../../redux/slices/modalHandling';

import { getSwapParams } from './swapCalculations';

import { accounts, images } from '../../utils';
import { getExistentialDepositConfig } from '../../utils/existentialDeposit';

import { RootState } from '../../redux/store';

import { addTransaction } from '../../redux/slices/transactions';

import services from '../../utils/services';

import { TransactionRecord } from '../../redux/types';

const { signTransaction, isPasswordSaved } = accounts;
const { UnsuccessCheckIcon, SuccessCheckPngIcon } = images;
const { getTxTransactionFee, addressMapper } = services;

const Swap: React.FunctionComponent = (): JSX.Element => {
    const generalDispatcher = useDispatcher();
    const navigate = useNavigate();
    const currentState = useSelector((state: RootState) => state);
    const { balances, publicKey, tokenImage } = currentState.activeAccount;
    const api = currentState.api.api as unknown as any;
    const { authScreenModal } = currentState.modalHandling;

    // States
    const [tokenList, setTokenList] = React.useState<Token[]>([]);
    const [selectTokenModalState, setSelectTokenModalState] = React.useState({
        open: false,
        tokenType: 'tokenFrom',
    });
    const [tokenFrom, setTokenFrom] = React.useState<Token>();
    const [tokenTo, setTokenTo] = React.useState<Token>();
    const [savePassword, setSavePassword] = React.useState(false);
    const [passwordSaved, setPasswordSaved] = React.useState(false);
    const [amountFrom, setAmountFrom] = React.useState('0');
    const [insufficientBalance, setInsufficientBalance] = React.useState(false);
    const [insufficientBalanceTx, setInsufficientBalanceTx] =
        React.useState(false);
    const [insufficientED, setInsufficientED] = React.useState(false);

    const [edforTokenFrom, setEdforTokenFrom] = React.useState(0);
    const [edforTokenTo, setEdforTokenTo] = React.useState(0);
    const [swapParams, setSwapParams] = React.useState({
        path: [],
        inputAmount: 0,
        outputAmount: 0,
        priceImpact: 0,
        tradingFee: 0,
    });
    const [isLoading, setIsLoading] = React.useState(false);

    const openResponseModalForTxFailed = useResponseModal({
        isOpen: true,
        modalImage: UnsuccessCheckIcon,
        mainText: 'Swap Transaction Failed!',
        subText: '',
    });

    const openResponseModalForTxSuccess = useResponseModal({
        isOpen: true,
        modalImage: SuccessCheckPngIcon,
        mainText: 'Swap Transaction Successful!',
        subText: '',
    });

    React.useEffect(() => {
        if (balances.length > 1) {
            if (!tokenFrom) setTokenFrom(balances[0]);
            if (!tokenTo) setTokenTo(balances[1]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [balances]);

    React.useEffect(() => {
        if (tokenFrom && tokenTo) {
            const TokenList = balances.filter((token) => {
                return (
                    token.name !== tokenFrom.name && token.name !== tokenTo.name
                );
            });
            setTokenList(TokenList);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tokenFrom, tokenTo]);

    React.useEffect(() => {
        isPasswordSaved(publicKey).then((res) => {
            setPasswordSaved(!res);
            setSavePassword(!res);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        if (api && tokenFrom && tokenTo && amountFrom) {
            getSwapParams(api, tokenFrom, tokenTo, amountFrom).then((res) => {
                setSwapParams(res);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [api, tokenFrom, tokenTo, amountFrom]);

    React.useEffect(() => {
        async function getED(): Promise<void> {
            const index = balances.findIndex(
                (obj) => obj.name === tokenFrom?.name
            );

            const decimalPlaces = api.registry.chainDecimals[index];

            let ED: number;
            if (!tokenFrom?.isNative) {
                ED = Number(
                    getExistentialDepositConfig(
                        api.runtimeChain.toString(),
                        tokenFrom?.name.toUpperCase()
                            ? tokenFrom?.name.toUpperCase()
                            : 'KAR'
                    )
                );
            } else {
                ED =
                    Number(
                        api?.consts?.balances?.existentialDeposit.toString()
                    ) /
                    10 ** decimalPlaces;
            }

            setEdforTokenFrom(ED);
        }
        getED();
    }, [tokenFrom]);

    React.useEffect(() => {
        async function getED(): Promise<void> {
            const index = balances.findIndex(
                (obj) => obj.name === tokenTo?.name
            );

            const decimalPlaces = api.registry.chainDecimals[index];

            let ED: number;
            if (!tokenTo?.isNative) {
                ED = Number(
                    getExistentialDepositConfig(
                        api.runtimeChain.toString(),
                        tokenTo?.name.toUpperCase()
                            ? tokenTo?.name.toUpperCase()
                            : 'KAR'
                    )
                );
            } else {
                ED =
                    Number(
                        api?.consts?.balances?.existentialDeposit.toString()
                    ) /
                    10 ** decimalPlaces;
            }

            setEdforTokenTo(ED);
        }
        getED();
    }, [tokenTo]);

    const handleOpen = (tokenType: string): void => {
        setSelectTokenModalState({
            open: true,
            tokenType,
        });
    };

    const handleClose = (): void => {
        setSelectTokenModalState({
            ...selectTokenModalState,
            open: false,
        });
    };

    const handleSelect = (token: Token): void => {
        if (selectTokenModalState.tokenType === 'tokenFrom')
            setTokenFrom(token);
        else {
            setTokenTo(token);
        }

        handleClose();
    };

    const handleCurrencySwitch = (): void => {
        const temp = tokenFrom;
        setTokenFrom(tokenTo);
        setTokenTo(temp);
    };

    const openAuthModal = (): void => {
        generalDispatcher(() => setAuthScreenModal(true));
    };

    const handleAmountChange = async (amount: string): Promise<void> => {
        setInsufficientBalanceTx(false);
        if (tokenFrom && tokenTo) {
            if (amount[0] === '0' && amount[1] === '0') {
                return;
            }
            if (amount.length < 14) {
                let decimalInStart = false;
                if (amount[0] === '.') {
                    // eslint-disable-next-line no-param-reassign
                    amount = `0${amount}`;
                    decimalInStart = true;
                }
                const reg = /^-?\d+\.?\d*$/;
                const test = reg.test(amount);

                if (!test && amount.length !== 0 && !decimalInStart) {
                    return;
                }

                if (Number(tokenFrom.balance) < Number(amount)) {
                    setInsufficientBalanceTx(true);
                }

                setAmountFrom(amount);
            }
        }
    };

    function truncate(number: number, index = 2): number {
        // cutting the number
        return +number
            .toString()
            .slice(0, number.toString().indexOf('.') + (index + 1));
    }

    const handleMaxClicked = async (): Promise<void> => {
        const decimals = tokenFrom?.decimal;

        const path = swapParams.path.map((token: any) => {
            return { TOKEN: token.name };
        });

        const supplyAmount = new FixedPointNumber(1, decimals);

        const slippage = '0x0';

        const tx = api.tx.dex.swapWithExactSupply(
            path,
            supplyAmount.toChainData(),
            slippage
        );

        const transactionFee = await getTxTransactionFee(
            tx,
            publicKey,
            balances[0].name
        );

        if (tokenFrom?.isNative) {
            handleAmountChange(
                truncate(
                    Number(tokenFrom.balance) -
                        (Number(transactionFee) +
                            Number(swapParams.tradingFee)),
                    4
                ).toString()
            );
        } else {
            handleAmountChange(
                truncate(Number(tokenFrom?.balance), 4).toString()
            );
        }
    };

    const EDandTxFeeValidation = async (): Promise<void> => {
        setInsufficientBalance(false);
        setInsufficientED(false);
        const decimals = tokenFrom?.decimal;

        const path = swapParams.path.map((token: any) => {
            return { TOKEN: token.name };
        });

        const supplyAmount = new FixedPointNumber(1, decimals);

        const slippage = '0x0';

        const tx = api.tx.dex.swapWithExactSupply(
            path,
            supplyAmount.toChainData(),
            slippage
        );

        const balanceForTokenFrom = tokenFrom?.balance ? tokenFrom.balance : 0;
        const balanceForTokenTo = tokenTo?.balance ? tokenTo.balance : 0;
        const transactionFee = await getTxTransactionFee(
            tx,
            publicKey,
            balances[0].name
        );

        if (tokenFrom?.isNative) {
            if (Number(amountFrom) + transactionFee > balanceForTokenFrom)
                setInsufficientBalance(true);
            else if (
                balanceForTokenFrom -
                    (Number(transactionFee) + Number(amountFrom)) <
                    edforTokenFrom ||
                balanceForTokenTo + Number(swapParams.outputAmount) <
                    edforTokenTo
            )
                setInsufficientED(true);
            else {
                openAuthModal();
            }
        } else {
            // eslint-disable-next-line no-lonely-if
            if (transactionFee > balances[0].balance)
                setInsufficientBalance(true);
            else if (
                balanceForTokenFrom - Number(amountFrom) < edforTokenFrom ||
                balanceForTokenTo + Number(swapParams.outputAmount) <
                    edforTokenTo
            )
                setInsufficientED(true);
            else {
                openAuthModal();
            }
        }
    };

    const handleSwap = async (
        address: string,
        password: string
    ): Promise<any> => {
        if (tokenFrom && tokenTo) {
            setIsLoading(true);
            try {
                const nonce = await api.rpc.system.accountNextIndex(publicKey);

                const decimals = tokenFrom.decimal;

                const path = swapParams.path.map((token: any) => {
                    return { TOKEN: token.name };
                });

                const supplyAmount = new FixedPointNumber(amountFrom, decimals);

                const slippage = '0x0';

                const tx = api.tx.dex.swapWithExactSupply(
                    path,
                    supplyAmount.toChainData(),
                    slippage
                );

                const signer = api.createType('SignerPayload', {
                    method: tx,
                    nonce,
                    genesisHash: api.genesisHash,
                    blockHash: api.genesisHash,
                    runtimeVersion: api.runtimeVersion,
                    version: api.extrinsicVersion,
                });

                const txPayload: any = api.createType(
                    'ExtrinsicPayload',
                    signer.toPayload(),
                    { version: api.extrinsicVersion }
                );

                const txU8a = txPayload.toU8a(true);

                let txHex;
                if (txU8a.length > 256) {
                    txHex = api.registry.hash(txU8a);
                } else {
                    txHex = u8aToHex(txU8a);
                }

                const signature = await signTransaction(
                    address,
                    password,
                    txHex.toString(),
                    'substrate',
                    false
                );

                await tx.addSignature(address, signature, txPayload);

                const transactionRecord: any = [
                    {
                        accountFrom: addressMapper(
                            address,
                            api.registry.chainSS58 as number
                        ),
                        accountTo: [
                            addressMapper(
                                address,
                                api.registry.chainSS58 as number
                            ),
                        ],
                        amount: [
                            Number(amountFrom),
                            Number(swapParams.outputAmount.toString()),
                        ],
                        hash: tx.hash.toString(),
                        operation: 'Swap',
                        chainName: api.runtimeChain.toString(),
                        tokenName: [tokenFrom.name, tokenTo.name],
                        transactionFee: '0',
                        timestamp: new Date().toString(),
                    },
                ];
                await tx
                    .send(({ status, events }: any) => {
                        const txResSuccess = events.filter(
                            ({ event }: EventRecord) =>
                                api?.events?.system?.ExtrinsicSuccess.is(event)
                        );
                        const txResFail = events.filter(
                            ({ event }: EventRecord) =>
                                api?.events?.system?.ExtrinsicFailed.is(event)
                        );
                        console.log(txResSuccess, 'yes');
                        if (status.isInBlock) {
                            if (txResFail.length >= 1) {
                                transactionRecord[0].status = 'Failed';
                                generalDispatcher(() =>
                                    addTransaction({
                                        transactions: transactionRecord,
                                        publicKey: address,
                                    })
                                );
                                console.log('from 1');
                                openResponseModalForTxFailed();
                                setTimeout(() => {
                                    generalDispatcher(() =>
                                        setIsResponseModalOpen(false)
                                    );
                                }, 2000);
                                generalDispatcher(() =>
                                    setConfirmSendModal(false)
                                );
                                setIsLoading(false);
                                navigate(DASHBOARD);
                            }
                            if (txResSuccess.length >= 1) {
                                transactionRecord[0].status = 'Success';
                                generalDispatcher(() =>
                                    addTransaction({
                                        transactions: transactionRecord,
                                        publicKey: address,
                                    })
                                );
                                console.log('from 2');
                                openResponseModalForTxSuccess();
                                setTimeout(() => {
                                    generalDispatcher(() =>
                                        setIsResponseModalOpen(false)
                                    );
                                }, 2000);
                                generalDispatcher(() =>
                                    setConfirmSendModal(false)
                                );
                                setIsLoading(false);
                                navigate(DASHBOARD);
                            }
                        }
                    })
                    .catch(() => {
                        console.log('from 3');
                        openResponseModalForTxFailed();
                        setTimeout(() => {
                            generalDispatcher(() =>
                                setIsResponseModalOpen(false)
                            );
                        }, 4000);
                        setIsLoading(false);
                        navigate(DASHBOARD);
                        return false;
                    });

                return tx;
            } catch (error) {
                console.log('swap transaction ==>>', error);
            }
        }

        return null;
    };

    const warningModalData = {
        open: insufficientED,
        handleClose: () => {
            setInsufficientED(false);
        },
        onConfirm: () => {
            setInsufficientED(false);
            openAuthModal();
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

        // eslint-disable-next-line no-nested-ternary
        mainText: 'Account Reaping',

        // eslint-disable-next-line no-nested-ternary
        subText: 'Swapping may cause to reap your one or both token balances',
    };

    return (
        <>
            <SwapView
                handleOpen={handleOpen}
                tokenFrom={tokenFrom as any}
                tokenTo={tokenTo as any}
                tokenImage={tokenImage}
                amountFrom={amountFrom}
                swapParams={swapParams}
                handleCurrencySwitch={handleCurrencySwitch}
                handleAmountChange={handleAmountChange}
                handleMaxClicked={handleMaxClicked}
                swapClickHandler={EDandTxFeeValidation}
                insufficientBalance={insufficientBalanceTx}
                isLoading={isLoading}
            />
            <SelectTokenModal
                open={selectTokenModalState.open}
                handleClose={handleClose}
                tokenList={tokenList}
                handleSelect={handleSelect}
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
            <AuthModal
                publicKey={publicKey}
                open={authScreenModal}
                handleClose={() => {
                    generalDispatcher(() => setAuthScreenModal(false));
                }}
                onConfirm={handleSwap}
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
            <WarningModal {...warningModalData} />
        </>
    );
};

export default Swap;
