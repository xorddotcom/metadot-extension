import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AppLogo from '../../assets/images/logo.svg';
import { Button } from '../common';
import { WarningText, MainHeading } from '../common/text';

import { fonts } from '../../utils';
import accounts from '../../utils/accounts';
import './index.css';
import Input from '../common/input';

import { setLoggedIn } from '../../redux/slices/activeAccount';

import { RootState } from '../../redux/store';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;
const { validateAccount } = accounts;

function WelcomeBack(): JSX.Element {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');

    const currentUser = useSelector((state: RootState) => state.activeAccount);

    const handleSubmit = async (): Promise<boolean | null> => {
        if (!password) {
            return false;
        }
        try {
            const validate = await validateAccount(
                currentUser.publicKey,
                password
            );
            if (validate !== false) {
                dispatch(setLoggedIn(true));
                navigate('/');
            } else {
                setPasswordError('Invalid password!');
            }
        } catch (err) {
            console.log('error due to wrong ', err);
            setPasswordError('Invalid password!');
        }
        return null;
    };

    const InputProps = {
        className: subHeadingfontFamilyClass,
        placeholder: 'Enter Password',
        value: password,
        onChange: (t: string) => {
            setPassword(t);
            setPasswordError('');
        },
        hideHandler: () => setShowPassword(!showPassword),
        hideState: showPassword,
        height: '20px',
        id: 'password-input',
        fullWidth: '76%',
        mr: '1.2rem',
    };

    const WarningTextProps = {
        className: subHeadingfontFamilyClass,
        visibility: !!passwordError,
        ml: '1.75rem',
    };

    const ButtonProps = {
        id: 'unlock',
        text: 'Unlock',
        width: '275px',
        handleClick: handleSubmit,
    };

    return (
        <>
            <div className="app-logo">
                <img src={AppLogo} alt="logo" />
            </div>

            <div className="main-content" style={{ minHeight: '136px' }}>
                <MainHeading className={mainHeadingfontFamilyClass}>
                    Welcome Back
                </MainHeading>
                <Input {...InputProps} />
                <WarningText {...WarningTextProps}>{passwordError}</WarningText>
            </div>
            <div
                className="btn-wrapper"
                style={{ marginLeft: 0, marginTop: '0' }}
            >
                <Button {...ButtonProps} />
            </div>
        </>
    );
}

export default WelcomeBack;
