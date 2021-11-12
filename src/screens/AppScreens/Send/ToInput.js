import React from 'react';
import { StyledInput } from '../../../components';
import { fonts, helpers } from '../../../utils';
import { WarningText } from '../../AuthScreens/CreateWallet/StyledComponents';
import { MainText, VerticalContentDiv } from './StyledComponents';

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
    placeholder: 'Search Address',
    value: accountToSate.value,
    className: subHeadingfontFamilyClass,
    onChange: accountToChangeHandler,
    onBlur: accountToIsValid,
    fontSize: '14px',
    height: '20px',
    isCorrect: accountToSate.isValid,
  };

  const warningTextInlineStyle = { marginTop: '-0.2rem', marginLeft: '0.3rem' };

  return (
    <VerticalContentDiv mb="2px">
      <MainText m="6px" className={mainHeadingfontFamilyClass} style={{ marginBottom: '0.5rem' }}>
        To
      </MainText>
      <StyledInput {...styledInput} />
      <WarningText className={subHeadingfontFamilyClass}>
        {helpers.validateAddress(accountToSate.value, currentUser.account.publicKey)}
      </WarningText>
      <div style={{ height: '1rem' }}>
        {!isCorrect ? (
          <WarningText className={subHeadingfontFamilyClass} style={warningTextInlineStyle}>
            {errorMessages.invalidAddress}
          </WarningText>
        ) : error.address ? (
          <WarningText className={subHeadingfontFamilyClass} style={warningTextInlineStyle}>
            {errorMessages.enterAddress}
          </WarningText>
        ) : null}
      </div>
    </VerticalContentDiv>
  );
};

export default ToInput;
