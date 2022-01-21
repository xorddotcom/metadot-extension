import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
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
import { LabelAndTextInput } from './styledComponents';
import {
  setIsResponseModalOpen,
  setLoadingForApi,
  setMainTextForSuccessModal,
  setResponseImage,
  setSubTextForSuccessModal,
} from '../../../redux/slices/modalHandling';
import ImportIcon from '../../../assets/images/modalIcons/import.svg';
import AccountCreate from '../../../assets/images/modalIcons/accountCreate.svg';
import { addAccount } from '../../../redux/slices/accounts';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;
const { isUserNameValid } = helpers;
const { AccountCreation } = accounts;

const passwordErrorMessages = {
  minimumCharacterWarning: 'Password should not be less than 8 characters',
  didnotMatchWarning: 'Password did not match!',
  passwordValidation: 'Password must contain at least one lower case, one upper case, one number and a special character',
};

const { minimumCharacterWarning, didnotMatchWarning, passwordValidation } = passwordErrorMessages;

function CreateWallet() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const operation = history.entries[history.entries.length - 2].pathname === '/ImportWallet'
    ? 'Imported'
    : 'Created';

  console.log(`history entries -->${history.entries[history.entries.length - 2].pathname}`);

  // let currSeed = '';
  // let parentKey = '';

  // if (history.entries[history.entries.length - 2].pathname === 'accounts') {
  //   currSeed = location.state.seedToPass && location.state.seedToPass;
  //   parentKey = location.state.parentKey && location.state.parentKey;
  //   console.log('Parent Key ---------->', parentKey);
  // }

  const currSeed = location.state.seedToPass && location.state.seedToPass;
  const parentKey = location.state.parentKey && location.state.parentKey;
  console.log('Parent Key ---------->', parentKey);

  // eslint-disable-next-line no-unused-vars
  const { seed } = useSelector((state) => state.activeAccount);

  const [walletName, setWalletName] = useState('');
  const [isValidWalletName, setIsValidWalletName] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const validatePasswordAndConfirmPassword = () => {
    const regexRes = password.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\\~!><@#$%?,;.^/&}{*)(_+:[}="|`'-])[a-zA-Z0-9\\.~!><@,;#$%?^}{/&*)(+:[}=|"`'\w-]{7,19}/);

    if (password.length < 8) {
      setPasswordError(minimumCharacterWarning);
      return false;
    }
    if (!(password === confirmPassword)) {
      setPasswordError(didnotMatchWarning);
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

  // const validateWalletName = () => {
  //   const regexRes = password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/);
  //   console.log('Regex res [][]', regexRes);
  //   if (regexRes == null) {
  // setRegexError('Password must contain at least one lower case,
  //  one upper case and one number'); }
  //   setRegexError(true);
  // };

  const [isLoading, setIsLoading] = useState(false);

  const createAccount = async (name, pass, seedPhrase) => {
    const res = await AccountCreation({ name, password: pass, seed: seedPhrase });
    return res;
  };

  const saveAccountInRedux = (add, name) => {
    // update redux data and tracking flags accordingly
    dispatch(setLoggedIn(true));
    dispatch(setPublicKey(add));
    dispatch(setAccountName(name));
    // dispatch(setWalletPassword(hashedPassword));

    dispatch(addAccount({
      accountName: name,
      publicKey: add,
      parentKey,
    }));
  };

  const showSuccessModalAndNavigateToDashboard = () => {
    if (operation === 'Imported') {
      dispatch(setIsResponseModalOpen(true));
      dispatch(setResponseImage(ImportIcon));
      dispatch(setMainTextForSuccessModal(`Successfully ${operation}!`));
      dispatch(
        setSubTextForSuccessModal(''),
      );
      history.push('/');
    } else {
      dispatch(setIsResponseModalOpen(true));
      dispatch(setResponseImage(AccountCreate));
      dispatch(setMainTextForSuccessModal(`Successfully ${operation}!`));
      dispatch(
        setSubTextForSuccessModal(''),
      );
      history.push('/');
    }

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
      const res = await createAccount(walletName, password, currSeed);

      await saveAccountInRedux(res.address, walletName);
      dispatch(setLoadingForApi(false));
      setIsLoading(false);
      await showSuccessModalAndNavigateToDashboard();
    } catch (err) {
      console.log('error n create wallet', err);
    }
  };

  const walletNameText = {
    className: mainHeadingfontFamilyClass,
    mb: '10px',
  };

  const styledInputName = {
    className: subHeadingfontFamilyClass,
    placeholder: 'Wallet Name',
    height: '15px',
    value: walletName,
    onChange: (t) => {
      setIsValidWalletName(false);
      // eslint-disable-next-line no-unused-expressions
      t.length < 20 && setWalletName(t.replace(/[^A-Z0-9]/ig, ''));
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
      <Header centerText="Authentication" backHandler={() => console.log('object')} />
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

        <SubHeading mb="0" textLightColor marginTop="5px" className={subHeadingfontFamilyClass}>
          This password will be used as the transaction password for the wallet,
          Metadot does not save passwords
          and cannot retrieve them for you. Please keep your password safe!
        </SubHeading>
      </SubMainWrapperForAuthScreens>
      <div className="btn-wrapper" style={{ marginLeft: '0', marginBottom: '10px' }}>
        <Button id="auth-continue" {...btn} />
      </div>
    </AuthWrapper>
  );
}

export default CreateWallet;
