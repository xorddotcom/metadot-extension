/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import AppLogo from '../../../assets/images/logo.svg';
import { Button, WarningText } from '../../../components';

import { MainHeading, SubHeading } from './styledComponents';
import { fonts, colors } from '../../../utils';
import accounts from '../../../utils/accounts';
import './index.css';
import StyledInput from '../../../components/styledInput/index';
import { Wrapper } from '../../../components/styledComponents';
import { setLoggedIn } from '../../../redux/slices/activeAccount';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;
const { primaryBackground } = colors;
const { decrypt, unlockPair } = accounts;

function WelcomeBack() {
  // const styledInput = {
  //   placeholder: 'Enter Password',
  //   value: '',
  //   className: subHeadingfontFamilyClass,
  //   // fontSize: '12px',
  //   // height: '25px',
  //   // onChange: ,
  //   // isCorrect: ,
  // };

  const history = useHistory();
  const dispatch = useDispatch();

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const currentUser = useSelector((state) => state.activeAccount);

  const handleSubmit = () => {
    if (!password) {
      return false;
    }
    try {
      // decrypt(currentUser.seed, password);
      const sender = unlockPair(currentUser.publicKey, password);
      console.log('Correct');
      if (sender !== false) {
        dispatch(setLoggedIn(true));
        history.push('/');
      } else {
        // eslint-disable-next-line no-throw-literal
        throw { Error: 'Invalid password!' };
      }
    } catch (err) {
      console.log('error due to wrong ', err);
      // alert('Password does not match');
      setPasswordError('Invalid password!');
    }
    return null;
  };

  const styledInput = {
    className: subHeadingfontFamilyClass,
    placeholder: 'Enter Password',
    value: password,
    onChange: (t) => {
      setPassword(t);
      setPasswordError('');
    },
    hideHandler: () => setShowPassword(!showPassword),
    hideState: showPassword,
    height: '20px',
  };

  const warningText = {
    className: subHeadingfontFamilyClass,
    visibility: !!passwordError,
    ml: '1.75rem',
  };

  const btn = {
    text: 'Unlock',
    width: '275px',
    handleClick: handleSubmit,
  };

  return (
    <Wrapper>
      <div className="app-logo">
        <img src={AppLogo} alt="logo" />
      </div>

      <div className="main-content-wb" style={{ minHeight: '136px' }}>
        <MainHeading className={mainHeadingfontFamilyClass}>
          Welcome Back
        </MainHeading>
        <StyledInput
          id="password-input"
          fullWidth="76%"
          mr="1.2rem"
          typePassword
          isCorrect
          rightIcon
          {...styledInput}
        />
        {/* {passwordError && ( */}
        <WarningText {...warningText}>
          {passwordError}
        </WarningText>
        {/* )} */}
      </div>
      <div className="btn-wrapper" style={{ marginLeft: 0, marginTop: '0' }}>
        <Button id="unlock" {...btn} />
      </div>
      {/* <SubHeading className={subHeadingfontFamilyClass}>
        or
        {' '}
        <span style={{ color: primaryBackground }}>import using Secret Recovery Phrase</span>
      </SubHeading> */}
    </Wrapper>
  );
}

export default WelcomeBack;
