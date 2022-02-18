import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { makeStyles } from '@mui/styles';

// Drop Down Icons
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import keyring from '@polkadot/ui-keyring';
import { fonts } from '../../utils';
import services from '../../utils/services';
import accountsUtils from '../../utils/accounts';

import MainCard from './mainCard';
import AssetsAndTransactions from './assetsAndTransactions';

import { setApiInitializationStarts } from '../../redux/slices/api';
import {
    setRpcUrl,
    setBalance,
    setChainName,
    setAccountName,
    setPublicKey,
    resetAccountSlice,
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
import Logo from '../../assets/images/topLogo.svg';
import wifiOff from '../../assets/images/wifi-off.svg';
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

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;
// const { showInternetSnackBar } = helpers;

const { getBalance, addressMapper } = services;
const { KeyringInitialization } = accountsUtils;

const { availableNetworks, KusamaMainNetworks, TestNetworks, BetaNetworks } =
    networks;

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
    const { name, theme, moreOptions, disabled } = data;
    return (
        <OptionRow
            className={disabled ? 'tooltip' : 'abc'}
            key={name}
            onClick={() => handleClick(data)}
            disabled={disabled}
        >
            <HorizontalContentDiv>
                <img src={theme} alt="token" />
                <OptionText
                    className={mainHeadingfontFamilyClass}
                >{`${name}`}</OptionText>
                {/* {
        disabled
         && (
         <span {...tootltipText}>
           Coming Soon
         </span>
         )
        } */}
            </HorizontalContentDiv>
            {moreOptions && (
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
    const { name, icon, disabled } = data;
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
                <img src={icon} alt="icon" />
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
    } = currentUser.activeAccount;

    // const main = async (): Promise<void> => {
    //     const { api } = currentUser.api;

    //     // Retrieve the initial balance.
    //     // Since the call has no callback, it is simply a promise
    //     // that resolves to the current on-chain value
    //     let {
    //         data: { free: previousFree },
    //         // eslint-disable-next-line no-unused-vars
    //         nonce: previousNonce,
    //     } = await api.query.system.account(publicKey);
    //     // const decimalPlaces = await api.registry.chainDecimals;
    //     // Here we subscribe to any
    //     // balance changes and update the on-screen value
    //     api.query.system.account(
    //         publicKey,
    //         // eslint-disable-next-line consistent-return
    //         ({ data: { free: currentFree }, nonce: currentNonce }) => {
    //             // Calculate the delta
    //             const change = currentFree.sub(previousFree);

    //             // Only display positive value
    //             // changes (Since we are pulling `previous` above already,
    //             // the initial balance change will also be zero)
    //             if (!change.isZero()) {
    //                 const bal = getBalance(api, publicKey)
    //                     .then((res) => {
    //                         console.log('live balance', res);
    //                         dispatch(setBalance(res));
    //                     })
    //                     .catch((err) => console.log('Err', err));
    //                 // const newBalance =
    //                 // chainName === 'AcalaMandala' ? change /
    //                 // 10 ** decimalPlaces[0] : change / 10 ** decimalPlaces;
    //                 // dispatch(setBalance(newBalance + balance));

    //                 previousFree = currentFree;
    //                 return bal;
    //             }
    //         }
    //     );
    // };

    // main().catch(console.error);

    useEffect(() => {
        if (Object.values(accounts).length === 0) {
            dispatch(resetAccountSlice());
            navigate('/');
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

    // const tootltipText = {
    //   className: 'normalTooltiptext',
    //   style: {
    //     width: '90px',
    //     left: '65%',
    //     fontSize: '0.7rem',
    //     bottom: '110%',
    //     fontWeight: 300,
    //   },
    // };

    // prettier-ignore
    const handleSelection = async (data: NetworkConfigType): Promise<void> => {
    setIsLoading(true);
    if (data.disabled) {
      setIsLoading(false);
      return;
    } if (data.name === 'Test Networks') {
    //     const objForModalState: ModalStateInterface = {
    //     firstStep: false,
    //     renderMethod: RenderContentForAvailableNetwroks,
    //     currentData: TestNetworks,
    //   }
      setModalState({
        firstStep: false,
        renderMethod: RenderContentForAvailableNetwroks,
        currentData: TestNetworks,
      });
      setIsLoading(false);
    } else if (data.name === 'Kusama Main Networks') { // this condition is not in use at the moment
      setIsLoading(false);
      setModalState({
        firstStep: false,
        renderMethod: RenderContentForKusamaMainNetwork,
        currentData: KusamaMainNetworks,
      });
    } else if (data.name === 'Beta Networks') {
      setIsLoading(false);
      setModalState({
        firstStep: false,
        renderMethod: RenderContentForKusamaMainNetwork,
        currentData: BetaNetworks,
      });
    } else if (rpcUrl !== data.rpcUrl) {
      dispatch(setApiInitializationStarts(true)); // for showing loading waves like preloader
      if (window.navigator.onLine) {
        dispatch(setLoadingForApi(true));
        dispatch(setRpcUrl(data.rpcUrl ? data.rpcUrl : ''));
        dispatch(setChainName(data.name));
        // eslint-disable-next-line max-len
        const publicKeyOfRespectiveChain = addressMapper(currentUser.activeAccount.publicKey, data.prefix ? data.prefix : 42);
        dispatch(setPublicKey(publicKeyOfRespectiveChain));

        setIsLoading(false);

        selectAndGoBack();
      } else {
        console.log('Internet is down!');
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
      console.log('Already selected!');
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

    console.log('transactions ------> ', transactions);

    return (
        <Wrapper pb>
            <DashboardHeader>
                <LogoContainer>
                    <img
                        src={Logo}
                        width="30px"
                        height="34px"
                        alt="Metadot Logo"
                    />
                </LogoContainer>

                <NetworkContainer>
                    <SelectChain
                        onClick={() =>
                            apiInitializationStarts
                                ? console.log('abc')
                                : setIsModalOpen(true)
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
                    height: '240px',
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
                // transactionData={transactions[0]}
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
