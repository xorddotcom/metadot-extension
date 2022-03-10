import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '../common';
import { WarningText, MainHeading } from '../common/text';

import { colors, fonts, images } from '../../utils';
import accounts from '../../utils/accounts';
import './index.css';
import Input from '../common/input';

import {
    setAccountName,
    setLoggedIn,
    setPublicKey,
} from '../../redux/slices/activeAccount';

import { RootState } from '../../redux/store';
import { DASHBOARD } from '../../constants';
import { PASSWORD } from '../../utils/app-content';
import { MyAccounts } from '../common/modals';
import { Account } from './types';
import useDispatcher from '../../hooks/useDispatcher';
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

    const [isModalOpen, setIsModalOpen] = useState(false);
    const { accountName, publicKey } = useSelector(
        (state: RootState) => state.activeAccount
    );
    const generalDispatcher = useDispatcher();

    const [accountToLogin, setAccountToLogin] = useState<Account>({
        publicKey,
        accountName,
    });

    const onAccountSelection = (data: Account): void => {
        setAccountToLogin(data);
        setIsModalOpen(false);
        generalDispatcher(() => setPublicKey(data.publicKey));
        generalDispatcher(() => setAccountName(data.accountName));
    };

    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [isButtonLoading, setIsButtonLoading] = useState(false);

    const currentUser = useSelector((state: RootState) => state.activeAccount);

    const handleSubmit = async (): Promise<boolean | null> => {
        setIsButtonLoading(true);
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
                // setPasswordError('Invalid password!');
                throw new Error('Invalid password!');
            }
        } catch (err) {
            setPasswordError('Invalid password!');
            setIsButtonLoading(false);
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
        id: 'password-input',
        fullWidth: '80%',
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
        handleClick: () => {
            handleSubmit();
        },
        isLoading: isButtonLoading,
        disabled: !(password.length > 0),
    };

    const usernameInput = {
        value: accountToLogin.accountName,
        onChange: () => console.log('not editable!'),
        placeholder: 'wallet name',
        type: 'text',
        disabled: true,
        marginBottom: '20px',
        rightIconDropDown: true,
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

                <div aria-hidden onClick={() => setIsModalOpen(true)}>
                    <Input
                        id="username"
                        {...usernameInput}
                        rightPosition="19px"
                        topPosition="28px"
                    />
                </div>
                <Input
                    {...InputProps}
                    typePassword
                    isCorrect
                    rightIcon
                    rightPosition="18px"
                    topPosition="27px"
                />
                <WarningText {...WarningTextProps}>{passwordError}</WarningText>
            </div>

            <Button {...ButtonProps} />

            <MyAccounts
                open={isModalOpen}
                handleClose={() => setIsModalOpen(false)}
                onSelection={onAccountSelection}
                style={{
                    position: 'relative',
                    width: '300px',
                    background: '#141414',
                    pb: 3,
                    overflowY: 'scroll',
                    overflowX: 'hidden',
                    marginTop: '9rem',
                }}
            />

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
