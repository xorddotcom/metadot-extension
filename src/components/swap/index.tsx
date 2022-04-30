import React from 'react';

import { useSelector } from 'react-redux';
import type { ApiPromise as ApiPromiseType } from '@polkadot/api';
import { Token as SDKToken } from '@acala-network/sdk-core/token';
import { FixedPointNumber } from '@acala-network/sdk-core';
import { TradeGraph } from '@acala-network/sdk-swap';

import { ApiPromise, WsProvider } from '@polkadot/api';
import { options } from '@acala-network/api';
import SwapView from './view';
import SelectTokenModal from '../common/modals/selectToken';
import { Token } from '../common/modals/selectToken/types';
import { AuthModal } from '../common/modals';
import useDispatcher from '../../hooks/useDispatcher';

import {
    setAuthScreenModal,
    setIsResponseModalOpen,
    setConfirmSendModal,
} from '../../redux/slices/modalHandling';
import { images, accounts } from '../../utils';

import { RootState } from '../../redux/store';

const { signTransaction, isPasswordSaved } = accounts;

class TokenPair {
    token1;

    token2;

    origin;

    static fromCurrencies(currency1: any, currency2: any): any {
        return new TokenPair(
            SDKToken.fromCurrencyId(currency1),
            SDKToken.fromCurrencyId(currency2)
        );
    }

    constructor(token1: any, token2: any) {
        const [_token1, _token2] = SDKToken.sort(token1, token2);

        this.token1 = _token1;
        this.token2 = _token2;
        this.origin = [token1, token2];
    }

    getOrigin(): any {
        return this.origin;
    }

    getPair(): any {
        return [this.token1, this.token2];
    }

    isEqual(pair: any, compare: any): any {
        return (
            pair.token1.isEqual(this.token1, compare) &&
            pair.token2.isEqual(this.token2, compare)
        );
    }

    toChainData(): any {
        return [this.token1.toChainData(), this.token2.toChainData()];
    }

    toTradingPair(api: any): any {
        return api.registry.createType(
            'AcalaPrimitivesTradingPair',
            this.toChainData()
        );
    }
}

const Swap: React.FunctionComponent = (): JSX.Element => {
    const generalDispatcher = useDispatcher();
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

    const [swapParams, setSwapParams] = React.useState<any>({});

    React.useEffect(() => {
        if (balances.length > 1) {
            if (!tokenFrom) setTokenFrom(balances[0] as any);
            if (!tokenTo) setTokenTo(balances[1] as any);
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
            setTokenList(TokenList as any);
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

    const openAuthModal = (): void => {
        generalDispatcher(() => setAuthScreenModal(true));
    };

    const getTokenPairsFromPath = (path: any): any => {
        const temp = path.slice(); // push undefined as tail sentinel

        temp.push(undefined);
        return temp.reduce((acc: any, cur: any, current: any) => {
            if (!cur || !temp[current + 1]) return acc;
            acc.push(new TokenPair(cur, temp[current + 1]));
            return acc;
        }, []);
    };

    const sortLiquidityPoolWithTokenOrder = (pool: any, token1: any): any => {
        return pool.token1.isEqual(token1)
            ? [pool.balance1, pool.balance2]
            : [pool.balance2, pool.balance1];
    };

    const getTargetAmount = (
        supplyPool: any,
        targetPool: any,
        supplyAmount: any,
        exchangeFee: any
    ): any => {
        // console.log(
        //     'supplyPool targetPool supplyAmount exchangeFee ==>>',
        //     supplyPool.toString(),
        //     targetPool.toString(),
        //     supplyAmount.toString(),
        //     exchangeFee
        // );

        const amountRatio =
            +targetPool.toString() /
            10 ** 12 /
            (+supplyPool.toString() / 10 ** 12);

        console.log('amount Ratio ==>>', amountRatio);

        const supplyAmountAfterFees =
            Number(supplyAmount.toString()) -
            Number((Number(supplyAmount.toString()) * exchangeFee) / 100);

        console.log(
            'output amount test ==>>',
            supplyAmount.toString(),
            exchangeFee,
            supplyAmountAfterFees,
            amountRatio * supplyAmountAfterFees
        );

        return new FixedPointNumber(amountRatio * supplyAmountAfterFees);

        // if (supplyAmount.isZero() || supplyPool.isZero() || targetPool.isZero())
        //     return FixedPointNumber.ZERO;
        // const supplyAmountWithFee = supplyAmount.times(
        //     exchangeFee.denominator.minus(exchangeFee.numerator)
        // );
        // const numerator = supplyAmountWithFee.times(targetPool);
        // const denominator = supplyPool
        //     .times(exchangeFee.denominator)
        //     .plus(supplyAmountWithFee);
        // if (denominator.isZero()) return FixedPointNumber.ZERO;
        // return numerator.div(denominator);
    }; // get how much supply amount will be paid for specific target amount

    const calculateMidPrice = (path: any, pools: any): any => {
        const prices = [];

        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < path.length - 1; i++) {
            const pair = new TokenPair(path[i], path[i + 1]);
            const [token1, token2] = pair.getPair();
            const pool = pools.find(
                (item: any) =>
                    item.token1.isEqual(token1) && item.token2.isEqual(token2)
            );

            const [balance1, balance2] = sortLiquidityPoolWithTokenOrder(
                pool,
                path[i]
            );
            prices.push(balance2.div(balance1));
        }

        return prices.slice(1).reduce((acc, cur) => {
            return acc.times(cur);
        }, prices[0]);
    };

    const calculatePriceImpact = (
        midPrice: any,
        inputAmount: any,
        outputAmount: any
    ): any => {
        const temp = midPrice.times(inputAmount);
        return temp.minus(outputAmount).div(temp);
    };

    const handleAmountChange = async (amount: string): Promise<void> => {
        if (tokenFrom && tokenTo) {
            setAmountFrom(amount);

            const result = await api.query.dex.tradingPairStatuses.entries();

            const tradingPairs = result
                .filter((_ref: any) => {
                    const [, status] = _ref;
                    return status.isEnabled;
                })
                .map((item: any) =>
                    TokenPair.fromCurrencies(
                        item[0].args[0][0],
                        item[0].args[0][1]
                    )
                )
                .filter(
                    (pair: any) =>
                        !pair.token1.name.includes('//') &&
                        !pair.token2.name.includes('//')
                );
            console.log('tradingPairs', tradingPairs);

            const tradeGraph = new TradeGraph(tradingPairs);
            console.log('tradeGraph', tradeGraph);

            const tradingPaths = tradeGraph.getPathes(
                SDKToken.fromCurrencyId(tokenFrom.name as any),
                SDKToken.fromCurrencyId(tokenTo.name as any),
                3
            );
            console.log('tradingPaths', tradingPaths);

            const tokenPairFromPaths = tradingPaths
                .reduce((acc: any, path) => {
                    // eslint-disable-next-line no-param-reassign
                    acc = acc.concat(getTokenPairsFromPath(path));
                    return acc;
                }, [])
                .reduce((acc: any, cur: any) => {
                    const isExist = acc.find((item: any) => item.isEqual(cur));
                    if (isExist) return acc;
                    acc.push(cur);
                    return acc;
                }, []);

            console.log('tokenPairFromPaths', tokenPairFromPaths);

            const liquidityPoolsFromTokenPairs = await api.queryMulti(
                tokenPairFromPaths.map((item: any) => [
                    api.query.dex.liquidityPool,
                    item.toTradingPair(api),
                ])
            );
            console.log(
                'liquidityPoolsFromTokenPairs',
                liquidityPoolsFromTokenPairs
            );

            const LiqPoolsWithTokens = tokenPairFromPaths.map(
                (item: any, index: any) => {
                    const liquidity = liquidityPoolsFromTokenPairs[index];
                    const pair = item.getPair();
                    return {
                        token1: pair[0],
                        token2: pair[1],
                        balance1: FixedPointNumber.fromInner(
                            liquidity[0].toString()
                        ),
                        balance2: FixedPointNumber.fromInner(
                            liquidity[1].toString()
                        ),
                    };
                }
            );
            console.log('LiqPoolsWithTokens', LiqPoolsWithTokens);

            const swapResults = tradingPaths.map((path) => {
                const swapResult = {
                    path,
                    inputAmount: new FixedPointNumber(
                        amount,
                        tokenFrom.decimal
                    ),
                    outputAmount: FixedPointNumber.ZERO,
                    priceImpact: 0,
                    tradingFee: 0,
                };

                // eslint-disable-next-line no-plusplus
                for (let i = 0; i < path.length - 1; i++) {
                    const pair = new TokenPair(path[i], path[i + 1]);
                    const [token1, token2] = pair.getPair();
                    const pool = LiqPoolsWithTokens.find(
                        (item: any) =>
                            item.token1.isEqual(token1) &&
                            item.token2.isEqual(token2)
                    );

                    console.log('pool bhai ==>>', pool);

                    const [supply, target] = sortLiquidityPoolWithTokenOrder(
                        pool,
                        path[i]
                    );

                    console.log('supply target bhai ==>>', supply, target);

                    const exchangeFee = api.consts.dex.getExchangeFee;

                    const fee = Number(
                        (exchangeFee[0].toString() * 100) /
                            exchangeFee[1].toString()
                    );

                    const outputAmount = getTargetAmount(
                        supply,
                        target,
                        i === 0
                            ? swapResult.inputAmount
                            : swapResult.outputAmount,
                        fee
                    );
                    swapResult.outputAmount = outputAmount;
                    swapResult.tradingFee =
                        swapResult.tradingFee + i === 0
                            ? (Number(swapResult.inputAmount.toString()) *
                                  fee) /
                              100
                            : (Number(swapResult.outputAmount.toString()) *
                                  fee) /
                              100;
                }

                const midPrice = calculateMidPrice(path, LiqPoolsWithTokens);
                swapResult.priceImpact = calculatePriceImpact(
                    midPrice,
                    swapResult.inputAmount,
                    swapResult.outputAmount
                );

                return swapResult;
            });

            console.log('swapResults ==>>', swapResults);

            const bestSwapResult = swapResults.reduce(function (prev, current) {
                return prev.outputAmount > current.outputAmount
                    ? prev
                    : current;
            });

            setSwapParams(bestSwapResult);
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

                console.log('address, password, path', address, password, path);

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

                const txHex = txPayload.toU8a(true);

                console.log('txhex ==>', txHex);

                const signature = await signTransaction(
                    address,
                    password,
                    txHex,
                    'substrate',
                    false
                );

                // const { signature } = response;

                console.log('signature ==>>', signature);

                await tx.addSignature(address, signature, txPayload);

                await tx.send(({ status, events }: any) => {
                    console.log(status);
                });

                return tx;
            } catch (error) {
                console.log('swap transaction ==>>', error);
            }
        }

        return null;
    };

    return (
        <>
            <SwapView
                handleOpen={handleOpen}
                tokenFrom={tokenFrom as any}
                tokenTo={tokenTo as any}
                tokenImage={tokenImage}
                amountFrom={amountFrom}
                handleAmountChange={handleAmountChange}
                swapClickHandler={openAuthModal}
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
