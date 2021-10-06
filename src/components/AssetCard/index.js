import {
  AssetCardWrapper,
  CoinAmount,
  CoinName,
  EquivalentInUSDT,
  HorizontalContentDiv,
  NameAndAmount,
} from './StyledComponents';

import BTCIcon from '../../assets/images/btc.svg';
import { fonts } from '../../utils';

import Button from '../Button';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

function AssetCard(props) {
  return (
    <AssetCardWrapper>
      <img src={BTCIcon} alt="btc icon" width="70px" height="70px" />
      <NameAndAmount>
        <CoinName className={mainHeadingfontFamilyClass}>Bitcoin</CoinName>
        <HorizontalContentDiv>
          <CoinAmount className={mainHeadingfontFamilyClass}>
            0.0636 BTC
          </CoinAmount>
          <EquivalentInUSDT className={subHeadingfontFamilyClass}>
            ($107.17)
          </EquivalentInUSDT>
        </HorizontalContentDiv>
      </NameAndAmount>

      <div style={{ marginLeft: 10, marginTop: 10 }}>
        <Button
          text="Send"
          width={'22%'}
          height={'50%'}
          fontSize={'0.505rem'}
          handleClick={() => console.log('Send')}
        />
      </div>
    </AssetCardWrapper>
  );
}

export default AssetCard;
