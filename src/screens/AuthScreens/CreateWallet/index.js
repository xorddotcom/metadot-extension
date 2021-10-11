import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import web3 from 'web3';
import { useHistory } from 'react-router-dom';
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
  setLoggedIn, setPublicKey, setWalletPassword,
} from '../../../redux/slices/account';
import { fonts } from '../../../utils';
import { WarningText } from './StyledComponents';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

const passwordErrorMessages = {
  minimumCharacterWarning: 'Minimum 8 characters required!',
  didnotMatchWarning: 'Password did not match!',
};

function CreateWallet() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { seed } = useSelector((state) => state.account);

  const [walletName, setWalletName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordError, setPasswordError] = useState('');

  const validatePasswordAndConfirmPassword = () => {
    if (!(password === confirmPassword)) {
      setPasswordError(passwordErrorMessages.didnotMatchWarning);
      return false;
    } if (password.length < 8 || confirmPassword.length < 8) {
      setPasswordError(passwordErrorMessages.minimumCharacterWarning);
      return false;
    } if (password === confirmPassword) {
      setPasswordError('');
      return true;
    }
    return true;
  };

  const handleContinue = async () => {
    if (!validatePasswordAndConfirmPassword()) return;

    console.log({ walletName, password, seed });
    // create account with walletName, password and seed by using keyring
    const res = await AccountCreation({ walletName, password, seed });
    console.log('Result [][]', res);
    // console.log('Password', password)
    const hashedPassword = web3.utils.sha3(password);
    // const hashedPassword =  await keccak256(password)
    // console.log('Hashed password', hashedPassword)
    dispatch(setLoggedIn(true));
    dispatch(setPublicKey(res.address));
    dispatch(setWalletPassword(hashedPassword));

    // update redux data and tracking flags accordingly

    // navigate to dashboard on success
    history.push('/');
  };

  return (
    <AuthWrapper>
      <Header centerText="Create Wallet" />
      <div>
        <MainHeading className={mainHeadingfontFamilyClass}>
          Authentication
        </MainHeading>
      </div>
      <SubMainWrapperForAuthScreens>
        <SubHeading className={mainHeadingfontFamilyClass}>
          Wallet Name
        </SubHeading>
        <StyledInput
          placeholder="Account 0"
          value={walletName}
          className={subHeadingfontFamilyClass}
          onChange={(t) => setWalletName(t)}
        />

        <SubHeading className={mainHeadingfontFamilyClass}>Password</SubHeading>
        <StyledInput
          placeholder="password"
          className={subHeadingfontFamilyClass}
          value={password}
          onChange={(t) => setPassword(t)}
          type="password"
          typePassword
          hideHandler={() => setShowPassword(!showPassword)}
          hideState={showPassword}
          rightIcon
        />
        {passwordError === passwordErrorMessages.minimumCharacterWarning && (
          <WarningText>
            {passwordErrorMessages.minimumCharacterWarning}
          </WarningText>
        )}
        {passwordError === passwordErrorMessages.didnotMatchWarning && (
          <WarningText>{passwordErrorMessages.didnotMatchWarning}</WarningText>
        )}

        <SubHeading className={mainHeadingfontFamilyClass}>
          Confirm Password
        </SubHeading>
        <StyledInput
          placeholder="re-enter password"
          className={subHeadingfontFamilyClass}
          value={confirmPassword}
          onChange={(t) => setConfirmPassword(t)}
          typePassword
          hideHandler={() => setShowConfirmPassword(!showConfirmPassword)}
          hideState={showConfirmPassword}
          rightIcon
        />
        {passwordError === passwordErrorMessages.minimumCharacterWarning && (
          <WarningText>
            {passwordErrorMessages.minimumCharacterWarning}
          </WarningText>
        )}
        {passwordError === passwordErrorMessages.didnotMatchWarning && (
          <WarningText>{passwordErrorMessages.didnotMatchWarning}</WarningText>
        )}

        <SubHeading className={subHeadingfontFamilyClass}>
          At least 8 characters, recommended to mix uppercase and lowercase
          alphabets, numbers and symbols This password will be used as the
          transaction password for the wallet，POLO does not save password and
          cannot retrieve them for you. Please keep your password safe!
        </SubHeading>
      </SubMainWrapperForAuthScreens>
      <div className="btn-wrapper">
        <Button
          text="Continue"
          disabled={!(walletName && password && confirmPassword) && true}
          handleClick={() => handleContinue()}
        />
      </div>
    </AuthWrapper>
  );
}

export default CreateWallet;
