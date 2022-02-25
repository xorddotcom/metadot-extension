import React, { useState } from 'react';

import { AuthtModalProps } from './types';
import { fonts } from '../../../../utils';

import {
    setAuthScreenModal,
    setConfirmSendModal,
} from '../../../../redux/slices/modalHandling';
import AuthModalView from './view';
import useDispatcher from '../../../../hooks/useDispatcher';
import {
    CANCEL_BUTTON,
    CONFIRM_BUTTON,
    ENTER_PASSWORD,
} from '../../../../utils/app-content';

const { subHeadingfontFamilyClass } = fonts;

const AuthModal: React.FunctionComponent<AuthtModalProps> = (props) => {
    const { open, handleClose, style, onConfirm, publicKey } = props;

    const generalDispatcher = useDispatcher();

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (): boolean => {
        if (!password) {
            return false;
        }
        try {
            generalDispatcher(() => setAuthScreenModal(false));
            generalDispatcher(() => setConfirmSendModal(true));
            onConfirm(publicKey, password);
            return true;
        } catch (err) {
            setPasswordError('Invalid password!');
        }
        return false;
    };

    const styledInput = {
        placeholder: ENTER_PASSWORD,
        value: password,
        className: subHeadingfontFamilyClass,
        fontSize: '12px',
        height: '20px',
        onChange: (t: string) => {
            setPassword(t);
            setPasswordError('');
        },
        hideHandler: () => setShowPassword(!showPassword),
        hideState: showPassword,
        mt: '0.03rem',
    };

    const btnF = {
        text: CANCEL_BUTTON,
        style: {
            width: '110px',
            height: '40px',
            borderRadius: '40px',
        },
        handleClick: () => {
            setPassword('');
            handleClose();
        },
    };

    const btnS = {
        text: CONFIRM_BUTTON,
        style: {
            width: '110px',
            height: '40px',
            borderRadius: '40px',
        },
        handleClick: () => handleSubmit(),
    };

    return (
        <AuthModalView
            open={open}
            style={style}
            onClose={() => handleClose()}
            styledInput={styledInput}
            passwordError={passwordError}
            btnCancel={btnF}
            btnConfirm={btnS}
        />
    );
};

export default AuthModal;
