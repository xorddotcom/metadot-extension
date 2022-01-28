/* eslint-disable max-len */

import KusamaIcon from '../assets/images/kusama.svg';
import KaruraIcon from '../assets/images/karura.svg';
import MoonriverIcon from '../assets/images/moonriver.svg';
import ShidenIcon from '../assets/images/shiden.svg';
import PhalaIcon from '../assets/images/phala.svg';
import BifrostIcon from '../assets/images/bifrost.svg';
// Assests Token images
import dusty from '../assets/images/tokenImg/dusty.png';
import polkadotDot from '../assets/images/tokenImg/polkadot.png';
import westendColour from '../assets/images/tokenImg/westend_colour.svg';
import acala from '../assets/images/tokenImg/acala-circle.svg';
import bitcountry from '../assets/images/tokenImg/bitcountry.svg';
import rococoIcon from '../assets/images/rococo.svg';
import astarIcon from '../assets/images/astar.png';
import shibuyaIcon from '../assets/images/shibuya.svg';
import { NetworkConfig } from './types';

const USD_PER_POLKADOT_API =
    'https://api.coingecko.com/api/v3/simple/price?ids=POLKADOT&vs_currencies=Usd';

const USD_PER_KSM_API =
    'https://api.coingecko.com/api/v3/simple/price?ids=KUSAMA&vs_currencies=Usd';

const POLKADOT_CONFIG: NetworkConfig = {
    CHAIN_NAME: 'Polkadot Main Network',
    TOKEN_NAME: 'DOT',
    QUERY_ENDPOINT:
        'https://api.subquery.network/sq/khuzama98/subql-polkadot__a2h1e',
    LOGO: polkadotDot,
    RPC_URL: 'wss://rpc.polkadot.io',
    EXISTENTIAL_DEPOSIT: 1,
    PREFIX: 0,
};

const KUSAMA_CONFIG: NetworkConfig = {
    CHAIN_NAME: 'Kusama',
    TOKEN_NAME: 'KSM',
    LOGO: KusamaIcon,
    RPC_URL: 'wss://kusama-rpc.polkadot.io',
    EXISTENTIAL_DEPOSIT: 0.0000333333,
    PREFIX: 2,
};

const KARURA_CONFIG: NetworkConfig = {
    CHAIN_NAME: 'Karura',
    TOKEN_NAME: '',
    LOGO: KaruraIcon,
    RPC_URL: 'wss://karura-rpc-0.aca-api.network',
};

const MOONRIVER_CONFIG: NetworkConfig = {
    CHAIN_NAME: 'Moonriver',
    TOKEN_NAME: '',
    LOGO: MoonriverIcon,
    RPC_URL: '',
};

const SHIDEN_CONFIG: NetworkConfig = {
    CHAIN_NAME: 'Shiden',
    TOKEN_NAME: '',
    LOGO: ShidenIcon,
    RPC_URL: '',
};

const BIFROST_CONFIG: NetworkConfig = {
    CHAIN_NAME: 'Bifrost',
    TOKEN_NAME: '',
    LOGO: BifrostIcon,
    RPC_URL: '',
};

const PHALA_CONFIG: NetworkConfig = {
    CHAIN_NAME: 'Phala',
    TOKEN_NAME: '',
    LOGO: PhalaIcon,
    RPC_URL: '',
};

const KHALA_CONFIG: NetworkConfig = {
    CHAIN_NAME: 'Khala',
    TOKEN_NAME: '',
    LOGO: PhalaIcon,
    RPC_URL: '',
};

const WESTEND_CONFIG: NetworkConfig = {
    CHAIN_NAME: 'Westend',
    TOKEN_NAME: 'WND',
    QUERY_ENDPOINT:
        'https://api.subquery.network/sq/khuzama98/subql-westend__a2h1e',
    LOGO: westendColour,
    RPC_URL: 'wss://westend-rpc.polkadot.io',
    PREFIX: 42,
};

const ROCOCO_CONFIG: NetworkConfig = {
    CHAIN_NAME: 'Rococo',
    TOKEN_NAME: 'ROC',
    LOGO: rococoIcon,
    RPC_URL: 'wss://rococo-rpc.polkadot.io',
    PREFIX: 42,
};

const ACALA_MANDALA_CONFIG: NetworkConfig = {
    CHAIN_NAME: 'Acala Mandala',
    TOKEN_NAME: 'ACA',
    LOGO: acala,
    RPC_URL: 'wss://acala-mandala.api.onfinality.io/public-ws',
    PREFIX: 42,
};

const MOONBASE_CONFIG: NetworkConfig = {
    CHAIN_NAME: 'Moonbase',
    TOKEN_NAME: '',
    LOGO: MoonriverIcon,
    RPC_URL: '',
};

const ASGARD_CONFIG: NetworkConfig = {
    CHAIN_NAME: 'Asgard',
    TOKEN_NAME: '',
    LOGO: BifrostIcon,
    RPC_URL: '',
};

const DUSTY_CONFIG: NetworkConfig = {
    CHAIN_NAME: 'Dusty',
    TOKEN_NAME: 'PLD',
    QUERY_ENDPOINT:
        'https://api.subquery.network/sq/khuzama98/subql-dusty__a2h1e',
    LOGO: dusty,
    RPC_URL: 'wss://rpc.dusty.plasmnet.io/',
    PREFIX: 5,
};

const ASTAR_CONFIG: NetworkConfig = {
    CHAIN_NAME: 'Astar',
    TOKEN_NAME: 'PLM',
    LOGO: astarIcon,
    RPC_URL: 'wss://rpc.plasmnet.io/',
    PREFIX: 5,
};

const SHIBUYA_CONFIG: NetworkConfig = {
    CHAIN_NAME: 'Shibuya',
    TOKEN_NAME: 'SBY',
    QUERY_ENDPOINT:
        'https://api.subquery.network/sq/khuzama98/subql-shibuya__a2h1e',
    LOGO: shibuyaIcon,
    RPC_URL: 'wss://rpc.shibuya.astar.network',
    PREFIX: 5,
};

const BITCOUNTRY_CONFIG: NetworkConfig = {
    CHAIN_NAME: 'Bit Country',
    TOKEN_NAME: '',
    LOGO: bitcountry,
    RPC_URL: 'wss://tewai-rpc.bit.country',
};

export default {
    BITCOUNTRY_CONFIG,
    USD_PER_KSM_API,
    USD_PER_POLKADOT_API,
    POLKADOT_CONFIG,
    KUSAMA_CONFIG,
    BIFROST_CONFIG,
    MOONRIVER_CONFIG,
    SHIDEN_CONFIG,
    KARURA_CONFIG,
    WESTEND_CONFIG,
    ROCOCO_CONFIG,
    DUSTY_CONFIG,
    ACALA_MANDALA_CONFIG,
    ASTAR_CONFIG,
    PHALA_CONFIG,
    MOONBASE_CONFIG,
    ASGARD_CONFIG,
    KHALA_CONFIG,
    SHIBUYA_CONFIG,
};
