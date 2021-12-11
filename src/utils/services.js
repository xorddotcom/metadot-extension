/* eslint-disable no-unused-vars */
import { options as AcalaOptions } from '@acala-network/api';
import { formatBalance } from '@polkadot/util';
import constants from '../constants/onchain';

const { WsProvider, ApiPromise, Keyring } = require('@polkadot/api');
const BN = require('./bn');

const { ACALA_MANDALA_CONFIG } = constants;

const getSender = async (seed) => {
  const keyring = new Keyring({ type: 'sr25519' });
  const sender = await keyring.addFromUri(seed);
  return sender;
};

// prettier-ignore
const providerInitialization = async (rpc) => {
  // eslint-disable-next-line no-underscore-dangle
  const _provider = new WsProvider(rpc);
  console.log('Provider', _provider);
  let apiR;
  if (rpc === ACALA_MANDALA_CONFIG.RPC_URL) {
    apiR = await ApiPromise.create(AcalaOptions({ provider: _provider }));
  } else {
    console.log('In else [][]');
    apiR = await ApiPromise.create({ provider: _provider });
    console.log('Apir', apiR);
  }
  return apiR;
};

const toUnit = (balance, decimals) => {
  console.log('To unit working 1', balance, decimals);
  const base = new BN(10).pow(new BN(decimals));
  console.log('To unit working 2', base);
  const dm = new BN(balance).divmod(base);
  console.log('To unit working 3');
  console.log('In to unit', parseFloat(`${dm.div.toString()}.${dm.mod.toString()}`));
  return parseFloat(`${dm.div.toString()}.${dm.mod.toString()}`);
};

const getBalance = async (api, account) => {
  const tokenLength = await api.registry.chainTokens.length;
  if (tokenLength > 1) {
    const balance = await getBalanceWithMultipleTokens(api, account);
    return balance;
  }
  const balance = await getBalanceWithSingleToken(api, account);
  return balance;
};

const getBalanceWithSingleToken = async (api, acc) => {
  const { data: balance } = await api.query.system.account(acc);
  console.log('In service balance', balance.free);

  const userBalance = formatBalance(balance.free, { decimals: api.registry.chainDecimals[0], forceUnit: '-', withUnit: false });
  console.log('Shehryaer --==++', userBalance, typeof abc, parseFloat(userBalance));
  return parseFloat(userBalance);
};

// Get balance of a chain with multiple tokens
const getBalanceWithMultipleTokens = async (api, account) => {
  const tokenNames = await api.registry.chainTokens;
  const decimals = await api.registry.chainDecimals;
  const properties = await api.rpc.system.properties();
  console.log('Token names:', tokenNames);
  console.log('Decimals:', decimals);
  console.log('Properties', properties);
  // eslint-disable-next-line no-useless-catch
  try {
    const [now, { nonce, data: balances }] = await Promise.all([
      api.query.timestamp.now(),
      api.query.system.account(account),
    ]);

    const userBalance = formatBalance(balances.free, { decimals: api.registry.chainDecimals[0], forceUnit: '-', withUnit: false });
    return parseFloat(userBalance);
  } catch (err) {
    throw err;
  }
};

const getTransactionFee = async (api, sender, recipient, decimalPlaces, amount) => {
  const info = await api.tx.balances
    .transfer(sender, amount * 10 ** decimalPlaces)
    .paymentInfo(recipient);

  return info;
};

export {
  providerInitialization,
  getBalance,
  // getBalanceWithMultipleTokens,
  getSender,
  getTransactionFee,
  toUnit,
};
