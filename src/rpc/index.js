const {
  WsProvider, ApiPromise,
} = require('@polkadot/api');

// eslint-disable-next-line import/no-mutable-exports
let api;

export default class RpcInitialization {
  constructor(rpcUrl) {
    this.rpcUrl = rpcUrl;
    this.currApi = '';
    // this.changeRpcUrl = changeRpcUrl;
  }

     static init = async (rpcUrl, options) => {
       console.log('Init function running', rpcUrl);
       //  if (rpcUrl && !changeRpcUrl) {
       //    console.log('In if returing api');
       //    return api;
       //  }
       // if(!rpcUrl) return api
       const wsProvider = new WsProvider(rpcUrl);
       if (options) {
         api = new ApiPromise(options({ provider: wsProvider }));
         await api.isReady;
         return api;
       }
       api = await ApiPromise.create({ provider: wsProvider });
       await api.isReady;
       console.log('Api configuration complete', api);
       // tokenName = await api.registry.chainTokens
       // chainDecimals = await api.registry.chainDecimals
       // console.log('Chain decimals', chainDecimals)
       // console.log('token Name', tokenName)
       return api;
     }

      apiGetter = () => {
        this.currApi = api;
        console.log('Api getter', this.currApi);
        return this.currApi;
      }
}

export { api };
