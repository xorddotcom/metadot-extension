import React from 'react';
import {
  TxCardWrapper,
  MainText,
  TxEquivalentInUSDT,
  TxHorizontalContentDiv,
  VerticalContentDiv,
} from '../StyledComponents';
import { fonts, colors, helpers } from '../../utils';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;
const { incrementColor, decrementColor } = colors;
const { trimBalance } = helpers;

function TxCard({
  operation, status, coin, amount, amountInUsd, logo, handleClick,
}) {
  return (
    <TxCardWrapper id="tx-card-wrapper" style={{ cursor: 'pointer' }} onClick={() => handleClick()}>
      <div style={{ marginLeft: 10 }}>
        <img id="logo" src={logo} alt="btc icon" width="30px" height="30px" />
      </div>
      <div style={{ marginLeft: 10 }}>
        <VerticalContentDiv>
          <MainText id="operation-coin" className={mainHeadingfontFamilyClass}>{`${operation} ${coin}`}</MainText>
          <TxHorizontalContentDiv>
            <MainText
              id="status"
              className={mainHeadingfontFamilyClass}
              color={status === 'Failed' ? decrementColor : incrementColor}
            >
              {status}
            </MainText>
          </TxHorizontalContentDiv>
        </VerticalContentDiv>
      </div>

      <div style={{ marginLeft: 100 }}>
        <VerticalContentDiv>
          <MainText className={mainHeadingfontFamilyClass}>
            {`${trimBalance(amount)} ${coin}`}
          </MainText>
          <TxHorizontalContentDiv>
            <TxEquivalentInUSDT id="tx-equivalent-in-usd" className={subHeadingfontFamilyClass}>
              {amountInUsd}
            </TxEquivalentInUSDT>
          </TxHorizontalContentDiv>
        </VerticalContentDiv>
      </div>
    </TxCardWrapper>
  );
}

export default TxCard;
