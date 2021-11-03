/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, memo } from 'react';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { useDispatch, useSelector } from 'react-redux';
import { options as AcalaOptions } from '@acala-network/api';
import { setApi, setApiInitializationStarts } from '../redux/slices/api';
import { getBalance, getBalanceWithMultipleTokens } from '../ToolBox/services';
import { setBalance, setBalanceInUsd, setTokenName } from '../redux/slices/account';
import {
  setIsSuccessModalOpen, setMainTextForSuccessModal,
  setSubTextForSuccessModal,
} from '../redux/slices/successModalHandling';
import constants from '../constants/onchain';
import { helpers } from '../utils';

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
      let apiR;
      if (rpcUrl === constants.Acala_Mandala_Rpc_Url) {
        apiR = await ApiPromise.create(AcalaOptions({ provider: wsProvider }));
      } else {
        apiR = await ApiPromise.create({ provider: wsProvider });
      }
      const tokenName = await apiR.registry.chainTokens[0];
      dispatch(setTokenName({ tokenName }));
      const bal = rpcUrl === constants.Acala_Mandala_Rpc_Url
        ? await getBalanceWithMultipleTokens(apiR, currentUser.account.publicKey)
        : await getBalance(apiR, currentUser.account.publicKey);
      dispatch(setBalance(bal));

      const dollarAmount = await helpers.convertIntoUsd(tokenName, bal);

      dispatch(setBalanceInUsd(dollarAmount));

      await apiR.isReady;
      setApiState(apiR);
      dispatch(setApi(apiR));

      dispatch(setApiInitializationStarts(false));
      if (currentUser.successModalHandling.loadingFor === 'Api Initialization...') {
        dispatch(setMainTextForSuccessModal('Successfully Converted!'));
        dispatch(setSubTextForSuccessModal(''));
        dispatch(setIsSuccessModalOpen(true));

        setTimeout(() => {
          dispatch(setIsSuccessModalOpen(false));
        }, 3000);
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
  return (
    <div style={{ display: 'none' }}>
      <p>this</p>
    </div>
  );
}

export default memo(ApiManager);
