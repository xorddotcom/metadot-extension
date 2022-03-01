import React from 'react';
import { useSelector } from 'react-redux';
import { WarningText, MainText } from '../../common/text';
import { Input } from '../../common';
import { fonts, helpers } from '../../../utils';
import { ToInputInterface } from '../types';
import { VerticalContentDiv } from '../../common/wrapper/index';
import { RootState } from '../../../redux/store';

const ToInput: React.FunctionComponent<ToInputInterface> = ({
    errorMessages,
    onChange,
    isCorrect,
    receiverAddress,
    toAddressError,
}) => {
    const { publicKey } = useSelector(
        (state: RootState) => state.activeAccount
    );
    const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

    const receiverAddressInput = {
        value: receiverAddress,
        onChange,
        placeholder: 'Enter wallet address',
        type: 'text',
    };

    const warningTextInlineStyle = {
        marginTop: '-0.2rem',
        marginLeft: '0.3rem',
    };

    return (
        <VerticalContentDiv mb="10px">
            <MainText className={mainHeadingfontFamilyClass}>To</MainText>
            {/* <StyledInput id="to-address" {...styledInput} /> */}
            <Input id="username" {...receiverAddressInput} />
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
