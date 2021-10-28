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
  console.log('Get balance', account, api);
  const { data: balance } = await api.query.system.account(account);
  console.log('Balance free', balance.free);
  console.log('Decimals [][]', api.registry.chainDecimals);
  const userBalance = await toUnit(balance.free, api.registry.chainDecimals);
  console.log('User balance', userBalance);
  return userBalance;
};

// Get balance of a chain with multiple tokens
const getBalanceWithMultipleTokens = async (api, account) => {
  // eslint-disable-next-line no-underscore-dangle
  console.log('In service', api);
  console.log('api', api.query);
  // eslint-disable-next-line no-useless-catch
  try {
    const { data: balance } = await api.query.system.account(account);
    console.log('Balance free', balance.free);
    console.log('Decimals [][]', api.registry.chainDecimals);
    console.log('Tokens', api.registry.chainTokens);
    // console.clear();
    // const decimal = api.registry.chainDecimals;
    // const properties = await api.rpc.system.properties();
    const [now, { nonce, data: balances }] = await Promise.all([
      api.query.timestamp.now(),
      api.query.system.account(account),
    ]);
    const userBalance = balances.free.toHuman();
    console.log('New data', now, nonce);
    console.log('User balance', userBalance);
    // eslint-disable-next-line eqeqeq
    if (userBalance == 0) return 0;
    const splittedBalance = userBalance.split(' ');
    console.log('Splitted balance in service', splittedBalance);
    console.log('Splitted balance [][]', splittedBalance[1][0]);
    if (splittedBalance[1][0] === 'm') {
      console.log('In if user balance', splittedBalance[0] * 10 ** -3);
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
