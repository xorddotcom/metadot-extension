/* eslint-disable camelcase */
const Account_Type = 'sr25519';

const USD_PER_POLKADOT_API = 'https://api.coingecko.com/api/v3/simple/price?ids=POLKADOT&vs_currencies=Usd';

const USD_PER_KSM_API = 'https://api.coingecko.com/api/v3/simple/price?ids=KUSAMA&vs_currencies=Usd';

// Polkadot
const Polkadot_Rpc_Url = 'wss://rpc.polkadot.io';

// Acala Mandala
const Acala_Mandala_Rpc_Url = 'wss://acala-mandala.api.onfinality.io/public-ws';

// Westend
const WestEndRpcUrl = 'wss://westend-rpc.polkadot.io';

// Kusama Main Net
const Kusama_Rpc_Url = 'wss://kusama-rpc.polkadot.io';

// Dusty
const Dusty_Rpc_Url = 'wss://rpc.dusty.plasmnet.io/';

// Phala
const Phala_Rpc_Url = 'wss://para2-api.phala.network/ws/';

const Astar_Rpc_Url = 'wss://rpc.plasmnet.io/';

const Rococo_Rpc_Url = 'wss://rococo-rpc.polkadot.io';

export default {
  Account_Type,
  Polkadot_Rpc_Url,
  Acala_Mandala_Rpc_Url,
  WestEndRpcUrl,
  Kusama_Rpc_Url,
  Dusty_Rpc_Url,
  Phala_Rpc_Url,
  Astar_Rpc_Url,
  Rococo_Rpc_Url,
  USD_PER_KSM_API,
  USD_PER_POLKADOT_API,
};
