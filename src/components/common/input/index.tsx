import React from 'react';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { Props, FieldInterface } from './types';

import { Field, Icon, TokenBox, TokenName } from './styles';
import { fonts, images } from '../../../utils';

const { visibilityOff, dropdownIcon, visibilityOn, crossIconRound } = images;
const { subHeadingfontFamilyClass } = fonts;

const Input: React.FunctionComponent<Props> = ({
    setSwitchChecked,
    setSwitchCheckedSecond,
    placeholder,
    onChange,
    value,
    rightIconLock,
    isCorrect,
    disabled,
    id,
    type,
    rightIconDropDown,
    rightIconDropDownHandler,
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
    border,
    tokenDropDown,
    tokenDropDownHandler,
    tokenBoxColor,
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
            if (placeholder === 'Amount') {
                if (setSwitchChecked) setSwitchChecked(false);
                if (setSwitchCheckedSecond) setSwitchCheckedSecond(false);
            }
        },
        isCorrect,
        disabled,
        type: typePassword ? hideStateRes : 'text',
        tokenLogo,
        bgColor,
        border,
        ...style,
    };

    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
            }}
        >
            <Field
                {...FieldProps}
                autocomplete="off"
                onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
                    e.currentTarget.blur()
                }
            />
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
                    <img src={crossIconRound} alt="cros icon" />
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
                            marginTop: '-1.6px',
                            marginRight: '-2.4px',
                        }}
                    />
                </Icon>
            )}

            {rightIconDropDown && (
                <Icon
                    topPosition={topPosition}
                    leftPosition={leftPosition}
                    rightPosition={rightPosition}
                    onClick={
                        rightIconDropDownHandler && rightIconDropDownHandler
                    }
                >
                    <img src={dropdownIcon} alt="dropdown" />
                </Icon>
            )}
            {tokenLogo && (
                <TokenBox
                    tokenDropDown={tokenDropDown === true}
                    tokenBoxColor={tokenBoxColor}
                    style={{ cursor: 'pointer' }}
                    onClick={tokenDropDownHandler && tokenDropDownHandler}
                >
                    <img
                        src={tokenImage}
                        alt="token"
                        style={{ width: 20, height: 20 }}
                    />
                    <TokenName className={subHeadingfontFamilyClass}>
                        {tokenName}
                    </TokenName>
                    {tokenDropDown && tokenDropDownHandler && (
                        <img
                            style={{ width: '8px', margin: '0px 8px' }}
                            src={dropdownIcon}
                            alt="dropdown"
                            aria-hidden="true"
                        />
                    )}
                </TokenBox>
            )}
        </div>
    );
};

export default Input;
