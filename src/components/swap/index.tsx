import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { u8aToHex } from '@polkadot/util';
import { EventRecord } from '@polkadot/types/interfaces';
import { DASHBOARD } from '../../constants';

import SwapView from './view';
import SelectTokenModal from '../common/modals/selectToken';
import { Token } from '../common/modals/selectToken/types';
import { AuthModal } from '../common/modals';
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

const { signTransaction, isPasswordSaved } = accounts;
const { UnsuccessCheckIcon, SuccessCheckPngIcon } = images;
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
    const [edforTokenTo, setEdforTokenTo] = React.useState(0);
    const [edforTokenFrom, setEdforTokenFrom] = React.useState(0);
    const [savePassword, setSavePassword] = React.useState(false);
    const [passwordSaved, setPasswordSaved] = React.useState(false);
    const [amountFrom, setAmountFrom] = React.useState('0');
    const [insufficientBalance, setInsufficientBalance] = React.useState(false);

    const [swapParams, setSwapParams] = React.useState({
        path: [],
        inputAmount: 0,
        outputAmount: 0,
        priceImpact: 0,
        tradingFee: 0,
    });

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
            console.log(balances[1], 'img', balances);
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
        if (Object.keys(swapParams).length > 0) {
            console.log(
                'swap params input ===>>',
                swapParams.inputAmount.toString()
            );
            console.log(
                'swap params outputAmount ===>>',
                swapParams.outputAmount.toString()
            );
            console.log(
                'swap params priceImpact ===>>',
                swapParams.priceImpact.toString()
            );
            console.log(
                'swap params tradingFee ===>>',
                swapParams.tradingFee.toString()
            );
            console.log('swap params path ===>>', swapParams.path);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [swapParams]);

    React.useEffect(() => {
        isPasswordSaved(publicKey).then((res) => {
            setPasswordSaved(!res);
            setSavePassword(!res);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
        setInsufficientBalance(false);
        if (tokenFrom && tokenTo) {
            setAmountFrom(amount);

            const SwapParams = await getSwapParams(
                api,
                tokenFrom,
                tokenTo,
                amount
            );

            setSwapParams(SwapParams);
        }
    };
    const handleSubmit = (): void => {
        const transactionFee = 0.1;
        // validate tokenFrom balance
        const balanceForTokenFrom = tokenFrom?.balance ? tokenFrom?.balance : 0;
        const balanceForTokenTo = tokenTo?.balance ? tokenTo?.balance : 0;
        if (Number(amountFrom) > balanceForTokenFrom) {
            setInsufficientBalance(true);
            return;
        }
        if (
            balanceForTokenFrom - transactionFee - Number(amountFrom) <
            edforTokenFrom
        ) {
            console.log(
                'ed is less, your tokens might get reaped',
                edforTokenFrom
            );
        }
    };
    const handleSwap = async (
        address: string,
        password: string
    ): Promise<any> => {
        if (tokenFrom && tokenTo) {
            try {
                const nonce = await api.rpc.system.accountNextIndex(address);

                const decimals = tokenFrom.decimal;

                const path = swapParams.path.map((token: any) => {
                    return { TOKEN: token.name };
                });

                const supplyAmount = Number(amountFrom) * 10 ** decimals;

                const slippage = '0x0';

                const tx = api.tx.dex.swapWithExactSupply(
                    path,
                    supplyAmount,
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
                    txHex,
                    'substrate',
                    false
                );

                await tx.addSignature(address, signature, txPayload);

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
                        if (status.isInBlock) {
                            if (txResFail.length >= 1) {
                                console.log('from 1');
                                openResponseModalForTxSuccess();
                                setTimeout(() => {
                                    generalDispatcher(() =>
                                        setIsResponseModalOpen(false)
                                    );
                                }, 2000);
                                generalDispatcher(() =>
                                    setConfirmSendModal(false)
                                );

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
                                generalDispatcher(() =>
                                    setConfirmSendModal(false)
                                );
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
                swapClickHandler={openAuthModal}
                insufficientBalance={insufficientBalance}
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
        </>
    );
};

export default Swap;
