/* eslint-disable max-len */
import images from '../utils/images';
import { NetworkConfig } from './types';

const {
    KusamaIcon,
    KaruraIcon,
    MoonriverIcon,
    ShidenIcon,
    PhalaIcon,
    BifrostIcon,
    dusty,
    contextFree,
    polkadot,
    westendColour,
    acala,
    bitcountry,
    rococoIcon,
    astarIcon,
    shibuyaIcon,
    AcalaIcon,
    ACA,
} = images;

const POLKADOT_CONFIG: NetworkConfig = {
    name: 'Polkadot',
    tokenName: 'DOT',
    queryEndpoint:
        'https://api.subquery.network/sq/XORD-one/metadot-subql-polkadot',
    logo: polkadot,
    rpcUrl: 'wss://rpc.polkadot.io',
    // EXISTENTIAL_DEPOSIT: 1,
    // prefix: 0,
    relayChain: true,
    disabled: false,
    explorer: 'https://polkadot.subscan.io/',
};

const KUSAMA_CONFIG: NetworkConfig = {
    name: 'Kusama',
    tokenName: 'KSM',
    logo: KusamaIcon,
    rpcUrl: 'wss://kusama-rpc.polkadot.io',
    // EXISTENTIAL_DEPOSIT: 0.0000333333,
    // prefix: 2,
    queryEndpoint:
        'https://api.subquery.network/sq/XORD-one/metadot-subql-kusama',
    relayChain: true,
    disabled: false,
    explorer: 'https://kusama.subscan.io/',
};

const KARURA_CONFIG: NetworkConfig = {
    name: 'Karura',
    tokenName: '',
    logo: KaruraIcon,
    rpcUrl: 'wss://karura-rpc-0.aca-api.network',
    queryEndpoint:
        'https://api.subquery.network/sq/XORD-one/metadot-subql-karura',
    // prefix: 8,
    disabled: false,
    explorer: 'https://karura.subscan.io/',
};

// const MOONRIVER_CONFIG: NetworkConfig = {
//     name: 'Moonriver',
//     tokenName: '',
//     logo: MoonriverIcon,
//     rpcUrl: '',
//     queryEndpoint:
//         'https://api.subquery.network/sq/khuzama98/subql-polkadot__a2h1e',
//     prefix: 0,
//     disabled: true,
//     explorer: '',
// };

const SHIDEN_CONFIG: NetworkConfig = {
    name: 'Shiden',
    tokenName: '',
    logo: ShidenIcon,
    rpcUrl: 'wss://shiden.api.onfinality.io/public-ws',
    queryEndpoint:
        'https://api.subquery.network/sq/XORD-one/metadot-subql-shiden',
    // prefix: 5,
    disabled: false,
    explorer: 'https://shiden.subscan.io/',
};

// const BIFROST_CONFIG: NetworkConfig = {
//     name: 'Bifrost',
//     tokenName: '',
//     logo: BifrostIcon,
//     rpcUrl: '',
//     queryEndpoint:
//         'https://api.subquery.network/sq/khuzama98/subql-polkadot__a2h1e',
//     prefix: 0,
//     disabled: true,
//     explorer: '',
// };

// const PHALA_CONFIG: NetworkConfig = {
//     name: 'Phala',
//     tokenName: '',
//     logo: PhalaIcon,
//     rpcUrl: '',
//     queryEndpoint:
//         'https://api.subquery.network/sq/khuzama98/subql-polkadot__a2h1e',
//     prefix: 0,
//     disabled: true,
//     explorer: '',
// };

// const KHALA_CONFIG: NetworkConfig = {
//     name: 'Khala',
//     tokenName: '',
//     logo: PhalaIcon,
//     rpcUrl: '',
//     queryEndpoint:
//         'https://api.subquery.network/sq/khuzama98/subql-polkadot__a2h1e',
//     prefix: 0,
//     disabled: true,
//     explorer: '',
// };

const WESTEND_CONFIG: NetworkConfig = {
    name: 'Westend',
    tokenName: 'WND',
    queryEndpoint:
        'https://api.subquery.network/sq/XORD-one/metadot-subql-westend',
    logo: westendColour,
    rpcUrl: 'wss://westend-rpc.polkadot.io',
    // prefix: 42,
    disabled: false,
    explorer: 'https://westend.subscan.io/',
};

// const ROCOCO_CONFIG: NetworkConfig = {
//     name: 'Rococo',
//     tokenName: 'ROC',
//     logo: rococoIcon,
//     rpcUrl: 'wss://rococo-rpc.polkadot.io',
//     // prefix: 42,
//     queryEndpoint:
//         'https://api.subquery.network/sq/khuzama98/subql-polkadot__a2h1e',
//     disabled: true,
//     explorer: '',
// };

const ACALA_MANDALA_CONFIG: NetworkConfig = {
    name: 'Acala Mandala',
    tokenName: 'ACA',
    logo: acala,
    rpcUrl: 'wss://acala-mandala.api.onfinality.io/public-ws',
    // prefix: 42,
    queryEndpoint:
        'https://api.subquery.network/sq/khuzama98/subql-polkadot__a2h1e',
    disabled: true,
    explorer: '',
};

// const MOONBASE_CONFIG: NetworkConfig = {
//     name: 'Moonbase',
//     tokenName: '',
//     logo: MoonriverIcon,
//     rpcUrl: 'wss://moonbeam-alpha.api.onfinality.io/public-ws',
//     queryEndpoint:
//         'https://api.subquery.network/sq/khuzama98/subql-polkadot__a2h1e',
//     prefix: 0,
//     disabled: false,
//     explorer: '',
// };

// const ASGARD_CONFIG: NetworkConfig = {
//     name: 'Asgard',
//     tokenName: '',
//     logo: BifrostIcon,
//     rpcUrl: '',
//     queryEndpoint:
//         'https://api.subquery.network/sq/khuzama98/subql-polkadot__a2h1e',
//     prefix: 0,
//     disabled: true,
//     explorer: '',
// };

// const DUSTY_CONFIG: NetworkConfig = {
//     name: 'Dusty',
//     tokenName: 'PLD',
//     queryEndpoint:
//         'https://api.subquery.network/sq/khuzama98/subql-dusty__a2h1e',
//     logo: dusty,
//     rpcUrl: 'wss://rpc.dusty.plasmnet.io/',
//     prefix: 5,
//     disabled: true,
//     explorer: '',
// };

const ASTAR_CONFIG: NetworkConfig = {
    name: 'Astar',
    tokenName: 'ASTR',
    logo: astarIcon,
    rpcUrl: 'wss://rpc.astar.network',
    // prefix: 5,
    queryEndpoint:
        'https://api.subquery.network/sq/XORD-one/metadot-subql-astar',
    disabled: false,
    explorer: 'https://astar.subscan.io/',
};

const SHIBUYA_CONFIG: NetworkConfig = {
    name: 'Shibuya',
    tokenName: 'SBY',
    queryEndpoint:
        'https://api.subquery.network/sq/XORD-one/metadot-subql-shibuya',
    logo: shibuyaIcon,
    rpcUrl: 'wss://rpc.shibuya.astar.network',
    // prefix: 5,
    disabled: false,
    explorer: 'https://shibuya.subscan.io/',
};

// const BITCOUNTRY_CONFIG: NetworkConfig = {
//     name: 'Bit Country',
//     tokenName: '',
//     logo: bitcountry,
//     rpcUrl: 'wss://tewai-rpc.bit.country',
//     queryEndpoint:
//         'https://api.subquery.network/sq/khuzama98/subql-polkadot__a2h1e',
//     prefix: 0,
//     disabled: true,
//     explorer: '',
// };

const CONTEXTFREE_CONFIG: NetworkConfig = {
    name: 'ContextFree',
    tokenName: 'CTX',
    queryEndpoint:
        'https://api.subquery.network/sq/XORD-one/metadot-subql-contextfree',
    logo: contextFree,
    rpcUrl: 'wss://cf-api.ata.network',
    // rpcUrl: 'wss://contextfree.api.onfinality.io/public-ws',
    // rpcUrl: 'wss://api.ata.network',
    // prefix: 11820,
    disabled: false,
    explorer:
        'https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fcf-api.ata.network#/explorer',
};

const ACALA_CONFIG: NetworkConfig = {
    name: 'Acala',
    tokenName: 'ACA',
    queryEndpoint:
        'https://api.subquery.network/sq/XORD-one/metadot-subql-acala',
    logo: ACA,
    rpcUrl: 'wss://acala-rpc.dwellir.com',
    // prefix: 10,
    disabled: false,
    explorer: 'https://acala.subscan.io/',
};

const BIFROST_STAGE_TESTNET_CONFIG: NetworkConfig = {
    name: 'Bifrost',
    tokenName: '',
    queryEndpoint:
        'https://api.subquery.network/sq/XORD-one/metadot-subql-bifrost-testnet',
    logo: BifrostIcon,
    rpcUrl: 'wss://bifrost-rpc.testnet.liebi.com/ws',
    // prefix: 10,
    disabled: false,
    explorer: '',
};

const BIFROST_KUSAMA_CONFIG: NetworkConfig = {
    name: 'Bifrost',
    tokenName: '',
    queryEndpoint:
        'https://api.subquery.network/sq/XORD-one/metadot-subql-bifrost-mainnet',
    logo: BifrostIcon,
    rpcUrl: 'wss://eu.bifrost-rpc.liebi.com/ws',
    // prefix: 10,
    disabled: false,
    explorer: '',
};

export default {
    CONTEXTFREE_CONFIG,
    // BITCOUNTRY_CONFIG,
    POLKADOT_CONFIG,
    KUSAMA_CONFIG,
    BIFROST_STAGE_TESTNET_CONFIG,
    BIFROST_KUSAMA_CONFIG,
    // BIFROST_CONFIG,
    // MOONRIVER_CONFIG,
    SHIDEN_CONFIG,
    KARURA_CONFIG,
    WESTEND_CONFIG,
    // ROCOCO_CONFIG,
    // DUSTY_CONFIG,
    ACALA_MANDALA_CONFIG,
    ASTAR_CONFIG,
    // PHALA_CONFIG,
    // MOONBASE_CONFIG,
    // ASGARD_CONFIG,
    // KHALA_CONFIG,
    SHIBUYA_CONFIG,
    ACALA_CONFIG,
};
