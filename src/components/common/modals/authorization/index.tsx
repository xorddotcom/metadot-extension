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

    const handleSubmit = async (): Promise<boolean> => {
        if (!password) {
            return false;
        }
        try {
            const res: boolean = await onConfirm(publicKey, password);
            if (!res) throw new Error('Invalid password!');
            generalDispatcher(() => setAuthScreenModal(false));
            generalDispatcher(() => setConfirmSendModal(true));
            setPassword('');
            return true;
        } catch (err) {
            setPasswordError('Invalid password!');
            return false;
        }
    };

    const closeModal = (): void => {
        setPasswordError('');
        setPassword('');
        handleClose();
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
        handleClick: () => closeModal(),
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
            onClose={() => closeModal()}
            styledInput={styledInput}
            passwordError={passwordError}
            btnCancel={btnF}
            btnConfirm={btnS}
        />
    );
};

export default AuthModal;
