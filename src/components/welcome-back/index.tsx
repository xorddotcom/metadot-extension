import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '../common';
import { WarningText, MainHeading } from '../common/text';

import { colors, fonts, images } from '../../utils';
import accounts from '../../utils/accounts';
import './index.css';
import Input from '../common/input';

import { setLoggedIn } from '../../redux/slices/activeAccount';

import { RootState } from '../../redux/store';
import { DASHBOARD } from '../../constants';
import { PASSWORD } from '../../utils/app-content';
// import { ImportLink } from './styles';

const { logo } = images;
const {
    mainHeadingfontFamilyClass,
    subHeadingfontFamilyClass,
    // welcomeScreenMainHeadingFontSize,
} = fonts;
const { primaryText } = colors;
const { validateAccount } = accounts;

function WelcomeBack(): JSX.Element {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { accountName } = useSelector(
        (state: RootState) => state.activeAccount
    );

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
                navigate(DASHBOARD);
            } else {
                setPasswordError('Invalid password!');
            }
        } catch (err) {
            setPasswordError('Invalid password!');
        }
        return null;
    };

    const InputProps = {
        className: subHeadingfontFamilyClass,
        placeholder: PASSWORD,
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
    };

    const ButtonProps = {
        id: 'unlock',
        text: 'Unlock',
        style: {
            width: '80%',
            height: 50,
            borderRadius: 40,
        },
        handleClick: handleSubmit,
    };

    const usernameInput = {
        value: accountName,
        onChange: () => console.log('not editable!'),
        placeholder: 'wallet name',
        type: 'text',
        disabled: true,
        marginBottom: '20px',
    };

    return (
        <div className="wrapper-wb">
            <div className="app-logo">
                <img src={logo} alt="logo" />
            </div>

            <div className="main-content-wb" style={{ minHeight: '136px' }}>
                <MainHeading
                    className={mainHeadingfontFamilyClass}
                    weight="bold"
                    textAlign="center"
                    fontSize="36px"
                    marginBottom="40px"
                >
                    Welcome Back
                </MainHeading>

                <Input id="username" {...usernameInput} />
                <Input
                    {...InputProps}
                    typePassword
                    isCorrect
                    rightIcon
                    leftPosition="10px"
                    topPosition="3px"
                />
                <WarningText {...WarningTextProps}>{passwordError}</WarningText>
            </div>

            <Button {...ButtonProps} />

            {/* <p>
                <ImportLink color={primaryText}>or </ImportLink>
                <ImportLink
                    className={subHeadingfontFamilyClass}
                    onClick={() => {
                        navigate(IMPORT_WALLET);
                    }}
                >
                    Import Using Secrete Recovery Phrase
                </ImportLink>
            </p> */}
        </div>
    );
}

export default WelcomeBack;
