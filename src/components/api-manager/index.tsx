import React, { useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setApi, setApiInitializationStarts } from '../../redux/slices/api';
import {
    setBalance,
    setBalanceInUsd,
    setTokenName,
} from '../../redux/slices/activeAccount';
import {
    setIsResponseModalOpen,
    setMainTextForSuccessModal,
    setResponseImage,
    setSubTextForSuccessModal,
} from '../../redux/slices/modalHandling';
import { RootState } from '../../redux/store';

import { helpers } from '../../utils';
import services from '../../utils/services';

import wifiOff from '../../assets/images/wifi-off.svg';
import SuccessCheckIcon from '../../assets/images/modalIcons/success.svg';

const ApiManager: React.FunctionComponent<{ rpc: string }> = ({ rpc }) => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state: RootState) => state);

    const { activeAccount, modalHandling } = currentUser;
    const { loadingForApi } = modalHandling;

    const { convertIntoUsd } = helpers;
    const { getBalance, providerInitialization } = services;
    const { publicKey, chainName } = activeAccount;

    useEffect(() => {
        const setAPI = async (rpcUrl: string): Promise<void> => {
            try {
                dispatch(setApiInitializationStarts(true));

                if (window.navigator.onLine) {
                    // setting api instance of selected network
                    const newApiInstance = await providerInitialization(rpcUrl);

                    // getting token name
                    const tokenNameofSelectedNetwork = await newApiInstance
                        .registry.chainTokens[0];
                    dispatch(setTokenName(tokenNameofSelectedNetwork));

                    // getting token balance
                    const balanceOfSelectedNetwork = await getBalance(
                        newApiInstance,
                        publicKey
                    );
                    dispatch(setBalance(balanceOfSelectedNetwork));

                    // getting token balance in usd
                    const dollarAmount = await convertIntoUsd(
                        tokenNameofSelectedNetwork,
                        balanceOfSelectedNetwork
                    );
                    dispatch(setBalanceInUsd(dollarAmount));
                    await newApiInstance.isReady;
                    dispatch(setApi(newApiInstance));
                    dispatch(setApiInitializationStarts(false));

                    if (loadingForApi) {
                        dispatch(
                            setMainTextForSuccessModal(
                                'Successfully Converted!'
                            )
                        );
                        dispatch(setSubTextForSuccessModal(''));
                        dispatch(setResponseImage(SuccessCheckIcon));
                        dispatch(setIsResponseModalOpen(true));

                        setTimeout(() => {
                            dispatch(setIsResponseModalOpen(false));
                        }, 2500);
                    }
                } else {
                    dispatch(setMainTextForSuccessModal('Internet is down!'));
                    dispatch(setSubTextForSuccessModal(''));
                    dispatch(setResponseImage(wifiOff));
                    dispatch(setIsResponseModalOpen(true));

                    setTimeout(() => {
                        dispatch(setIsResponseModalOpen(false));
                    }, 2500);

                    setTimeout(() => {
                        dispatch(setApiInitializationStarts(false));
                    }, 2000);
                }
            } catch (error) {
                console.log('api manager', error);
            }
        };

        setAPI(rpc);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chainName, publicKey, loadingForApi, dispatch, rpc]);

    return null;
};

export default memo(ApiManager);
