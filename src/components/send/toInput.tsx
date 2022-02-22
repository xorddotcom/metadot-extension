import React from 'react';
import { WarningText, MainText } from '../common/text';
import { Input as StyledInput } from '../common';
import { fonts, helpers } from '../../utils';
import { ToInputInterface } from './types';
import { VerticalContentDiv } from '../common/wrapper/index';

const ToInput: React.FunctionComponent<ToInputInterface> = ({
    accountToSate,
    publicKey,
    errorMessages,
    accountToChangeHandler,
    accountToIsValid,
    isCorrect,
    error,
    receiverAddress,
    toAddressError,
}) => {
    const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;
    const styledInput = {
        placeholder: 'Enter Wallet Address',
        value: receiverAddress,
        className: subHeadingfontFamilyClass,
        onChange: accountToChangeHandler,
        onBlur: accountToIsValid,
        fontSize: '12px',
        height: '25px',
        isCorrect: accountToSate.isValid,
    };

    const warningTextInlineStyle = {
        marginTop: '-0.2rem',
        marginLeft: '0.3rem',
    };

    console.log(
        'accountToSate.isValid -----',
        accountToSate.isValid,
        helpers.validateAddress(receiverAddress, publicKey)
    );

    return (
        <VerticalContentDiv mb="10px">
            <MainText className={mainHeadingfontFamilyClass}>To</MainText>
            <StyledInput id="to-address" {...styledInput} />
            <WarningText
                id="warning-text"
                className={subHeadingfontFamilyClass}
            >
                {helpers.validateAddress(receiverAddress, publicKey)}
            </WarningText>
            <div style={{ height: '1rem' }}>
                {!isCorrect && (
                    <WarningText
                        id="warning-text-1"
                        className={subHeadingfontFamilyClass}
                        style={warningTextInlineStyle}
                        visibility={!isCorrect}
                    >
                        {errorMessages.invalidAddress}
                    </WarningText>
                )}

                {toAddressError && (
                    <WarningText
                        id="warning-text-1"
                        className={subHeadingfontFamilyClass}
                        style={warningTextInlineStyle}
                        visibility={toAddressError}
                    >
                        {errorMessages.sameAddressError}
                    </WarningText>
                )}
            </div>
        </VerticalContentDiv>
    );
};

export default ToInput;
