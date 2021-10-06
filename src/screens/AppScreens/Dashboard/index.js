import React, { useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import MainCard from './MainCard';
import Operations from './Operations';
import AssetsAndTransactions from './AssetsAndTransactions';

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
];

function Dashboard(props) {
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
    console.log('object', modalState.firstStep);
    if (modalState.firstStep === true) {
      console.log('mark1');
      //Polkadot main net selection scinario
      if (!data.moreOptions && data.name == 'Polkadot Main Network') {
        console.log('mark2');
        selectAndGoBack(data.name);
        return;
      } else if (data.moreOptions && data.name == 'Test Networks') {
        console.log('mark5');
        // selectAndGoBack(data.name);
        setModalState({
          firstStep: false,
          renderMethod: RenderContentForAvailableNetwroks,
          currentData: TestNetworks,
        });
        return;
      } else if (data.moreOptions && data.name == 'Kusama Main Networks') {
        console.log('mark3');
        setModalState({
          firstStep: false,
          renderMethod: RenderContentForKusamaMainNetwork,
          currentData: KusamaMainNetworks,
        });
      } else {
        console.log('something not adding up, ERRO LIKE SITUATION');
        selectAndGoBack(data.name);
      }
    } else {
      console.log('I AM IN ELSE');

      setIsModalOpen(false);
    }
  };
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
