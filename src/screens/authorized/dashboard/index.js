import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';
import {
  CircularProgress,
} from '@mui/material';

// Drop Down Icons
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import ApiCalls from '../../../utils/api';
import {
  fonts,
  colors,
} from '../../../utils';
import services from '../../../utils/services';

import MainCard from './mainCard';
import AssetsAndTransactions from './assetsAndTransactions';

import { setApiInitializationStarts } from '../../../redux/slices/api';
import {
  setRpcUrl,
  setBalance,
  setChainName,
  setAccountName,
  setPublicKey,
} from '../../../redux/slices/activeAccount';

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
import Logo from '../../../assets/images/topLogo.svg';
import { SelectNetwork, TxDetails } from '../../../components';
import {
  HorizontalContentDiv,
  NextIcon,
  OptionRow,
  OptionText,
} from '../../../components/modals/selectNetwork/styledComponents';

import { setLoadingForApi } from '../../../redux/slices/modalHandling';

import networks from './networkModalData';
import DropDown from './dropDown';
import { About } from '../../../components/modals';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;
const { primaryText } = colors;

const { getBalance, addressMapper } = services;

const {
  availableNetworks,
  KusamaMainNetworks,
  TestNetworks,
  BetaNetworks,
} = networks;

const useStyles = makeStyles(() => ({
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
  const accounts = useSelector((state) => state.accounts);
  const [txDetailsModalData, setTxDetailsModalData] = useState('');
  const [isTxDetailsModalOpen, setIsTxDetailsModalOpen] = useState(false);

  const currentUser = useSelector((state) => state);
  const { apiInitializationStarts } = useSelector((state) => state.api);
  const {
    publicKey, chainName, balance, tokenName, balanceInUsd, accountName, walletName, rpcUrl,
  } = currentUser.activeAccount;
  async function main() {
    const { api } = currentUser.api;

    // Retrieve the initial balance. Since the call has no callback, it is simply a promise
    // that resolves to the current on-chain value
    let {
      data: { free: previousFree },
      // eslint-disable-next-line no-unused-vars
      nonce: previousNonce,
    } = await api.query.system.account(publicKey);
    // const decimalPlaces = await api.registry.chainDecimals;
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
          const bal = getBalance(api, publicKey)
            .then((res) => {
              dispatch(setBalance(res));
            })
            .catch((err) => console.log('Err', err));
          // const newBalance = chainName === 'AcalaMandala' ? change /
          // 10 ** decimalPlaces[0] : change / 10 ** decimalPlaces;
          // dispatch(setBalance(newBalance + balance));

          previousFree = currentFree;
          previousNonce = currentNonce;
          return bal;
        }
      },
    );
  }

  main().catch(console.error);

  const apiTokenName = 'polkadot';
  const getTokenApi = `https://api.coingecko.com/api/v3/simple/price?ids=${apiTokenName}&vs_currencies=usd`;
  const getTokenPrice = new ApiCalls();

  useEffect(() => {
    getTokenPrice.GetRequest(getTokenApi);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // --------State and funtions for SlectNetwork Modal
  const handleSelectionOnKusamaMainNetwork = (data) => {
    if (!data.disabled) {
      selectAndGoBack(data.name);
    }
  };

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
                color: primaryText,
                width: 20,
                height: 25,
                paddingRight: 20,
              }}
            />
          )}
        </HorizontalContentDiv>
        {moreOptions && (
          <NextIcon>
            <ArrowRightIcon />
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
    } else if (rpcUrl !== data.rpcUrl) {
      dispatch(setApiInitializationStarts(true)); // for showing loading waves like preloader
      dispatch(setLoadingForApi(true));
      dispatch(setRpcUrl({ rpcUrl: data.rpcUrl }));
      dispatch(setChainName({ chainName: data.name }));
      const publicKeyOfRespectiveChain = addressMapper(currentUser.account.publicKey, data.prefix);
      dispatch(setPublicKey(publicKeyOfRespectiveChain));

      setIsLoading(false);

      selectAndGoBack(data.name);
    } else {
      console.log('Already selected!');
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
      <Wrapper pb>
        <DashboardHeader>
          <LogoContainer>
            <img src={Logo} width="30px" height="34px" alt="Metadot Logo" />
          </LogoContainer>

          <NetworkContainer>
            <SelectChain
              onClick={() => (apiInitializationStarts ? console.log('abc') : setIsModalOpen(true))}
              disabled={!!apiInitializationStarts}
            >
              <SelectedChain className={subHeadingfontFamilyClass}>
                {/* {chainName.includes('Test') && `${chainName} Test Network`} */}

                {chainName.includes('Network')
                  ? chainName
                  : chainName.includes('Kusama')
                    ? `${chainName} Main Network`
                    : `${chainName} Network` }

              </SelectedChain>
              <ArrowDropDownIcon id="arrow-drop-down-icon" style={{ fontSize: '1.7rem' }} />
            </SelectChain>
          </NetworkContainer>
          <AccountContainer id="account-container">
            <AccountSetting id="account-setting" onClick={handleClick}>
              <AccountText id="account-text" className={mainHeadingfontFamilyClass}>
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
            accounts={accounts}
            setSeed={() => console.log('setSeed')}
            setPublicKey={setPublicKey}
            setAccountName={setAccountName}
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
            height: '300px',
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
          transactionData={transactions}
          style={{
            width: '78%',
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
            width: '78%',
            minHeight: 380,
            background: '#141414',
            padding: '0 20px',
            pb: 3,
            height: '320px',
            marginTop: '7rem',
          }}
        />
      </Wrapper>
    </>
  );
}

export default Dashboard;
