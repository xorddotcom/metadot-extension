/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
/* eslint-disable no-return-assign */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint import/no-cycle: [2, { maxDepth: 1 }] */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';
// eslint-disable-next-line import/namespace
import {
  CircularProgress,
} from '@mui/material';

// Drop Down Icons
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import ApiCalls from '../../../utils/api';
import MainCard from './MainCard';
import AssetsAndTransactions from './AssetsAndTransactions';

import { setApiInitializationStarts } from '../../../redux/slices/api';
import {
  setRpcUrl, setBalance, setChainName, setLoggedIn, resetAccountSlice,
} from '../../../redux/slices/account';
import { fonts, colors } from '../../../utils';
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
} from './StyledComponents';
import Logo from '../../../assets/images/topLogo.svg';
import { SelectNetwork, TxDetails } from '../../../components';
import {
  HorizontalContentDiv,
  NextIcon,
  OptionRow,
  OptionText,
} from '../../../components/Modals/SelectNetwork/StyledComponents';

import {
  setAuthScreenModal,
  setLoadingFor,
} from '../../../redux/slices/successModalHandling';

import networks from './networkModalData';
import DropDown from './DropDown';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;
const { primaryTextColor } = colors;

const {
  availableNetworks,
  KusamaMainNetworks,
  TestNetworks,
  BetaNetworks,
} = networks;

const useStyles = makeStyles((theme) => ({
  customWidth: {
    '& div': {
      // this is just an example, you can use vw, etc.
      background: 'transparent',
      // border: '1px solid green',
    },
  },
}));

function Dashboard(props) {
  const classes = useStyles(props);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions.transactions);
  const [txDetailsModalData, setTxDetailsModalData] = useState('');
  const [isTxDetailsModalOpen, setIsTxDetailsModalOpen] = useState(false);

  const currentUser = useSelector((state) => state);
  const { apiInitializationStarts } = useSelector((state) => state.api);
  const {
    publicKey, chainName, balance, tokenName, seed, balanceInUsd, accountName, walletName,
  } = currentUser.account;
  async function main() {
    const { api } = currentUser.api;
    console.log('Listner working', api);

    // Retrieve the initial balance. Since the call has no callback, it is simply a promise
    // that resolves to the current on-chain value
    let {
      data: { free: previousFree },
      nonce: previousNonce,
    } = await api.query.system.account(publicKey);
    const decimalPlaces = await api.registry.chainDecimals;
    // Here we subscribe to any balance changes and update the on-screen value
    api.query.system.account(
      publicKey,
      // eslint-disable-next-line consistent-return
      ({ data: { free: currentFree }, nonce: currentNonce }) => {
        // Calculate the delta
        const change = currentFree.sub(previousFree);

        // Only display positive value changes (Since we are pulling `previous` above already,
        // the initial balance change will also be zero)
        if (!change.isZero()) {
          const newBalance = chainName === 'AcalaMandala' ? change / 10 ** decimalPlaces[0] : change / 10 ** decimalPlaces;
          dispatch(setBalance(newBalance + balance));

          previousFree = currentFree;
          previousNonce = currentNonce;
          return newBalance;
        }
      },
    );
  }

  main().catch(console.error);

  const [apiTokenName, setApiTokenName] = useState('polkadot');
  const getTokenApi = `https://api.coingecko.com/api/v3/simple/price?ids=${apiTokenName}&vs_currencies=usd`;
  const getTokenPrice = new ApiCalls();

  useEffect(() => {
    getTokenPrice.GetRequest(getTokenApi);
  }, [getTokenApi]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // --------State and funtions for SlectNetwork Modal
  const handleSelectionOnKusamaMainNetwork = (data) => {
    if (!data.disabled) {
      selectAndGoBack(data.name);
    }
  };

  // --------State and funtions for SlectNetwork Modal
  // this function is currently not in use becuase other kusama main networks are disabled
  const RenderContentForKusamaMainNetwork = (data, handleClick) => {
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
          <OptionText className={mainHeadingfontFamilyClass}>{`${name}`}</OptionText>
        </HorizontalContentDiv>
      </OptionRow>
    );
  };

  const RenderContentForAvailableNetwroks = (data, handleClick) => {
    const {
      name, theme, moreOptions, disabled,
    } = data;
    return (
      <OptionRow
        className={disabled && 'tooltip'}
        key={name}
        onClick={async () => {
          setIsLoading(true);
          await handleClick(data);
        }}
        disabled={disabled}
      >
        {disabled && <span className="tooltiptext">Coming Soon!</span>}
        <HorizontalContentDiv>
          <img src={theme} alt="token" />
          <OptionText className={mainHeadingfontFamilyClass}>{name}</OptionText>
          {isLoading && (
            <CircularProgress
              style={{
                color: primaryTextColor,
                width: 20,
                height: 25,
                paddingRight: 20,
              }}
            />
          )}
        </HorizontalContentDiv>
        {moreOptions && (
          <NextIcon>
            <KeyboardArrowRightIcon />
          </NextIcon>
        )}
      </OptionRow>
    );
  };

  const [modalState, setModalState] = useState({
    firstStep: true,
    renderMethod: RenderContentForAvailableNetwroks,
    currentData: availableNetworks,
  });

  const selectAndGoBack = () => {
    resetState();
    setIsModalOpen(false);
  };

  const resetState = () => {
    setModalState({
      firstStep: true,
      renderMethod: RenderContentForAvailableNetwroks,
      currentData: availableNetworks,
    });
  };

  // prettier-ignore
  const handleSelection = async (data) => {
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
    } else {
      dispatch(setApiInitializationStarts(true));
      dispatch(setLoadingFor('Api Initialization...'));
      dispatch(setRpcUrl({ rpcUrl: data.rpcUrl }));
      dispatch(setChainName({ chainName: data.name }));

      setIsLoading(false);

      selectAndGoBack(data.name);
    }
  };

  // --------XXXXXXXXXXXXXXX-----------

  // Drop Down
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // --------XXXXXXXXXXXXXXX-----------

  return (
    <>
      <Wrapper>
        <DashboardHeader>
          <LogoContainer onClick={() => dispatch(setAuthScreenModal(true))}>
            <img src={Logo} width="30px" height="34px" alt="Metadot Logo" />
          </LogoContainer>

          <NetworkContainer>
            <SelectChain
              onClick={() => (apiInitializationStarts ? console.log('abc') : setIsModalOpen(true))}
              disabled={!!apiInitializationStarts}
            >
              <SelectedChain className={subHeadingfontFamilyClass}>
                {chainName.includes('Network')
                  ? chainName
                  : `${chainName} Network`}

              </SelectedChain>
              <ArrowDropDownIcon id="arrow-drop-down-icon" style={{ fontSize: '1.7rem' }} />
            </SelectChain>
          </NetworkContainer>

          <AccountContainer id="account-container">
            <AccountSetting id="account-setting">
              <AccountText id="account-text" onClick={handleClick} className={mainHeadingfontFamilyClass}>
                {accountName.slice(0, 1)}
              </AccountText>
            </AccountSetting>
          </AccountContainer>

          {/* Menu Start */}
          <DropDown
            anchorEl={anchorEl}
            open={open}
            handleClose={handleClose}
            classes={classes}
          />
          {/* Menu End */}

        </DashboardHeader>

        <MainCard
          balance={balance}
          chainName={chainName}
          tokenName={tokenName}
          address={publicKey}
          walletName={walletName}
          balanceInUsd={balanceInUsd || 0}
          accountName={accountName}
        />

        <AssetsAndTransactions
          handleOpenTxDetailsModal={() => setIsTxDetailsModalOpen(true)}
          setTxDetailsModalData={setTxDetailsModalData}
          transactionData={transactions}
        />

        {/* <button
        onClick={() => setAuthScreenModal(true)}
        handleClose={() => setAuthScreenModal(false)}
      >
        Authorization Modal

      </button> */}

        <SelectNetwork
          open={isModalOpen}
          handleClose={() => setIsModalOpen(false)}
          modalState={modalState}
          resetState={resetState}
          handleClickForOthers={handleSelection}
          setIsLoading={setIsLoading}
          handleClickForKusama={handleSelectionOnKusamaMainNetwork}
          style={{
            position: 'relative',
            width: '78%',
            minHeight: 240,
            background: '#141414',
            pb: 3,
          }}
          isLoading={isLoading}
        />
        <TxDetails
          open={isTxDetailsModalOpen}
          handleClose={() => setIsTxDetailsModalOpen(false)}
          txDetailsModalData={txDetailsModalData}
          transactionData={transactions}
          style={{
            width: '78%',
            background: '#141414',
            position: 'relative',
            p: 2,
            px: 2,
            pb: 3,
          // mt: 15,
          }}
        />
      </Wrapper>
      {/* ------------------------- */}
    </>
  );
}

export default Dashboard;
