import yellow from '../../../assets/images/tokenImg/yellow.png';
import green from '../../../assets/images/tokenImg/green.jpeg';
import kusamaKsm from '../../../assets/images/tokenImg/kusama-ksm.svg';
import constants from '../../../constants/onchain';

const {
  POLKADOT_CONFIG,
  KUSAMA_CONFIG,
  PHALA_CONFIG,
  KHALA_CONFIG,
  BIFROST_CONFIG,
  MOONRIVER_CONFIG,
  SHIDEN_CONFIG,
  KARURA_CONFIG,
  WESTEND_CONFIG,
  ROCOCO_CONFIG,
  DUSTY_CONFIG,
  ACALA_MANDALA_CONFIG,
  ASTAR_CONFIG,
  MOONBASE_CONFIG,
  ASGARD_CONFIG,
} = constants;

const availableNetworks = [
  {
    name: 'Polkadot Main Network',
    theme: POLKADOT_CONFIG.LOGO,
    moreOptions: false,
    rpcUrl: POLKADOT_CONFIG.RPC_URL,
  },
  {
    name: 'Kusama Main Networks',
    theme: kusamaKsm,
    moreOptions: true,
    rpcUrl: KUSAMA_CONFIG.RPC_URL,
    icon: KUSAMA_CONFIG.LOGO,
    parachain: false,
    mainNetwork: true,
    testNet: null,
    disabled: false,
  },
  {
    name: 'Test Networks',
    theme: yellow,
    moreOptions: true,
  },
  {
    name: 'Beta Networks',
    theme: green,
    moreOptions: true,
    rpcUrl: ASTAR_CONFIG.RPC_URL,
    icon: ASTAR_CONFIG.LOGO,
    parachain: false,
    mainNetwork: true,
    testNet: null,
    disabled: false,
  },
];

const BetaNetworks = [
  {
    name: 'Astar',
    icon: ASTAR_CONFIG.LOGO,
    parachain: false,
    mainNetwork: true,
    testNet: null,
    rpcUrl: ASTAR_CONFIG.RPC_URL,
    disabled: true,
    tokenName: 'Kusama',
  },
];

const KusamaMainNetworks = [
  {
    name: KUSAMA_CONFIG.CHAIN_NAME,
    icon: KUSAMA_CONFIG.LOGO,
    parachain: false,
    mainNetwork: true,
    testNet: null,
    rpcUrl: KUSAMA_CONFIG.RPC_URL,
    disabled: false,
    tokenName: KUSAMA_CONFIG.TOKEN_NAME,
  },
  {
    name: KARURA_CONFIG.CHAIN_NAME,
    icon: KARURA_CONFIG.LOGO,
    rpcUrl: KARURA_CONFIG.RPC_URL,
    parachain: true,
    mainNetwork: true,
    testNet: 'AcalaMandala',
    disabled: false,
  },
  {
    name: MOONRIVER_CONFIG.CHAIN_NAME,
    icon: MOONRIVER_CONFIG.LOGO,
    parachain: true,
    mainNetwork: true,
    disabled: true,
  },
  {
    name: SHIDEN_CONFIG.CHAIN_NAME,
    icon: SHIDEN_CONFIG.LOGO,
    parachain: true,
    mainNetwork: true,
    testNet: 'Dusty',
    disabled: true,
  },
  {
    name: KHALA_CONFIG.CHAIN_NAME,
    icon: KHALA_CONFIG.LOGO,
    parachain: true,
    mainNetwork: true,
    testNet: 'Phala',
    disabled: true,
  },
  {
    name: BIFROST_CONFIG.CHAIN_NAME,
    icon: BIFROST_CONFIG.LOGO,
    parachain: false,
    mainNetwork: true,
    testNet: 'Asgard',
    disabled: true,
  },
];

const TestNetworks = [
  {
    name: WESTEND_CONFIG.CHAIN_NAME,
    theme: WESTEND_CONFIG.LOGO,
    rpcUrl: WESTEND_CONFIG.RPC_URL,
    tokenName: WESTEND_CONFIG.TOKEN_NAME,
  },
  {
    name: ROCOCO_CONFIG.CHAIN_NAME,
    theme: ROCOCO_CONFIG.LOGO,
    rpcUrl: ROCOCO_CONFIG.RPC_URL,
    tokenName: ROCOCO_CONFIG.TOKEN_NAME,
    // disabled: false,
  },
  {
    name: ACALA_MANDALA_CONFIG.CHAIN_NAME,
    theme: ACALA_MANDALA_CONFIG.LOGO,
    rpcUrl: ACALA_MANDALA_CONFIG.RPC_URL,
    tokenName: ACALA_MANDALA_CONFIG.TOKEN_NAME,
  },
  {
    name: DUSTY_CONFIG.CHAIN_NAME,
    theme: DUSTY_CONFIG.LOGO,
    disabled: false,
    rpcUrl: DUSTY_CONFIG.RPC_URL,
    tokenName: DUSTY_CONFIG.TOKEN_NAME,
  },
  {
    name: MOONBASE_CONFIG.CHAIN_NAME,
    theme: MOONBASE_CONFIG.LOGO,
    disabled: true,
  },
  {
    name: ASGARD_CONFIG.CHAIN_NAME,
    theme: ASGARD_CONFIG.LOGO,
    disabled: true,
  },
  {
    name: PHALA_CONFIG.CHAIN_NAME,
    theme: PHALA_CONFIG.LOGO,
    disabled: true,
    rpcUrl: PHALA_CONFIG.RPC_URL,
    tokenName: PHALA_CONFIG.TOKEN_NAME,
  },
];

export default {
  availableNetworks,
  KusamaMainNetworks,
  TestNetworks,
  BetaNetworks,
};
