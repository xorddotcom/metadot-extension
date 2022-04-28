import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import OtherContent from './components/RenderContentForAllNetworks';
import KusamaContent from './components/RenderContentForKusama';

import { setApiInitializationStarts } from '../../redux/slices/api';
import {
    setRpcUrl,
    setChainName,
    setTokenImage,
    setPublicKey,
    resetAccountSlice,
    setJsonFileUploadScreen,
    setPrefix,
    setQueryEndpoint,
} from '../../redux/slices/activeAccount';

import { helpers, images } from '../../utils';

import {
    setIsResponseModalOpen,
    setLoadingForApi,
} from '../../redux/slices/modalHandling';

import networks from './networkModalData';
import { RootState } from '../../redux/store';
import { TransactionRecord } from '../../redux/types';

import useDispatcher from '../../hooks/useDispatcher';
import useResponseModal from '../../hooks/useResponseModal';
import { ModalStateInterface, NetworkConfigType } from './types';
import { IMPORT_WALLET, WELCOME } from '../../constants';
import DashboardView from './view';

const { wifiOff } = images;

const { isTabViewOpened } = helpers;

const {
    availableNetworks,
    KusamaMainNetworks,
    TestNetworks,
    PolkadotMainNetworks,
} = networks;

const Dashboard: React.FunctionComponent = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const generalDispatcher = useDispatcher();
    const openModalForInternetIssue = useResponseModal({
        isOpen: true,
        modalImage: wifiOff,
        mainText: 'Internet is down!',
        subText: '',
    });
    const { transactions } = useSelector((state: RootState) => state);
    const accounts = useSelector((state: RootState) => state.accounts);
    const [txDetailsModalData, setTxDetailsModalData] =
        useState<TransactionRecord>({
            accountFrom: '',
            accountTo: [],
            amount: [],
            hash: '',
            operation: '',
            status: '',
            chainName: '',
            tokenName: [],
            transactionFee: '',
            timestamp: '',
        });
    const [isTxDetailsModalOpen, setIsTxDetailsModalOpen] = useState(false);

    const currentUser = useSelector((state: RootState) => state);
    const { apiInitializationStarts } = useSelector(
        (state: RootState) => state.api
    );
    const {
        publicKey,
        prefix,
        chainName,
        balance,
        balances,
        tokenName,
        balanceInUsd,
        accountName,
        rpcUrl,
        jsonFileUploadScreen,
    } = currentUser.activeAccount;

    useEffect(() => {
        if (jsonFileUploadScreen) {
            const url = `${chrome.runtime.getURL('index.html')}`;
            const isTabOpen = isTabViewOpened(url);

            isTabOpen.then((res) => {
                if (res) {
                    generalDispatcher(() => setJsonFileUploadScreen(false));
                }
            });
        }
    }, []);

    useEffect(() => {
        if (Object.values(accounts).length === 0) {
            generalDispatcher(() => resetAccountSlice());
            navigate(WELCOME);
        }
    }, [accounts]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    // --------State and funtions for SlectNetwork Modal

    const [modalState, setModalState] = useState<ModalStateInterface>({
        firstStep: true,
        renderMethod: OtherContent,
        currentData: availableNetworks,
    });

    const resetState = (): void => {
        setModalState({
            firstStep: true,
            renderMethod: OtherContent,
            currentData: availableNetworks,
        });
    };

    const selectAndGoBack = (): void => {
        resetState();
        setIsModalOpen(false);
    };

    const handleSelectionOnKusamaMainNetwork = async (
        data: NetworkConfigType
    ): Promise<void> => {
        if (!data.disabled) {
            selectAndGoBack();
        }
    };

    // prettier-ignore
    const handleSelection = async (data: NetworkConfigType): Promise<void> => {
    setIsLoading(true);
    if (data.disabled) {
      setIsLoading(false);
      return;
    } if (data.name === 'Test Networks') {
      setModalState({
        firstStep: false,
        renderMethod: OtherContent,
        currentData: TestNetworks,
      });
      setIsLoading(false);
    } 
    else if (data.name === 'Polkadot' && modalState.firstStep === true) {
      setIsLoading(false);
      setModalState({
        firstStep: false,
        renderMethod: KusamaContent,
        currentData: PolkadotMainNetworks,
      });
    } 
    
    else if (data.name === 'Kusama' && modalState.firstStep === true) {
      setIsLoading(false);
      setModalState({
        firstStep: false,
        renderMethod: KusamaContent,
        currentData: KusamaMainNetworks,
      });
    } else if (rpcUrl !== data.rpcUrl) {
        // for showing loading waves like preloader
      generalDispatcher(()=>setApiInitializationStarts(true));
      if (window.navigator.onLine) {
        generalDispatcher(()=>setLoadingForApi(true));
        generalDispatcher(()=>setRpcUrl(data.rpcUrl ? data.rpcUrl : ''));
        generalDispatcher(()=>setChainName(data.name));
        generalDispatcher(()=>setTokenImage(data.logo));
        // generalDispatcher(()=>setPrefix(data.prefix));
        generalDispatcher(()=>setQueryEndpoint(data.queryEndpoint));
        
        // eslint-disable-next-line max-len
        generalDispatcher(()=>setPublicKey(currentUser.activeAccount.publicKey));

        setIsLoading(false);

        selectAndGoBack();
      } else {
        // showInternetSnackBar();

        openModalForInternetIssue();

        setTimeout(() => {
          generalDispatcher(()=>setIsResponseModalOpen(false));
        }, 2500);

        setIsLoading(false);

        selectAndGoBack();
        setTimeout(() => {
          generalDispatcher(()=>
              setApiInitializationStarts(false)
              ); // for removing loading waves
        }, 2000);
      }
    } else {
      setIsLoading(false);
      selectAndGoBack();
    }
  };

    // --------XXXXXXXXXXXXXXX-----------

    // Drop Down
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClickOnAccountSettings = (event: any): void => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseDropDown = (): void => {
        setAnchorEl(null);
    };

    if (jsonFileUploadScreen) {
        navigate(IMPORT_WALLET);
        return null;
    }

    return (
        <DashboardView
            isLoading={isLoading}
            transactionData={transactions}
            txDetailsModalData={txDetailsModalData}
            setTxDetailsModalData={setTxDetailsModalData}
            isTxDetailsModalOpen={isTxDetailsModalOpen}
            setIsTxDetailsModalOpen={setIsTxDetailsModalOpen}
            publicKey={publicKey}
            prefix={prefix}
            chainName={chainName}
            balance={balances[0] ? balances[0].balance : 0}
            balanceInUsd={balanceInUsd}
            tokenName={tokenName}
            accountName={accountName}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            modalState={modalState}
            resetState={resetState}
            handleSelectionOnKusamaMainNetwork={
                handleSelectionOnKusamaMainNetwork
            }
            handleSelection={handleSelection}
            anchorEl={anchorEl}
            open={open}
            handleClickOnAccountSettings={handleClickOnAccountSettings}
            handleCloseDropDown={handleCloseDropDown}
            apiInitializationStarts={apiInitializationStarts}
        />
    );
};

export default Dashboard;
