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
      <img src={logo} alt="btc icon" width="70px" height="70px" />
      <NameAndAmount>
        <CoinName className={mainHeadingfontFamilyClass}>{name}</CoinName>
        <HorizontalContentDiv>
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

      <div style={{ marginLeft: 10, marginTop: 10 }}>
        <Button
          text="Send"
          width="22%"
          height="50%"
          fontSize="0.505rem"
          handleClick={() => console.log('Send')}
        />
      </div>
    </AssetCardWrapper>
  );
}

export default AssetCard;
