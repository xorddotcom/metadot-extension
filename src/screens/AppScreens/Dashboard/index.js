/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

// eslint-disable-next-line import/namespace
import { CircularProgress } from '@mui/material';
import MainCard from './MainCard';
import Operations from './Operations';
import AssetsAndTransactions from './AssetsAndTransactions';

import { providerInitialization, getBalance } from '../../../ToolBox/services';
// import onChainConstants from '../../../constants/onchain'
import constants from '../../../constants/onchain';
import {
  setRpcUrl, setBalance, setSeed,
} from '../../../redux/slices/account';
import { setApi } from '../../../redux/slices/api';

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
  SwitchToTestnet,
  Wrapper,
} from './StyledComponents';

import Logo from '../../../assets/images/logodraft.svg';
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
import { setIsSuccessModalOpen, setMainTextForSuccessModal, setSubTextForSuccessModal } from '../../../redux/slices/successModalHandling';

const { WsProvider, ApiPromise, Keyring } = require('@polkadot/api');

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

const availableNetworks = [
  {
    name: 'Polkadot Main Network',
    theme: '#E6007A',
    moreOptions: false,
    rpcUrl: constants.Polkadot_Rpc_Url,
  },
  {
    name: 'Kusama',
    theme: '#000000',
    moreOptions: false,
    rpcUrl: constants.Kusama_Rpc_Url,
    icon: KusamaIcon,
    parachain: false,
    mainNetwork: true,
    testNet: null,
    disabled: false,

  },
  {
    name: 'Test Networks',
    theme: '#F2B705',
    moreOptions: true,
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
    theme: '#015D77',
    rpcUrl: constants.WestEndRpcUrl,
    tokenName: 'Westend',
  },
  {
    name: 'AcalaMandala',
    theme: '#E6007A',
    disabled: true,
  },
  {
    name: 'Moonbase',
    theme: '#000000',
    disabled: true,
  },
  {
    name: 'Dusty',
    theme: '#E6007A',
    disabled: true,
  },
  {
    name: 'Asgard',
    theme: '#2FEAC6',
    disabled: true,
  },
  {
    name: 'Phala',
    theme: '#008D77',
    disabled: true,
  },
];

function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  console.log('abc', { isLoading });
  const [isTxDetailsModalOpen, setIsTxDetailsModalOpen] = useState(false);
  const currentUser = useSelector((state) => state);
  console.log('Current User [][]', currentUser);
  const [apiInState, setApiInState] = useState('');
  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch();

  async function main() {
    const { api } = currentUser.api;
    // const api = apiInState;
    console.log('Listner working', api);
    // const api = await RpcClass.init(currentUser.account.rpcUrl, false);
    // con
    // Retrieve the initial balance. Since the call has no callback, it is simply a promise
    // that resolves to the current on-chain value
    let { data: { free: previousFree }, nonce: previousNonce } = await api.query.system.account(currentUser.account.publicKey);

    // Here we subscribe to any balance changes and update the on-screen value
    api.query.system.account(currentUser.account.publicKey, ({ data: { free: currentFree }, nonce: currentNonce }) => {
    // Calculate the delta
      const change = currentFree.sub(previousFree);

      // Only display positive value changes (Since we are pulling `previous` above already,
      // the initial balance change will also be zero)
      console.log('Change is zero', change);
      if (!change.isZero()) {
        console.log(`New balance change of ${change}, nonce ${currentNonce}`);
        const newBalance = change / 1000000000000;
        console.log('New balance', newBalance);
        console.log('Exact balance', newBalance + currentUser.account.balance);
        dispatch(setBalance(newBalance + currentUser.account.balance));

        previousFree = currentFree;
        previousNonce = currentNonce;
      }
    });
  }

  main().catch(console.error);

  const landing = async () => {
    const { api } = currentUser.api;
    console.log('Api use effect', api);
    console.log('Landing function running', currentUser.account.rpcUrl);
    try {
      const nbalance = await getBalance(api, currentUser.account.publicKey);
      dispatch(setBalance(nbalance));
      return nbalance;
    } catch (err) {
      console.log('Error occurred');
      throw err;
    }
  };

  useEffect(async () => {
    console.log('Use effect running');
    await landing();
  }, []);

  // const getTokenPrice = async () => {
  //   // const tokenPrice = await fetch(
  //   //   'https://api.coingecko.com/api/v3/simple/price?ids=kusama&vs_currencies=usd',
  //   // )
  //   //   .then((res) => {
  //   //     res.json().then((_res) => {
  //   //       console.log('Res in json', _res);
  //   //     });
  //   //   })
  //   //   .catch((err) => {
  //   //     console.warn('ERROR', err);
  //   //   });
  // };

  // useEffect(async () => {
  //   getTokenPrice();
  // });

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
        {
          disabled && <span className="tooltiptext">Coming Soon!</span>
        }
        <HorizontalContentDiv>
          <img src={icon} alt="icon" />
          <OptionText className={mainHeadingfontFamilyClass}>
            {name}
          </OptionText>
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
        {
          disabled && <span className="tooltiptext">Coming Soon!</span>
        }

        <HorizontalContentDiv>
          <PlainIcon bgColor={theme} />
          <OptionText className={mainHeadingfontFamilyClass}>
            {name}
          </OptionText>
          {
            isLoading && (
            <CircularProgress style={{
              color: '#fafafa', width: 20, height: 25, paddingRight: 20,
            }}
            />
            )
          }

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
    console.log('handle Selection', data.name);
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
      setModalState({
        firstStep: false,
        renderMethod: RenderContentForKusamaMainNetwork,
        currentData: KusamaMainNetworks,
      });
    } else {
      console.log('NETWORK SELECTED', data);
      const api = await RpcClass.init(data.rpcUrl);
      // setApiInState(api);
      dispatch(setApi(api));
      // const wsProvider = new WsProvider(data.rpcUrl);
      // console.log('Provider');
      // const api = await ApiPromise.create({ provider: wsProvider });
      // console.log('Api', api);
      // await api.isReady;
      console.log('Api after await', await api);
      const bal = await getBalance(api, currentUser.account.publicKey);
      dispatch(setBalance(bal));
      // chainDecimals = await api.registry.chainDecimals
      console.log('Token name on dashboard', await api.registry.chainTokens);
      // setTokenName(await api.registry.chainTokens);
      dispatch(setRpcUrl({ chainName: data.name, rpcUrl: data.rpcUrl, tokenName: await api.registry.chainTokens }));
      setIsLoading(false);

      dispatch(setMainTextForSuccessModal('Successfully Converted!'));
      dispatch(setSubTextForSuccessModal(`You are now successfully on ${data.name}`));
      dispatch(setIsSuccessModalOpen(true));

      setTimeout(() => {
        dispatch(setIsSuccessModalOpen(false));
      }, 3000);

      selectAndGoBack(data.name);
    }
  };

  // --------XXXXXXXXXXXXXXX-----------
  // const res = RpcClass.apiGetter();
  console.log('Res in =============', currentUser);
  return (
    <Wrapper>
      <DashboardHeader>
        <LogoContainer>
          <img src={Logo} width="30px" height="34px" alt="MetaDot Logo" />
        </LogoContainer>

        <NetworkContainer>
          {/* <SelectedChain className={subHeadingfontFamilyClass}>
            Kusama Main Network
          </SelectedChain> */}

          <SelectChain onClick={() => setIsModalOpen(true)}>
            <SelectedChain className={subHeadingfontFamilyClass}>
              {
              currentUser.account.chainName.includes('Network')
                ? currentUser.account.chainName
                : `${currentUser.account.chainName} Network`
                }
              {/* {chain} */}
            </SelectedChain>
            <ArrowDropDownIcon />
          </SelectChain>

          {/* <SwitchToTestnet className={subHeadingfontFamilyClass}>
            Switch to Moonbase Testnet
          </SwitchToTestnet> */}
        </NetworkContainer>

        <AccountContainer>
          <AccountSetting>
            <AccountText className={mainHeadingfontFamilyClass}>A</AccountText>
          </AccountSetting>
        </AccountContainer>
      </DashboardHeader>

      <MainCard
        balance={currentUser.account.balance}
        chainName={currentUser.account.chainName}
        tokenName={currentUser.account.tokenName}
        address={currentUser.account.publicKey}
        walletName={currentUser.account.walletName}
        balanceInUsd="0$"
        accountName={currentUser.account.accountName}
      />

      <Operations />

      <AssetsAndTransactions
        handleOpenTxDetailsModal={() => setIsTxDetailsModalOpen(true)}
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
          background: '#141414',
          pb: 3,
        }}
      />

      <TxDetails
        open={isTxDetailsModalOpen}
        handleClose={() => setIsTxDetailsModalOpen(false)}
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
      {/* <button type="button" onClick={() => console.log('Res in =============', currentUser)}>Get State</button> */}
    </Wrapper>
  );
}

export default Dashboard;
