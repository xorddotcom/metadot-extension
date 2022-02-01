/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setApi, setApiInitializationStarts } from '../redux/slices/api';
import { setBalance, setBalanceInUsd, setTokenName } from '../redux/slices/activeAccount';
import {
  setIsResponseModalOpen, setMainTextForSuccessModal,
  setResponseImage,
  setSubTextForSuccessModal,
} from '../redux/slices/modalHandling';

import { helpers } from '../utils';
import services from '../utils/services';

import wifiOff from '../assets/images/wifi-off.svg';
import SuccessCheckIcon from '../assets/images/modalIcons/success.svg';

function ApiManager({ rpc }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state);

  // const { account, modalHandling } = currentUser;
  const { api, activeAccount, modalHandling } = currentUser;
  const { loadingForApi } = modalHandling;

  // const { publicKey, chainName } = account;
  const { convertIntoUsd, showInternetSnackBar } = helpers;
  const { getBalance, providerInitialization, getBalanceWithMultipleTokens } = services;
  const { publicKey, chainName } = activeAccount;
  const { loadingFor } = modalHandling;
  const [apiState, setApiState] = useState(api.api);

  useEffect(() => {
    const setAPI = async (rpcUrl) => {
      dispatch(setApiInitializationStarts(true)); // for showing loading waves like preloader

      if (window.navigator.onLine) {
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
          dispatch(setResponseImage(SuccessCheckIcon));
          dispatch(setIsResponseModalOpen(true));

          setTimeout(() => {
            dispatch(setIsResponseModalOpen(false));
          }, 2500);
        }
      } else {
        console.log('Internet is down! in api manager');
        // showInternetSnackBar();

        dispatch(setMainTextForSuccessModal('Internet is down!'));
        dispatch(setSubTextForSuccessModal(''));
        dispatch(setResponseImage(wifiOff));
        dispatch(setIsResponseModalOpen(true));

        setTimeout(() => {
          dispatch(setIsResponseModalOpen(false));
        }, 2500);

        setTimeout(() => {
          dispatch(setApiInitializationStarts(false)); // for removing loading waves
        }, 2000);
      }
    };

    setAPI(rpc);
  }, [chainName, publicKey, loadingForApi, dispatch, rpc]);

  return (null);
}

export default memo(ApiManager);
