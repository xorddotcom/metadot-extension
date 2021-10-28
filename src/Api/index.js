// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { useDispatch, useSelector } from 'react-redux';
import { options as AcalaOptions } from '@acala-network/api';
import { setApi, setApiInitializationStarts } from '../redux/slices/api';
import { setBalance } from '../redux/slices/account';
import { getBalance, getBalanceWithMultipleTokens } from '../ToolBox/services';

function ApiManager({ rpc }) {
  // eslint-disable-next-line import/no-mutable-exports
  const currentUser = useSelector((state) => state);
  const [apiState, setApiState] = useState(currentUser.api.api);
  const dispatch = useDispatch();

  // eslint-disable-next-line no-shadow
  const state = useSelector((state) => state);
  useEffect(() => {
    const setAPI = async (rpcUrl) => {
      dispatch(setApiInitializationStarts(true));
      let apiR;
      if (rpcUrl === 'wss://acala-mandala.api.onfinality.io/public-ws') {
        const wsProvider = new WsProvider(rpcUrl);
        apiR = new ApiPromise(AcalaOptions({ provider: wsProvider }));
      } else {
        const wsProvider = new WsProvider(rpcUrl);
        apiR = await ApiPromise.create({ provider: wsProvider });
      }
      console.log('Api configuration close', apiR.isConnected);
      await apiR.isReady;
      console.log('Api configuration complete', apiR);
      setApiState(apiR);
      dispatch(setApi(apiR));

      console.log('Api configuration close', apiR.isConnected);
      // WsProvider.websocket.close();

      try {
        if (rpcUrl === 'wss://acala-mandala.api.onfinality.io/public-ws') {
          const nbalance = await getBalanceWithMultipleTokens(apiR, currentUser.account.publicKey);
          dispatch(setBalance(nbalance));
          return nbalance;
        }
        const nbalance = await getBalance(apiR, currentUser.account.publicKey);
        dispatch(setBalance(nbalance));
        return nbalance;
      } catch (err) {
        console.log('Error occurred');
        throw err;
      }
    };
    setAPI(rpc);
  }, [currentUser.account.publicKey, dispatch, rpc]);
  console.log({ apiState, state });
  return (
    <div style={{ display: 'none' }}>
      <p>this</p>
    </div>
  );
}

export default ApiManager;
