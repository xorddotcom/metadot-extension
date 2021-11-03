const {
  WsProvider, ApiPromise,
} = require('@polkadot/api');

// eslint-disable-next-line import/no-mutable-exports
let api;

export default class RpcInitialization {
  constructor(rpcUrl) {
    this.rpcUrl = rpcUrl;
    this.currApi = '';
  }

     static init = async (rpcUrl, options) => {
       const wsProvider = new WsProvider(rpcUrl);
       if (options) {
         api = new ApiPromise(options({ provider: wsProvider }));
         await api.isReady;
         return api;
       }
       api = await ApiPromise.create({ provider: wsProvider });
       await api.isReady;
       return api;
     }

      apiGetter = () => {
        this.currApi = api;
        return this.currApi;
      }
}

export { api };
