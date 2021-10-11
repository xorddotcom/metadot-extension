import React from 'react';
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

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import NotConnected from '../../../assets/images/notConnected.svg';

import { fonts } from '../../../utils';
import { useSelector } from 'react-redux'

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

function MainCard({balance, address, tokenName, chainName}) {
 
  console.log('Token name in main card', tokenName, balance);
  const copyText = () => {
    console.log('ENd', address)
    navigator.clipboard.writeText(address)
  }
  

  return (
    <MainPanel>
      <MoreOptions>
        <img src={NotConnected} alt="not connected signal" />
        <ConnectionStatus className={subHeadingfontFamilyClass}>
          Not Connected
        </ConnectionStatus>
        <MoreVertIcon style={{ color: '#fafafa', fontSize: 29 }} />
      </MoreOptions>

      <AccountName className={mainHeadingfontFamilyClass}>
        Account 0
      </AccountName>
      <VerticalContentDiv>
        <PublicAddress className={mainHeadingfontFamilyClass}>
          (bnb13...txjd5){' '}
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

      <Balance className={mainHeadingfontFamilyClass}>{balance} {tokenName}</Balance>

      <VerticalContentDiv>
        <PerUnitPrice className={mainHeadingfontFamilyClass}>
          $184.02 USD
        </PerUnitPrice>
        <VerticalContentDiv>
          <VariationAmount className={mainHeadingfontFamilyClass}>
            4.8 %{' '}
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
