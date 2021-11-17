/* eslint-disable no-unused-vars */
import { options as AcalaOptions } from '@acala-network/api';
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
  let apiR;
  if (rpc === ACALA_MANDALA_CONFIG.RPC_URL) {
    apiR = await ApiPromise.create(AcalaOptions({ provider: _provider }));
  } else {
    apiR = await ApiPromise.create({ provider: _provider });
  }
  return apiR;
};

const toUnit = (balance, decimals) => {
  const base = new BN(10).pow(new BN(decimals));
  const dm = new BN(balance).divmod(base);
  return parseFloat(`${dm.div.toString()}.${dm.mod.toString()}`);
};

const getBalance = async (api, acc) => {
  const { data: balance } = await api.query.system.account(acc);
  const userBalance = await toUnit(balance.free, api.registry.chainDecimals);
  return userBalance;
};

// Get balance of a chain with multiple tokens
const getBalanceWithMultipleTokens = async (api, account) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const { data: balance } = await api.query.system.account(account);
    const [now, { nonce, data: balances }] = await Promise.all([
      api.query.timestamp.now(),
      api.query.system.account(account),
    ]);
    const userBalance = balances.free.toHuman();
    // eslint-disable-next-line eqeqeq
    if (userBalance == 0) return 0;
    const splittedBalance = userBalance.split(' ');
    if (splittedBalance[1][0] === 'm') {
      return splittedBalance[0] * 10 ** -3;
    }
    return userBalance;
  } catch (err) {
    throw err;
  }
};

export {
  providerInitialization,
  getBalance,
  getBalanceWithMultipleTokens,
  getSender,
};
