import React from 'react';
import {
  TxCardWrapper,
  MainText,
  EquivalentInUSDT,
  HorizontalContentDiv,
  VerticalContentDiv,
} from './StyledComponents';

import { fonts, colors } from '../../utils';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;
const { incrementColor } = colors;

function TxCard({
  operation, status, coin, amount, amountInUsd, logo, handleClick,
}) {
  return (
    <TxCardWrapper onClick={() => handleClick()}>
      <img src={logo} alt="btc icon" width="70px" height="70px" />
      <VerticalContentDiv>
        <MainText className={mainHeadingfontFamilyClass}>{`${operation} ${coin}`}</MainText>
        <HorizontalContentDiv>
          <MainText
            className={mainHeadingfontFamilyClass}
            color={incrementColor}
          >
            {status}
          </MainText>
        </HorizontalContentDiv>
      </VerticalContentDiv>

      <div style={{ marginLeft: 60 }}>
        <VerticalContentDiv>
          <MainText className={mainHeadingfontFamilyClass}>
            {`${amount} ${coin}`}
          </MainText>
          <HorizontalContentDiv>
            <EquivalentInUSDT className={subHeadingfontFamilyClass}>

              $
              {amountInUsd}
            </EquivalentInUSDT>
          </HorizontalContentDiv>
        </VerticalContentDiv>
      </div>
    </TxCardWrapper>
  );
}

export default TxCard;
