/* eslint-disable no-param-reassign */
import React from 'react';
import { fonts, helpers } from '../../../utils';
import { Button, StyledInput } from '../../../components';
import { WarningText } from '../../AuthScreens/CreateWallet/StyledComponents';
import {
  MainText,
  FlexBetween,
  VerticalContentDiv,
  EquivalentInUSDT,
  CalculatedAmount,
  Balance,
} from './StyledComponents';

const AmountInput = ({
  amountState,
  amountHandler,
  maxInputHandler,
  amountIsValidHandler,
  insufficientBal,
  currentUser,
  trimBalance,
  errorMessages,
  error,
}) => {
  const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

  const btn = {
    text: 'Max',
    width: '35px',
    height: '20.12px',
    br: '6px',
    fontSize: '12px',
    handleClick: maxInputHandler,
    disabled: currentUser.account.balance === 0,
    // isLoading: loading1,
  };

  const styledInput = {
    placeholder: 'Amount',
    type: 'Number',
    value: amountState.value,
    className: subHeadingfontFamilyClass,
    onChange: amountHandler,
    fontSize: '14px',
    height: '25px',
    onBlur: amountIsValidHandler,
    isCorrect: amountState.isValid || insufficientBal,
  };

  const balanceProps = {
    textAlign: 'end',
    className: subHeadingfontFamilyClass,
    style: { marginTop: '-1rem' },
  };

  return (
    <VerticalContentDiv mb="25px">
      <FlexBetween>
        <MainText className={mainHeadingfontFamilyClass}>
          Amount
        </MainText>
        <div style={{ marginRight: '2rem' }}>
          <Button {...btn} />
        </div>
      </FlexBetween>
      <StyledInput blockInvalidChar {...styledInput} />
      {
              insufficientBal
            && (
            <WarningText
              className={subHeadingfontFamilyClass}
              style={{ marginBottom: '1rem' }}
            >
              balance is too low to pay network fees!
            </WarningText>
            )
            }
      {
              !insufficientBal
          && (
          <WarningText
            className={subHeadingfontFamilyClass}
            style={{ marginBottom: '1rem' }}
          >
            {helpers.validateAmount(currentUser.account.balance, amountState.value)}
          </WarningText>
          )
            }
      <CalculatedAmount>
        <EquivalentInUSDT id="equivalent-in-usd" className={subHeadingfontFamilyClass}>
          $
          {currentUser.account.balanceInUsd}
        </EquivalentInUSDT>
        <Balance {...balanceProps}>
          Balance:
          {' '}
          {`${trimBalance(currentUser.account.balance)} ${currentUser.account.tokenName}`}
        </Balance>
      </CalculatedAmount>
      <div style={{ height: '1.5rem' }}>
        {error.amountError ? (
          <WarningText
            className={subHeadingfontFamilyClass}
            style={{ marginTop: '-0.2rem', marginLeft: '0.3rem' }}
          >
            {errorMessages.enterAmount}
          </WarningText>
        ) : null}
      </div>
    </VerticalContentDiv>
  );
};

export default AmountInput;
