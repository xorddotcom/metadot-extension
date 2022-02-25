import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { ButtonViewProps, Props } from './types';
import { colors } from '../../../utils';
import { Button as MuiButton } from './styles';

const ButtonView: React.FunctionComponent<ButtonViewProps> = (props) => {
    const { primaryText } = colors;
    const { style, text, isLoading } = props;

    return (
        <MuiButton {...props} style={{ ...style }}>
            {!isLoading ? (
                text
            ) : (
                <CircularProgress size={24} style={{ color: primaryText }} />
            )}
        </MuiButton>
    );
};
export default ButtonView;
