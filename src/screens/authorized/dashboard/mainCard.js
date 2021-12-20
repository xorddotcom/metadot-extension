/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
/* eslint import/no-cycle: [2, { maxDepth: 1 }] */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { styled } from '@mui/material/styles';
import refreshIcon from '../../../assets/images/icons/refresh.svg';
import copyicon from '../../../assets/images/icons/copyIcon.svg';
import {
  AccountName,
  Balance,
  ConnectionStatus,
  MainPanel,
  MoreOptions,
  Refresh,
  PerUnitPrice,
  PublicAddress,
  VerticalContentDiv,
  CopyIconImg,
} from './styledComponents';
import NotConnected from '../../../assets/images/notConnected.svg';
import { fonts, helpers, colors } from '../../../utils';
import { setApiInitializationStarts } from '../../../redux/slices/api';

const { addressModifier, trimBalance } = helpers;
const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;
const { primaryText } = colors;

function MainCard({
  balance, address, tokenName, balanceInUsd, accountName,
}) {
  const [open, setOpen] = useState(false);
  const [copy, setCopy] = useState('Copy');
  const [copyBalance, setCopyBalance] = useState(balance);

  const dispatch = useDispatch();
  const { apiInitializationStarts } = useSelector((state) => state.api);

  const copyText = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 800);
    navigator.clipboard.writeText(address);

    setCopy('Copied');
  };

  const copyIconTooltip = {
    id: 'copy-icon',
    className: `tooltip ${mainHeadingfontFamilyClass}`,
    onClick: copyText,
    onMouseOver: () => setCopy('Copy'),
    style: { cursor: 'pointer' },
  };

  const copyIconTooltipText = {
    className: 'tooltiptext',
    style: {
      maxWidth: '70px',
      left: '20%',
      bottom: '120%',
      fontSize: '0.7rem',
      fontWeight: 300,
      transition: 'all 0.1s ease-in',
    },
  };

  const addTooltipText = {
    className: 'topTooltiptext',
  };

  return (
    <MainPanel>
      <div>
        {/* <MoreOptions>
          <img src={NotConnected} alt="not connected signal" />
          <ConnectionStatus className={subHeadingfontFamilyClass}>
            Not Connected
          </ConnectionStatus>
          <MoreVertIcon style={{ color: primaryText, fontSize: 22 }} />
        </MoreOptions> */}
        <Refresh
          id="refresh"
          onClick={() => {
            dispatch(setApiInitializationStarts(true));
            setTimeout(() => dispatch(setApiInitializationStarts(false)), 1000);
          }}
        >
          <img src={refreshIcon} alt="refresh-icon" />
        </Refresh>

        <AccountName id="account-name" className={mainHeadingfontFamilyClass}>
          {accountName}
        </AccountName>
      </div>
      <VerticalContentDiv>
        <PublicAddress id="public-address" className={mainHeadingfontFamilyClass}>
          (
          {addressModifier(address)}
          )
        </PublicAddress>
        <div {...copyIconTooltip}>
          <CopyIconImg src={copyicon} alt="copy-icon" />
          <span {...copyIconTooltipText}>{copy}</span>
        </div>
      </VerticalContentDiv>

      {
        !apiInitializationStarts
          ? (
            <Balance id="balance" className={mainHeadingfontFamilyClass}>
              <div className={`topTooltip ${mainHeadingfontFamilyClass}`}>
                <span id="trim-balance">
                  {trimBalance(balance)}
                </span>
                <span id="token-name" style={{ marginLeft: 7 }}>{tokenName}</span>
                <span id="complete-balance" {...addTooltipText}>
                  {balance}
                </span>
              </div>
            </Balance>
          )
          : (
            <Balance
              id="balance"
              className="wave"
              height="35px"
              width="151px"
              borderRadius="10px"
              backgroundColor="rgba(196, 196, 196, 0.4)"
            />
          )
      }

      <VerticalContentDiv>
        <PerUnitPrice id="balance-in-usd" className={mainHeadingfontFamilyClass}>
          $
          {balanceInUsd}
          {' '}
          USD
        </PerUnitPrice>
      </VerticalContentDiv>
    </MainPanel>
  );
}

export default MainCard;
