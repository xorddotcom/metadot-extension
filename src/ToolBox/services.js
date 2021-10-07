const { WsProvider, ApiPromise, Keyring  } = require('@polkadot/api')
const { cryptoWaitReady } = require('@polkadot/util-crypto')
const BN = require('bn.js')

const providerInitialization = async (_provider) => {
    const provider = new WsProvider(_provider)
    const api = await ApiPromise.create({provider})
    return api
}

const toUnit = (balance, decimals) => {
    let base = new BN(10).pow(new BN(decimals));
    let dm = new BN(balance).divmod(base);
    return parseFloat(dm.div.toString() + "." + dm.mod.toString())
  }

const getBalance = async (api, account) => {
    const { nonce, data: balance } = await api.query.system.account(account);
    console.log('Balance free', balance.free)
    console.log('Decimals [][]', api.registry.chainDecimals)
    const userBalance = await toUnit(balance.free, api.registry.chainDecimals)
    console.log('User balance', userBalance)
    return userBalance
}

export {
    providerInitialization,
    toUnit, 
    getBalance
}