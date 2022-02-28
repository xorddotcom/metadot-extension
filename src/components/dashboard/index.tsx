import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import type { ApiPromise as ApiPromiseType } from '@polkadot/api';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import type {
    AccountInfoWithProviders,
    AccountInfoWithRefCount,
} from '@polkadot/types/interfaces';
import MainCard from './components/MainCard';
import AssetsAndTransactions from './components/Tabs';
import DropDown from './components/Dropdown';
import OtherContent from './components/RenderContentForAllNetworks';
import KusamaContent from './components/RenderContentForKusama';
import { SelectNetwork, TxDetails, About } from '../common/modals';

import { setApiInitializationStarts } from '../../redux/slices/api';
import {
    setRpcUrl,
    setBalance,
    setChainName,
    setTokenImage,
    setPublicKey,
    resetAccountSlice,
    setJsonFileUploadScreen,
    setPrefix,
} from '../../redux/slices/activeAccount';

import {
    AccountContainer,
    AccountSetting,
    AccountText,
    DashboardHeader,
    LogoContainer,
    NetworkContainer,
    SelectChain,
    SelectedChain,
    Wrapper,
} from './styledComponents';

import { fonts, images } from '../../utils';
import services from '../../utils/services';

import {
    setIsResponseModalOpen,
    setLoadingForApi,
} from '../../redux/slices/modalHandling';

import networks from './networkModalData';
import { RootState } from '../../redux/store';
import useDispatcher from '../../hooks/useDispatcher';
import useResponseModal from '../../hooks/useResponseModal';
import {
    ModalStateInterface,
    NetworkConfigType,
    TransactionRecord,
} from './types';
import {
    CONFIRM_SEED,
    CREATE_WALLET,
    IMPORT_WALLET,
    SHOW_SEED,
    WELCOME,
} from '../../constants';
import DashboardView from './view';

const { MainLogo, wifiOff } = images;
const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

const { getBalance, addressMapper } = services;

const { availableNetworks, KusamaMainNetworks, TestNetworks } = networks;

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
            accountTo: '',
            amount: '',
            hash: '',
            operation: '',
            status: '',
            chainName: '',
            tokenName: '',
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
        chainName,
        balance,
        tokenName,
        balanceInUsd,
        accountName,
        rpcUrl,
        jsonFileUploadScreen,
        accountCreationStep,
        tempSeed,
    } = currentUser.activeAccount;

    const api = currentUser.api.api as ApiPromiseType;
    async function main(): Promise<void> {
        const {
            data: { free: previousFree },
        }: AccountInfoWithProviders | AccountInfoWithRefCount =
            await api.query.system.account(publicKey);
        // Listener
        api.query.system.account(
            publicKey,
            ({
                data: { free: currentFree },
            }: AccountInfoWithProviders | AccountInfoWithRefCount) => {
                const change = currentFree.sub(previousFree);
                if (!change.isZero()) {
                    const bal = getBalance(api, publicKey)
                        .then((res) => {
                            generalDispatcher(() => setBalance(res));
                        })
                        .catch((err) => console.log('Err', err));
                }
            }
        );
    }
    main().catch(console.error);

    const lastTime = localStorage.getItem('timestamp');
    const lastVisited = (Date.now() - Number(lastTime) || 0) / 1000;

    const getOwnTabs = (): Promise<unknown[]> => {
        return Promise.all(
            chrome.extension.getViews({ type: 'tab' }).map(
                // eslint-disable-next-line max-len
                (view) =>
                    new Promise((resolve) =>
                        // eslint-disable-next-line no-promise-executor-return
                        view.chrome.tabs.getCurrent((tab) =>
                            resolve(
                                Object.assign(tab, { url: view.location.href })
                            )
                        )
                    )
            )
        );
    };

    const isTabViewOpened = async (url: string): Promise<boolean> => {
        const ownTabs = await getOwnTabs();
        const tabd = ownTabs.find((tab: any) => tab.url.includes(url));
        if (tabd) {
            // chrome.tabs.update(tabd.id, { active: true });
            return true;
        }
        // chrome.tabs.create({ url });
        return false;
    };

    useEffect(() => {
        if (jsonFileUploadScreen) {
            const url = `${chrome.extension.getURL('index.html')}`;
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
    } else if (data.name === 'Kusama' && modalState.firstStep === true) { // this condition is not in use at the moment
      setIsLoading(false);
      setModalState({
        firstStep: false,
        renderMethod: KusamaContent,
        currentData: KusamaMainNetworks,
      });
    } else if (rpcUrl !== data.rpcUrl) {
      generalDispatcher(()=>setApiInitializationStarts(true)); // for showing loading waves like preloader
      if (window.navigator.onLine) {
        generalDispatcher(()=>setLoadingForApi(true));
        generalDispatcher(()=>setRpcUrl(data.rpcUrl ? data.rpcUrl : ''));
        generalDispatcher(()=>setChainName(data.name));
        generalDispatcher(()=>setTokenImage(data.logo));
        generalDispatcher(()=>setPrefix(data.prefix));
        // eslint-disable-next-line max-len
        const publicKeyOfRespectiveChain = addressMapper(currentUser.activeAccount.publicKey, data.prefix ? data.prefix : 42);
        generalDispatcher(()=>setPublicKey(publicKeyOfRespectiveChain));

        setIsLoading(false);

        selectAndGoBack();
      } else {
        // showInternetSnackBar();

        // dispatch(setMainTextForSuccessModal('Internet is down!'));
        // dispatch(setSubTextForSuccessModal(''));
        // dispatch(setResponseImage(wifiOff));
        // dispatch(setIsResponseModalOpen(true));
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

    // --------XXXXXXXXXXXXXXX-----------

    if (accountCreationStep === 1 && lastVisited < 90) {
        navigate(SHOW_SEED, {
            state: { seedToPass: tempSeed },
        });
        return null;
    }
    if (accountCreationStep === 2 && tempSeed.length && lastVisited < 90) {
        navigate(CONFIRM_SEED, {
            state: { seedToPass: tempSeed },
        });
        return null;
    }
    if (accountCreationStep === 3 && tempSeed.length && lastVisited < 90) {
        navigate(CREATE_WALLET, {
            state: { seedToPass: tempSeed },
        });
        return null;
    }

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
            chainName={chainName}
            balance={balance}
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
