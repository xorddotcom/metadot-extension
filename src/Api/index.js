// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, memo } from 'react';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { useDispatch, useSelector } from 'react-redux';
import { options as AcalaOptions } from '@acala-network/api';
import { setApi, setApiInitializationStarts } from '../redux/slices/api';
import { getBalance, getBalanceWithMultipleTokens } from '../ToolBox/services';
import { setBalance, setTokenName } from '../redux/slices/account';
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
      let apiR;
      if (rpcUrl === 'wss://acala-mandala.api.onfinality.io/public-ws') {
        const wsProvider = new WsProvider(rpcUrl);
        apiR = new ApiPromise(AcalaOptions({ provider: wsProvider }));
        dispatch(setTokenName({ tokenName: await apiR.registry.chainTokens[0] }));
        const bal = await getBalanceWithMultipleTokens(apiR, currentUser.account.publicKey);
        console.log('Balance setting in redux', bal);
        dispatch(setBalance(bal));
      } else {
        const wsProvider = new WsProvider(rpcUrl);
        apiR = await ApiPromise.create({ provider: wsProvider });
        dispatch(setTokenName({ tokenName: await apiR.registry.chainTokens }));
        const bal = await getBalance(apiR, currentUser.account.publicKey);
        dispatch(setBalance(bal));
      }
      console.log('Api configuration close', apiR.isConnected);
      await apiR.isReady;
      console.log('Api configuration complete', apiR);
      setApiState(apiR);
      dispatch(setApi(apiR));

      console.log('Api configuration close', apiR.isConnected);

      console.log('Token name on dashboard', await apiR.registry.chainTokens);
      // dispatch(setRpcUrl({ rpcUrl }));
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
      // try {
      //   if (rpcUrl === 'wss://acala-mandala.api.onfinality.io/public-ws') {
      //     const nbalance = await getBalanceWithMultipleTokens
      // (apiR, currentUser.account.publicKey);
      //     dispatch(setBalance(nbalance));
      //     return nbalance;
      //   }
      //   const nbalance = await getBalance(apiR, currentUser.account.publicKey);
      //   dispatch(setBalance(nbalance));
      //   return nbalance;
      // } catch (err) {
      //   console.log('Error occurred');
      //   throw err;
      // }
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
