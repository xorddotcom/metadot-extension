import React from 'react';
import { fonts, helpers } from '../../../utils';
import { StyledInput } from '../../../components';
import { WarningText } from '../../AuthScreens/CreateWallet/StyledComponents';
import {
  MainText,
  VerticalContentDiv,
  EquivalentInUSDT,
  CalculatedAmount,
  Balance,
} from './StyledComponents';

const AmountInput = ({
  amountState,
  amountHandler,
  amountIsValidHandler,
  insufficientBal,
  currentUser,
  trimBalance,
  errorMessages,
  error,
}) => {
  const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;
  const styledInput = {
    placeholder: 'Amount',
    type: 'number',
    value: amountState.value,
    className: subHeadingfontFamilyClass,
    onChange: amountHandler,
    fontSize: '14px',
    height: '20px',
    onBlur: amountIsValidHandler,
    isCorrect: amountState.isValid || insufficientBal,
  };
  return (
    <VerticalContentDiv mb="25px">
      <MainText m="8px" className={mainHeadingfontFamilyClass}>
        Amount
      </MainText>
      <StyledInput {...styledInput} />
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
        <EquivalentInUSDT className={subHeadingfontFamilyClass}>
          $
          {currentUser.account.balanceInUsd}
        </EquivalentInUSDT>
        <Balance textAlign="end" className={subHeadingfontFamilyClass}>
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
