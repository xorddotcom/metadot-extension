/* eslint-disable camelcase */
const ACCOUNT_TYPE = 'sr25519';

const USD_PER_POLKADOT_API = 'https://api.coingecko.com/api/v3/simple/price?ids=POLKADOT&vs_currencies=Usd';

const USD_PER_KSM_API = 'https://api.coingecko.com/api/v3/simple/price?ids=KUSAMA&vs_currencies=Usd';

// Polkadot
const POLKADOT_RPC_URL = 'wss://rpc.polkadot.io';

// Acala Mandala
const ACALA_MANDALA_RPC_URL = 'wss://acala-mandala.api.onfinality.io/public-ws';

// Westend
const WESTEND_RPC_URL = 'wss://westend-rpc.polkadot.io';

// Kusama Main Net
const KUSAMA_RPC_URL = 'wss://kusama-rpc.polkadot.io';

// Dusty
const DUSTY_RPC_URL = 'wss://rpc.dusty.plasmnet.io/';

// Phala
const PHALA_RPC_URL = 'wss://para2-api.phala.network/ws/';

const ASTAR_RPC_URL = 'wss://rpc.plasmnet.io/';

const ROCOCO_RPC_URL = 'wss://rococo-rpc.polkadot.io';

export default {
  ACCOUNT_TYPE,
  POLKADOT_RPC_URL,
  ACALA_MANDALA_RPC_URL,
  WESTEND_RPC_URL,
  KUSAMA_RPC_URL,
  DUSTY_RPC_URL,
  PHALA_RPC_URL,
  ASTAR_RPC_URL,
  ROCOCO_RPC_URL,
  USD_PER_KSM_API,
  USD_PER_POLKADOT_API,
};
