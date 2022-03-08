import { options as AcalaOptions } from '@acala-network/api';
import type { ApiPromise as ApiPromiseType } from '@polkadot/api';
import { WsProvider, ApiPromise, Keyring } from '@polkadot/api';
import '@polkadot/api-augment';

import { encodeAddress } from '@polkadot/util-crypto';
import type { KeyringJson } from '@polkadot/ui-keyring/types';
import { formatBalance } from '@polkadot/util';
import constants from '../constants/onchain';

const { ACALA_MANDALA_CONFIG } = constants;
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
    } else {
        apiR = await ApiPromise.create({ provider });
    }
    return apiR;
};
const convertTransactionFee = (tokenName: string, fee: any): number => {
    console.log('Convert tx fee', tokenName, fee);
    const splitFee = fee.split(' ');
    console.log('Split fee', splitFee[0]);
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
): Promise<number> => {
    // console.log('Get balance service working');
    // await api.query.system.account(acc, ({ data: bal }) => {
    //     console.log(' New Balance ====>>> ', Number(bal.free) / 10 ** 18);
    // });

    const { data: balance }: any = await api.query.system.account(acc);
    const userBalance = formatBalance(balance.free, {
        decimals: api.registry.chainDecimals[0],
        forceUnit: '-',
        withUnit: false,
    });
    console.log('In service user balance', userBalance);
    console.log('In service user balance in float', parseFloat(userBalance));
    return parseFloat(userBalance);
};
// Get balance of a chain with multiple tokens
const getBalanceWithMultipleTokens = async (
    api: ApiPromiseType,
    account: string
): Promise<number> => {
    // eslint-disable-next-line no-useless-catch
    try {
        const { data: balances }: any = await Promise.all([
            api.query.timestamp.now(),
            api.query.system.account(account),
        ]);

        const userBalance = formatBalance(balances.free, {
            decimals: api.registry.chainDecimals[0],
            forceUnit: '-',
            withUnit: false,
        });
        return parseFloat(userBalance);
    } catch (err) {
        throw err;
    }
};
const getBalance = async (
    api: ApiPromiseType,
    account: string
): Promise<number> => {
    // const tokenLength = await api.registry.chainTokens.length;
    // if (tokenLength > 1) {
    //     const balance = await getBalanceWithMultipleTokens(api, account);
    //     return balance;
    // }
    const balance = await getBalanceWithSingleToken(api, account);
    return balance;
};
const getTransactionFee = async (
    api: ApiPromiseType,
    sender: string,
    recipient: string,
    amount: number,
    tokenName: string
): Promise<number> => {
    try {
        const decimalPlacesForTxFee: number = await api.registry
            .chainDecimals[0];
        const info = await api.tx.balances
            .transfer(sender, BigInt(amount * 10 ** decimalPlacesForTxFee))
            .paymentInfo(recipient);

        const txFee = await convertTransactionFee(
            tokenName,
            info.partialFee.toHuman()
        );

        console.log('txFee from common', txFee);

        return txFee;
    } catch (err) {
        console.log('error in getting tx fee', err);
        return 0;
    }
};

const addressMapper = (address: string, prefix: number): string =>
    encodeAddress(address, prefix);

export default {
    providerInitialization,
    getBalance,
    getSender,
    getTransactionFee,
    addressMapper,
    convertTransactionFee,
};
