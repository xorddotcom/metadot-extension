import React from 'react';

import AppLogo from '../../../assets/images/logo.svg';
import { Button } from '../../../components';

import { MainHeading, SubHeading } from './StyledComponents';
import { fonts, colors } from '../../../utils';
import './index.css';
import StyledInput from '../../../components/StyledInput/index';
import { Wrapper } from '../../../components/StyledComponents';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;
const { primaryBgColor } = colors;

function WelcomeBack() {
  const styledInput = {
    placeholder: 'Enter Password',
    value: '',
    className: subHeadingfontFamilyClass,
    // fontSize: '12px',
    // height: '25px',
    // onChange: ,
    // isCorrect: ,
  };

  const btn = {
    text: 'Unlock',
    width: '275px',
    handleClick: () => {
      console.log('clicked');
    },
  };

  return (
    <Wrapper>
      <div className="app-logo">
        <img src={AppLogo} alt="logo" />
      </div>

      <div className="main-content">
        <MainHeading className={mainHeadingfontFamilyClass}>
          Welcome Back
        </MainHeading>
        <StyledInput isCorrect {...styledInput} />
      </div>
      <div className="btn-wrapper" style={{ marginLeft: 0, marginTop: '50px' }}>
        <Button {...btn} />
      </div>
      <SubHeading className={subHeadingfontFamilyClass}>
        or
        {' '}
        <span style={{ color: primaryBgColor }}>import using Secret Recovery Phrase</span>
      </SubHeading>
    </Wrapper>
  );
}

export default WelcomeBack;
