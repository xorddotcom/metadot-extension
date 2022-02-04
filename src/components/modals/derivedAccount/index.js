import React, { useState } from 'react';
import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import { useHistory } from 'react-router';
import StyledInput from '../../styledInput/index';
import {
  MainDiv,
  MainText,
  MainText1,
  VerticalContentDiv,
  CloseIconDiv,
} from './styledComponent';

import Button from '../../button';
import { fonts } from '../../../utils';
import accounts from '../../../utils/accounts';
import { WarningText } from '../..';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

const { derive } = accounts;

function DerivedAccountModal({
  open,
  handleClose,
  style,
  publicKey,
}) {
  const history = useHistory();
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // --------------------------------
  // const derive = (parentAddress, suri, passwoord, metadata) => {
  //   const parentPair = keyring.getPair(parentAddress);
  //   try {
  //     parentPair.decodePkcs8(passwoord);
  //     console.log('success');
  //   } catch (e) {
  //     throw new Error('invalid password');
  //   }

  //   try {
  //     return parentPair.derive(suri, metadata);
  //   } catch (err) {
  //     throw new Error(`"${suri}" is not a valid derivation path`);
  //   }
  // };
  // --------------------------------

  const derivationValidate = (parentAddress, suri, parentPassword) => {
    try {
      const childPair = derive(parentAddress, suri, parentPassword, {});
      console.log('child pair --------> ', childPair);
      history.push({
        pathname: '/creatDerivedAccount',
        state:
          {
            parentPassword,
            parentAddress,
          },
      });
    } catch (err) {
      console.log('error due to wrong ', err);
      setPasswordError('Invalid password!');
    }
  };

  // const derivationCreate = (parentAddress, parentPassword, suri, childPassword, name) => {
  //   const childPair = derive(parentAddress, suri, parentPassword, {
  //     name,
  //     parentAddress,
  //     suri,
  //   });
  //   keyring.addPair(childPair, childPassword);
  //   return true;
  // };

  const styledInput = {
    placeholder: 'Enter Parent Password',
    value: password,
    className: subHeadingfontFamilyClass,
    fontSize: '9px',
    height: '20px',
    onChange: (t) => {
      if (t.length < 38) {
        setPassword(t);
        setPasswordError('');
      }
    },
    hideHandler: () => setShowPassword(!showPassword),
    hideState: showPassword,
    mt: '0.03rem',
  };

  const input = {
    id: 'seed-input',
    className: subHeadingfontFamilyClass,
    onChange: () => null,
    value: '//0',
    fontSize: '9px',
  };

  const warningText = {
    id: 'warning-text',
    className: subHeadingfontFamilyClass,
    visibility: !!passwordError,
    // visibility: invalidSeedMessage ? 'visible' : 'hidden',
  };

  const btnF = {
    text: 'Create Derive Account',
    width: '240px',
    height: '40px',
    fontSize: '0.8rem',
    handleClick: () => derivationValidate(publicKey, '//0', password),
  };

  return (
    <Modal
      key={publicKey}
      open={open}
      onClose={handleClose}
    >
      <Box sx={style} className="txDetails-modal-style">
        <CloseIconDiv
          id="close-icon"
          onClick={() => {
            handleClose();
          }}
        >
          <CloseIcon />
        </CloseIconDiv>
        <MainDiv>
          <MainText1 marginTop="10px" textAlign="center" className={mainHeadingfontFamilyClass}>Derived Account</MainText1>

          <VerticalContentDiv marginTop="15px" mb="10px">
            <MainText fs="14px" mb="15px" className={mainHeadingfontFamilyClass}>
              Password
            </MainText>

            <StyledInput id="auth-password" typePassword rightIcon {...styledInput} />
            <WarningText {...warningText}>
              {passwordError}
            </WarningText>
          </VerticalContentDiv>

          <VerticalContentDiv>
            <MainText fs="14px" mb="15px" className={mainHeadingfontFamilyClass}>
              Derivation Path
            </MainText>
            <StyledInput
              id="derived-seed"
              rightIconLock
              disabled
              {...input}
            />
          </VerticalContentDiv>

          <div className="btn-center" style={{ marginTop: '30px' }}>
            <Button id="create-derive-account" {...btnF} />
          </div>
        </MainDiv>
      </Box>
    </Modal>
  );
}

export default DerivedAccountModal;
