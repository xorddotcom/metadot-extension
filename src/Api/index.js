// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, memo } from 'react';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { useDispatch, useSelector } from 'react-redux';
import { setApi, setApiInitializationStarts } from '../redux/slices/api';
import { setBalance, setRpcUrl, setTokenName } from '../redux/slices/account';
import { getBalance } from '../ToolBox/services';
import { setIsSuccessModalOpen, setMainTextForSuccessModal, setSubTextForSuccessModal } from '../redux/slices/successModalHandling';

function ApiManager({ rpc }) {
  // eslint-disable-next-line import/no-mutable-exports
  const currentUser = useSelector((state) => state);
  const [apiState, setApiState] = useState(currentUser.api.api);
  const dispatch = useDispatch();

  // eslint-disable-next-line no-shadow
  const state = useSelector((state) => state);
  useEffect(() => {
    console.log('manager ran1 useEffect');
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

      console.log('Token name on dashboard', await apiR.registry.chainTokens);
      dispatch(setTokenName({ tokenName: await apiR.registry.chainTokens }));
      dispatch(setRpcUrl({ rpcUrl }));
      // WsProvider.websocket.close();
      dispatch(setApiInitializationStarts(false));
      if (currentUser.successModalHandling.loadingFor === 'Api Initialization...') {
        dispatch(setMainTextForSuccessModal('Successfully Converted!'));
        dispatch(setSubTextForSuccessModal(`You are now successfully on ${currentUser.account.chainName}`));
        dispatch(setIsSuccessModalOpen(true));

        setTimeout(() => {
          dispatch(setIsSuccessModalOpen(false));
        }, 3000);
      }
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
  }, [
    currentUser.account.chainName,
    currentUser.account.publicKey,
    currentUser.successModalHandling.loadingFor,
    dispatch,
    rpc,
    state.account.loadingFor,
  ]);
  console.log({ apiState, state });
  console.log('manager ran1----------------------------------------', rpc);
  return (
    <div style={{ display: 'none' }}>
      <p>this</p>
    </div>
  );
}

export default memo(ApiManager);
