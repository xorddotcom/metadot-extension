import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import web3 from 'web3';
import { useHistory } from 'react-router-dom';
import keyring from '@polkadot/ui-keyring';
import {
  AuthWrapper,
  Header,
  StyledInput,
  Button,
  MainHeading,
  SubHeading,
  SubMainWrapperForAuthScreens,
} from '../../../components';
// eslint-disable-next-line import/namespace
import { AccountCreation } from '../../../ToolBox/accounts';
import {
  setLoggedIn,
  setPublicKey,
  setWalletPassword,
  setBalance,
  setAccountName,
} from '../../../redux/slices/account';
import { fonts, helpers } from '../../../utils';
import { WarningText, LabelAndTextInput } from './StyledComponents';
import constants from '../../../constants/onchain';
import { getBalance } from '../../../ToolBox/services';
import {
  setIsSuccessModalOpen,
  setMainTextForSuccessModal,
  setSubTextForSuccessModal,
} from '../../../redux/slices/successModalHandling';

const { WsProvider, ApiPromise } = require('@polkadot/api');

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;
const { isUserNameValid } = helpers;

const passwordErrorMessages = {
  minimumCharacterWarning: 'Minimum 8 characters required!',
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

  const handleContinue = async () => {
    try {
      if (!isUserNameValid(walletName) || walletName.length < 3) {
        console.log('invalid name');
        setIsValidWalletName(true);
        setIsLoading(false);
        return;
      }
      if (!validatePasswordAndConfirmPassword()) {
        setIsLoading(false);
        return;
      }

      // eslint-disable-next-line no-unused-expressions
      await keyring.loadAll({ ss58Format: 42, type: 'sr25519' });
      const res = await AccountCreation({ walletName, password, seed });
      console.log('Result [][]', res);

      const hashedPassword = web3.utils.sha3(password);
      console.log('Hashed password [][]', hashedPassword);
      // const hashedPassword =  await keccak256(password)
      // console.log('Hashed password', hashedPassword)
      // Set api into Redux

      const wsProvider = new WsProvider(constants.Polkadot_Rpc_Url);
      const api = await ApiPromise.create({ provider: wsProvider });
      await api.isReady;

      console.log('Api after creating wallet', api);

      const balance = await getBalance(api, res.address);
      dispatch(setBalance(balance));

      // update redux data and tracking flags accordingly
      dispatch(setLoggedIn(true));
      dispatch(setPublicKey(res.address));
      dispatch(setAccountName(walletName));
      dispatch(setWalletPassword(hashedPassword));

      setIsLoading(false);

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
      }, 3500);

      // navigate to dashboard on success
      history.push('/');
    } catch (err) {
      console.log('err in account creation in Create Wallet component', err);
      // eslint-disable-next-line no-unused-expressions
      const res = await AccountCreation({ walletName, password, seed });
      console.log('Result [][]', res);

      const hashedPassword = web3.utils.sha3(password);
      console.log('Hashed password [][]', hashedPassword);
      // const hashedPassword =  await keccak256(password)
      // console.log('Hashed password', hashedPassword)
      // Set api into Redux

      const wsProvider = new WsProvider(constants.Polkadot_Rpc_Url);
      const api = await ApiPromise.create({ provider: wsProvider });
      await api.isReady;

      console.log('Api after creating wallet', api);

      const balance = await getBalance(api, res.address);
      dispatch(setBalance(balance));

      // update redux data and tracking flags accordingly
      dispatch(setLoggedIn(true));
      dispatch(setPublicKey(res.address));
      dispatch(setAccountName(walletName));
      dispatch(setWalletPassword(hashedPassword));

      setIsLoading(false);

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
      }, 3500);

      // navigate to dashboard on success
      history.push('/');
      // setIsLoading(false);
      // alert(err);
    }
  };

  return (
    <AuthWrapper>
      <Header centerText="Create Wallet" />
      <div>
        <MainHeading className={mainHeadingfontFamilyClass}>Authentication</MainHeading>
      </div>
      <SubMainWrapperForAuthScreens>
        <LabelAndTextInput>
          <SubHeading className={mainHeadingfontFamilyClass}>Wallet Name</SubHeading>
          <StyledInput
            placeholder="Wallet Name"
            value={walletName}
            className={subHeadingfontFamilyClass}
            onChange={(t) => {
              setIsValidWalletName(false);
              // eslint-disable-next-line no-unused-expressions
              t.length < 20 && setWalletName(t);
            }}
          />
          {isValidWalletName && <WarningText>Invalid Username</WarningText>}
        </LabelAndTextInput>

        <LabelAndTextInput>
          <SubHeading className={mainHeadingfontFamilyClass}>Password</SubHeading>
          <StyledInput
            placeholder="password"
            className={subHeadingfontFamilyClass}
            value={password}
            onChange={(t) => {
              setPasswordError('');
              setPassword(t);
            }}
            typePassword
            hideHandler={() => setShowPassword(!showPassword)}
            hideState={showPassword}
            rightIcon
          />
          {passwordError === passwordErrorMessages.minimumCharacterWarning && (
            <WarningText>{passwordErrorMessages.minimumCharacterWarning}</WarningText>
          )}
          {passwordError === passwordErrorMessages.didnotMatchWarning && (
            <WarningText>{passwordErrorMessages.didnotMatchWarning}</WarningText>
          )}
        </LabelAndTextInput>

        <LabelAndTextInput>
          <SubHeading className={mainHeadingfontFamilyClass}>Confirm Password</SubHeading>
          <StyledInput
            placeholder="re-enter password"
            className={subHeadingfontFamilyClass}
            value={confirmPassword}
            onChange={(t) => {
              setPasswordError('');
              setConfirmPassword(t);
            }}
            typePassword
            hideHandler={() => setShowConfirmPassword(!showConfirmPassword)}
            hideState={showConfirmPassword}
            rightIcon
          />
          {passwordError === passwordErrorMessages.minimumCharacterWarning && (
            <WarningText>{passwordErrorMessages.minimumCharacterWarning}</WarningText>
          )}
          {passwordError === passwordErrorMessages.didnotMatchWarning && (
            <WarningText>{passwordErrorMessages.didnotMatchWarning}</WarningText>
          )}
        </LabelAndTextInput>

        <SubHeading className={subHeadingfontFamilyClass}>
          {' - '}
          Name can only consist of uppercase and lowercase alphabets and numbers.
          <br />
          {' - '}
          Password should be at least 8 characters.
          <br />
          {' - '}
          This password will be used as the transaction password for the wallet, MetaDot does not
          save password and cannot retrieve them for you. Please keep your password safe!
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
