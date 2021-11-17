import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  AssetCardWrapper,
  CoinAmount,
  CoinName,
  EquivalentInUSDT,
  HorizontalContentDiv,
  NameAndAmount,
} from '../StyledComponents';
import Button from '../Button/index';

import { fonts } from '../../utils';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

function AssetCard({
  name, amount, shortName, amountInUsd, logo,
}) {
  const history = useHistory();
  const sendBtn = {
    text: 'Send',
    width: '70px',
    fontSize: '12px',
    fontWeight: 500,
    height: '32px',
    handleClick: () => history.push('/Send'),
  };

  return (
    <AssetCardWrapper>
      <HorizontalContentDiv>
        <img
          src={logo}
          alt="currency icon"
          width="30px"
          height="30px"
          style={{
            borderRadius: '50%',
          }}
        />
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
        <div style={{ marginLeft: '3.9rem', marginTop: '0.5rem' }}>
          <Button {...sendBtn} />
        </div>
      </HorizontalContentDiv>
    </AssetCardWrapper>
  );
}

export default AssetCard;
