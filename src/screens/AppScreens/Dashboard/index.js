/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import WebSocket from 'react-websocket';
// eslint-disable-next-line import/namespace
import MainCard from './MainCard';
import Operations from './Operations';
import AssetsAndTransactions from './AssetsAndTransactions';

import { providerInitialization, getBalance } from '../../../ToolBox/services';
// import onChainConstants from '../../../constants/onchain'
import constants from '../../../constants/onchain';

import { setRpcUrl, setBalance } from '../../../redux/slices/account';

import { fonts } from '../../../utils';
import RpcClass from '../../../rpc';

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

import KusamaIcon from '../../../assets/images/kusama.svg';
import KaruraIcon from '../../../assets/images/karura.svg';
import MoonriverIcon from '../../../assets/images/moonriver.svg';
import ShidenIcon from '../../../assets/images/shiden.svg';
import PhalaIcon from '../../../assets/images/phala.svg';
import BifrostIcon from '../../../assets/images/bifrost.svg';

const { cryptoWaitReady } = require('@polkadot/util-crypto');
const { WsProvider, ApiPromise, Keyring } = require('@polkadot/api');

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

const availableNetworks = [
  {
    name: 'Polkadot Main Network',
    theme: '#E6007A',
    moreOptions: false,
  },
  {
    name: 'Kusama Main Networks',
    theme: '#000000',
    moreOptions: true,
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
  },
  {
    name: 'Karura',
    icon: KaruraIcon,
    parachain: true,
    mainNetwork: true,
    testNet: 'AcalaMandala',
  },
  {
    name: 'Moonriver',
    icon: MoonriverIcon,
    parachain: true,
    mainNetwork: true,
  },
  {
    name: 'Shiden',
    icon: ShidenIcon,
    parachain: true,
    mainNetwork: true,
    testNet: 'Dusty',
  },
  {
    name: 'Khala',
    icon: PhalaIcon,
    parachain: true,
    mainNetwork: true,
    testNet: 'Phala',
  },
  {
    name: 'Bifrost',
    icon: BifrostIcon,
    parachain: false,
    mainNetwork: true,
    testNet: 'Asgard',
  },
];

const TestNetworks = [
  {
    name: 'AcalaMandala',
    theme: '#E6007A',
  },
  {
    name: 'Moonbase',
    theme: '#000000',
  },
  {
    name: 'Dusty',
    theme: '#E6007A',
  },
  {
    name: 'Asgard',
    theme: '#2FEAC6',
  },
  {
    name: 'Phala',
    theme: '#008D77',
  },
  {
    name: 'Westend',
    theme: '#015D77',
    rpcUrl: constants.WestEndRpcUrl,
  },
];

function Dashboard() {
  const [isTxDetailsModalOpen, setIsTxDetailsModalOpen] = useState(false);

  const currentUser = useSelector((state) => state);
  // eslint-disable-next-line no-unused-vars
  const [chain, setChain] = useState(currentUser.account.chainName);
  const dispatch = useDispatch();

  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line no-shadow
  // eslint-disable-next-line no-unused-vars
  const [balance, setBalance] = useState(0);

  const [tokenName, setTokenName] = useState(currentUser.account.tokenName);

  //   async function main () {
  //     console.log('Listener working')
  //   const api = await RpcClass.init(currentUser.account.rpcUrl, false)

  //   let { data: { free: previousFree }, nonce: previousNonce } = await api.query.system.account(currentUser.account.publicKey);

  //   // console.log(`You has a balance of ${previousFree}, nonce ${previousNonce}`);
  //   // console.log(`You may leave this example running and start example 06 or transfer any value to Your account`);

  //   // Here we subscribe to any balance changes and update the on-screen value
  //   api.query.system.account(currentUser.account.publicKey, ({ data: { free: currentFree }, nonce: currentNonce }) => {
  //     // Calculate the delta
  //     const change = currentFree.sub(previousFree);
  //     // Only display positive value changes (Since we are pulling `previous` above already,
  //     // the initial balance change will also be zero)
  //     if (!change.isZero()) {
  //       async () => {

  //       const newBalance = await getBalance(api,currentUser.account.publicKey)
  //       console.log('New balance')
  //       // .then(() => setBalance(balance)).catch((err) => console.log('An error occured'))
  //         dispatch(setBalance(newBalance))
  //       previousFree = currentFree;
  //       previousNonce = currentNonce;
  //       }

  //     }
  //   });
  // }

  // main().catch(console.error);

  // useEffect(() => {
  //   main()
  // })

  const Alice = currentUser.account.publicKey;

  async function main() {
    console.log('Listner working', currentUser.account.public_key);
    // Create an await for the API
    // const api = await ApiPromise.create();
    const wsProvider = new WsProvider(currentUser.account.rpcUrl);
    const api = await ApiPromise.create({ provider: wsProvider });
    await api.isReady;
    await cryptoWaitReady();

    // Retrieve the initial balance. Since the call has no callback, it is simply a promise
    // that resolves to the current on-chain value
    let { data: { free: previousFree }, nonce: previousNonce } = await api.query.system.account(currentUser.account.publicKey);

    console.log(`${Alice} has a balance of ${previousFree}, nonce ${previousNonce}`);
    console.log(`You may leave this example running and start example 06 or transfer any value to ${Alice}`);

    // Here we subscribe to any balance changes and update the on-screen value
    api.query.system.account(Alice, ({ data: { free: currentFree }, nonce: currentNonce }) => {
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
        // async () => {

        // await anotherDummyFunction()
        // }
        previousFree = currentFree;
        previousNonce = currentNonce;
      }
    });
  }

  main().catch(console.error);

  const landing = async () => {
    console.log('Landing function running');
    console.log('Current user', currentUser);
    try {
      const api = await RpcClass.init(currentUser.account.rpcUrl, false);

      const nbalance = await getBalance(api, currentUser.account.publicKey);
      console.log('Balance in loading', nbalance);
      dispatch(setBalance(nbalance));
      // setBalance(balance)

      console.log('Token name on dashboard');
      // setTokenName(await api.registry.chainTokens)

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

  const [isModalOpen, setIsModalOpen] = useState(false);

  // --------State and funtions for SlectNetwork Modal
  const handleSelectionOnKusamaMainNetwork = (data) => {
    console.log('object', data);
    selectAndGoBack(data.name);
  };
  // prettier-ignore
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    console.log('Use effect running');
    await landing();
  });

  // --------State and funtions for SlectNetwork Modal
  const RenderContentForKusamaMainNetwork = (data, handleClick) => {
    const { name, icon } = data;
    return (
      <OptionRow
        key={name}
        onClick={() => handleClick(data)}
      >
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
    const { name, theme, moreOptions } = data;
    return (
      <OptionRow
        key={name}
        onClick={() => handleClick(data)}
      >
        <HorizontalContentDiv>
          <PlainIcon bgColor={theme} />
          <OptionText className={mainHeadingfontFamilyClass}>
            {name}
          </OptionText>
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
    if (data.name === 'Test Networks') {
      setModalState({
        firstStep: false,
        renderMethod: RenderContentForAvailableNetwroks,
        currentData: TestNetworks,
      });
    } else if (data.name === 'Kusama Main Networks') {
      setModalState({
        firstStep: false,
        renderMethod: RenderContentForKusamaMainNetwork,
        currentData: KusamaMainNetworks,
      });
    } else {
      console.log('NETWORK SELECTED');
      const api = await RpcClass.init(data.rpcUrl, true);
      console.log('Api on dashboard', api);
      const token = await api.registry.chainTokens;
      // chainDecimals = await api.registry.chainDecimals
      console.log('Token name on dashboard', await api.registry.chainTokens);
      setTokenName(await api.registry.chainTokens);
      dispatch(setRpcUrl({ chainName: data.name, rpcUrl: data.rpcUrl, tokenName: token }));
      selectAndGoBack(data.name);
    }
  };

  // eslint-disable-next-line no-unused-vars
  const doTransaction = async () => {
    console.log('Transaction starting');
    const wsProvider = new WsProvider(constants.WestEndRpcUrl);
    const api = await ApiPromise.create({ provider: wsProvider });

    // const api = new ApiPromise(provider)

    await api.isReady;
    // prettier-ignore
    const mnemonic = 'merry network invest border urge mechanic shuffle minimum proud video eternal lab';
    await cryptoWaitReady();
    console.log('Decimals', api.registry.chainDecimals);
    const keyring = new Keyring({ type: 'sr25519' });
    const me = keyring.addFromUri(mnemonic);
    console.log('Me [][]', me.address);

    // prettier-ignore
    const hash = await api.tx.balances
      .transfer('5D2pr8UsTRXjmSWtYds9pcpvowH42GzF6QS74bo64fKecXhw', 1e10)
      .signAndSend(me, (res) => {
        console.log('Success', res.status);
      })
      .catch((err) => {
        console.error('Error [][][]', err);
      });

    console.log('Hash ===>>>', hash);
  };

  // --------XXXXXXXXXXXXXXX-----------

  return (
    <Wrapper>
      <DashboardHeader>
        <LogoContainer>
          <img src={Logo} width="30px" height="34px" alt="Polo Logo" />
        </LogoContainer>

        <NetworkContainer>
          <SelectedChain className={subHeadingfontFamilyClass}>
            Kusama Main Network
          </SelectedChain>

          <SelectChain onClick={() => setIsModalOpen(true)}>
            <SelectedChain className={subHeadingfontFamilyClass}>
              {currentUser.account.chainName}
              {/* {chain} */}
            </SelectedChain>
            <ArrowDropDownIcon />
          </SelectChain>

          <SwitchToTestnet className={subHeadingfontFamilyClass}>
            Switch to Moonbase Testnet
          </SwitchToTestnet>
        </NetworkContainer>

        <AccountContainer>
          <AccountSetting>
            <AccountText className={mainHeadingfontFamilyClass}>A</AccountText>
          </AccountSetting>
        </AccountContainer>
      </DashboardHeader>

      <MainCard balance={currentUser.account.balance} chainName={chain} tokenName={currentUser.account.tokenName} address={currentUser.account.publicKey} />

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
    </Wrapper>
  );
}

export default Dashboard;
