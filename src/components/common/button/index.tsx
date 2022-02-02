import React from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import { dimension, colors } from '../../../utils';
import { Props, ButtonInterface } from './types';
import { Button } from './styles';

const CButton: React.FunctionComponent<Props> = ({
    StartIcon,
    handleClick,
    text,
    width,
    height,
    br,
    fontSize,
    cancel,
    disabled,
    isLoading,
    border,
    id,
}) => {
    const { _width } = dimension.button;
    const { primaryText } = colors;

    const ButtonProps: ButtonInterface = {
        id,
        variant: 'contained',
        startIcon: StartIcon ? (
            <img src={StartIcon} alt="icon" style={{ marginTop: '-0.2px' }} />
        ) : null,
        onClick: () => handleClick(),
        disabled: !!disabled,
        height,
        br,
        cancel,
        border,
        fontSize,
        width,
    };

    return (
        <div
            style={{
                width: width || _width,
                marginBottom: 10,
            }}
        >
            <Button {...ButtonProps}>
                {!isLoading ? (
                    text
                ) : (
                    <CircularProgress
                        size={24}
                        style={{ color: primaryText }}
                    />
                )}
            </Button>
        </div>
    );
};

export default CButton;
