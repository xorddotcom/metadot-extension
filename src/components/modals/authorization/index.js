/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import Button from '../../button';
import { fonts } from '../../../utils';
import accounts from '../../../utils/accounts';
import StyledInput from '../../styledInput/index';
import {
  MainDiv, MainText, MainText1, VerticalContentDiv,
  SubText,
} from './styledComponent';
import { WarningText } from '../..';
import { setAuthScreenModal, setConfirmSendModal } from '../../../redux/slices/modalHandling';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;
const { unlockPair } = accounts;

function AuthModal({
  open, handleClose, style, onConfirm, publicKey, setOpenAuthModa,
}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.activeAccount);

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    if (!password) {
      return false;
    }
    try {
      const sender = unlockPair(publicKey, password);
      if (sender !== false) {
        dispatch(setAuthScreenModal(false));
        dispatch(setConfirmSendModal(true));
        onConfirm(publicKey, password, sender);
        setOpenAuthModa(false);
      } else {
        throw new Error('Invalid password');
      }
    } catch (err) {
      console.log('error due to wrong ', err);
      setPasswordError('Invalid password!');
    }
    return null;
  };

  const viewSeedSubmit = () => {
    if (!password) {
      return false;
    }
    try {
      const sender = unlockPair(publicKey, password);
      if (sender !== false) {
        dispatch(setAuthScreenModal(false));
      }
    } catch (err) {
      console.log('error due to wrong ', err);
      setPasswordError('Invalid password!');
    }
    return null;
  };

  const styledInput = {
    placeholder: 'Enter Password',
    value: password,
    className: subHeadingfontFamilyClass,
    fontSize: '12px',
    height: '20px',
    onChange: (t) => {
      setPassword(t);
      setPasswordError('');
    },
    hideHandler: () => setShowPassword(!showPassword),
    hideState: showPassword,
    mt: '0.03rem',
  };

  const btnF = {
    text: 'Cancel',
    width: '110px',
    height: '40px',
    fontSize: '0.8rem',
    handleClick: () => {
      setPassword('');
      handleClose();
    },
  };

  const test = () => {
    console.log('Running');
  };

  const btnS = {
    text: 'Confirm',
    width: '110px',
    height: '40px',
    fontSize: '0.8rem',
    handleClick: () => handleSubmit() || viewSeedSubmit(),
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box sx={style} className="txDetails-modal-style auth-modal">
        <MainDiv>
          <MainText1 textAlign="center" className={mainHeadingfontFamilyClass}>Authorization</MainText1>
          {/* <SubText
            marginTop="6px"
            textAlign="left"
            className={subHeadingfontFamilyClass}
          >
            If you wish to export your wallet, verify your password to proceed.
            A json file will be downloaded to your device.
          </SubText> */}

          <VerticalContentDiv marginTop="15px" mb="20px">
            <MainText fs="14px" mb="15px" className={mainHeadingfontFamilyClass}>
              Password
            </MainText>

            <StyledInput id="auth-password" typePassword rightIcon {...styledInput} />
            <WarningText
              className={subHeadingfontFamilyClass}
              visibility={!!passwordError}
            >
              {passwordError}
            </WarningText>
          </VerticalContentDiv>

          <div className="btn-row">
            <Button id="cancel" cancel {...btnF} />
            <Button id="confirm" {...btnS} />
          </div>
        </MainDiv>
      </Box>
    </Modal>
  );
}

export default AuthModal;
