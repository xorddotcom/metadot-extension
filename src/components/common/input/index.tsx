import React from 'react';

import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CancelIcon from '@mui/icons-material/Cancel';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { Props, FieldInterface } from './types';

import { Wrapper, Field, Icon } from './styles';

const index: React.FunctionComponent<Props> = ({
    placeholder,
    onChange,
    value,
    rightIconCross,
    rightIconCrossClickHandler,
    rightIconLock,
    isCorrect,
    fullWidth,
    fontSize,
    height,
    rightIcon,
    hideHandler,
    hideState,
    marginBottom,
    maxlength,
    blockInvalidChar,
    id,
    mt,
    mr,
    rightAbsPosition,
    leftAbsPosition,
}) => {
    const blockChar = (ev: React.KeyboardEvent): void => {
        const arr = ['e', 'E', '+', '-'];
        if (arr.includes(ev.key) === true) {
            ev.preventDefault();
        }
    };

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
    };

    return (
        <Wrapper marginBottom={marginBottom || '0px'}>
            <Field {...FieldProps} />
            {rightIcon && (
                <Icon
                    onClick={hideHandler}
                    rightAbsPosition={rightAbsPosition ? '-25px' : ''}
                    leftAbsPosition={leftAbsPosition ? '7px' : ''}
                >
                    {!hideState ? (
                        <VisibilityOffIcon
                            id="eye-off-icon"
                            fontSize="small"
                            style={{
                                marginTop: !mt ? '-0.1rem' : mt,
                                marginRight: mr && mr,
                            }}
                        />
                    ) : (
                        <VisibilityIcon
                            id="eye-on-icon"
                            fontSize="small"
                            style={{
                                marginTop: !mt ? '-0.1rem' : mt,
                                marginRight: mr && mr,
                            }}
                        />
                    )}
                </Icon>
            )}
            {rightIconCross && (
                <Icon onClick={rightIconCrossClickHandler}>
                    <CancelIcon
                        fontSize="small"
                        style={{ marginTop: '-0.1rem', marginRight: '-0.3rem' }}
                    />
                </Icon>
            )}

            {rightIconLock && (
                <Icon>
                    <LockOutlinedIcon
                        fontSize="small"
                        style={{
                            marginTop: '-0.1rem',
                            marginRight: '-0.15rem',
                        }}
                    />
                </Icon>
            )}
        </Wrapper>
    );
};

export default index;
