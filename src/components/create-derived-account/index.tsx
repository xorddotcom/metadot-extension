import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Wrapper,
    LabelAndTextWrapper,
    UnAuthScreensContentWrapper,
} from '../common/wrapper';
import { SubHeading, WarningText } from '../common/text';
import { Header, Input, Button } from '../common';

import {
    setLoggedIn,
    setPublicKey,
    setAccountName,
} from '../../redux/slices/activeAccount';
import { fonts, helpers } from '../../utils';
import accounts from '../../utils/accounts';

import {
    setIsResponseModalOpen,
    setLoadingForApi,
    setMainTextForSuccessModal,
    setResponseImage,
    setSubTextForSuccessModal,
} from '../../redux/slices/modalHandling';
import ImportIcon from '../../assets/images/modalIcons/import.svg';
import { addAccount } from '../../redux/slices/accounts';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;
const { isUserNameValid } = helpers;
const { AccountCreation, derive } = accounts;

const passwordErrorMessages = {
    minimumCharacterWarning: 'Password should not be less than 8 characters',
    didnotMatchWarning: 'Password did not match!',
    passwordValidation:
        'Password must contain at least one lower case, one upper case, one number and a special character',
};

const { minimumCharacterWarning, didnotMatchWarning, passwordValidation } =
    passwordErrorMessages;

const CreateDerivedAccount: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation().state as {
        parentAddress: string;
        parentPassword: string;
    };

    const parentPassword = location.parentPassword && location.parentPassword;
    const parentAddress = location.parentAddress && location.parentAddress;

    const [walletName, setWalletName] = useState('');
    const [isValidWalletName, setIsValidWalletName] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');

    const validatePasswordAndConfirmPassword = (): boolean => {
        const regexRes = password.match(
            /^(?=.*\d)(?=.*[~!><@#$%?,;.^/&}{*)(_+:[}="|`'-\\])(?=.*[a-z])(?=.*[A-Z])[\\.~!><@,;#$%?^}{/&*)(+:[}=|"`'\w-\]]{6,19}$/
        );

        if (regexRes == null) {
            setPasswordError(passwordValidation);
            return false;
        }
        if (!(password === confirmPassword)) {
            setPasswordError(didnotMatchWarning);
            return false;
        }
        if (password.length < 8 || confirmPassword.length < 8) {
            setPasswordError(minimumCharacterWarning);
            return false;
        }
        if (regexRes == null) {
            setPasswordError(passwordValidation);
            return false;
        }
        if (password === confirmPassword) {
            setPasswordError('');
            return true;
        }
        return true;
    };

    const [isLoading, setIsLoading] = useState(false);

    const derivationCreate = (
        parentAddresss: string,
        parentPasswoord: string,
        suri: string,
        childPassword: string,
        name: string
    ): boolean => {
        const deriveObject = {
            parentAddresss,
            parentPasswoord,
            suri,
            childPassword,
            name,
        };

        return true;
    };

    const showSuccessModalAndNavigateToDashboard = (): void => {
        dispatch(setIsResponseModalOpen(true));
        dispatch(setResponseImage(ImportIcon));
        dispatch(setMainTextForSuccessModal('Successfully Derived!'));
        dispatch(setSubTextForSuccessModal(''));
        navigate('/');

        setTimeout(() => {
            dispatch(setIsResponseModalOpen(false));
        }, 2500);
    };

    const handleContinue = async (): Promise<void> => {
        try {
            if (!isUserNameValid(walletName) || walletName.length < 3) {
                setIsValidWalletName(true);
                validatePasswordAndConfirmPassword();
                setIsLoading(false);
                return;
            }
            if (!validatePasswordAndConfirmPassword()) {
                setIsLoading(false);
                return;
            }
            const res = await derivationCreate(
                parentAddress,
                parentPassword,
                '//0',
                password,
                walletName
            );

            console.log('response handle continue ----', res);

            dispatch(setLoadingForApi(false));
            setIsLoading(false);
            showSuccessModalAndNavigateToDashboard();
        } catch (err) {
            console.log('error n create wallet', err);
        }
    };

    const walletNameText = {
        className: mainHeadingfontFamilyClass,
        mb: '10px',
    };

    const styledInputName = {
        className: subHeadingfontFamilyClass,
        placeholder: 'Enter wallet name for the derive account',
        height: '15px',
        value: walletName,
        onChange: (t: string) => {
            setIsValidWalletName(false);
            if (t.length < 20) setWalletName(t.replace(/[^A-Z0-9]/gi, ''));
        },
    };

    const styledInputPassword = {
        placeholder: 'Enter password for the derive account',
        className: subHeadingfontFamilyClass,
        value: password,
        height: '15px',
        onChange: (t: string) => {
            setPasswordError('');
            if (t.length < 20) setPassword(t);
        },
        hideHandler: () => setShowPassword(!showPassword),
        hideState: showPassword,
    };

    const styledInputConfirmPass = {
        placeholder: 'Re-enter password',
        className: subHeadingfontFamilyClass,
        value: confirmPassword,
        height: '15px',
        onChange: (t: string) => {
            setPasswordError('');
            if (t.length < 20) setConfirmPassword(t);
        },
        hideHandler: () => setShowConfirmPassword(!showConfirmPassword),
        hideState: showConfirmPassword,
    };

    const btn = {
        text: 'Continue',
        width: '300px',
        disabled: !(walletName && password && confirmPassword) && true,
        handleClick: async () => {
            setIsLoading(true);
            await handleContinue();
        },
        // handleClick: () => console.log('clicked'),
        isLoading,
    };

    return (
        <Wrapper>
            <Header
                centerText="Derive Account"
                backHandler={() => console.log('object')}
            />
            <UnAuthScreensContentWrapper>
                <LabelAndTextWrapper>
                    <SubHeading {...walletNameText}>Wallet Name</SubHeading>
                    <Input id="wallet-name" isCorrect {...styledInputName} />
                    {isValidWalletName && (
                        <WarningText
                            id="warning-text"
                            className={subHeadingfontFamilyClass}
                        >
                            Name should not be less than 3 characters and can
                            only contain alphanumeric data
                        </WarningText>
                    )}
                </LabelAndTextWrapper>

                <LabelAndTextWrapper marginTop="10px">
                    <SubHeading
                        className={mainHeadingfontFamilyClass}
                        marginTop="0px"
                        mb="10px"
                    >
                        Password
                    </SubHeading>
                    <Input
                        id="password"
                        {...styledInputPassword}
                        typePassword
                        isCorrect
                        rightIcon
                    />
                    {passwordError === minimumCharacterWarning && (
                        <WarningText
                            id="warning-text-1"
                            mb="10px"
                            className={subHeadingfontFamilyClass}
                        >
                            {minimumCharacterWarning}
                        </WarningText>
                    )}
                    {passwordError === passwordValidation && (
                        <WarningText
                            id="warning-text-2"
                            mb="10px"
                            className={subHeadingfontFamilyClass}
                        >
                            {passwordValidation}
                        </WarningText>
                    )}
                    {passwordError === didnotMatchWarning && (
                        <WarningText
                            id="warning-text-3"
                            mb="10px"
                            className={subHeadingfontFamilyClass}
                        >
                            {didnotMatchWarning}
                        </WarningText>
                    )}
                </LabelAndTextWrapper>

                <LabelAndTextWrapper marginTop="0">
                    <SubHeading
                        className={mainHeadingfontFamilyClass}
                        marginTop="0"
                        mb="10px"
                    >
                        Confirm Password
                    </SubHeading>
                    <Input
                        id="confirm-password"
                        {...styledInputConfirmPass}
                        typePassword
                        rightIcon
                        isCorrect
                    />

                    {passwordError === didnotMatchWarning && (
                        <WarningText
                            id="warning-text"
                            mb="5px"
                            className={subHeadingfontFamilyClass}
                        >
                            {didnotMatchWarning}
                        </WarningText>
                    )}
                </LabelAndTextWrapper>
            </UnAuthScreensContentWrapper>
            <div
                className="btn-wrapper"
                style={{ marginLeft: '0', marginTop: '-10px' }}
            >
                <Button id="auth-continue" {...btn} />
            </div>
        </Wrapper>
    );
};

export default CreateDerivedAccount;
