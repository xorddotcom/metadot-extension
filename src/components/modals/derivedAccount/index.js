/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import { Input } from '@material-ui/core';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import keyring from '@polkadot/ui-keyring';
import StyledInput from '../../styledInput/index';
import {
  MainDiv,
  MainText,
  MainText1,
  VerticalContentDiv,
  CloseIconDiv,
} from './styledComponent';

import { setAuthScreenModal, setDerivedAccountModal } from '../../../redux/slices/modalHandling';
import Button from '../../button';
import { fonts, colors } from '../../../utils';
import accounts from '../../../utils/accounts';
import { WarningText } from '../..';

const { primaryText, darkBackground1 } = colors;
const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

const {
  decrypt, derive, encrypt, KeyringInitialization, validatingSeedPhrase, AccountCreation,
} = accounts;

function DerivedAccountModal({
  open,
  handleClose,
  style,
  accountSeed,
  publicKey,
  setAccountNull,
  setModalIsOpen,
}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const userAccounts = useSelector((state) => state.accounts);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [seedPhrase, setSeedPhrase] = useState('');

  //   useEffect(() => {
  //     const accountExistCheck = async () => {
  //       if (accountSeed) {
  //         console.log('params seed', accountSeed);
  //         try {
  //           if (!password) {
  //             return false;
  //           }
  //           const dSeed = decrypt(accountSeed, password);
  //           console.log('Correct');
  //           dispatch(setDerivedAccountModal(false));

  //           let derivedSeed = '';
  //           let derivedAccount = '';
  //           let i = 0;
  //           do {
  //             derivedSeed = `${dSeed}//${i}`;
  //             console.log('derived account before');
  //             // eslint-disable-next-line no-await-in-loop
  //             derivedAccount = await
  //   AccountCreation({ name: 'AAA', password: 'BBB', seed: derivedSeed });
  //             console.log('derived Account ==>>', derivedAccount);
  //             i += 1;
  //           } while (userAccounts[derivedAccount.address]);

  //           console.log('derived account after');
  //           setSeedPhrase(derivedSeed);
  //           console.log('-----------********', seedPhrase);
  //         } catch (err) {
  //           console.log('error due to wrong ', err);
  //           setPasswordError('Invalid password!');
  //         }
  //       }
  //       return null;
  //     };

  // accountExistCheck();
  //   }, [accountSeed, userAccounts, password]);

  // eslint-disable-next-line consistent-return
  const accountExistCheck = async () => {
    if (accountSeed) {
      console.log('params seed', accountSeed);
      try {
        if (!password) {
          return false;
        }
        const dSeed = decrypt(accountSeed, password);
        console.log('Correct');
        // dispatch(setDerivedAccountModal(false));
        setAccountNull(null);
        let derivedSeed = '';
        let derivedAccount = '';
        let i = 0;
        do {
          derivedSeed = `${dSeed}//${i}`;
          console.log('derived account before');
          // eslint-disable-next-line no-await-in-loop
          derivedAccount = await AccountCreation({ name: 'AAA', password: 'BBB', seed: derivedSeed });
          console.log('derived Account ==>>', derivedAccount);
          i += 1;
        } while (userAccounts[derivedAccount.address]);

        console.log('derived account after');
        setSeedPhrase(derivedSeed);

        history.push({
          pathname: '/creatDerivedAccount',
          state:
          {
            seedToPass: derivedSeed,
            parentKey: publicKey,
          },
        });

        // -------------------------
      } catch (err) {
        console.log('error due to wrong ', err);
        setPasswordError('Invalid password!');
      }
    } else {
      console.log('abc abc');
    }
  };

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
    placeholder: 'Enter Password',
    value: password,
    className: subHeadingfontFamilyClass,
    fontSize: '9px',
    height: '20px',
    onChange: (t) => {
      setPassword(t);
      setPasswordError('');
    },
    hideHandler: () => setShowPassword(!showPassword),
    hideState: showPassword,
    mt: '0.03rem',
  };

  const input = {
    id: 'seed-input',
    className: subHeadingfontFamilyClass,
    onChange: (e) => null,
    value: '//0',
    fontSize: '9px',
  };

  const warningText = {
    id: 'warning-text',
    className: subHeadingfontFamilyClass,
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
            <WarningText
              className={subHeadingfontFamilyClass}
              visibility={!!passwordError}
            >
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
