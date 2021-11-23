/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import Button from '../../Button';
import { fonts } from '../../../utils';
import StyledInput from '../../StyledInput/index';
import {
  MainDiv, MainText, MainText1, VerticalContentDiv, WarningText,
} from './StyledComponent';
import { decrypt } from '../../../utils/accounts';
import { setAuthScreenModal } from '../../../redux/slices/successModalHandling';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

function AuthScreen({
  open, handleClose, style, sendTransaction,
}) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.account);

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    if (!password) {
      return false;
    }
    try {
      const dSeed = decrypt(currentUser.seed, password);
      console.log('Correct');
      dispatch(setAuthScreenModal(false));
      sendTransaction(dSeed);
    } catch (err) {
      console.log('error due to wrong ', err);
      // alert('Password does not match');
      setPasswordError('Invalid password!');
    }
    return null;
  };

  const styledInput = {
    placeholder: 'Enter Password',
    value: password,
    className: subHeadingfontFamilyClass,
    fontSize: '12px',
    height: '25px',
    onChange: (t) => {
      setPassword(t);
      setPasswordError('');
    },
    type: 'password',
    hideHandler: () => setShowPassword(!showPassword),
    hideState: showPassword,
  };

  const btnF = {
    text: 'Cancel',
    width: '110px',
    height: '40px',
    fontSize: '0.8rem',
    handleClick: handleClose,
  };

  const btnS = {
    text: 'Confirm',
    width: '110px',
    height: '40px',
    fontSize: '0.8rem',
    handleClick: () => handleSubmit(),
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Box sx={style} className="txDetails-modal-style">
        <MainDiv>
          <MainText1 marginTop="10px" textAlign="center" className={mainHeadingfontFamilyClass}>Authorization</MainText1>

          <VerticalContentDiv marginTop="15px" mb="30px">
            <MainText fs="14px" mb="15px" className={mainHeadingfontFamilyClass}>
              Password
            </MainText>

            <StyledInput {...styledInput} />
            <WarningText
              className={subHeadingfontFamilyClass}
              visibility={!!passwordError}
            >
              {passwordError}
            </WarningText>
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
