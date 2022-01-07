/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import keyring from '@polkadot/ui-keyring';
import Button from '../../button';
import { fonts } from '../../../utils';
import accounts from '../../../utils/accounts';
import StyledInput from '../../styledInput/index';
import {
  MainDiv, MainText, MainText1, VerticalContentDiv,
} from './styledComponent';
import { WarningText } from '../..';
import { setAuthScreenModal, setConfirmSendModal } from '../../../redux/slices/modalHandling';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;
const { unlockPair } = accounts;

function AuthModal({
  open, handleClose, style, sendTransaction, getSeedHandler, publicKey,
}) {
  const history = useHistory();
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
      const sender = unlockPair(publicKey, password);
      if (sender !== false) {
        dispatch(setAuthScreenModal(false));
        dispatch(setConfirmSendModal(true));
        sendTransaction(sender);
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
        getSeedHandler(true);
      }
    } catch (err) {
      console.log('error due to wrong ', err);
      setPasswordError('Invalid password!');
      getSeedHandler(false);
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
    handleClick: handleClose,
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
    >
      <Box sx={style} className="txDetails-modal-style">
        <MainDiv>
          <MainText1 marginTop="10px" textAlign="center" className={mainHeadingfontFamilyClass}>Authorization</MainText1>

          <VerticalContentDiv marginTop="15px" mb="30px">
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
