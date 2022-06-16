import constants from '../../constants/onchain';
import { NetworkConfigType } from './types';
import { images } from '../../utils';

const { TestNetIcon } = images;

const {
    POLKADOT_CONFIG,
    KUSAMA_CONFIG,
    SHIDEN_CONFIG,
    KARURA_CONFIG,
    WESTEND_CONFIG,
    SHIBUYA_CONFIG,
    CONTEXTFREE_CONFIG,
    ASTAR_CONFIG,
    ACALA_CONFIG,
    BIFROST_STAGE_TESTNET_CONFIG,
    BIFROST_KUSAMA_CONFIG,
} = constants;

const availableNetworks: NetworkConfigType[] = [
    { ...POLKADOT_CONFIG },
    { ...KUSAMA_CONFIG },
    {
        name: 'Test Networks',
        logo: TestNetIcon,
        moreOptions: true,
        queryEndpoint: 'xyz',
        tokenName: 'test',
        rpcUrl: 'xyz',
        relayChain: true,
    },
];

const PolkadotMainNetworks: NetworkConfigType[] = [
    { ...POLKADOT_CONFIG },
    { ...ASTAR_CONFIG },
    { ...ACALA_CONFIG },
    // { ...UNIQUE_CONFIG },
];

const KusamaMainNetworks: NetworkConfigType[] = [
    { ...KUSAMA_CONFIG },
    { ...KARURA_CONFIG },
    { ...SHIDEN_CONFIG },
    { ...BIFROST_KUSAMA_CONFIG },
];

const TestNetworks: NetworkConfigType[] = [
    { ...WESTEND_CONFIG },
    { ...CONTEXTFREE_CONFIG },
    { ...SHIBUYA_CONFIG },
    { ...BIFROST_STAGE_TESTNET_CONFIG },
];

export default {
    availableNetworks,
    PolkadotMainNetworks,
    KusamaMainNetworks,
    TestNetworks,
};
