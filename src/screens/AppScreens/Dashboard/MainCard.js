/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
// import Tooltip from '@mui/material/Tooltip';
import { toast } from 'react-toastify';
import { display } from '@mui/system';
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

const { addressModifier, trimBalance } = helpers;

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
    zIndex: -2,
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.white,
  },
}));

function MainCard({
  balance, address, tokenName, balanceInUsd, accountName,
}) {
  // console.log('Token name in main card', walletName);
  // console.log('balance', balance.toString().slice(0, 8));
  console.log('balance float', parseFloat(balance).toFixed(5));
  // eslint-disable-next-line no-unused-vars
  const [open, setOpen] = React.useState(false);

  const copyText = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 800);
    console.log('ENd', address);
    navigator.clipboard.writeText(address);
    console.log('-------------emitter start');
    // toast emitter
    // toast('Copied!', {
    //   position: toast.POSITION.BOTTOM_CENTER,
    //   className: 'toast-success',
    //   progressClassName: 'success-progress-bar',
    //   autoClose: 2000,
    //   toastId: 1,
    // });
    toast.success('Copied!', {
      position: toast.POSITION.BOTTOM_CENTER,
      className: 'toast-success',
      progressClassName: 'success-progress-bar',
      autoClose: 2000,
      toastId: 1,
    });
  };

  // const handleTooltipOpen = () => {
  //   setOpen(true);
  // };

  // eslint-disable-next-line no-unused-vars
  // const trimBalance = (value) => {
  //   console.log('Value', value);
  //   const val = value.toString();
  //   const trimmedValue = val.slice(0, (val.indexOf('.')) + 4);
  //   return trimmedValue;
  // };

  return (
    <MainPanel>
      <div>
        <MoreOptions>
          <img src={NotConnected} alt="not connected signal" />
          <ConnectionStatus className={subHeadingfontFamilyClass}>
            Not Connected
          </ConnectionStatus>
          <MoreVertIcon style={{ color: '#fafafa', fontSize: 22 }} />
        </MoreOptions>

        <AccountName className={mainHeadingfontFamilyClass}>
          {accountName}
        </AccountName>
      </div>
      <VerticalContentDiv>
        {/* <LightTooltip title={address} arrow placement="bottom"> */}
        <PublicAddress className={mainHeadingfontFamilyClass}>
          (
          {addressModifier(address)}
          )
          {' '}
        </PublicAddress>
        {/* </LightTooltip> */}
        <div style={{ position: 'relative', marginTop: '-0.2  rem' }}>
          <LightTooltip title="Copy address" arrow placement="right">
            <ContentCopyIcon
              style={{
                color: '#cccccc',
                fontSize: 12,
                marginLeft: 10,
              }}
              onClick={copyText}
            />
          </LightTooltip>
        </div>
      </VerticalContentDiv>

      <Balance className={mainHeadingfontFamilyClass}>
        <LightTooltip title={balance} arrow placement="bottom">
          <span>
            {trimBalance(balance)}
            {/* {'123'} */}
          </span>
        </LightTooltip>
        {' '}
        {tokenName}
      </Balance>

      <VerticalContentDiv>
        <PerUnitPrice className={mainHeadingfontFamilyClass}>
          $
          {balanceInUsd}
        </PerUnitPrice>
        {/* <VerticalContentDiv>
          <VariationAmount className={mainHeadingfontFamilyClass}>
            0 %
            {' '}
          </VariationAmount>
          <ArrowDropUpIcon
            style={{
              fontSize: 20,
              marginLeft: 2,
              color: '#3fcf1b',
            }}
          />
        </VerticalContentDiv> */}
      </VerticalContentDiv>
    </MainPanel>
  );
}

export default MainCard;
