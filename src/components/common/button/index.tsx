import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Props } from './types';
import { dimension, colors } from '../../../utils';
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

    const ButtonProps = {
        id,
        // variant: 'contained',
        startIcon: StartIcon ? (
            <img src={StartIcon} alt="icon" style={{ marginTop: '-0.2px' }} />
        ) : null,
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
            <Button
                {...ButtonProps}
                onClick={handleClick}
                className="myStyling"
                elevation={0}
            >
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
