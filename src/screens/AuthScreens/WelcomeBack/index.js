/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import web3 from 'web3';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import AppLogo from '../../../assets/images/logo.svg';
import { Button } from '../../../components';

import { MainHeading, SubHeading, WarningText } from './StyledComponents';
import { fonts, colors } from '../../../utils';
import './index.css';
import StyledInput from '../../../components/StyledInput/index';
import { Wrapper } from '../../../components/StyledComponents';
import { setLoggedIn } from '../../../redux/slices/account';
import { decrypt, encrypt } from '../../../utils/accounts';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;
const { primaryBgColor } = colors;

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

  const currentUser = useSelector((state) => state.account);

  const handleSubmit = () => {
    if (!password) {
      return false;
    }
    const hashedPassword = web3.utils.sha3(password);

    try {
      decrypt(currentUser.seed, password);
      console.log('Correct');
      dispatch(setLoggedIn(true));
      history.push('/');
    } catch (err) {
      console.log('error due to wrong ', err);
      // alert('Password does not match');
      setPasswordError('Invalid password!');
    }
    return null;
  };

  const styledInput = {
    placeholder: 'Enter Password',
    value: password,
    onChange: (t) => {
      setPassword(t);
      setPasswordError('');
    },
    type: 'password',
    hideHandler: () => setShowPassword(!showPassword),
    hideState: showPassword,
    className: subHeadingfontFamilyClass,
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

      <div className="main-content" style={{ minHeight: '136px' }}>
        <MainHeading className={mainHeadingfontFamilyClass}>
          Welcome Back
        </MainHeading>
        <StyledInput isCorrect {...styledInput} />
        {/* {passwordError && ( */}
        <WarningText
          className={subHeadingfontFamilyClass}
          visibility={!!passwordError}
        >
          {passwordError}
        </WarningText>
        {/* )} */}
      </div>
      <div className="btn-wrapper" style={{ marginLeft: 0, marginTop: '50px' }}>
        <Button {...btn} />
      </div>
      {/* <SubHeading className={subHeadingfontFamilyClass}>
        or
        {' '}
        <span style={{ color: primaryBgColor }}>import using Secret Recovery Phrase</span>
      </SubHeading> */}
    </Wrapper>
  );
}

export default WelcomeBack;
