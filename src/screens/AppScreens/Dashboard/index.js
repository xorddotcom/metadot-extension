/* eslint-disable react/button-has-type */
/* eslint-disable no-return-assign */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint import/no-cycle: [2, { maxDepth: 1 }] */
import React, { useState, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

// eslint-disable-next-line import/namespace
import { CircularProgress } from '@mui/material';
import { options } from '@acala-network/api';
import { getTokenPrice } from '../../../utils/api';
import MainCard from './MainCard';
import Operations from './Operations';
import AssetsAndTransactions from './AssetsAndTransactions';

import { getBalanceWithMultipleTokens } from '../../../utils/services';
import { setApiInitializationStarts } from '../../../redux/slices/api';
import {
  setRpcUrl, setBalance, setChainName,
} from '../../../redux/slices/account';
import { fonts } from '../../../utils';
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
import Logo from '../../../assets/images/48x48.png';
import { SelectNetwork, TxDetails } from '../../../components';
import {
  HorizontalContentDiv,
  NextIcon,
  OptionRow,
  OptionText,
} from '../../../components/Modals/SelectNetwork/StyledComponents';

import {
  setLoadingFor,
} from '../../../redux/slices/successModalHandling';

import networks from './networkModalData';

const { WsProvider, ApiPromise, Keyring } = require('@polkadot/api');
const { cryptoWaitReady } = require('@polkadot/util-crypto');

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

const {
  availableNetworks,
  KusamaMainNetworks,
  TestNetworks,
  BetaNetworks,
} = networks;

function Dashboard(props) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions.transactions);
  const [txDetailsModalData, setTxDetailsModalData] = useState('');
  const [isTxDetailsModalOpen, setIsTxDetailsModalOpen] = useState(false);

  const currentUser = useSelector((state) => state);
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

  useEffect(() => {
    getTokenPrice(apiTokenName);
  }, [apiTokenName]);

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
    return (
      <OptionRow
        className={disabled ? 'tooltip' : 'abc'}
        key={name}
        onClick={() => {
          handleClick(data);
        }}
        disabled={disabled}
      >
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
                color: '#fafafa',
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

  // function is not declared
  // Acala network initialization
  const initializeAcalaNetwork = async () => {
    try {
      const provider = new WsProvider(
        'wss://acala-mandala.api.onfinality.io/public-ws',
      );
      const api = new ApiPromise(options({ provider }));
      await api.isReady;

      const { data: balance } = await api.query.system.account(publicKey);
      const decimal = api.registry.chainDecimals;
      const properties = await api.rpc.system.properties();
      const [now, { nonce, data: balances }] = await Promise.all([
        api.query.timestamp.now(),
        api.query.system.account(publicKey),
      ]);
    } catch (err) {
      console.log('Error', err);
    }
  };

  // function is not declared
  // ACALA MANDALA TRANSACTION
  const sendTransaction = async () => {
    try {
      const provider = new WsProvider(
        'wss://acala-mandala.api.onfinality.io/public-ws',
      );
      const api = new ApiPromise(options({ provider }));
      await api.isReady;

      await cryptoWaitReady();
      const keyring = new Keyring({ type: 'sr25519' });
      const sender = keyring.addFromUri(seed);

      const hash = await api.tx.balances
        .transfer(
          '5Dz1i42ygyhi4BxPnvKtRY4TBShTMC9T2FvaMB8CWxoU3QgG',
          '3000000000000',
        ).signAndSend(sender, (res) => {
          if (res.status.isInBlock) {
            console.log(`Completed at block hash #${res.status.asInBlock.toString()}`);
            console.log('Current status of IF', res.status.type);
          }
        });
    } catch (err) {
      console.log('Error', err);
    }
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

  // function is not declared
  const getBalanceHere = async () => {
    const res = await getBalanceWithMultipleTokens(currentUser.api.api, publicKey);
  };

  // function is not declared
  const testing = async () => {
    const { data: balance } = await currentUser.api.api.query.system.account('5DXomcfWBhckmx8N9jG7GuVzJcTQpREC5hYoCteD6KcwnacY');
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

  // --------XXXXXXXXXXXXXXX-----------

  return (
    <Wrapper>
      <DashboardHeader>
        <LogoContainer>
          <img src={Logo} width="30px" height="34px" alt="Polo Wallet Logo" />
        </LogoContainer>

        <NetworkContainer>
          <SelectChain onClick={() => setIsModalOpen(true)}>
            <SelectedChain className={subHeadingfontFamilyClass}>
              {chainName.includes('Network')
                ? chainName
                : `${chainName} Network`}

            </SelectedChain>
            <ArrowDropDownIcon style={{ fontSize: '0.8rem' }} />
          </SelectChain>
        </NetworkContainer>

        <AccountContainer>
          <AccountSetting>
            <AccountText onClick={handleClick} className={mainHeadingfontFamilyClass}>
              {accountName.slice(0, 1)}
            </AccountText>
          </AccountSetting>
        </AccountContainer>

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

      <Operations />

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
  );
}

export default Dashboard;
