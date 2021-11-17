/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setApi, setApiInitializationStarts } from '../redux/slices/api';
import { getBalance, getBalanceWithMultipleTokens, providerInitialization } from '../utils/services';
import { setBalance, setBalanceInUsd, setTokenName } from '../redux/slices/account';
import {
  setIsSuccessModalOpen, setMainTextForSuccessModal,
  setSubTextForSuccessModal,
} from '../redux/slices/successModalHandling';
import constants from '../constants/onchain';
import { helpers } from '../utils';

const { ACALA_MANDALA_CONFIG } = constants;

function ApiManager({ rpc }) {
  // eslint-disable-next-line import/no-mutable-exports
  const currentUser = useSelector((state) => state);
  const { api, account, successModalHandling } = currentUser;
  const { publicKey, chainName } = account;
  const { loadingFor } = successModalHandling;
  const [apiState, setApiState] = useState(api.api);
  const dispatch = useDispatch();

  // eslint-disable-next-line no-shadow
  const state = useSelector((state) => state);
  useEffect(() => {
    const setAPI = async (rpcUrl) => {
      dispatch(setApiInitializationStarts(true));
      const apiR = await providerInitialization(rpcUrl);
      const tokenName = await apiR.registry.chainTokens[0];
      dispatch(setTokenName({ tokenName }));
      const bal = rpcUrl === ACALA_MANDALA_CONFIG.RPC_URL
        ? await getBalanceWithMultipleTokens(apiR, publicKey)
        : await getBalance(apiR, publicKey);
      dispatch(setBalance(bal));
      const dollarAmount = await helpers.convertIntoUsd(tokenName, bal);

      dispatch(setBalanceInUsd(dollarAmount));

      await apiR.isReady;
      setApiState(apiR);
      dispatch(setApi(apiR));

      dispatch(setApiInitializationStarts(false));
      if (loadingFor === 'Api Initialization...') {
        dispatch(setMainTextForSuccessModal('Successfully Converted!'));
        dispatch(setSubTextForSuccessModal(''));
        dispatch(setIsSuccessModalOpen(true));

        setTimeout(() => {
          dispatch(setIsSuccessModalOpen(false));
        }, 3000);
      }
    };
    setAPI(rpc);
  }, [chainName, publicKey, loadingFor, dispatch, rpc]);
  return (
    <div style={{ display: 'none' }}>
      <p>this</p>
    </div>
  );
}

export default memo(ApiManager);
