/* eslint-disable no-unused-vars */
const { WsProvider, ApiPromise } = require('@polkadot/api');
const BN = require('bn.js');

// prettier-ignore
const providerInitialization = async (provider) => {
  // eslint-disable-next-line no-underscore-dangle
  const _provider = new WsProvider(provider);
  const api = await ApiPromise.create({ _provider });
  return api;
};

const toUnit = (balance, decimals) => {
  const base = new BN(10).pow(new BN(decimals));
  const dm = new BN(balance).divmod(base);
  return parseFloat(`${dm.div.toString()}.${dm.mod.toString()}`);
};

const getBalance = async (api, account) => {
  const { data: balance } = await api.query.system.account(account);
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
  toUnit,
  getBalance,
  getBalanceWithMultipleTokens,
};
