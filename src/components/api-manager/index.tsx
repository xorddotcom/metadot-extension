import React, { useEffect, memo } from 'react';
import { useSelector } from 'react-redux';

import { setApi, setApiInitializationStarts } from '../../redux/slices/api';
import {
    setBalance,
    setBalanceInUsd,
    setTokenName,
} from '../../redux/slices/activeAccount';
import { setIsResponseModalOpen } from '../../redux/slices/modalHandling';
import { RootState } from '../../redux/store';

import { helpers, images } from '../../utils';
import services from '../../utils/services';
import useResponseModal from '../../hooks/useResponseModal';
import useDispatcher from '../../hooks/useDispatcher';

const { wifiOff, SuccessCheckIcon } = images;

const ApiManager: React.FunctionComponent<{ rpc: string }> = ({ rpc }) => {
    const currentUser = useSelector((state: RootState) => state);
    const openModal = useResponseModal({
        isOpen: true,
        modalImage: SuccessCheckIcon,
        mainText: 'Successfully Converted!',
        subText: '',
    });
    const openModalForInternetIssue = useResponseModal({
        isOpen: true,
        modalImage: wifiOff,
        mainText: 'Internet is down!',
        subText: '',
    });
    const generalDispatcher = useDispatcher();

    const { activeAccount, modalHandling } = currentUser;
    const { loadingForApi } = modalHandling;

    const { convertIntoUsd } = helpers;
    const { getBalance, providerInitialization } = services;
    const { publicKey, chainName } = activeAccount;

    useEffect(() => {
        const setAPI = async (rpcUrl: string): Promise<void> => {
            try {
                generalDispatcher(() => setApiInitializationStarts(true));

                if (window.navigator.onLine) {
                    // setting api instance of selected network
                    const newApiInstance = await providerInitialization(rpcUrl);

                    // getting token name
                    const tokenNameofSelectedNetwork = await newApiInstance
                        .registry.chainTokens[0];
                    generalDispatcher(() =>
                        setTokenName(tokenNameofSelectedNetwork)
                    );

                    // getting token balance
                    const balanceOfSelectedNetwork = await getBalance(
                        newApiInstance,
                        publicKey
                    );
                    generalDispatcher(() =>
                        setBalance(balanceOfSelectedNetwork)
                    );

                    // getting token balance in usd
                    const dollarAmount = await convertIntoUsd(
                        tokenNameofSelectedNetwork,
                        balanceOfSelectedNetwork
                    );
                    generalDispatcher(() => setBalanceInUsd(dollarAmount));
                    await newApiInstance.isReady;
                    generalDispatcher(() => setApi(newApiInstance));

                    generalDispatcher(() => setApiInitializationStarts(false));

                    if (loadingForApi) {
                        openModal();
                        setTimeout(() => {
                            generalDispatcher(() =>
                                setIsResponseModalOpen(false)
                            );
                        }, 2500);
                    }
                } else {
                    openModalForInternetIssue();

                    setTimeout(() => {
                        generalDispatcher(() => setIsResponseModalOpen(false));
                    }, 2500);

                    setTimeout(() => {
                        generalDispatcher(() =>
                            setApiInitializationStarts(false)
                        );
                    }, 2000);
                }
            } catch (error) {
                console.log('api manager', error);
            }
        };

        setAPI(rpc);
    }, [chainName, publicKey, loadingForApi, rpc]);

    return null;
};

export default memo(ApiManager);
