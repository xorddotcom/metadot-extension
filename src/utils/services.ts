import { options as AcalaOptions } from '@acala-network/api';
import type { ApiPromise as ApiPromiseType } from '@polkadot/api';
import { WsProvider, ApiPromise, Keyring } from '@polkadot/api';

import '@polkadot/api-augment';

import type { KeyringJson } from '@polkadot/ui-keyring/types';
import {
    OverrideBundleDefinition,
    OverrideBundleType,
} from '@polkadot/types/types';
import { hexToU8a, isHex } from '@polkadot/util';
import { decodeAddress, encodeAddress } from '@polkadot/keyring';
import constants from '../constants/onchain';

import { RecepientInterface } from './types';
import images from './images';

const allTokenImages = images;

const { ACALA_MANDALA_CONFIG, CONTEXTFREE_CONFIG } = constants;

const automata: OverrideBundleDefinition = {
    types: [
        {
            // on all versions
            minmax: [0, undefined],
            types: {
                ResourceId: '[u8; 32]',
                DepositNonce: 'u64',
                ProposalStatus: {
                    _enum: ['Initiated', 'Approved', 'Rejected'],
                },
                ProposalVotes: {
                    votes_for: 'Vec<AccountId>',
                    votes_against: 'Vec<AccountId>',
                    status: 'ProposalStatus',
                },
                BridgeTokenId: 'U256',
                BridgeChainId: 'u8',
                VestingPlan: {
                    start_time: 'u64',
                    cliff_duration: 'u64',
                    total_duration: 'u64',
                    interval: 'u64',
                    initial_amount: 'Balance',
                    total_amount: 'Balance',
                    vesting_during_cliff: 'bool',
                },
            },
        },
    ],
};

const spec: Record<string, OverrideBundleDefinition> = {
    contextfree: automata,
};

const typesBundle: OverrideBundleType = { spec };

const getSender = async (seed: string): Promise<KeyringJson> => {
    const keyring = new Keyring({ type: 'sr25519' });
    const sender = await keyring.addFromUri(seed);
    return sender;
};
const providerInitialization = async (rpc: string): Promise<ApiPromiseType> => {
    const provider = new WsProvider(rpc);
    let apiR;
    if (rpc === ACALA_MANDALA_CONFIG.rpcUrl) {
        apiR = await ApiPromise.create(AcalaOptions({ provider }));
    } else if (rpc === CONTEXTFREE_CONFIG.rpcUrl) {
        apiR = await ApiPromise.create(AcalaOptions({ provider, typesBundle }));
    } else {
        apiR = await ApiPromise.create({ provider });
    }
    return apiR;
};
const convertTransactionFee = (tokenName: string, fee: any): number => {
    const splitFee = fee.split(' ');
    if (tokenName === 'KSM') {
        return Number((splitFee[0] * 10 ** -6).toFixed(4));
    }
    if (tokenName === 'PLD') {
        return splitFee[0];
    }
    return Number((splitFee[0] * 10 ** -3).toFixed(4));
};

const getBalanceWithSingleToken = async (
    api: ApiPromiseType,
    acc: string
): Promise<any> => {
    const balance: any = await api?.query?.system?.account(acc);
    let transferableBalance = 0;
    const decimalPlace = api?.registry?.chainDecimals[0];

    if (balance?.data) {
        const balancesKeys: string[] = Object.keys(balance?.data);
        const balancesValues: string[] = Object.values(balance?.data);
        const balancesObject: any = {};
        balancesValues.map((singleData, index) => {
            const newRes = Number(singleData.toString()) / 10 ** decimalPlace;
            balancesObject[balancesKeys[index]] = newRes;
            return true;
        });
        transferableBalance =
            Number(balancesObject.free) - Number(balancesObject.miscFrozen);
    }

    const tokenName = api?.registry?.chainTokens[0];
    const tokenImage = allTokenImages[tokenName];

    const data = {
        name: tokenName,
        balance: transferableBalance,
        isNative: true,
        decimal: decimalPlace,
        tokenImage,
    };

    return data;
    // return transferableBalance;
};

const fetchBalanceWithMultipleTokens = async (
    api: any,
    account: string
): Promise<any> => {
    let allBalances: any[] = [];
    try {
        const allTokens = api?.registry?.chainTokens;
        const allDecimals = api?.registry?.chainDecimals;
        await allTokens.map(
            async (singleToken: any, index: number): Promise<boolean> => {
                if (index === 0) {
                    const balance: any = await api?.query?.system?.account(
                        account
                    );
                    const data = {
                        name: allTokens[0],
                        balance: balance.data.free / 10 ** allDecimals[0],
                        isNative: true,
                        decimal: allDecimals[0],
                    };
                    allBalances = [...allBalances, data];
                }
                await api?.query?.tokens?.accounts(
                    account,
                    { Token: singleToken },
                    (result: any) => {
                        const data = {
                            name: singleToken,
                            balance:
                                result.free.toString() /
                                10 ** allDecimals[index],
                            isNative: false,
                            decimal: allDecimals[index],
                        };
                        allBalances = [...allBalances, data];
                        // allBalances.push(data);
                        return true;
                    }
                );
                return true;
            }
        );
        // const balance: any = await api?.query?.system?.account(account);
        // if (balance?.data) counter += 1;
        // allBalances[0] = {
        //     name: allTokens[0],
        //     balance: balance.data.free / 10 ** allDecimals[0],
        //     isNative: true,
        //     decimal: allDecimals[0],
        // };

        return allBalances;
    } catch (err) {
        console.log('Error', err);
        return false;
    }
};

const multipleTokens = async (
    api: ApiPromiseType,
    publicKey: string
): Promise<any> => {
    const tokens = api?.registry?.chainTokens;
    const decimals = api?.registry?.chainDecimals;

    const nativeBalance = await getBalanceWithSingleToken(api, publicKey);
    const balancesArray: any[] = [];
    const promises: any[] = [];
    async function fetchTokens(): Promise<any> {
        tokens.map(async (token: any, index: number) => {
            api?.query?.tokens?.accounts(
                publicKey,
                { Token: token },
                (res: any) => {
                    balancesArray.push({
                        name: token,
                        balance: res.free.toString() / 10 ** decimals[index],
                    });
                }
            );

            promises.push(
                api?.query?.tokens?.accounts(publicKey, { Token: token })
            );

            return true;
        });
        const res = await Promise.all(promises);
        const res2: any[] = [];
        res.map(async (singleToken: any, i: number): Promise<any> => {
            if (i === 0) {
                // const data = {
                //     name: tokens[0],
                //     balance: nativeBalance,
                //     isNative: true,
                //     decimal: decimals[i],
                // };
                res2[0] = nativeBalance;
            } else {
                const tokenImage = allTokenImages[tokens[i]];
                res2.push({
                    name: tokens[i],
                    balance: singleToken.free / 10 ** decimals[i],
                    isNative: false,
                    decimal: decimals[i],
                    tokenImage,
                });
            }
            return true;
        });
        return res2;
    }
    const val = await fetchTokens();
    return val;
};

const getBalance = async (
    api: ApiPromiseType,
    account: string
): Promise<number> => {
    const chainTokens = api?.registry?.chainTokens;

    if (chainTokens?.length > 1) {
        const balance = await multipleTokens(api, account);
        return balance;
    }
    const balance = await getBalanceWithSingleToken(api, account);
    const balanceArray: any = [];
    balanceArray.push(balance);
    return balanceArray;
};
const getTransactionFee = async (
    api: ApiPromiseType,
    sender: string,
    recipient: string,
    amount: number,
    tokenName: string
): Promise<number> => {
    try {
        const decimals = api?.registry?.chainDecimals[0];
        const info = await api?.tx?.balances
            ?.transfer(sender, BigInt(amount * 10 ** decimals))
            ?.paymentInfo(recipient);

        const txFee = await convertTransactionFee(
            tokenName,
            info.partialFee.toHuman()
        );
        return txFee;
    } catch (err) {
        return 0;
    }
};

const getBatchTransactionFee = async (
    api: ApiPromiseType,
    sender: string,
    recepientList: any,
    tokenName: string
): Promise<number> => {
    try {
        const decimals = api?.registry?.chainDecimals[0];
        const txs = recepientList.map((recepient: any) => {
            return api.tx.balances.transfer(
                recepient.address,
                BigInt(Number(recepient.amount) * 10 ** decimals)
            );
        });

        const info = await api?.tx?.utility?.batch(txs)?.paymentInfo(sender);

        const txFee = await convertTransactionFee(
            tokenName,
            info.partialFee.toHuman()
        );
        return txFee;
    } catch (err) {
        return 0;
    }
};

const getTxTransactionFee = async (
    tx: any,
    sender: any,
    tokenName: any
): Promise<number> => {
    try {
        const info = await tx.paymentInfo(sender);

        const txFee = convertTransactionFee(
            tokenName,
            info.partialFee.toHuman()
        );
        return txFee;
    } catch (err) {
        return 0;
    }
};

const addressMapper = (address: string, prefix: number): string =>
    encodeAddress(address, prefix);

const isValidAddressPolkadotAddress = (address: string): boolean => {
    try {
        encodeAddress(
            isHex(address) ? hexToU8a(address) : decodeAddress(address)
        );
        return true;
    } catch (err) {
        console.log('catch', err);
        return false;
    }
};

const getBalancesForBatch = async (
    api: ApiPromiseType,
    recepient: RecepientInterface[]
): Promise<number[]> => {
    const queries = recepient.map((rec) => {
        console.log(api.registry.chainTokens[0], 'token dekho podina');
        console.log(rec.token, 'token dekho podina');
        if (api.registry.chainTokens[0] === rec.token) {
            return [api.query.system.account, rec.address];
        }
        return [
            api.query.tokens.accounts,
            [
                rec.address,
                {
                    Token: rec.token,
                },
            ],
        ];
    });

    const result = await api.queryMulti(queries as any);
    console.log('result ==>>', result);
    const balances = result.map((item: any, index: number) => {
        const free = item.data ? item.data.free : item.free;
        return (
            free /
            10 **
                api.registry.chainDecimals[
                    api.registry.chainTokens.indexOf(recepient[index].token)
                ]
        );
    });

    return balances;
};

export default {
    getBalanceWithSingleToken,
    providerInitialization,
    getBalance,
    getSender,
    getTransactionFee,
    getBatchTransactionFee,
    getTxTransactionFee,
    addressMapper,
    convertTransactionFee,
    fetchBalanceWithMultipleTokens,
    getBalancesForBatch,
    isValidAddressPolkadotAddress,
};
