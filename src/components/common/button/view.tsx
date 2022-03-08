import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { ButtonViewProps, Props } from './types';
import { colors } from '../../../utils';
import { Button as MuiButton } from './styles';
import Loader from '../../../assets/images/loader.gif';

const ButtonView: React.FunctionComponent<ButtonViewProps> = (props) => {
    const { primaryText } = colors;
    const { style, text, isLoading } = props;

    return (
        <MuiButton {...props} style={{ ...style }}>
            {!isLoading ? (
                text
            ) : (
                // <img
                //     style={{ height: '20px', width: '25px' }}
                //     src={Loader}
                //     alt="Loader"
                // />
                <CircularProgress size={24} style={{ color: primaryText }} />
            )}
        </MuiButton>
    );
};
export default ButtonView;
