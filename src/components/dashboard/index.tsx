import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { makeStyles } from '@mui/styles';
import type { ApiPromise as ApiPromiseType } from '@polkadot/api';

// Drop Down Icons
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import type {
    AccountInfoWithProviders,
    AccountInfoWithRefCount,
} from '@polkadot/types/interfaces';

import { fonts, images } from '../../utils';
import services from '../../utils/services';

import MainCard from './mainCard';
import AssetsAndTransactions from './assetsAndTransactions';

import { setApiInitializationStarts } from '../../redux/slices/api';
import {
    setRpcUrl,
    setBalance,
    setChainName,
    setAccountName,
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

import { SelectNetwork, TxDetails, About } from '../common/modals';
import {
    HorizontalContentDiv,
    NextIcon,
    OptionRow,
    OptionText,
} from '../common/modals/selectNetwork/styledComponents';

import {
    setIsResponseModalOpen,
    setLoadingForApi,
    setMainTextForSuccessModal,
    setResponseImage,
    setSubTextForSuccessModal,
} from '../../redux/slices/modalHandling';

import networks from './networkModalData';
import DropDown from './dropDown';
import { RootState } from '../../redux/store';
import {
    ModalStateInterface,
    NetworkConfigType,
    RenderMethodProps,
    TransactionRecord,
} from './types';
import {
    CONFIRM_SEED,
    CREATE_WALLET,
    IMPORT_WALLET,
    SHOW_SEED,
    WELCOME,
} from '../../constants';

const { MainLogo, wifiOff } = images;
const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;
// const { showInternetSnackBar } = helpers;

const { getBalance, addressMapper } = services;

const { availableNetworks, KusamaMainNetworks, TestNetworks } = networks;

const useStyles = makeStyles(() => ({
    customWidth: {
        '& div': {
            // this is just an example, you can use vw, etc.
            background: 'transparent',
            // border: '1px solid green',
        },
    },
}));

const RenderContentForAvailableNetwroks = ({
    data,
    handleClick,
}: RenderMethodProps): JSX.Element => {
    const { name, logo, relayChain, disabled } = data;
    return (
        <OptionRow
            className={disabled ? 'tooltip' : 'abc'}
            key={name}
            onClick={() => handleClick(data)}
            disabled={disabled}
        >
            <HorizontalContentDiv>
                <img src={logo} alt="token" />
                <OptionText
                    className={mainHeadingfontFamilyClass}
                >{`${name}`}</OptionText>
            </HorizontalContentDiv>
            {relayChain && (name === 'Kusama' || name === 'Test Networks') && (
                <NextIcon>
                    <ArrowRightIcon />
                </NextIcon>
            )}
        </OptionRow>
    );
};

const RenderContentForKusamaMainNetwork = ({
    data,
    handleClick,
}: RenderMethodProps): JSX.Element => {
    const { name, logo, disabled } = data;
    const optionRow = {
        className: disabled ? 'tooltip' : 'abc',
        key: name,
        onClick: () => {
            handleClick(data);
        },
        disabled,
    };
    return (
        <OptionRow {...optionRow}>
            {disabled && <span className="tooltiptext">Coming Soon!</span>}
            <HorizontalContentDiv>
                <img src={logo} alt="icon" />
                <OptionText className={mainHeadingfontFamilyClass}>
                    {`${name}`}
                </OptionText>
            </HorizontalContentDiv>
        </OptionRow>
    );
};

const Dashboard: React.FunctionComponent = (props) => {
    const classes = useStyles(props);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
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
                            dispatch(setBalance(res));
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
                    dispatch(setJsonFileUploadScreen(false));
                }
            });
        }
    }, []);

    useEffect(() => {
        if (Object.values(accounts).length === 0) {
            dispatch(resetAccountSlice());
            navigate(WELCOME);
        }
    }, [accounts]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    // --------State and funtions for SlectNetwork Modal

    const [modalState, setModalState] = useState<ModalStateInterface>({
        firstStep: true,
        renderMethod: RenderContentForAvailableNetwroks,
        currentData: availableNetworks,
    });

    const resetState = (): void => {
        setModalState({
            firstStep: true,
            renderMethod: RenderContentForAvailableNetwroks,
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
        renderMethod: RenderContentForAvailableNetwroks,
        currentData: TestNetworks,
      });
      setIsLoading(false);
    } else if (data.name === 'Kusama' && modalState.firstStep === true) { // this condition is not in use at the moment
      setIsLoading(false);
      setModalState({
        firstStep: false,
        renderMethod: RenderContentForKusamaMainNetwork,
        currentData: KusamaMainNetworks,
      });
    } else if (rpcUrl !== data.rpcUrl) {
      dispatch(setApiInitializationStarts(true)); // for showing loading waves like preloader
      if (window.navigator.onLine) {
        dispatch(setLoadingForApi(true));
        dispatch(setRpcUrl(data.rpcUrl ? data.rpcUrl : ''));
        dispatch(setChainName(data.name));
        dispatch(setTokenImage(data.logo));
        dispatch(setPrefix(data.prefix));
        // eslint-disable-next-line max-len
        const publicKeyOfRespectiveChain = addressMapper(currentUser.activeAccount.publicKey, data.prefix ? data.prefix : 42);
        dispatch(setPublicKey(publicKeyOfRespectiveChain));

        setIsLoading(false);

        selectAndGoBack();
      } else {
        // showInternetSnackBar();

        dispatch(setMainTextForSuccessModal('Internet is down!'));
        dispatch(setSubTextForSuccessModal(''));
        dispatch(setResponseImage(wifiOff));
        dispatch(setIsResponseModalOpen(true));

        setTimeout(() => {
          dispatch(setIsResponseModalOpen(false));
        }, 2500);

        setIsLoading(false);

        selectAndGoBack();
        setTimeout(() => {
          dispatch(
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
    const handleClick = (event: any): void => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (): void => {
        setAnchorEl(null);
    };

    // --------XXXXXXXXXXXXXXX-----------

    const ifKusama = chainName.includes('Kusama')
        ? `${chainName} Main Network`
        : `${chainName} Network`;

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
        <Wrapper pb>
            <DashboardHeader>
                <LogoContainer>
                    <img
                        src={MainLogo}
                        width="30px"
                        height="34px"
                        alt="Metadot Logo"
                    />
                </LogoContainer>

                <NetworkContainer>
                    <SelectChain
                        onClick={() =>
                            !apiInitializationStarts && setIsModalOpen(true)
                        }
                        disabled={!!apiInitializationStarts}
                    >
                        <SelectedChain className={subHeadingfontFamilyClass}>
                            {chainName.includes('Network')
                                ? chainName
                                : ifKusama}
                        </SelectedChain>
                        <ArrowDropDownIcon
                            id="arrow-drop-down-icon"
                            style={{ fontSize: '1.7rem' }}
                        />
                    </SelectChain>
                </NetworkContainer>
                <AccountContainer id="account-container">
                    <AccountSetting id="account-setting" onClick={handleClick}>
                        <AccountText
                            id="account-text"
                            className={mainHeadingfontFamilyClass}
                        >
                            {accountName.slice(0, 1)}
                        </AccountText>
                    </AccountSetting>
                </AccountContainer>

                {/* Menu Start */}
                <DropDown
                    anchorEl={anchorEl}
                    open={open}
                    handleClose={handleClose}
                    // classes={classes}
                />
                {/* Menu End */}
            </DashboardHeader>

            <MainCard
                balance={balance}
                tokenName={tokenName}
                address={publicKey}
                balanceInUsd={balanceInUsd || 0}
                accountName={accountName}
            />

            <AssetsAndTransactions
                handleOpenTxDetailsModal={() => setIsTxDetailsModalOpen(true)}
                setTxDetailsModalData={setTxDetailsModalData}
                transactionData={transactions}
            />

            <SelectNetwork
                open={isModalOpen}
                handleClose={() => setIsModalOpen(false)}
                modalState={modalState}
                resetState={resetState}
                handleClickForOthers={handleSelection}
                handleClickForKusama={handleSelectionOnKusamaMainNetwork}
                style={{
                    position: 'relative',
                    width: '300px',
                    background: '#141414',
                    pb: 3,
                    overflowY: 'scroll',
                    overflowX: 'hidden',
                    marginTop: '9rem',
                }}
                isLoading={isLoading}
            />
            <TxDetails
                open={isTxDetailsModalOpen}
                handleClose={() => setIsTxDetailsModalOpen(false)}
                txDetailsModalData={txDetailsModalData}
                style={{
                    width: '300px',
                    background: '#141414',
                    position: 'relative',
                    p: 2,
                    px: 2,
                    pb: 3,
                }}
            />
            <About
                open={false}
                handleClose={() => console.log(false)}
                style={{
                    position: 'relative',
                    width: '300px',
                    minHeight: 380,
                    background: '#141414',
                    padding: '0 20px',
                    pb: 3,
                    height: '320px',
                    marginTop: '7rem',
                }}
            />
        </Wrapper>
    );
};

export default Dashboard;
