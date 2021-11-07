import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import web3 from 'web3';
import { useHistory } from 'react-router-dom';
import keyring from '@polkadot/ui-keyring';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import {
  AuthWrapper,
  Header,
  StyledInput,
  Button,
  // MainHeading,
  SubHeading,
  SubMainWrapperForAuthScreens,
} from '../../../components';
// eslint-disable-next-line import/namespace
import { AccountCreation, decrypt, encrypt } from '../../../ToolBox/accounts';
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
      setPasswordError(passwordErrorMessages.didnotMatchWarning);
      return false;
    }
    if (password.length < 8 || confirmPassword.length < 8) {
      setPasswordError(passwordErrorMessages.minimumCharacterWarning);
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
      await keyring.loadAll({ ss58Format: 42, type: 'sr25519' });
      const res = await createAccount(walletName, password, decryptedSeedW);
      await saveAccountInRedux(res.address, walletName, password);
      dispatch(setLoadingFor('Setting things up...'));
      setIsLoading(false);
      await showSuccessModalAndNavigateToDashboard();
    } catch (err) {
      const res = await createAccount(walletName, password, decryptedSeedW);
      await saveAccountInRedux(res.address, walletName, password);
      dispatch(setLoadingFor('Setting things up...'));
      setIsLoading(false);
      await showSuccessModalAndNavigateToDashboard();
    }
  };

  return (
    <AuthWrapper>
      <Header centerText="Authentication" />
      <SubMainWrapperForAuthScreens style={{ marginTop: '1.4rem' }}>
        <LabelAndTextInput minHeight="117px">
          <SubHeading
            className={mainHeadingfontFamilyClass}
            marginTop="0px"
          >
            Wallet Name
          </SubHeading>
          <StyledInput
            className={subHeadingfontFamilyClass}
            placeholder="Wallet Name"
            height="15px"
            value={walletName}
            onChange={(t) => {
              setIsValidWalletName(false);
              // eslint-disable-next-line no-unused-expressions
              t.length < 20 && setWalletName(t);
            }}
          />
          {isValidWalletName
          && (
          <WarningText className={subHeadingfontFamilyClass}>
            Name should not be less than 3 characters and can only contain alphanumeric data
          </WarningText>
          )}
        </LabelAndTextInput>

        <LabelAndTextInput>
          <SubHeading
            className={mainHeadingfontFamilyClass}
            marginTop="0px"
          >
            Password
          </SubHeading>
          <StyledInput
            placeholder="Password"
            className={subHeadingfontFamilyClass}
            value={password}
            height="15px"
            onChange={(t) => {
              setPasswordError('');
              // eslint-disable-next-line no-unused-expressions
              t.length < 20 && setPassword(t);
            }}
            typePassword
            hideHandler={() => setShowPassword(!showPassword)}
            hideState={showPassword}
            rightIcon
          />
          {passwordError === passwordErrorMessages.minimumCharacterWarning && (
            <WarningText
              className={subHeadingfontFamilyClass}
            >
              {passwordErrorMessages.minimumCharacterWarning}
            </WarningText>
          )}
          {passwordError === passwordErrorMessages.didnotMatchWarning && (
            <WarningText
              className={subHeadingfontFamilyClass}
            >
              {passwordErrorMessages.didnotMatchWarning}
            </WarningText>
          )}
        </LabelAndTextInput>

        <LabelAndTextInput>
          <SubHeading marginTop="0px" className={mainHeadingfontFamilyClass}>Confirm Password</SubHeading>
          <StyledInput
            placeholder="re-enter password"
            className={subHeadingfontFamilyClass}
            value={confirmPassword}
            height="15px"
            onChange={(t) => {
              setPasswordError('');
              // eslint-disable-next-line no-unused-expressions
              t.length < 20 && setConfirmPassword(t);
            }}
            typePassword
            hideHandler={() => setShowConfirmPassword(!showConfirmPassword)}
            hideState={showConfirmPassword}
            rightIcon
          />
          {passwordError === passwordErrorMessages.minimumCharacterWarning && (
            <WarningText
              className={subHeadingfontFamilyClass}
            >
              {passwordErrorMessages.minimumCharacterWarning}
            </WarningText>
          )}
          {passwordError === passwordErrorMessages.didnotMatchWarning && (
            <WarningText
              className={subHeadingfontFamilyClass}
            >
              {passwordErrorMessages.didnotMatchWarning}
            </WarningText>
          )}
        </LabelAndTextInput>

        <SubHeading className={subHeadingfontFamilyClass}>
          <List style={{
            fontSize: '0.7rem',
            marginLeft: '-0.4rem',
            marginTop: '-1.5rem',
            marginBottom: '-0.7rem',
          }}
          >
            <ListItem style={{ marginBottom: '-1.7rem' }}>
              This password will be used as the transaction password for the wallet,
              Polo Wallet does not save passwords
              and cannot retrieve them for you. Please keep your password safe!
            </ListItem>
          </List>
        </SubHeading>
      </SubMainWrapperForAuthScreens>
      <div className="btn-wrapper">
        <Button
          text="Continue"
          disabled={!(walletName && password && confirmPassword) && true}
          handleClick={async () => {
            setIsLoading(true);
            await handleContinue();
          }}
          isLoading={isLoading}
        />
      </div>
    </AuthWrapper>
  );
}

export default CreateWallet;
