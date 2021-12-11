/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */

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
import rococoIcon from '../assets/images/rococo.svg';
import astarIcon from '../assets/images/astar.png';

const USD_PER_POLKADOT_API = 'https://api.coingecko.com/api/v3/simple/price?ids=POLKADOT&vs_currencies=Usd';

const USD_PER_KSM_API = 'https://api.coingecko.com/api/v3/simple/price?ids=KUSAMA&vs_currencies=Usd';

const POLKADOT_CONFIG = {
  CHAIN_NAME: 'Polkadot Main Network',
  TOKEN_NAME: 'DOT',
  LOGO: polkadotDot,
  RPC_URL: 'wss://rpc.polkadot.io',
  EXISTENTIAL_DEPOSIT: 1,
};

const KUSAMA_CONFIG = {
  CHAIN_NAME: 'Kusama',
  TOKEN_NAME: 'KSM',
  LOGO: KusamaIcon,
  RPC_URL: 'wss://kusama-rpc.polkadot.io',
  EXISTENTIAL_DEPOSIT: 0.0000333333,
};

const KARURA_CONFIG = {
  CHAIN_NAME: 'Karura',
  TOKEN_NAME: '',
  LOGO: KaruraIcon,
  RPC_URL: 'wss://karura-rpc-0.aca-api.network',
};

const MOONRIVER_CONFIG = {
  CHAIN_NAME: 'Moonriver',
  TOKEN_NAME: '',
  LOGO: MoonriverIcon,
  RPC_URL: '',
};

const SHIDEN_CONFIG = {
  CHAIN_NAME: 'Shiden',
  TOKEN_NAME: '',
  LOGO: ShidenIcon,
  RPC_URL: '',
};

const BIFROST_CONFIG = {
  CHAIN_NAME: 'Bifrost',
  TOKEN_NAME: '',
  LOGO: BifrostIcon,
  RPC_URL: '',
};

const PHALA_CONFIG = {
  CHAIN_NAME: 'Phala',
  TOKEN_NAME: '',
  LOGO: PhalaIcon,
  RPC_URL: '',
};

const KHALA_CONFIG = {
  CHAIN_NAME: 'Khala',
  TOKEN_NAME: '',
  LOGO: PhalaIcon,
  RPC_URL: '',
};

const WESTEND_CONFIG = {
  CHAIN_NAME: 'Westend',
  TOKEN_NAME: 'WND',
  LOGO: westendColour,
  RPC_URL: 'wss://westend-rpc.polkadot.io',
};

const ROCOCO_CONFIG = {
  CHAIN_NAME: 'Rococo',
  TOKEN_NAME: 'ROC',
  LOGO: rococoIcon,
  RPC_URL: 'wss://rococo-rpc.polkadot.io',
};

const ACALA_MANDALA_CONFIG = {
  CHAIN_NAME: 'Acala Mandala',
  TOKEN_NAME: 'ACA',
  LOGO: acala,
  RPC_URL: 'wss://acala-mandala.api.onfinality.io/public-ws',
};

const MOONBASE_CONFIG = {
  CHAIN_NAME: 'Moonbase',
  TOKEN_NAME: '',
  LOGO: MoonriverIcon,
  RPC_URL: '',
};

const ASGARD_CONFIG = {
  CHAIN_NAME: 'Asgard',
  TOKEN_NAME: '',
  LOGO: BifrostIcon,
  RPC_URL: '',
};

const DUSTY_CONFIG = {
  CHAIN_NAME: 'Dusty',
  TOKEN_NAME: 'PLD',
  LOGO: dusty,
  RPC_URL: 'wss://rpc.dusty.plasmnet.io/',
};

const ASTAR_CONFIG = {
  CHAIN_NAME: 'Astar',
  TOKEN_NAME: 'PLM',
  LOGO: astarIcon,
  RPC_URL: 'wss://rpc.plasmnet.io/',
};

export default {
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
};
