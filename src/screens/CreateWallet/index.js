import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import {
  MainHeading,
  StyledMUiInput,
  SubHeading,
  SubMainWrapperForAuthScreens,
} from '../../components/CommonStyledComponents';
import Header from '../../components/Header';
import Button from '../../components/Button';
import { fonts } from '../../utils';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

function CreateWallet(props) {
  const history = useHistory();

  const [walletName, setWalletName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validatePasswordAndConfirmPassword = () => {
    if (password.length < 8 || confirmPassword.length < 8) {
      alert('password should be minimum of 8 characters');
      return false;
    } else if (!(password === confirmPassword)) {
      alert('password did not match!');
      return false;
    } else if (password === confirmPassword) {
      return true;
    }
  };

  const handleContinue = () => {
    if (!validatePasswordAndConfirmPassword()) return;

    //create account with walletName, password and seed by using keyring

    //update redux data and tracking flags accordingly

    //navigate to dashboard on success
    history.push('/dashboard');
  };

  return (
    <div>
      <Header centerText="Create Wallet" />
      <div style={{ paddingLeft: 20 }}>
        <MainHeading className={mainHeadingfontFamilyClass}>
          Authentication
        </MainHeading>
      </div>
      <SubMainWrapperForAuthScreens>
        <SubHeading className={mainHeadingfontFamilyClass}>
          Wallet Name
        </SubHeading>
        <StyledMUiInput
          placeholder="Account 0"
          value={walletName}
          fullWidth={true}
          disableUnderline={true}
          className={subHeadingfontFamilyClass}
          onChange={t => setWalletName(t)}
        />

        <SubHeading className={mainHeadingfontFamilyClass}>Password</SubHeading>
        <StyledMUiInput
          placeholder="password"
          fullWidth={true}
          disableUnderline={true}
          className={subHeadingfontFamilyClass}
          value={password}
          onChange={t => setPassword(t)}
          type="password"
          typePassword={true}
          hideHandler={() => setShowPassword(!showPassword)}
          hideState={showPassword}
        />

        <SubHeading className={mainHeadingfontFamilyClass}>
          Confirm Password
        </SubHeading>
        <StyledMUiInput
          placeholder="re-enter password"
          fullWidth={true}
          disableUnderline={true}
          className={subHeadingfontFamilyClass}
          value={confirmPassword}
          onChange={t => setConfirmPassword(t)}
          typePassword={true}
          hideHandler={() => setShowConfirmPassword(!showConfirmPassword)}
          hideState={showConfirmPassword}
        />

        <SubHeading className={subHeadingfontFamilyClass}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat
          cursus sit diam Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Volutpat cursus sit diam{' '}
        </SubHeading>
      </SubMainWrapperForAuthScreens>
      <div>
        <Button
          text="Continue"
          disabled={!(walletName && password && confirmPassword) && true}
          handleClick={() => handleContinue()}
        />
      </div>
    </div>
  );
}

export default CreateWallet;
