import { Token as SDKToken } from '@acala-network/sdk-core/token';
import { FixedPointNumber } from '@acala-network/sdk-core';
import { TradeGraph } from '@acala-network/sdk-swap';

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
    const amountRatio =
        +targetPool.toString() / 10 ** 12 / (+supplyPool.toString() / 10 ** 12);

    const supplyAmountAfterFees =
        Number(supplyAmount.toString()) -
        Number((Number(supplyAmount.toString()) * exchangeFee) / 100);

    return new FixedPointNumber(amountRatio * supplyAmountAfterFees);
};

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

export const getSwapParams = async (
    api: any,
    tokenFrom: any,
    tokenTo: any,
    amount: any
): Promise<any> => {
    const result = await api.query.dex.tradingPairStatuses.entries();

    const tradingPairs = result
        .filter((_ref: any) => {
            const [, status] = _ref;
            return status.isEnabled;
        })
        .map((item: any) =>
            TokenPair.fromCurrencies(item[0].args[0][0], item[0].args[0][1])
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
    console.log('liquidityPoolsFromTokenPairs', liquidityPoolsFromTokenPairs);

    const LiqPoolsWithTokens = tokenPairFromPaths.map(
        (item: any, index: any) => {
            const liquidity = liquidityPoolsFromTokenPairs[index];
            const pair = item.getPair();
            return {
                token1: pair[0],
                token2: pair[1],
                balance1: FixedPointNumber.fromInner(liquidity[0].toString()),
                balance2: FixedPointNumber.fromInner(liquidity[1].toString()),
            };
        }
    );
    console.log('LiqPoolsWithTokens', LiqPoolsWithTokens);

    const swapResults = tradingPaths.map((path) => {
        const swapResult = {
            path,
            inputAmount: new FixedPointNumber(amount, tokenFrom.decimal),
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
                    item.token1.isEqual(token1) && item.token2.isEqual(token2)
            );

            console.log('pool bhai ==>>', pool);

            const [supply, target] = sortLiquidityPoolWithTokenOrder(
                pool,
                path[i]
            );

            console.log('supply target bhai ==>>', supply, target);

            const exchangeFee = api.consts.dex.getExchangeFee;

            const fee = Number(
                (exchangeFee[0].toString() * 100) / exchangeFee[1].toString()
            );

            const outputAmount = getTargetAmount(
                supply,
                target,
                i === 0 ? swapResult.inputAmount : swapResult.outputAmount,
                fee
            );
            swapResult.outputAmount = outputAmount;
            swapResult.tradingFee =
                swapResult.tradingFee + i === 0
                    ? (Number(swapResult.inputAmount.toString()) * fee) / 100
                    : (Number(swapResult.outputAmount.toString()) * fee) / 100;
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
        return prev.outputAmount > current.outputAmount ? prev : current;
    });

    return bestSwapResult;
};
