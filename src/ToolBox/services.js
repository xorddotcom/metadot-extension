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
  console.log('Balance free', balance.free);
  console.log('Decimals [][]', api.registry.chainDecimals);
  const userBalance = await toUnit(balance.free, api.registry.chainDecimals);
  console.log('User balance', userBalance);
  return userBalance;
};

export { providerInitialization, toUnit, getBalance };
