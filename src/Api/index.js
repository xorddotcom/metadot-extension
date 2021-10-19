// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { useDispatch, useSelector } from 'react-redux';
import { setApi } from '../redux/slices/api';

function ApiManager({ rpc }) {
// eslint-disable-next-line import/no-mutable-exports
  const [apiState, setApiState] = useState('');
  const dispatch = useDispatch();
  // eslint-disable-next-line no-shadow
  const state = useSelector((state) => state);
  useEffect(() => {
    const setAPI = async (rpcUrl) => {
      const wsProvider = new WsProvider(rpcUrl);
      const apiR = await ApiPromise.create({ provider: wsProvider });
      await apiR.isReady;
      console.log('Api configuration complete', apiR);
      setApiState(apiR);
      dispatch(setApi(apiR));
    };
    setAPI(rpc);
  }, [dispatch, rpc]);
  console.log({ apiState, state });
  return <div style={{ display: 'none' }}><p>this</p></div>;
}

export default ApiManager;
