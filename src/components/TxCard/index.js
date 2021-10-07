import {
  TxCardWrapper,
  MainText,
  EquivalentInUSDT,
  HorizontalContentDiv,
  VerticalContentDiv,
} from './StyledComponents';

import BTCIcon from '../../assets/images/btc.svg';
import { fonts, colors } from '../../utils';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;
const { incrementColor } = colors;

function TxCard() {
  return (
    <TxCardWrapper>
      <img src={BTCIcon} alt="btc icon" width="70px" height="70px" />
      <VerticalContentDiv>
        <MainText className={mainHeadingfontFamilyClass}>Received DOT</MainText>
        <HorizontalContentDiv>
          <MainText
            className={mainHeadingfontFamilyClass}
            color={incrementColor}
          >
            Confirmed
          </MainText>
        </HorizontalContentDiv>
      </VerticalContentDiv>

      <div style={{ marginLeft: 60 }}>
        <VerticalContentDiv>
          <MainText className={mainHeadingfontFamilyClass}>0.0636 BTC</MainText>
          <HorizontalContentDiv>
            <EquivalentInUSDT className={subHeadingfontFamilyClass}>
              $107.17
            </EquivalentInUSDT>
          </HorizontalContentDiv>
        </VerticalContentDiv>
      </div>
    </TxCardWrapper>
  );
}

export default TxCard;
