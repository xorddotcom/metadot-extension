import React from 'react';
import { StyledInput, WarningText } from '../../../components';
import { fonts, helpers } from '../../../utils';
import { MainText, VerticalContentDiv } from './styledComponents';

const ToInput = ({
  accountToSate,
  currentUser,
  errorMessages,
  accountToChangeHandler,
  accountToIsValid,
  isCorrect,
  error,
}) => {
  const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;
  const styledInput = {
    placeholder: 'Enter Wallet Address',
    value: accountToSate.value,
    className: subHeadingfontFamilyClass,
    onChange: accountToChangeHandler,
    onBlur: accountToIsValid,
    fontSize: '12px',
    height: '25px',
    isCorrect: accountToSate.isValid,
  };

  const warningTextInlineStyle = { marginTop: '-0.2rem', marginLeft: '0.3rem' };

  return (
    <VerticalContentDiv mb="10px">
      <MainText className={mainHeadingfontFamilyClass}>
        To
      </MainText>
      <StyledInput id="to-address" {...styledInput} />
      <WarningText id="warning-text" className={subHeadingfontFamilyClass}>
        {helpers.validateAddress(accountToSate.value, currentUser.account.publicKey)}
      </WarningText>
      <div style={{ height: '1rem' }}>
        {!isCorrect ? (
          <WarningText id="warning-text-1" className={subHeadingfontFamilyClass} style={warningTextInlineStyle}>
            {errorMessages.invalidAddress}
          </WarningText>
        ) : error.address ? (
          <WarningText id="warning-text-2" className={subHeadingfontFamilyClass} style={warningTextInlineStyle}>
            {errorMessages.enterAddress}
          </WarningText>
        ) : null}
      </div>
    </VerticalContentDiv>
  );
};

export default ToInput;
