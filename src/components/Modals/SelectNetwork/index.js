import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import { MainHeading, SubHeading } from '../../CommonStyledComponents';
import Button from '../../Button';

import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

import { fonts } from '../../../utils';

import KusamaIcon from '../../../assets/images/kusama.svg';
import KaruraIcon from '../../../assets/images/karura.svg';
import MoonriverIcon from '../../../assets/images/moonriver.svg';
import ShidenIcon from '../../../assets/images/shiden.svg';
import PhalaIcon from '../../../assets/images/phala.svg';
import BifrostIcon from '../../../assets/images/bifrost.svg';

import {
  BackButton,
  CloseIconDiv,
  HorizontalContentDiv,
  NextIcon,
  OptionRow,
  OptionText,
  PlainIcon,
  Title,
  TitleDiv,
} from './StyledComponents';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

// const availableNetworks = [
//   {
//     name: 'Polkadot Main Network',
//     theme: '#E6007A',
//     moreOptions: false,
//   },
//   {
//     name: 'Kusama Main Networks',
//     theme: '#000000',
//     moreOptions: true,
//   },
//   {
//     name: 'Test Networks',
//     theme: '#F2B705',
//     moreOptions: true,
//   },
// ];

// const KusamaMainNetworks = [
//   {
//     name: 'Kusama',
//     icon: KusamaIcon,
//     parachain: false,
//     mainNetwork: true,
//     testNet: null,
//   },
//   {
//     name: 'Karura',
//     icon: KaruraIcon,
//     parachain: true,
//     mainNetwork: true,
//     testNet: 'AcalaMandala',
//   },
//   {
//     name: 'Moonriver',
//     icon: MoonriverIcon,
//     parachain: true,
//     mainNetwork: true,
//   },
//   {
//     name: 'Shiden',
//     icon: ShidenIcon,
//     parachain: true,
//     mainNetwork: true,
//     testNet: 'Dusty',
//   },
//   {
//     name: 'Khala',
//     icon: PhalaIcon,
//     parachain: true,
//     mainNetwork: true,
//     testNet: 'Phala',
//   },
//   {
//     name: 'Bifrost',
//     icon: BifrostIcon,
//     parachain: false,
//     mainNetwork: true,
//     testNet: 'Asgard',
//   },
// ];

// const TestNetworks = [
//   {
//     name: 'AcalaMandala',
//     theme: '#E6007A',
//   },
//   {
//     name: 'Moonbase',
//     theme: '#000000',
//   },
//   {
//     name: 'Dusty',
//     theme: '#E6007A',
//   },
//   {
//     name: 'Asgard',
//     theme: '#2FEAC6',
//   },
//   {
//     name: 'Phala',
//     theme: '#008D77',
//   },
// ];

function SelectNetwork({ open, handleClose, modalState, resetState, style }) {
  //   const [currentData, setCurrentData] = useState(availableNetworks);

  // const RenderContentForAvailableNetwroks = data => {
  //   return (
  //     <OptionRow
  //       key={data.name}
  //       onClick={() => {
  //         handleSelection(data);
  //         //   console.log('object');
  //       }}>
  //       <HorizontalContentDiv>
  //         <PlainIcon bgColor={data.theme}></PlainIcon>
  //         <OptionText className={mainHeadingfontFamilyClass}>
  //           {data.name}
  //         </OptionText>
  //       </HorizontalContentDiv>
  //       {data.moreOptions && (
  //         <NextIcon>
  //           <KeyboardArrowRightIcon />
  //         </NextIcon>
  //       )}
  //     </OptionRow>
  //   );
  // };

  // const RenderContentForKusamaMainNetwork = data => {
  //   return (
  //     <OptionRow
  //       key={data.name}
  //       onClick={() => {
  //         handleSelectionOnKusamaMainNetwork(data);
  //         //   console.log('object');
  //       }}>
  //       <HorizontalContentDiv>
  //         <img src={data.icon} alt="icon" />
  //         <OptionText className={mainHeadingfontFamilyClass}>
  //           {data.name}
  //         </OptionText>
  //       </HorizontalContentDiv>
  //     </OptionRow>
  //   );
  // };

  // const [modalState, setModalState] = useState({
  //   firstStep: true,
  //   renderMethod: RenderContentForAvailableNetwroks,
  //   currentData: availableNetworks,
  // });

  // const [selectedNetwork, setSelectedNetwrok] = useState('');

  // const resetState = () => {
  //   setModalState({
  //     firstStep: true,
  //     renderMethod: RenderContentForAvailableNetwroks,
  //     currentData: availableNetworks,
  //   });
  // };

  // const handleSelectionOnKusamaMainNetwork = data => {
  //   console.log('object', data);
  //   selectAndGoBack(data.name);
  // };

  // const selectAndGoBack = network => {
  //   //set selected network state to Polkadot
  //   setSelectedNetwrok(network);

  //   //set selected network to Polkadot in REDUX as well

  //   resetState();
  //   handleClose();
  // };

  // const handleSelection = data => {
  //   console.log('object', modalState.firstStep);
  //   // if (modalState.firstStep === false) {
  //   //   console.log('mark4');
  //   //   setSelectedNetwrok(data.name);
  //   //   resetState();
  //   //   handleClose();
  //   // }
  //   if (modalState.firstStep === true) {
  //     console.log('mark1');
  //     //Polkadot main net selection scinario
  //     if (!data.moreOptions && data.name == 'Polkadot Main Network') {
  //       console.log('mark2');
  //       selectAndGoBack(data.name);
  //       return;
  //     }
  //     if (data.moreOptions && data.name == 'Kusama Main Networks') {
  //       console.log('mark3');
  //       setModalState({
  //         firstStep: false,
  //         renderMethod: RenderContentForKusamaMainNetwork,
  //         currentData: KusamaMainNetworks,
  //       });
  //     }
  //   } else {
  //     console.log('I AM IN ELSE');

  //     handleClose();
  //   }
  // };
  const { firstStep, renderMethod, currentData } = modalState;
  console.log({ firstStep, renderMethod, currentData });

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style} className="select-network-modal-style">
        <CloseIconDiv
          onClick={() => {
            resetState();
            handleClose();
          }}>
          <CloseIcon />
        </CloseIconDiv>

        <TitleDiv>
          {!modalState.firstStep && (
            <BackButton
              onClick={() => {
                // setSelectedNetwrok('');
                resetState();
              }}>
              <KeyboardArrowLeftIcon />
            </BackButton>
          )}

          <Title className={mainHeadingfontFamilyClass}>
            Available Networks
          </Title>
        </TitleDiv>

        {modalState.currentData.map(data => modalState.renderMethod(data))}

        {/* <SubHeading
          className={subHeadingfontFamilyClass}
          textAlignLast={'center'}>
          Please write the mnemonic down in order to ensure the backup is
          correct
        </SubHeading> */}

        {/* <div className="btn-row">
          <Button
            text="Cancel"
            cancel={true}
            width={'78%'}
            handleClick={() => handleClose()}
          />
          <Button
            text="Confirm"
            width={'78%'}
            handleClick={() => history.push('/ConfirmSeed')}
          />
        </div> */}
      </Box>
    </Modal>
  );
}

export default SelectNetwork;
