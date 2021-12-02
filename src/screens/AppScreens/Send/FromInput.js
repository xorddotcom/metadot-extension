import React from 'react';
import {
  Balance, FromAccount, HorizontalContentDiv, MainText, PlainIcon, VerticalContentDiv,
} from './StyledComponents';
import { fonts } from '../../../utils';

const FromInput = ({ addressModifier, currentUser }) => {
  const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

  const mainText = {
    className: mainHeadingfontFamilyClass,
    ls: '0.02em',
    lh: '16px',
    mb: '2px',
    fs: '15px',
    mt: '-4px',
  };
  return (
    <VerticalContentDiv mb="20px">
      <MainText className={mainHeadingfontFamilyClass}>
        From
      </MainText>
      <FromAccount id="from-account">
        <HorizontalContentDiv>
          <PlainIcon />
          <VerticalContentDiv>
            <MainText id="account-name" {...mainText}>
              {currentUser.account.accountName}
            </MainText>
            <Balance id="public-key" className={subHeadingfontFamilyClass}>
              {addressModifier(currentUser.account.publicKey)}
            </Balance>
          </VerticalContentDiv>
        </HorizontalContentDiv>
      </FromAccount>
    </VerticalContentDiv>
  );
};

export default FromInput;
