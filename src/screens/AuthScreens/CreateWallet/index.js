/* eslint import/no-cycle: [2, { maxDepth: 1 }] */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import web3 from 'web3';
import { useHistory } from 'react-router-dom';
import {
  AuthWrapper,
  Header,
  StyledInput,
  Button,
  SubHeading,
  SubMainWrapperForAuthScreens,
} from '../../../components';
// eslint-disable-next-line import/namespace
import { AccountCreation, decrypt, encrypt } from '../../../utils/accounts';
import {
  setLoggedIn,
  setPublicKey,
  setWalletPassword,
  setAccountName,
  setSeed,
} from '../../../redux/slices/account';
import { fonts, helpers } from '../../../utils';
import { WarningText, LabelAndTextInput } from './StyledComponents';
import {
  setIsSuccessModalOpen,
  setLoadingFor,
  setMainTextForSuccessModal,
  setSubTextForSuccessModal,
} from '../../../redux/slices/successModalHandling';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;
const { isUserNameValid } = helpers;

const passwordErrorMessages = {
  minimumCharacterWarning: 'Password should not be less than 8 characters',
  didnotMatchWarning: 'Password did not match!',
};

const { minimumCharacterWarning, didnotMatchWarning } = passwordErrorMessages;

function CreateWallet() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { seed } = useSelector((state) => state.account);

  const [walletName, setWalletName] = useState('');
  const [isValidWalletName, setIsValidWalletName] = useState(false);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordError, setPasswordError] = useState('');

  const validatePasswordAndConfirmPassword = () => {
    if (!(password === confirmPassword)) {
      setPasswordError(didnotMatchWarning);
      return false;
    }
    if (password.length < 8 || confirmPassword.length < 8) {
      setPasswordError(minimumCharacterWarning);
      return false;
    }
    if (password === confirmPassword) {
      setPasswordError('');
      return true;
    }
    return true;
  };

  const [isLoading, setIsLoading] = useState(false);

  const createAccount = async (name, pass, seedPhrase) => {
    const res = await AccountCreation({ name, password: pass, seed: seedPhrase });
    return res;
  };

  const saveAccountInRedux = (add, name, pass) => {
    const hashedPassword = web3.utils.sha3(pass);
    // update redux data and tracking flags accordingly
    dispatch(setLoggedIn(true));
    dispatch(setPublicKey(add));
    dispatch(setAccountName(name));
    dispatch(setWalletPassword(hashedPassword));

    const tmpPassword = '123';
    const decryptedSeed = decrypt(seed, tmpPassword);

    const encryptedSeedWithAccountPassword = encrypt(decryptedSeed, hashedPassword);
    dispatch(setSeed(encryptedSeedWithAccountPassword));
  };

  const showSuccessModalAndNavigateToDashboard = () => {
    const operation = history.entries[history.entries.length - 2].pathname === '/ImportWallet'
      ? 'Imported'
      : 'Created';

    dispatch(setMainTextForSuccessModal(`Successfully ${operation}!`));
    dispatch(
      setSubTextForSuccessModal(`Congratulations, You've successfully ${operation} your account!`),
    );
    dispatch(setIsSuccessModalOpen(true));

    setTimeout(() => {
      dispatch(setIsSuccessModalOpen(false));
      history.push('/');
    }, 2500);

    // navigate to dashboard on success
  };

  const handleContinue = async () => {
    const tmpPasswordW = '123';
    const decryptedSeedW = decrypt(seed, tmpPasswordW);
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

      // eslint-disable-next-line no-unused-expressions
      const res = await createAccount(walletName, password, decryptedSeedW);
      await saveAccountInRedux(res.address, walletName, password);
      dispatch(setLoadingFor('Setting things up...'));
      setIsLoading(false);
      await showSuccessModalAndNavigateToDashboard();
    } catch (err) {
      console.log('error n create wallet', err);
    }
  };

  const styledInputName = {
    className: subHeadingfontFamilyClass,
    placeholder: 'Wallet Name',
    height: '15px',
    value: walletName,
    onChange: (t) => {
      setIsValidWalletName(false);
      // eslint-disable-next-line no-unused-expressions
      t.length < 20 && setWalletName(t);
    },
  };

  const styledInputPassword = {
    placeholder: 'Password',
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
    placeholder: 're-enter password',
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

  const btn = {
    text: 'Continue',
    width: '300px',
    disabled: !(walletName && password && confirmPassword) && true,
    handleClick: async () => {
      setIsLoading(true);
      await handleContinue();
    },
    isLoading,
  };

  return (
    <AuthWrapper>
      <Header centerText="Authentication" />
      <SubMainWrapperForAuthScreens mt="34px">
        <LabelAndTextInput>
          <SubHeading marginBottom="12px" className={mainHeadingfontFamilyClass}>
            Wallet Name
          </SubHeading>
          <StyledInput isCorrect {...styledInputName} />
          {isValidWalletName
          && (
          <WarningText className={subHeadingfontFamilyClass}>
            Name should not be less than 3 characters and can only contain alphanumeric data
          </WarningText>
          )}
        </LabelAndTextInput>

        <LabelAndTextInput marginTop="22px">
          <SubHeading
            className={mainHeadingfontFamilyClass}
            marginTop="0px"
          >
            Password
          </SubHeading>
          <StyledInput
            {...styledInputPassword}
            typePassword
            isCorrect
            rightIcon
          />
          {passwordError === minimumCharacterWarning && (
            <WarningText
              className={subHeadingfontFamilyClass}
            >
              {minimumCharacterWarning}
            </WarningText>
          )}
          {passwordError === didnotMatchWarning && (
            <WarningText
              className={subHeadingfontFamilyClass}
            >
              {didnotMatchWarning}
            </WarningText>
          )}
        </LabelAndTextInput>

        <LabelAndTextInput marginTop="13.5px">
          <SubHeading
            className={mainHeadingfontFamilyClass}
            marginTop="0"
          >
            Confirm Password

          </SubHeading>
          <StyledInput
            {...styledInputConfirmPass}
            typePassword
            rightIcon
            isCorrect
          />
          {passwordError === minimumCharacterWarning && (
            <WarningText
              className={subHeadingfontFamilyClass}
            >
              {minimumCharacterWarning}
            </WarningText>
          )}
          {passwordError === didnotMatchWarning && (
            <WarningText
              className={subHeadingfontFamilyClass}
            >
              {didnotMatchWarning}
            </WarningText>
          )}
        </LabelAndTextInput>

        <SubHeading textLightColor marginTop="20px" className={subHeadingfontFamilyClass}>
          This password will be used as the transaction password for the wallet,
          MetaDot does not save passwords
          and cannot retrieve them for you. Please keep your password safe!
        </SubHeading>
      </SubMainWrapperForAuthScreens>
      <div className="btn-wrapper" style={{ marginLeft: '0' }}>
        <Button {...btn} />
      </div>
    </AuthWrapper>
  );
}

export default CreateWallet;
