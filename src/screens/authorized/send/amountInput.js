/* eslint-disable no-param-reassign */
import React from 'react';
import { fonts, helpers } from '../../../utils';
import { Button, StyledInput, WarningText } from '../../../components';
import {
  MainText,
  FlexBetween,
  VerticalContentDiv,
  EquivalentInUSDT,
  CalculatedAmount,
  Balance,
} from './styledComponents';

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
  transactionFee,
}) => {
  const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

  const btn = {
    text: 'Max',
    width: '38.75px',
    height: '25.12px',
    br: '6px',
    fontSize: '12px',
    handleClick: maxInputHandler,
    disabled: currentUser.activeAccount.balance === 0,
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

  const txFeeProps = {
    textAlign: 'end',
    className: subHeadingfontFamilyClass,
    style: { marginTop: '0.2rem' },
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
              id="warning-text-1"
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
            id="warning-text-2"
            className={subHeadingfontFamilyClass}
            style={{ marginBottom: '1rem' }}
          >
            {helpers.validateAmount(currentUser.activeAccount.balance, amountState.value)}
          </WarningText>
          )
            }
      <CalculatedAmount>
        <EquivalentInUSDT id="equivalent-in-usd" className={subHeadingfontFamilyClass}>
          $
          {currentUser.activeAccount.balanceInUsd}
        </EquivalentInUSDT>
        <Balance {...balanceProps}>
          Balance:
          {' '}
          {`${trimBalance(currentUser.activeAccount.balance)} ${currentUser.activeAccount.tokenName}`}
        </Balance>
      </CalculatedAmount>

      <CalculatedAmount>
        <Balance {...txFeeProps}>
          Estimated Tx Fee:
          {' '}
          {`${trimBalance(transactionFee)}`}
        </Balance>
      </CalculatedAmount>
      <div style={{ height: '1.5rem' }}>
        {error.amountError ? (
          <WarningText
            id="warning-text"
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
