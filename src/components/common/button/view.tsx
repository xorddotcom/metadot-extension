import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { ButtonViewProps, Props } from './types';
import { colors } from '../../../utils';
import { Button as MuiButton } from './styles';
import Loader from '../../../assets/images/Preloader Metadot.gif';

const ButtonView: React.FunctionComponent<ButtonViewProps> = (props) => {
    const { primaryText } = colors;
    const { style, text, isLoading } = props;

    return (
        <MuiButton {...props} style={{ ...style }}>
            {!isLoading ? (
                text
            ) : (
                <img
                    src={Loader}
                    alt="Loader"
                    style={{ height: '30px', width: '25px' }}
                />
            )}
        </MuiButton>
    );
};
export default ButtonView;
