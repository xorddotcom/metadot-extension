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
} from '../StyledComponents';
import Button from '../Button/index';

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
          {
            !apiInitializationStarts
              ? (
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
              )
              : (
                <HorizontalContentDiv
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
      <div style={{ marginLeft: '3.9rem', marginTop: '0.5rem' }}>
        {
            !apiInitializationStarts ? <Button {...sendBtn} />
              : (
                <div
                  style={{
                    width: 70,
                    height: 32,
                    borderRadius: '40px',
                    marginBottom: 10,
                  }}
                  className="wave"
                />
              )
          }

      </div>
    </AssetCardWrapper>
  );
}

export default AssetCard;
