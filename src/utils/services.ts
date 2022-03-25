import { options as AcalaOptions } from '@acala-network/api';
import type { ApiPromise as ApiPromiseType } from '@polkadot/api';
import { WsProvider, ApiPromise, Keyring } from '@polkadot/api';
import '@polkadot/api-augment';

import { encodeAddress } from '@polkadot/util-crypto';
import type { KeyringJson } from '@polkadot/ui-keyring/types';
import { formatBalance } from '@polkadot/util';
import {
    OverrideBundleDefinition,
    OverrideBundleType,
} from '@polkadot/types/types';
import constants from '../constants/onchain';

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
    if (balance?.data) {
        const balancesKeys: string[] = Object.keys(balance?.data);
        const balancesValues: string[] = Object.values(balance?.data);
        const balancesObject: any = {};
        const decimalPlace = api?.registry?.chainDecimals[0];
        balancesValues.map((singleData, index) => {
            const newRes = Number(singleData.toString()) / 10 ** decimalPlace;
            balancesObject[balancesKeys[index]] = newRes;
            return true;
        });
        transferableBalance =
            Number(balancesObject.free) - Number(balancesObject.miscFrozen);
    }
    return transferableBalance;
};

// Get balance of a chain with multiple tokens
const getBalanceWithMultipleTokens = async (
    api: ApiPromiseType,
    account: string
): Promise<number> => {
    // eslint-disable-next-line no-useless-catch
    try {
        const { data: balances }: any = await Promise.all([
            api?.query?.timestamp.now(),
            api?.query?.system?.account(account),
        ]);

        const userBalance = formatBalance(balances.free, {
            decimals: api?.registry?.chainDecimals[0],
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
