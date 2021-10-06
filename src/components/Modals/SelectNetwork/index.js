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

function SelectNetwork({ open, handleClose, modalState, resetState, style }) {
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
