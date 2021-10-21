/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
// import Tooltip from '@mui/material/Tooltip';
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
  const [open, setOpen] = React.useState(false);

  const copyText = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 800);
    console.log('ENd', address);
    navigator.clipboard.writeText(address);
  };
  const handleTooltipClose = () => {
    setOpen(false);
  };
  // const handleTooltipOpen = () => {
  //   setOpen(true);
  // };

  const trimBalance = (value) => {
    const val = value.toString();
    const trimmedValue = val.slice(0, (val.indexOf('.')) + 6);
    return trimmedValue;
  };

  return (
    <MainPanel>
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
      <VerticalContentDiv>
        <LightTooltip title="HashCode" arrow placement="bottom">
          <PublicAddress className={mainHeadingfontFamilyClass}>
            {addressModifier(address)}
            {' '}
          </PublicAddress>
        </LightTooltip>
        <ClickAwayListener onClickAway={handleTooltipClose}>
          <div style={{ position: 'relative' }}>
            <LightTooltip title="copy" arrow placement="right">
              <Tooltip
                PopperProps={{
                  disablePortal: true,
                }}
                onClose={handleTooltipClose}
                open={open}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title="Copied"
                style={{ padding: '2rem' }}
              >
                <ContentCopyIcon
                  style={{
                    color: '#cccccc',
                    fontSize: 12,
                    marginLeft: 10,
                  }}
                  onClick={copyText}
                />
              </Tooltip>
            </LightTooltip>
          </div>
        </ClickAwayListener>
      </VerticalContentDiv>

      <Balance className={mainHeadingfontFamilyClass}>
        <LightTooltip title="Balance" arrow placement="bottom">
          <span>
            {trimBalance(balance)}
          </span>
        </LightTooltip>
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
