import React from 'react';

import CancelIcon from '@mui/icons-material/Cancel';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { Props, FieldInterface } from './types';

import { Field, Icon, TokenBox, TokenName } from './styles';
import { fonts, images } from '../../../utils';

const { visibilityOff, dropdownIcon, visibilityOn } = images;
const { subHeadingfontFamilyClass } = fonts;

const Input: React.FunctionComponent<Props> = ({
    placeholder,
    onChange,
    value,
    rightIconLock,
    isCorrect,
    disabled,
    id,

    rightIconDropDown,
    rightIcon,
    rightIconCross,
    rightIconCrossClickHandler,
    typePassword = false,
    hideHandler,
    hideState,
    blockInvalidChar,
    fullWidth,
    fontSize,
    height,
    maxlength,
    leftPosition,
    rightPosition,
    topPosition,
    style,
    tokenLogo,
    tokenImage,
    tokenName,
    bgColor,
}) => {
    const blockChar = (ev: React.KeyboardEvent): void => {
        const arr = ['e', 'E', '+', '-'];
        if (arr.includes(ev.key) === true) {
            ev.preventDefault();
        }
    };

    const hideStateRes = !hideState ? 'password' : 'text';

    const FieldProps: FieldInterface = {
        id,
        maxlength,
        fontSize,
        height,
        value,
        fullWidth,
        placeholder,
        onKeyDown: (e: React.KeyboardEvent) =>
            blockInvalidChar ? blockChar(e) : null,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            onChange(e.target.value);
        },
        isCorrect,
        disabled,
        type: typePassword ? hideStateRes : 'text',
        tokenLogo,
        bgColor,
        ...style,
    };

    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
            }}
        >
            <Field {...FieldProps} autocomplete="off" />
            {rightIcon && (
                <Icon
                    onClick={hideHandler}
                    topPosition={topPosition}
                    leftPosition={leftPosition}
                    rightPosition={rightPosition}
                >
                    {!hideState ? (
                        <img src={visibilityOff} alt="hide" />
                    ) : (
                        <img src={visibilityOn} alt="hide" />
                    )}
                </Icon>
            )}
            {rightIconCross && (
                <Icon
                    onClick={rightIconCrossClickHandler}
                    topPosition={topPosition}
                    rightPosition={rightPosition}
                >
                    <CancelIcon fontSize="small" />
                </Icon>
            )}
            {rightIconLock && (
                <Icon
                    topPosition={topPosition}
                    leftPosition={leftPosition}
                    rightPosition={rightPosition}
                >
                    <LockOutlinedIcon
                        fontSize="small"
                        style={{
                            marginTop: '-0.1rem',
                            marginRight: '-0.15rem',
                        }}
                    />
                </Icon>
            )}

            {rightIconDropDown && (
                <Icon
                    topPosition={topPosition}
                    leftPosition={leftPosition}
                    rightPosition={rightPosition}
                >
                    <img src={dropdownIcon} alt="dropdown" />
                </Icon>
            )}
            {tokenLogo && (
                <TokenBox>
                    <img
                        src={tokenImage}
                        alt="token"
                        style={{ width: 20, height: 20 }}
                    />
                    <TokenName className={subHeadingfontFamilyClass}>
                        {tokenName}
                    </TokenName>
                </TokenBox>
            )}
        </div>
    );
};

export default Input;
