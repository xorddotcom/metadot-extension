import React from 'react';
import { Props } from './types';
import ButtonView from './view';

const Button: React.FunctionComponent<Props> = (props) => {
    const {
        StartIcon,
        handleClick,
        text,
        disabled,
        isLoading,
        id,
        style,
        lightBtn,
    } = props;

    const ButtonProps = {
        id,
        startIcon: StartIcon ? (
            <img src={StartIcon} alt="icon" style={{ marginTop: '-0.2px' }} />
        ) : null,
        disabled: !!disabled,
        lightBtn,
        onClick: () => handleClick(),
        className: 'myStyling',
        elevation: 0,
        disableRipple: true,
    };

    return (
        <ButtonView
            isLoading={isLoading}
            text={text}
            {...ButtonProps}
            style={style}
        />
    );
};
export default Button;
