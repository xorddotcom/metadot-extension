import React from 'react';
import {
  AssetCardWrapper,
  CoinAmount,
  CoinName,
  EquivalentInUSDT,
  HorizontalContentDiv,
  NameAndAmount,
} from './StyledComponents';

import { fonts } from '../../utils';

import Button from '../Button';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

function AssetCard({
  name, amount, shortName, amountInUsd, logo,
}) {
  return (
    <AssetCardWrapper>
      <HorizontalContentDiv>
        <img src={logo} alt="currency icon" width="30px" height="30px" />
        <NameAndAmount>
          <CoinName className={mainHeadingfontFamilyClass}>{name}</CoinName>
          <HorizontalContentDiv height="17px">
            <CoinAmount className={mainHeadingfontFamilyClass}>
              {`${amount} ${shortName}`}
            </CoinAmount>
            <EquivalentInUSDT className={subHeadingfontFamilyClass}>
              ($
              {amountInUsd}
              )
            </EquivalentInUSDT>
          </HorizontalContentDiv>
        </NameAndAmount>
      </HorizontalContentDiv>
      <div style={{ marginLeft: 10, marginTop: 10 }}>
        <Button
          text="Send"
          width="22%"
          height="50%"
          fontSize="0.65rem"
          handleClick={() => console.log('Send')}
        />
      </div>
    </AssetCardWrapper>
  );
}

export default AssetCard;
