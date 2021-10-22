// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { useDispatch, useSelector } from 'react-redux';
import { setApi, setApiInitializationStarts } from '../redux/slices/api';
import { setBalance } from '../redux/slices/account';
import { getBalance } from '../ToolBox/services';

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
      const wsProvider = new WsProvider(rpcUrl);
      const apiR = await ApiPromise.create({ provider: wsProvider });
      console.log('Api configuration close', apiR.isConnected);
      await apiR.isReady;
      console.log('Api configuration complete', apiR);
      setApiState(apiR);
      dispatch(setApi(apiR));

      console.log('Api configuration close', apiR.isConnected);
      // WsProvider.websocket.close();

      try {
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
