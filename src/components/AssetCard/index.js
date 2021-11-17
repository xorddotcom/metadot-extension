import React from 'react';
import {
  AssetCardWrapper,
  CoinAmount,
  CoinName,
  EquivalentInUSDT,
  HorizontalContentDiv,
  NameAndAmount,
} from '../StyledComponents';
import { fonts } from '../../utils';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

function AssetCard({
  name, amount, shortName, amountInUsd, logo,
}) {
  return (
    <AssetCardWrapper>
      <HorizontalContentDiv>
        <img src={logo} alt="currency icon" width="30px" height="30px" />
        <NameAndAmount>
          <CoinName className={mainHeadingfontFamilyClass}>
            {name === 'Polkadot Main Network' ? 'Polkadot' : name}
          </CoinName>
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
    </AssetCardWrapper>
  );
}

export default AssetCard;
