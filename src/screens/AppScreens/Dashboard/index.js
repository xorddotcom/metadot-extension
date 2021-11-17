/* eslint-disable no-return-assign */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint import/no-cycle: [2, { maxDepth: 1 }] */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Menu from '@mui/material/Menu';
// eslint-disable-next-line import/namespace
import { CircularProgress } from '@mui/material';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
// Drop Down Icons
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

// eslint-disable-next-line import/namespace
import { options } from '@acala-network/api';
import LockOutlinedIcon from '../../../assets/images/icons/lock.svg';
import SettingsOutlinedIcon from '../../../assets/images/icons/setting.svg';
import ForumOutlinedIcon from '../../../assets/images/icons/support.svg';
import FileUploadOutlinedIcon from '../../../assets/images/icons/export.svg';
import FileDownloadOutlinedIcon from '../../../assets/images/icons/download.svg';
import AddOutlinedIcon from '../../../assets/images/icons/add.svg';
import PersonOutlinedIcon from '../../../assets/images/icons/user.svg';
import ChevronRightOutlinedIcon from '../../../assets/images/icons/rightArrowIcon.svg';
import ApiCalls from '../../../utils/api';
import MainCard from './MainCard';
import AssetsAndTransactions from './AssetsAndTransactions';

import { setApiInitializationStarts } from '../../../redux/slices/api';
import {
  setRpcUrl, setBalance, setChainName,
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
  setLoadingFor,
} from '../../../redux/slices/successModalHandling';

import networks from './networkModalData';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;
const { primaryTextColor } = colors;

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
            <ArrowDropDownIcon style={{ fontSize: '1.7rem' }} />
          </SelectChain>
        </NetworkContainer>

        <AccountContainer>
          <AccountSetting>
            <AccountText onClick={handleClick} className={mainHeadingfontFamilyClass}>
              {accountName.slice(0, 1)}
            </AccountText>
          </AccountSetting>
        </AccountContainer>

        {/* Menu Start */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          sx={{
            borderRadius: '20px',
          }}
          // className={`${classes.customWidth} ${classes.flex}`}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 2.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 22,
                ml: -0.5,
                mr: 1,
              },
            },
          }}
          // classes={{ paper: classes.paperMenu }}
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
            <MenuList>
              <MenuItem
                style={{ minHeight: '37px', color: '#fafafa' }}
              >
                <ListItemIcon style={{ color: '#fafafa' }} className="flexStart">
                  <img src={PersonOutlinedIcon} alt="user-icon" />
                  &nbsp; &nbsp;
                  <span style={{ fontSize: '0.9rem' }}>Accounts</span>
                </ListItemIcon>
                <img src={ChevronRightOutlinedIcon} alt="icon" style={{ marginLeft: '3.3rem', marginTop: '-0.4rem' }} />
              </MenuItem>
              <MenuItem style={{ minHeight: '37px', color: '#fafafa' }}>
                <ListItemIcon className="flexStart" style={{ color: '#fafafa' }}>
                  <img src={AddOutlinedIcon} alt="add-icon" />
                  &nbsp; &nbsp;
                  <span style={{ fontSize: '0.85rem' }}>Add Account</span>
                </ListItemIcon>
                <img src={ChevronRightOutlinedIcon} alt="icon" style={{ marginLeft: '2.3rem', marginTop: '-0.4rem' }} />
              </MenuItem>
              <MenuItem style={{ minHeight: '37px', color: '#fafafa' }}>
                <ListItemIcon className="flexStart" style={{ color: '#fafafa' }}>
                  <img src={FileDownloadOutlinedIcon} alt="download-icon" />
                  &nbsp; &nbsp;
                  <span style={{ fontSize: '0.85rem' }}>Import Account</span>
                </ListItemIcon>
                <img src={ChevronRightOutlinedIcon} alt="icon" style={{ marginLeft: '1.3rem', marginTop: '-0.4rem' }} />
              </MenuItem>
              <MenuItem style={{ minHeight: '37px', color: '#fafafa' }}>
                <ListItemIcon className="flexStart" style={{ color: '#fafafa' }}>
                  <img src={FileUploadOutlinedIcon} alt="export-icon" />
                  &nbsp; &nbsp;
                  <span style={{ fontSize: '0.85rem' }}>Export Account</span>
                </ListItemIcon>
                <img src={ChevronRightOutlinedIcon} alt="icon" style={{ marginLeft: '1.3rem', marginTop: '-0.4rem' }} />
              </MenuItem>
              <MenuItem style={{ minHeight: '37px', color: '#fafafa' }}>
                <ListItemIcon className="flexStart" style={{ color: '#fafafa' }}>
                  <img src={ForumOutlinedIcon} alt="support-icon" />
                  &nbsp; &nbsp;
                  <span style={{ fontSize: '0.85rem' }}>Support</span>
                </ListItemIcon>
                <img src={ChevronRightOutlinedIcon} alt="icon" style={{ marginLeft: '4.3rem', marginTop: '-0.4rem' }} />
              </MenuItem>
              <MenuItem style={{ minHeight: '37px', color: '#fafafa' }}>
                <ListItemIcon className="flexStart" style={{ color: '#fafafa' }}>
                  <img src={SettingsOutlinedIcon} alt="setting-icon" />
                  &nbsp; &nbsp;
                  <span style={{ fontSize: '0.85rem' }}>Setting</span>
                </ListItemIcon>
                <img src={ChevronRightOutlinedIcon} alt="icon" style={{ marginLeft: '4.7rem', marginTop: '-0.4rem' }} />
              </MenuItem>
              <MenuItem style={{ minHeight: '37px', color: '#fafafa' }}>
                <ListItemIcon className="flexStart" style={{ color: '#fafafa' }}>
                  <img src={LockOutlinedIcon} alt="lock-icon" />
                  &nbsp; &nbsp;
                  <span style={{ fontSize: '0.85rem' }}>Lock</span>
                </ListItemIcon>
              </MenuItem>
              <MenuItem style={{ minHeight: '37px', color: '#fafafa' }}>
                <ListItemIcon className="flexStart" style={{ color: '#fafafa' }}>
                  <img src={LockOutlinedIcon} alt="remove-account" />
                  &nbsp; &nbsp;
                  <span style={{ fontSize: '0.85rem' }}>Remove Account</span>
                </ListItemIcon>
              </MenuItem>
            </MenuList>
          </Paper>
        </Menu>

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
