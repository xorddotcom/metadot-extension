import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  AssetCardWrapper,
  CoinAmount,
  CoinName,
  EquivalentInUSDT,
  HorizontalContentDiv,
  NameAndAmount,
} from '../styledComponents';
import Button from '../button/index';

import { fonts } from '../../utils';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

function AssetCard({
  name, amount, shortName, amountInUsd, logo,
}) {
  const { apiInitializationStarts } = useSelector((state) => state.api);
  const history = useHistory();
  const sendBtn = {
    text: 'Send',
    width: '60px',
    fontSize: '12px',
    fontWeight: 500,
    height: '30px',
    br: '4px',
    handleClick: () => history.push('/Send'),
    disabled: !!apiInitializationStarts,
  };

  return (
    <AssetCardWrapper id="asset-card">
      <HorizontalContentDiv>
        {
            !apiInitializationStarts
              ? (
                <img
                  src={logo}
                  alt="currency icon"
                  width="30px"
                  height="30px"
                  style={{
                    borderRadius: '50%',
                  }}
                />
              ) : <div style={{ width: 30, height: 30, borderRadius: '50%' }} className="wave" />
}
        <NameAndAmount>
          <CoinName className={mainHeadingfontFamilyClass}>
            {name === 'Polkadot Main Network' ? 'Polkadot' : name}
          </CoinName>
          {
            !apiInitializationStarts
              ? (
                <HorizontalContentDiv width="120px" height="17px">
                  <CoinAmount id="coin-amount" className={mainHeadingfontFamilyClass}>
                    {`${amount} ${shortName}`}
                  </CoinAmount>
                  <EquivalentInUSDT id="equivalent-in-usd" className={subHeadingfontFamilyClass}>
                    ($
                    {amountInUsd}
                    )
                  </EquivalentInUSDT>
                </HorizontalContentDiv>
              )
              : (
                <HorizontalContentDiv
                  id="loading"
                  className="wave"
                  height="17px"
                  width="90px"
                  borderRadius="10px"
                  backgroundColor="rgba(196, 196, 196, 0.4)"
                />
              )
          }
        </NameAndAmount>

      </HorizontalContentDiv>

      <div style={{ marginRight: '0.2rem', marginTop: '0.5rem' }}>
        <Button {...sendBtn} />
      </div>
    </AssetCardWrapper>
  );
}

export default AssetCard;
