import React from 'react';

import CancelIcon from '@mui/icons-material/Cancel';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { Props, FieldInterface } from './types';

import { Wrapper, Field, Icon } from './styles';
import { images } from '../../../utils';

const { visibilityOff, dropdownIcon, visibilityOn } = images;

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
    marginBottom,
    maxlength,
    mt,
    mr,
    leftPosition,
    topPosition,
    style,
    inputWrapperWidth,
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
            // eslint-disable-next-line no-restricted-syntax
            console.clear();
            console.log('e', e.target.value);
            onChange(e.target.value);
        },
        isCorrect,
        disabled,
        type: typePassword ? hideStateRes : 'text',
        ...style,
    };

    return (
        <Wrapper
            marginBottom={marginBottom || '0px'}
            isCorrect={isCorrect}
            inputWrapperWidth={inputWrapperWidth}
        >
            <Field {...FieldProps} />
            {rightIcon && (
                <Icon
                    onClick={hideHandler}
                    topPosition={topPosition}
                    leftPosition={leftPosition}
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
                    leftPosition={leftPosition}
                >
                    <CancelIcon fontSize="small" />
                </Icon>
            )}
            {rightIconLock && (
                <Icon topPosition={topPosition} leftPosition={leftPosition}>
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
                <Icon topPosition={topPosition} leftPosition={leftPosition}>
                    <img src={dropdownIcon} alt="dropdown" />
                </Icon>
            )}
        </Wrapper>
    );
};

export default Input;
