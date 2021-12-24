// eslint-disable-next-line no-unused-vars
import React, { useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setApi, setApiInitializationStarts } from '../redux/slices/api';
import { setBalance, setBalanceInUsd, setTokenName } from '../redux/slices/account';
import {
  setIsResponseModalOpen,
  setMainTextForSuccessModal,
  setSubTextForSuccessModal,
} from '../redux/slices/modalHandling';

import { helpers } from '../utils';
import services from '../utils/services';

function ApiManager({ rpc }) {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state);

  const { account, modalHandling } = currentUser;
  const { loadingForApi } = modalHandling;

  const { publicKey, chainName } = account;
  const { convertIntoUsd } = helpers;
  const { getBalance, providerInitialization } = services;

  useEffect(() => {
    const setAPI = async (rpcUrl) => {
      dispatch(setApiInitializationStarts(true)); // for showing loading waves like preloader

      // setting api instance of selected network
      const newApiInstance = await providerInitialization(rpcUrl);

      // getting token name
      const tokenNameofSelectedNetwork = await newApiInstance.registry.chainTokens[0];
      dispatch(setTokenName({ tokenName: tokenNameofSelectedNetwork }));

      // getting token balance
      const balanceOfSelectedNetwork = await getBalance(newApiInstance, publicKey);
      dispatch(setBalance(balanceOfSelectedNetwork));

      // getting token balance in usd
      const dollarAmount = await convertIntoUsd(
        tokenNameofSelectedNetwork, balanceOfSelectedNetwork,
      );
      dispatch(setBalanceInUsd(dollarAmount));
      await newApiInstance.isReady;
      dispatch(setApi(newApiInstance));
      dispatch(setApiInitializationStarts(false)); // for removing loading waves

      // checking whether it is network conversion or not
      if (loadingForApi) {
        dispatch(setMainTextForSuccessModal('Successfully Converted!'));
        dispatch(setSubTextForSuccessModal(''));
        dispatch(setIsResponseModalOpen(true));

        setTimeout(() => {
          dispatch(setIsResponseModalOpen(false));
        }, 2500);
      }
    };

    setAPI(rpc);
  }, [chainName, publicKey, loadingForApi, dispatch, rpc]);

  return (null);
}

export default memo(ApiManager);
