import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@material-ui/core';
import {
  Button, Header, StyledInput,
} from '../../../components';
import { fonts, colors } from '../../../utils';
import {
  MainDiv,
  MainHeading, MainText, SocialDiv, SubHeading, VerticalContentDiv, Wrapper,
} from './styledComponents/index';
import facebook from '../../../assets/images/Facebook.svg';
import telegram from '../../../assets/images/Telegram.svg';
import instagram from '../../../assets/images/Instagram.svg';
import twitter from '../../../assets/images/Twitter.svg';
import discord from '../../../assets/images/Discord.svg';
import element from '../../../assets/images/Element.svg';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;
const { primaryText, darkBackground1 } = colors;
const Support = () => {
  const [emailInput, setEmailInput] = useState('');
  const [subjectEmail, setSubjectEmail] = useState('');
  const [describe, setDescribe] = useState('');

  const styledInputEmail = {
    placeholder: 'Enter Email',
    type: 'email',
    value: emailInput,
    className: subHeadingfontFamilyClass,
    onChange: (e) => setEmailInput(e),
    fontSize: '14px',
    height: '25px',
  };

  const styledInputSubject = {
    placeholder: 'Enter Subject',
    value: subjectEmail,
    className: subHeadingfontFamilyClass,
    onChange: (e) => setSubjectEmail(e),
    fontSize: '14px',
    height: '25px',
  };

  const input = {
    style: {
      padding: '13px 15px',
      background: darkBackground1,
      color: primaryText,
      width: '100%',
      borderRadius: '8px',
      fontSize: '14px',
      lineHeight: '1.7em',
      border: '0.5px solid rgba(250, 250, 250, 0.5)',
    },
    className: subHeadingfontFamilyClass,
    value: describe,
    onChange: (e) => setDescribe(e.target.value),
    rows: 5,
    placeholder: 'Describe Here',
  };

  const btn = {
    text: 'Submit',
    width: '326px',
    height: '40px',
    fontSize: '18px',
    handleClick: () => console.log('clicked'),
    // disabled: !emailInput && !subjectEmail,
  };

  const upperDiv = { marginTop: '34px', marginBottom: '30px' };
  return (
    <Wrapper>
      <Header centerText="Support" backHandler={() => console.log('object')} />
      <MainDiv style={upperDiv}>
        <MainHeading className={mainHeadingfontFamilyClass}>
          Need help?
        </MainHeading>
        <SubHeading className={subHeadingfontFamilyClass}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
          culpa magnam.
        </SubHeading>
      </MainDiv>
      <VerticalContentDiv mb="30px">
        <MainText className={mainHeadingfontFamilyClass}>
          Email
        </MainText>
        <StyledInput isCorrect {...styledInputEmail} />
      </VerticalContentDiv>
      <VerticalContentDiv mb="30px">
        <MainText className={mainHeadingfontFamilyClass}>
          Subject
        </MainText>
        <StyledInput isCorrect {...styledInputSubject} />
      </VerticalContentDiv>

      <VerticalContentDiv>
        <MainText className={mainHeadingfontFamilyClass}>
          Describe
        </MainText>
        <Input
          {...input}
          multiline
          disableUnderline
          required
        />
      </VerticalContentDiv>

      <div style={{ marginTop: '40px' }}>
        <Button {...btn} />
      </div>
      <MainDiv mt="40px">
        <MainHeading className={mainHeadingfontFamilyClass}>
          Follow Us
        </MainHeading>
        <SubHeading className={subHeadingfontFamilyClass}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
          culpa magnam.
        </SubHeading>
        <SocialDiv>
          <Link to="/">
            <img src={discord} alt="discord" />
          </Link>
          <Link to="/">
            <img src={element} alt="element" height="20px" />
          </Link>
          <Link to="/">
            <img src={telegram} alt="telegram" />
          </Link>
          <Link to="/">
            <img src={facebook} alt="facebook" />
          </Link>
          <Link to="/">
            <img src={twitter} alt="twitter" />
          </Link>
          <Link to="/">
            <img src={instagram} alt="instagram" />
          </Link>
        </SocialDiv>
      </MainDiv>
    </Wrapper>
  );
};

export default Support;
