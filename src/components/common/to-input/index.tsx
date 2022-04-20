import React from 'react';
import { WarningText, MainText } from '../text';
import { Input } from '..';
import { fonts } from '../../../utils';
import { ToInputInterface } from './types';
import { VerticalContentDiv } from '../wrapper/index';

const ToInput: React.FunctionComponent<ToInputInterface> = ({
    errorMessages,
    onChange,
    isCorrect,
    receiverAddress,
}) => {
    const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

    const receiverAddressInput = {
        value: receiverAddress,
        onChange,
        placeholder: 'Enter wallet address',
        type: 'text',
        bgColor: '#141414',
    };

    const warningTextInlineStyle = {
        marginTop: '4px',
        marginLeft: '4.8px',
    };

    return (
        <VerticalContentDiv marginBottom="12px">
            <MainText className={mainHeadingfontFamilyClass}>To</MainText>
            <Input id="username" {...receiverAddressInput} />
            <div style={{ height: '16px', marginTop: '-8px' }}>
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
            </div>
        </VerticalContentDiv>
    );
};

export default ToInput;
