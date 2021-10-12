import React from 'react';

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {
  AccountName,
  Balance,
  ConnectionStatus,
  MainPanel,
  MoreOptions,
  PerUnitPrice,
  PublicAddress,
  VariationAmount,
  VerticalContentDiv,
} from './StyledComponents';

import NotConnected from '../../../assets/images/notConnected.svg';

import { fonts, helpers } from '../../../utils';

const { addressModifier } = helpers;

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

function MainCard({
  balance, address, tokenName, balanceInUsd, accountName,
}) {
  console.log('Token name in main card', tokenName, balance);
  const copyText = () => {
    console.log('ENd', address);
    navigator.clipboard.writeText(address);
  };

  return (
    <MainPanel>
      <MoreOptions>
        <img src={NotConnected} alt="not connected signal" />
        <ConnectionStatus className={subHeadingfontFamilyClass}>
          Not Connected
        </ConnectionStatus>
        <MoreVertIcon style={{ color: '#fafafa', fontSize: 24 }} />
      </MoreOptions>

      <AccountName className={mainHeadingfontFamilyClass}>
        {accountName}
      </AccountName>
      <VerticalContentDiv>
        <PublicAddress className={mainHeadingfontFamilyClass}>
          {addressModifier(address)}
          {' '}
        </PublicAddress>
        <ContentCopyIcon
          style={{
            color: '#cccccc',
            fontSize: 12,
            marginLeft: 10,
          }}
          onClick={copyText}
        />
      </VerticalContentDiv>

      <Balance className={mainHeadingfontFamilyClass}>
        {balance}
        {' '}
        {tokenName}
      </Balance>

      <VerticalContentDiv>
        <PerUnitPrice className={mainHeadingfontFamilyClass}>
          {balanceInUsd}
        </PerUnitPrice>
        <VerticalContentDiv>
          <VariationAmount className={mainHeadingfontFamilyClass}>
            0 %
            {' '}
          </VariationAmount>
          <ArrowDropUpIcon
            style={{
              fontSize: 20,
              marginLeft: 5,
              color: '#3fcf1b',
            }}
          />
        </VerticalContentDiv>
      </VerticalContentDiv>
    </MainPanel>
  );
}

export default MainCard;
