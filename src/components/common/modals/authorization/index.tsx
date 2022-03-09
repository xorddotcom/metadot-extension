import React, { useState } from 'react';

import { AuthtModalProps } from './types';
import { fonts, accounts } from '../../../../utils';

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
    ENTER_ACCOUNT_NAME,
} from '../../../../utils/app-content';

const { subHeadingfontFamilyClass } = fonts;
const { validateAccount } = accounts;

const AuthModal: React.FunctionComponent<AuthtModalProps> = (props) => {
    const { open, handleClose, style, onConfirm, publicKey, functionType } =
        props;

    const isPassword = functionType !== 'RenameAccount';

    const generalDispatcher = useDispatcher();

    const [input, setInput] = useState('');

    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (): Promise<boolean> => {
        console.log('handle submit working');
        if (!input) {
            return false;
        }
        try {
            if (isPassword) {
                const valid: boolean = await validateAccount(publicKey, input);
                if (!valid) throw new Error('Invalid password!');
            }
            const res: boolean = await onConfirm(publicKey, input);
            if (!res) throw new Error('Invalid password!');

            generalDispatcher(() => setAuthScreenModal(false));
            generalDispatcher(() => setConfirmSendModal(true));
            setInput('');
            return true;
        } catch (err) {
            setPasswordError('Invalid password!');
            return false;
        }
    };

    const closeModal = (): void => {
        setPasswordError('');
        setInput('');
        handleClose();
    };

    const styledInput = {
        placeholder: isPassword ? ENTER_PASSWORD : ENTER_ACCOUNT_NAME,
        value: input,
        className: subHeadingfontFamilyClass,
        fontSize: '12px',
        onChange: (t: string) => {
            setInput(t);
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
            functionType={functionType}
        />
    );
};

export default AuthModal;
