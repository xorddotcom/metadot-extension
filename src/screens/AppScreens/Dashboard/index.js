import React, { useState, useEffect } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import MainCard from './MainCard';
import Operations from './Operations';
import AssetsAndTransactions from './AssetsAndTransactions';

import { providerInitialization, getBalance } from '../../../ToolBox/services'
// import onChainConstants from '../../../constants/onchain'
import constants from '../../../constants/onchain'

import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'

import { setRpcUrl } from '../../../redux/slices/account'

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
import { SelectNetwork } from '../../../components';
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

const { cryptoWaitReady } = require('@polkadot/util-crypto')
const { ApiRx, WsProvider, ApiPromise, Keyring } = require('@polkadot/api')

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
    rpcUrl: constants.WestEndRpcUrl
  },
];

function Dashboard(props) {

  const [chain, setChain] = useState('Polkadot')
  const dispatch = useDispatch()
  const history = useHistory()
  const currentUser = useSelector((state) => state);

  const [balance, setBalance] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)

  const landing = async () => {
    console.log('Current user', currentUser)
    try{

      const api = await providerInitialization(currentUser.account.rpcUrl)
      await api.isReady
      
      const balance  = await getBalance(api,currentUser.account.publicKey)
      setBalance(balance)
      
      return balance
  
    }catch(err){

      console.log('Error occurred')
      throw err
    }

  }

  useEffect(async() => {

    console.log('Use effect running')
    await landing()
    
  })

  const [isModalOpen, setIsModalOpen] = useState(false);

  //--------State and funtions for SlectNetwork Modal
  const handleSelectionOnKusamaMainNetwork = data => {
    console.log('object', data);
    selectAndGoBack(data.name);
  };

  const selectAndGoBack = network => {
    //set selected network state to Polkadot
    setSelectedNetwrok(network);

    //set selected network to Polkadot in REDUX as well

    resetState();
    setIsModalOpen(false);
  };

  const RenderContentForAvailableNetwroks = data => {
    return (
      <OptionRow
        key={data.name}
        onClick={() => {
          handleSelection(data);
          //   console.log('object');
        }}>
        <HorizontalContentDiv>
          <PlainIcon bgColor={data.theme}></PlainIcon>
          <OptionText className={mainHeadingfontFamilyClass}>
            {data.name}
          </OptionText>
        </HorizontalContentDiv>
        {data.moreOptions && (
          <NextIcon>
            <KeyboardArrowRightIcon />
          </NextIcon>
        )}
      </OptionRow>
    );
  };

  const RenderContentForKusamaMainNetwork = data => {
    return (
      <OptionRow
        key={data.name}
        onClick={() => {
          handleSelectionOnKusamaMainNetwork(data);
          //   console.log('object');
        }}>
        <HorizontalContentDiv>
          <img src={data.icon} alt="icon" />
          <OptionText className={mainHeadingfontFamilyClass}>
            {data.name}
          </OptionText>
        </HorizontalContentDiv>
      </OptionRow>
    );
  };

  const [modalState, setModalState] = useState({
    firstStep: true,
    renderMethod: RenderContentForAvailableNetwroks,
    currentData: availableNetworks,
  });

  const [selectedNetwork, setSelectedNetwrok] = useState('');

  const resetState = () => {
    setModalState({
      firstStep: true,
      renderMethod: RenderContentForAvailableNetwroks,
      currentData: availableNetworks,
    });
  };

  const handleSelection = data => {
    console.log('mark1');
    if (data.name == 'Test Networks') {
      console.log('mark5');
      // selectAndGoBack(data.name);
      setModalState({
        firstStep: false,
        renderMethod: RenderContentForAvailableNetwroks,
        currentData: TestNetworks,
      });
    } else if (data.name == 'Kusama Main Networks') {
      console.log('mark3');
      setModalState({
        firstStep: false,
        renderMethod: RenderContentForKusamaMainNetwork,
        currentData: KusamaMainNetworks,
      });
    } else {
      console.log('NETWORK SELECTED');
      dispatch(setRpcUrl({ chainName: data.name, rpcUrl: data.rpcUrl }))
      selectAndGoBack(data.name);
    }
  };

  const doTransaction = async () => {

    console.log('Transaction starting')
    const wsProvider = new WsProvider(
       constants.WestEndRpcUrl
    )
      const api = await ApiPromise.create({provider: wsProvider})

  // const api = new ApiPromise(provider)
  
    await api.isReady
    const mnemonic = "merry network invest border urge mechanic shuffle minimum proud video eternal lab";
    await cryptoWaitReady();
    console.log('Decimals',api.registry.chainDecimals)
    const keyring = new Keyring({ type: 'sr25519' })
    const me = keyring.addFromUri(mnemonic);
    console.log('Me [][]',me.address)
  
    const hash = await api.tx.balances
      .transfer(
        '5D2pr8UsTRXjmSWtYds9pcpvowH42GzF6QS74bo64fKecXhw',
        1e10
      )
      .signAndSend(
        me,(res) => {console.log('Success', res.status)}
      ).catch((err) => {
        console.error('Error [][][]', err)
      })
  
      console.log('Hash ===>>>', hash)
   
  }
  
  //--------XXXXXXXXXXXXXXX-----------

  return (
    <Wrapper>
      <DashboardHeader>
        <LogoContainer>
          <img src={Logo} width="30px" height="34px" />
        </LogoContainer>

        <NetworkContainer>
          <SelectedChain className={subHeadingfontFamilyClass}>
            Kusama Main Network
          </SelectedChain>

          <SelectChain onClick={() => setIsModalOpen(true)}>
            <SelectedChain className={subHeadingfontFamilyClass}>
              Polkadot Main Network
            </SelectedChain>
            <ArrowDropDownIcon />
          </SelectChain>

          <SwitchToTestnet className={subHeadingfontFamilyClass}>
            Switch to Moonbase Testnet{' '}
          </SwitchToTestnet>
        </NetworkContainer>

        <AccountContainer>
          <AccountSetting>
            <AccountText className={mainHeadingfontFamilyClass}>A</AccountText>
          </AccountSetting>
        </AccountContainer>
      </DashboardHeader>

      <MainCard />

      <Operations />

      <AssetsAndTransactions />

      <SelectNetwork
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        modalState={modalState}
        resetState={resetState}
        style={{
          position: 'relative',
          width: '78%',
          background: '#141414',
          pb: 3,
        }}
      />
    </Wrapper>
  );
}

export default Dashboard;
