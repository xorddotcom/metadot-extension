import React from 'react';
import {
  Balance, FromAccount, HorizontalContentDiv, MainText, PlainIcon, VerticalContentDiv,
} from './StyledComponents';
import { fonts } from '../../../utils';

const FromInput = ({ addressModifier, currentUser }) => {
  const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;
  return (
    <VerticalContentDiv mb="2px">
      <MainText m="6px" className={mainHeadingfontFamilyClass} style={{ marginBottom: '0.5rem' }}>
        From
      </MainText>
      <FromAccount>
        <HorizontalContentDiv>
          <PlainIcon />
          <VerticalContentDiv>
            <MainText className={mainHeadingfontFamilyClass}>
              {currentUser.account.accountName}
            </MainText>
            <Balance
              className={subHeadingfontFamilyClass}
              style={{ marginTop: '0.15rem' }}
            >
              {addressModifier(currentUser.account.publicKey)}
            </Balance>
          </VerticalContentDiv>
        </HorizontalContentDiv>
      </FromAccount>
    </VerticalContentDiv>
  );
};

export default FromInput;
