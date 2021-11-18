/* eslint-disable no-unused-vars */
import React from 'react';
import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import Button from '../../Button';
import { fonts } from '../../../utils';
import StyledInput from '../../StyledInput/index';
import {
  MainDiv, MainText, MainText1, VerticalContentDiv,
} from './StyledComponent';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

function AuthScreen({
  open, handleClose, style,
}) {
  const btnF = {
    text: 'Cancel',
    width: '123px',
    height: '45px',
    fontSize: '0.8rem',
    handleClick: handleClose,
  };

  const btnS = {
    text: 'Confirm',
    width: '123px',
    height: '45px',
    fontSize: '0.8rem',
    handleClick: () => console.log('clicked'),
  };

  const styledInput = {
    placeholder: 'Enter Password',
    value: '',
    className: subHeadingfontFamilyClass,
    fontSize: '12px',
    height: '25px',
    // onChange: ,
    // isCorrect: ,
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Box sx={style} className="txDetails-modal-style">
        <MainDiv>
          <MainText1 textAlign="center" className={mainHeadingfontFamilyClass}>Authorization</MainText1>

          <VerticalContentDiv marginTop="15px" mb="30px">
            <MainText fs="14px" mb="15px" className={mainHeadingfontFamilyClass}>
              Password
            </MainText>

            <StyledInput {...styledInput} />

          </VerticalContentDiv>

          <div className="btn-row">
            <Button cancel {...btnF} />
            <Button {...btnS} />
          </div>
        </MainDiv>
      </Box>
    </Modal>
  );
}

export default AuthScreen;
