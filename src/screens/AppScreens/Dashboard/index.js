/* eslint-disable react/button-has-type */
/* eslint-disable no-return-assign */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React, { useState, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Cloud from '@mui/icons-material/Cloud';
// Drop Down Icons
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

// eslint-disable-next-line import/namespace
import { CircularProgress } from '@mui/material';
import { options } from '@acala-network/api';
import axios from 'axios';
import MainCard from './MainCard';
import Operations from './Operations';
import AssetsAndTransactions from './AssetsAndTransactions';

import { providerInitialization, getBalance, getBalanceWithMultipleTokens } from '../../../ToolBox/services';
// import onChainConstants from '../../../constants/onchain'
import constants from '../../../constants/onchain';
import {
  setRpcUrl, setBalance, setSeed, setTokenName, setChainName,
} from '../../../redux/slices/account';
import { setApi, setApiInitializationStarts } from '../../../redux/slices/api';

import { fonts, helpers } from '../../../utils';
import {
  AccountContainer,
  AccountSetting,
  AccountText,
  DashboardHeader,
  LogoContainer,
  NetworkContainer,
  SelectChain,
  SelectedChain,
  SwitchToTestnet,
  Wrapper,
} from './StyledComponents';

// import Logo from '../../../assets/images/logodraft.svg';
import Logo from '../../../assets/images/48x48.png';
import { SelectNetwork, TxDetails } from '../../../components';
import {
  HorizontalContentDiv,
  NextIcon,
  OptionRow,
  OptionText,
  PlainIcon,
} from '../../../components/Modals/SelectNetwork/StyledComponents';
import RpcClass from '../../../rpc';

import KusamaIcon from '../../../assets/images/kusama.svg';
import KaruraIcon from '../../../assets/images/karura.svg';
import MoonriverIcon from '../../../assets/images/moonriver.svg';
import ShidenIcon from '../../../assets/images/shiden.svg';
import PhalaIcon from '../../../assets/images/phala.svg';
import BifrostIcon from '../../../assets/images/bifrost.svg';
import {
  setIsSuccessModalOpen,
  setLoadingFor,
  setMainTextForSuccessModal,
  setSubTextForSuccessModal,
} from '../../../redux/slices/successModalHandling';

// Assests Token images
import dusty from '../../../assets/images/tokenImg/dusty.png';
import kusamaKsm from '../../../assets/images/tokenImg/kusama-ksm.svg';
import polkadotDot from '../../../assets/images/tokenImg/polkadot.png';
import westendColour from '../../../assets/images/tokenImg/westend_colour.svg';
import acala from '../../../assets/images/tokenImg/acala-circle.svg';
import yellow from '../../../assets/images/tokenImg/yellow.png';
import green from '../../../assets/images/tokenImg/green.jpeg';
import phala from '../../../assets/images/phala.svg';
import moonbase from '../../../assets/images/moonriver.svg';
import rococoIcon from '../../../assets/images/rococo.svg';

import astarIcon from '../../../assets/images/astar.png';

const { WsProvider, ApiPromise, Keyring } = require('@polkadot/api');
const BN = require('bn.js');
const { cryptoWaitReady } = require('@polkadot/util-crypto');

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;
const { convertIntoUsd } = helpers;

const availableNetworks = [
  {
    name: 'Polkadot Main Network',
    theme: polkadotDot,
    moreOptions: false,
    rpcUrl: constants.Polkadot_Rpc_Url,
  },
  {
    name: 'Kusama Main Networks',
    theme: kusamaKsm,
    moreOptions: true,
    rpcUrl: constants.Kusama_Rpc_Url,
    icon: KusamaIcon,
    parachain: false,
    mainNetwork: true,
    testNet: null,
    disabled: false,
  },
  {
    name: 'Test Networks',
    theme: yellow,
    moreOptions: true,
  },
  {
    name: 'Beta Networks',
    theme: green,
    moreOptions: true,
    rpcUrl: constants.Astar_Rpc_Url,
    icon: KusamaIcon,
    parachain: false,
    mainNetwork: true,
    testNet: null,
    disabled: false,
  },
];

const BetaNetworks = [
  {
    name: 'Astar',
    icon: astarIcon,
    parachain: false,
    mainNetwork: true,
    testNet: null,
    rpcUrl: constants.Astar_Rpc_Url,
    disabled: false,
    tokenName: 'Kusama',
  },
];

const KusamaMainNetworks = [
  {
    name: 'Kusama',
    icon: KusamaIcon,
    parachain: false,
    mainNetwork: true,
    testNet: null,
    rpcUrl: constants.Kusama_Rpc_Url,
    disabled: false,
    tokenName: 'Kusama',
  },
  {
    name: 'Karura',
    icon: KaruraIcon,
    parachain: true,
    mainNetwork: true,
    testNet: 'AcalaMandala',
    disabled: true,
  },
  {
    name: 'Moonriver',
    icon: MoonriverIcon,
    parachain: true,
    mainNetwork: true,
    disabled: true,
  },
  {
    name: 'Shiden',
    icon: ShidenIcon,
    parachain: true,
    mainNetwork: true,
    testNet: 'Dusty',
    disabled: true,
  },
  {
    name: 'Khala',
    icon: PhalaIcon,
    parachain: true,
    mainNetwork: true,
    testNet: 'Phala',
    disabled: true,
  },
  {
    name: 'Bifrost',
    icon: BifrostIcon,
    parachain: false,
    mainNetwork: true,
    testNet: 'Asgard',
    disabled: true,
  },
];

const TestNetworks = [
  {
    name: 'Westend',
    theme: westendColour,
    rpcUrl: constants.WestEndRpcUrl,
    tokenName: 'Westend',
  },
  {
    name: 'Rococo',
    theme: rococoIcon,
    rpcUrl: constants.Rococo_Rpc_Url,
    tokenName: 'Roc',
    // disabled: false,
  },
  {
    name: 'AcalaMandala',
    theme: acala,
    rpcUrl: constants.Acala_Mandala_Rpc_Url,
    tokenName: 'Acala',
  },
  {
    name: 'Dusty',
    theme: dusty,
    disabled: false,
    rpcUrl: constants.Dusty_Rpc_Url,
    tokenName: 'Dusty',
  },
  {
    name: 'Moonbase',
    theme: moonbase,
    disabled: true,
  },
  {
    name: 'Asgard',
    theme: BifrostIcon,
    disabled: true,
  },
  {
    name: 'Phala',
    theme: phala,
    disabled: true,
    rpcUrl: constants.Phala_Rpc_Url,
    tokenName: 'Phala',
  },
];

const useStyles = makeStyles((theme) => ({
  paperMenu: {
    backgroundColor: '#212121 !important',
    '&:before': {
      backgroundColor: '#212121',
    },
  },
  customWidth: {
    '& div': {
      // this is just an example, you can use vw, etc.
      width: '9rem',
    },
  },
  MuiMenuItem: {
    '&:hover': {
      backgroundColor: '#fff',
    },
  },
}));

function Dashboard(props) {
  const [amountInUsd, setAmountInUsd] = useState(false);
  const classes = useStyles(props);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  console.log('abc', { isLoading });
  const transactions = useSelector((state) => state.transactions.transactions);
  console.log('transactions', transactions);
  const [txDetailsModalData, setTxDetailsModalData] = useState('');
  const [isTxDetailsModalOpen, setIsTxDetailsModalOpen] = useState(false);
  const [count, setCount] = useState(0);

  const currentUser = useSelector((state) => state);
  console.log('men chala type of and value', typeof currentUser.account.rpcUrl, currentUser.account.rpcUrl);

  console.log('Current User [][]', currentUser);
  const [apiInState, setApiInState] = useState('');
  // eslint-disable-next-line no-unused-vars

  async function main() {
    const { api } = currentUser.api;
    console.log('Listner working', api);

    // Retrieve the initial balance. Since the call has no callback, it is simply a promise
    // that resolves to the current on-chain value
    let {
      data: { free: previousFree },
      nonce: previousNonce,
    } = await api.query.system.account(currentUser.account.publicKey);
    const decimalPlaces = await api.registry.chainDecimals;
    // Here we subscribe to any balance changes and update the on-screen value
    api.query.system.account(
      currentUser.account.publicKey,
      // eslint-disable-next-line consistent-return
      ({ data: { free: currentFree }, nonce: currentNonce }) => {
        // Calculate the delta
        const change = currentFree.sub(previousFree);

        // Only display positive value changes (Since we are pulling `previous` above already,
        // the initial balance change will also be zero)
        console.log('Change is zero', change);
        // eslint-disable-next-line no-unused-expressions
        // async () => {
        if (!change.isZero()) {
          // console.log('Balance changed');
          // const newBalance = await getBalance(api, currentUser.account.publicKey);
          // console.log('New balance', newBalance);
          // dispatch(setBalance(newBalance));
          const newBalance = currentUser.account.chainName === 'AcalaMandala' ? change / 10 ** decimalPlaces[0] : change / 10 ** decimalPlaces;
          console.log(`New balance change of ${change}, nonce ${currentNonce}`);
          console.log('Decimal places', decimalPlaces);
          console.log('New balance', newBalance);
          console.log('Exact balance', newBalance + currentUser.account.balance);
          dispatch(setBalance(newBalance + currentUser.account.balance));

          previousFree = currentFree;
          previousNonce = currentNonce;
          return newBalance;
        }
        // };
      },
    );
  }

  main().catch(console.error);

  const [apiTokenName, setApiTokenName] = useState('polkadot');

  useEffect(() => {
    const getTokenPrice = async () => {
      const tokenPrice = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${apiTokenName}&vs_currencies=usd`,
      )
        .then((res) => {
          res.json().then((_res) => {
            console.log(`${apiTokenName} === `, _res);
          });
        })
        .catch((err) => {
          console.warn('ERROR', err);
        });
    };

    getTokenPrice();
  }, [apiTokenName]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // --------State and funtions for SlectNetwork Modal
  const handleSelectionOnKusamaMainNetwork = (data) => {
    console.log('object', data);
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

  // Acala network initialization
  const initializeAcalaNetwork = async () => {
    try {
      console.log('Initializer working');
      const provider = new WsProvider(
        'wss://acala-mandala.api.onfinality.io/public-ws',
      );
      const api = new ApiPromise(options({ provider }));
      await api.isReady;
      console.log('Api [][]', api);

      const { data: balance } = await api.query.system.account(currentUser.account.publicKey);
      console.log('Balance free', balance.free);
      console.log('Decimals [][]', api.registry.chainDecimals);
      console.log('Tokens', api.registry.chainTokens);
      const decimal = api.registry.chainDecimals;
      const properties = await api.rpc.system.properties();
      const [now, { nonce, data: balances }] = await Promise.all([
        api.query.timestamp.now(),
        api.query.system.account(currentUser.account.publicKey),
      ]);
      console.log('New data', now, nonce);
      console.log('User balance', balances.free.toHuman());
    } catch (err) {
      console.log('Error', err);
    }
  };

  // ACALA MANDALA TRANSACTION
  const sendTransaction = async () => {
    try {
      console.log('Send tranasction working');
      const provider = new WsProvider(
        'wss://acala-mandala.api.onfinality.io/public-ws',
      );
      const api = new ApiPromise(options({ provider }));
      await api.isReady;
      console.log('Api [][]', api);

      await cryptoWaitReady();
      const keyring = new Keyring({ type: 'sr25519' });
      const sender = keyring.addFromUri(currentUser.account.seed);
      console.log('Sender [][]', sender.address);

      const hash = await api.tx.balances
        .transfer(
          '5Dz1i42ygyhi4BxPnvKtRY4TBShTMC9T2FvaMB8CWxoU3QgG',
          '3000000000000',
        ).signAndSend(sender, (res) => {
          console.log('Res status', res.status);
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

  const getBalanceHere = async () => {
    console.log(currentUser.account.publicKey);
    console.log(currentUser.api.api);
    const res = await getBalanceWithMultipleTokens(currentUser.api.api, currentUser.account.publicKey);
    console.log('Res', res);
  };

  const testing = async () => {
    const { data: balance } = await currentUser.api.api.query.system.account('5DXomcfWBhckmx8N9jG7GuVzJcTQpREC5hYoCteD6KcwnacY');
    console.log('Balance free', balance.free);
  };

  // prettier-ignore
  const handleSelection = async (data) => {
    setIsLoading(true);
    console.log('handle Selection', data);
    if (data.disabled) {
      console.log('disabled!');
      setIsLoading(false);
      // eslint-disable-next-line no-useless-return
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
      console.log('NETWORK SELECTED', data);
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

  // Drop Down
  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const open = Boolean(anchorEl);
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  // const res = RpcClass.apiGetter();

  console.log('amount into', currentUser.account.balance, currentUser.account.balanceInUsd);
  return (
    <Wrapper>
      <DashboardHeader>
        <LogoContainer>
          <img src={Logo} width="30px" height="34px" alt="Polo Wallet Logo" />
        </LogoContainer>

        <NetworkContainer>
          <SelectChain onClick={() => setIsModalOpen(true)}>
            <SelectedChain className={subHeadingfontFamilyClass}>
              {currentUser.account.chainName.includes('Network')
                ? currentUser.account.chainName
                : `${currentUser.account.chainName} Network`}

            </SelectedChain>
            <ArrowDropDownIcon style={{ fontSize: '0.8rem' }} />
          </SelectChain>

        </NetworkContainer>

        <AccountContainer>
          <AccountSetting>
            <AccountText onClick={handleClick} className={mainHeadingfontFamilyClass}>
              {currentUser.account.accountName.slice(0, 1)}
            </AccountText>
          </AccountSetting>
        </AccountContainer>
        {/* <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          className={`${classes.customWidth} ${classes.flex}`}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                // bgcolor: 'background.paper',
                // bgColor: '#eee',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          classes={{ paper: classes.paperMenu }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Paper style={{
            width: '210px',
            marginLeft: '-2.6rem',
            marginTop: '-0.5rem',
            backgroundColor: '#212121',
          }}
          >
            <Typography style={{
              textAlign: 'center',
              fontWeight: '600',
              paddingTop: '0.8rem',
              color: '#fafafa',
            }}
            >
              My Profile

            </Typography>
            <MenuList classes={classes.MuiMenuItem}>
              <MenuItem
                style={{ minHeight: '37px', color: '#fafafa' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#000'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#333'}
              >
                <ListItemIcon style={{ color: '#fafafa' }} className={flexStart}>
                  <PersonOutlinedIcon fontSize="small" />
                  &nbsp; &nbsp;
                  <span style={{ fontSize: '0.9rem' }}>Accounts</span>
                </ListItemIcon>
                <ChevronRightOutlinedIcon fontSize="small" style={{ marginRight: '1rem' }} />
              </MenuItem>
              <MenuItem style={{ minHeight: '37px', color: '#fafafa' }}>
                <ListItemIcon className={flexStart} style={{ color: '#fafafa' }}>
                  <AddOutlinedIcon fontSize="small" />
                  &nbsp; &nbsp;
                  <span style={{ fontSize: '0.85rem' }}>Add Account</span>
                </ListItemIcon>
                <ChevronRightOutlinedIcon fontSize="small" style={{ marginRight: '1rem' }} />
              </MenuItem>
              <MenuItem style={{ minHeight: '37px', color: '#fafafa' }}>
                <ListItemIcon className={flexStart} style={{ color: '#fafafa' }}>
                  <FileDownloadOutlinedIcon fontSize="small" />
                  &nbsp; &nbsp;
                  <span style={{ fontSize: '0.85rem' }}>Import Account</span>
                </ListItemIcon>
                <ChevronRightOutlinedIcon fontSize="small" style={{ marginRight: '1rem' }} />
              </MenuItem>
              <MenuItem style={{ minHeight: '37px', color: '#fafafa' }}>
                <ListItemIcon className={flexStart} style={{ color: '#fafafa' }}>
                  <FileUploadOutlinedIcon fontSize="small" />
                  &nbsp; &nbsp;
                  <span style={{ fontSize: '0.85rem' }}>Export Account</span>
                </ListItemIcon>
                <ChevronRightOutlinedIcon fontSize="small" style={{ marginRight: '1rem' }} />
              </MenuItem>
              <MenuItem style={{ minHeight: '37px', color: '#fafafa' }}>
                <ListItemIcon className={flexStart} style={{ color: '#fafafa' }}>
                  <ForumOutlinedIcon fontSize="small" />
                  &nbsp; &nbsp;
                  <span style={{ fontSize: '0.85rem' }}>Support</span>
                </ListItemIcon>
                <ChevronRightOutlinedIcon fontSize="small" style={{ marginRight: '1rem' }} />
              </MenuItem>
              <MenuItem style={{ minHeight: '37px', color: '#fafafa' }}>
                <ListItemIcon className={flexStart} style={{ color: '#fafafa' }}>
                  <SettingsOutlinedIcon fontSize="small" />
                  &nbsp; &nbsp;
                  <span style={{ fontSize: '0.85rem' }}>Setting</span>
                </ListItemIcon>
                <ChevronRightOutlinedIcon fontSize="small" style={{ marginRight: '1rem' }} />
              </MenuItem>
              <MenuItem style={{ minHeight: '37px', color: '#fafafa' }}>
                <ListItemIcon className={flexStart} style={{ color: '#fafafa' }}>
                  <LockOutlinedIcon fontSize="small" />
                  &nbsp; &nbsp;
                  <span style={{ fontSize: '0.85rem' }}>Lock</span>
                </ListItemIcon>
                <ChevronRightOutlinedIcon fontSize="small" style={{ marginRight: '1rem' }} />
              </MenuItem>
            </MenuList>
          </Paper>
        </Menu> */}

      </DashboardHeader>

      <MainCard
        balance={currentUser.account.balance}
        chainName={currentUser.account.chainName}
        tokenName={currentUser.account.tokenName}
        address={currentUser.account.publicKey}
        walletName={currentUser.account.walletName}
        balanceInUsd={currentUser.account.balanceInUsd || 0}
        accountName={currentUser.account.accountName}
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
      {}
      {console.log('Hello 2', transactions)}
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

const flexStart = {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
};

const flexBetween = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  minHeight: '37px !important',
};

export default Dashboard;
