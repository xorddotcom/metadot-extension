import React from 'react';

import { useSelector } from 'react-redux';
import type { ApiPromise as ApiPromiseType } from '@polkadot/api';
import { Token as SDKToken } from '@acala-network/sdk-core/token';
import { TradeGraph } from '@acala-network/sdk-swap';
import { WalletPromise } from '@acala-network/sdk-wallet';
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
        }
    };

    const handleSwap = async (
        address: string,
        password: string
    ): Promise<any> => {
        if (tokenFrom && tokenTo) {
            const nonce = await api.rpc.system.accountNextIndex(address);

            const decimals = tokenFrom.decimal;

            const supplyAmount = Number(amountFrom) * 10 ** decimals;
            const path = [
                {
                    TOKEN: tokenFrom.name,
                },
                {
                    TOKEN: tokenTo.name,
                },
            ];

            const minTargetAmount = '0x0';

            const tx = api.tx.dex.swapWithExactSupply(
                path,
                supplyAmount,
                minTargetAmount
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

            const response = await signTransaction(
                address,
                password,
                txHex,
                'substrate',
                false
            );

            const { signature } = response;

            tx.addSignature(address, signature, txPayload);

            return tx;
        }
        return null;
    };

    return (
        <>
            <SwapView
                handleOpen={handleOpen}
                tokenFrom={tokenFrom}
                tokenTo={tokenTo}
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
