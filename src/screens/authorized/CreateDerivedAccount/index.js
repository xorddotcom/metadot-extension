/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint import/no-cycle: [2, { maxDepth: 1 }] */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import keyring from '@polkadot/ui-keyring';
import {
  AuthWrapper,
  Header,
  StyledInput,
  Button,
  SubHeading,
  SubMainWrapperForAuthScreens,
  WarningText,
} from '../../../components';
import {
  setLoggedIn,
  setPublicKey,
  setAccountName,
} from '../../../redux/slices/activeAccount';
import { fonts, helpers } from '../../../utils';
import accounts from '../../../utils/accounts';
import { LabelAndTextInput } from './styledComponent';
import {
  setIsResponseModalOpen,
  setLoadingForApi,
  setMainTextForSuccessModal,
  setResponseImage,
  setSubTextForSuccessModal,
} from '../../../redux/slices/modalHandling';
import ImportIcon from '../../../assets/images/modalIcons/import.svg';
import { addAccount } from '../../../redux/slices/accounts';

import services from '../../../utils/services';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;
const { isUserNameValid } = helpers;
const {
  AccountCreation, encrypt, derive,
} = accounts;

const passwordErrorMessages = {
  minimumCharacterWarning: 'Password should not be less than 8 characters',
  didnotMatchWarning: 'Password did not match!',
  passwordValidation: 'Password must contain at least one lower case, one upper case, one number and a special character',
};

const { minimumCharacterWarning, didnotMatchWarning, passwordValidation } = passwordErrorMessages;

const { getBalance, addressMapper } = services;

function CreateDerivedAccount() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const parentPassword = location.state.parentPassword && location.state.parentPassword;
  const parentAddress = location.state.parentAddress && location.state.parentAddress;
  console.log('--------------------------------');
  console.log('Parent Password ---------->', parentPassword);
  console.log('Parent Address ---------->', parentAddress);
  console.log('--------------------------------');

  // eslint-disable-next-line no-unused-vars
  const { seed, prefix } = useSelector((state) => state.activeAccount);

  const [walletName, setWalletName] = useState('');
  const [isValidWalletName, setIsValidWalletName] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const validatePasswordAndConfirmPassword = () => {
    const regexRes = password.match(/^(?=.*\d)(?=.*[~!><@#$%?,;.^/&}{*)(_+:[}="|`'-\\])(?=.*[a-z])(?=.*[A-Z])[\\.~!><@,;#$%?^}{/&*)(+:[}=|"`'\w-\]]{6,19}$/);

    if (regexRes == null) {
      setPasswordError(passwordValidation);
      return false;
    }
    if (!(password === confirmPassword)) {
      setPasswordError(didnotMatchWarning);
      return false;
    }
    if (password.length < 8 || confirmPassword.length < 8) {
      setPasswordError(minimumCharacterWarning);
      return false;
    }
    if (regexRes == null) {
      setPasswordError(passwordValidation);
      return false;
    }
    if (password === confirmPassword) {
      setPasswordError('');
      return true;
    }
    return true;
  };

  const [isLoading, setIsLoading] = useState(false);

  const derivationCreate = (parentAddresss, parentPasswoord, suri, childPassword, name) => {
    const childPair = derive(parentAddresss, suri, parentPasswoord, {
      name,
      parentAddresss,
      suri,
    });
    console.log('child pair =====++', childPair);
    const abc = keyring.addPair(childPair, childPassword);
    console.log('keyring add pair -----', abc);
    return childPair;
  };

  // const dervieAccount =
  // derivationCreate(parentAddress, parentPassword, '//0', password, walletName);
  // console.log('derive account --------->', dervieAccount);
  // const createAccount = async (name, pass, seedPhrase) => {
  //   const res = await AccountCreation({ name, password: pass, seed: seedPhrase });
  //   // getJsonBackup(res.address, pass);
  //   return res;
  // };

  const saveAccountInRedux = (add, name) => {
    const publicKeyOfRespectiveChain = addressMapper(add, prefix);
    console.log('In multiple accounts publick key of respective chain [][][]', publicKeyOfRespectiveChain);
    // update redux data and tracking flags accordingly
    console.log('hellow ww', { add, name });
    dispatch(setLoggedIn(true));
    dispatch(setPublicKey(publicKeyOfRespectiveChain));
    dispatch(setAccountName(name));
    // dispatch(setWalletPassword(hashedPassword));

    // const encryptedSeedWithAccountPassword = encrypt(currSeed, pass);
    dispatch(addAccount({
      // seed: encryptedSeedWithAccountPassword,
      accountName: name,
      publicKey: add,
      parentAddress,
    }));
  };

  const showSuccessModalAndNavigateToDashboard = () => {
    dispatch(setIsResponseModalOpen(true));
    dispatch(setResponseImage(ImportIcon));
    dispatch(setMainTextForSuccessModal('Successfully Derived!'));
    dispatch(
      setSubTextForSuccessModal(''),
    );
    history.push('/');

    setTimeout(() => {
      dispatch(setIsResponseModalOpen(false));
    }, 2500);

    // navigate to dashboard on success
  };

  const handleContinue = async () => {
    try {
      if (!isUserNameValid(walletName) || walletName.length < 3) {
        setIsValidWalletName(true);
        validatePasswordAndConfirmPassword();
        setIsLoading(false);
        return;
      }
      if (!validatePasswordAndConfirmPassword()) {
        setIsLoading(false);
        return;
      }
      const res = await derivationCreate(parentAddress, parentPassword, '//0', password, walletName);

      console.log('response handle continue ----', res);

      // // passsword.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/);
      // // eslint-disable-next-line no-new

      await saveAccountInRedux(res.address, walletName);
      dispatch(setLoadingForApi(false));
      setIsLoading(false);
      await showSuccessModalAndNavigateToDashboard();
    } catch (err) {
      console.log('error n create wallet', err);
    }
  };

  // const handleContinue = async () => {
  //   try {
  //     if (!isUserNameValid(walletName) || walletName.length < 3) {
  //       setIsValidWalletName(true);
  //       validatePasswordAndConfirmPassword();
  //       setIsLoading(false);
  //       return;
  //     }
  //     if (!validatePasswordAndConfirmPassword()) {
  //       setIsLoading(false);
  //       return;
  //     }
  //     const res = await createAccount(walletName, password, currSeed);
  //     // passsword.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/);
  //     // eslint-disable-next-line no-new

  //     await saveAccountInRedux(res.address, walletName, password);
  //     dispatch(setLoadingForApi(false));
  //     setIsLoading(false);
  //     await showSuccessModalAndNavigateToDashboard();
  //   } catch (err) {
  //     console.log('error n create wallet', err);
  //   }
  // };

  const walletNameText = {
    className: mainHeadingfontFamilyClass,
    mb: '10px',
  };

  const styledInputName = {
    className: subHeadingfontFamilyClass,
    placeholder: 'Enter wallet name for the derive account',
    height: '15px',
    value: walletName,
    onChange: (t) => {
      setIsValidWalletName(false);
      // eslint-disable-next-line no-unused-expressions
      t.length < 20 && setWalletName(t.replace(/[^A-Z0-9]/ig, ''));
    },
  };

  const styledInputPassword = {
    placeholder: 'Enter password for the derive account',
    className: subHeadingfontFamilyClass,
    value: password,
    height: '15px',
    onChange: (t) => {
      setPasswordError('');
      // eslint-disable-next-line no-unused-expressions
      t.length < 20 && setPassword(t);
    },
    hideHandler: () => setShowPassword(!showPassword),
    hideState: showPassword,
  };

  const styledInputConfirmPass = {
    placeholder: 'Re-enter password',
    className: subHeadingfontFamilyClass,
    value: confirmPassword,
    height: '15px',
    onChange: (t) => {
      setPasswordError('');
      // eslint-disable-next-line no-unused-expressions
      t.length < 20 && setConfirmPassword(t);
    },
    hideHandler: () => setShowConfirmPassword(!showConfirmPassword),
    hideState: showConfirmPassword,
  };

  // const derivePathInput = {
  //   id: 'seed-input',
  //   className: subHeadingfontFamilyClass,
  //   onChange: () => null,
  //   value: '//0',
  // };

  const btn = {
    text: 'Continue',
    width: '300px',
    disabled: !(walletName && password && confirmPassword) && true,
    handleClick: async () => {
      setIsLoading(true);
      await handleContinue();
    },
    // handleClick: () => console.log('clicked'),
    isLoading,
  };

  return (
    <AuthWrapper>
      <Header centerText="Derive Account" backHandler={() => console.log('object')} />
      <SubMainWrapperForAuthScreens mt="34px">
        <LabelAndTextInput>
          <SubHeading {...walletNameText}>
            Wallet Name
          </SubHeading>
          <StyledInput id="wallet-name" isCorrect {...styledInputName} />
          {isValidWalletName
          && (
          <WarningText id="warning-text" className={subHeadingfontFamilyClass}>
            Name should not be less than 3 characters and can only contain alphanumeric data
          </WarningText>
          )}
        </LabelAndTextInput>

        <LabelAndTextInput marginTop="10px">
          <SubHeading
            className={mainHeadingfontFamilyClass}
            marginTop="0px"
            mb="10px"
          >
            Password
          </SubHeading>
          <StyledInput
            id="password"
            {...styledInputPassword}
            typePassword
            isCorrect
            rightIcon
          />
          {passwordError === minimumCharacterWarning && (
            <WarningText
              id="warning-text-1"
              mb="10px"
              className={subHeadingfontFamilyClass}
            >
              {minimumCharacterWarning}
            </WarningText>
          )}
          {passwordError === passwordValidation && (
            <WarningText
              id="warning-text-2"
              mb="10px"
              className={subHeadingfontFamilyClass}
            >
              {passwordValidation}
            </WarningText>
          )}
          {passwordError === didnotMatchWarning && (
            <WarningText
              id="warning-text-3"
              mb="10px"
              className={subHeadingfontFamilyClass}
            >
              {didnotMatchWarning}
            </WarningText>
          )}
        </LabelAndTextInput>

        <LabelAndTextInput marginTop="0">
          <SubHeading
            className={mainHeadingfontFamilyClass}
            marginTop="0"
            mb="10px"
          >
            Confirm Password

          </SubHeading>
          <StyledInput
            id="confirm-password"
            {...styledInputConfirmPass}
            typePassword
            rightIcon
            isCorrect
          />
          {/* {passwordError === minimumCharacterWarning && (
            <WarningText
              className={subHeadingfontFamilyClass}
            >
              {minimumCharacterWarning}
            </WarningText>
          )} */}
          {passwordError === didnotMatchWarning && (
            <WarningText
              id="warning-text"
              mb="5px"
              className={subHeadingfontFamilyClass}
            >
              {didnotMatchWarning}
            </WarningText>
          )}

        </LabelAndTextInput>

        {/* <LabelAndTextInput>
          <SubHeading
            className={mainHeadingfontFamilyClass}
            marginTop="0"
            mb="10px"
          >
            Derive Path
          </SubHeading>
          <StyledInput
            id="derived-seed"
            rightIconLock
            disabled
            {...derivePathInput}
          />
        </LabelAndTextInput> */}

        {/* <SubHeading mb="0" textLightColor marginTop="5px" className={subHeadingfontFamilyClass}>
          This password will be used as the transaction password for the wallet,
          Metadot does not save passwords
          and cannot retrieve them for you. Please keep your password safe!
        </SubHeading> */}
      </SubMainWrapperForAuthScreens>
      <div className="btn-wrapper" style={{ marginLeft: '0', marginTop: '-10px' }}>
        <Button id="auth-continue" {...btn} />
      </div>
    </AuthWrapper>
  );
}

export default CreateDerivedAccount;
