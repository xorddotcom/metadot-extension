import React, { useState } from 'react';
import {
    LabelAndTextWrapper,
    UnAuthScreensContentWrapper,
    VerticalContentDiv,
} from '../../common/wrapper';
import { SubHeading, WarningText } from '../../common/text';
import { Input, Button } from '../../common';

import { fonts, helpers } from '../../../utils';
import {
    CONFIRM_PASSWORD_LABEL,
    DERIVED_ACCOUNT_WALLET_NAME_PLACEHOLDER,
    DERIVED_PASSWORD_PLACEHOLDER,
    NAME_WARNING,
    PASSWORD,
    WALLET_NAME_LABEL,
    RE_ENTER_PASSWORD,
    CREATE_DERIVE_ACCOUNT_BUTTON,
} from '../../../utils/app-content';
import AccountCard from './account-card';

import { ChildMetaDataInterface } from '../types';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;
const { isUserNameValid } = helpers;

const Step2: React.FunctionComponent<ChildMetaDataInterface> = ({
    parentAddress,
    derivePath,
    parentPassword,
    isLoading,
    setIsLoading,
    derive,
    deriveAddress,
    showSuccess,
}) => {
    const [walletName, setWalletName] = useState('');
    const [isValidWalletName, setIsValidWalletName] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const passwordErrorMessages = {
        minimumCharacterWarning:
            'Password should not be less than 8 characters',
        didnotMatchWarning: 'Password did not match!',
        passwordValidation: `Password must contain at least one lower case,
             one upper case, one number and a special character`,
    };

    const { minimumCharacterWarning, didnotMatchWarning, passwordValidation } =
        passwordErrorMessages;

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

    const clickHandler = async (): Promise<void> => {
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

            await derive(
                parentAddress,
                derivePath,
                parentPassword,
                walletName,
                password,
                null
            );
            setIsLoading(false);
            showSuccess();
        } catch (err: any) {
            setIsLoading(false);
            console.log('error n create wallet', err);
            console.log('error message n create wallet', err.message);
        }
    };

    const walletNameText = {
        className: mainHeadingfontFamilyClass,
        mb: '10px',
    };

    const styledInputName = {
        className: subHeadingfontFamilyClass,
        placeholder: DERIVED_ACCOUNT_WALLET_NAME_PLACEHOLDER,
        height: '15px',
        value: walletName,
        onChange: (t: string) => {
            setIsValidWalletName(false);
            if (t.length < 20) setWalletName(t.replace(/[^A-Z0-9]/gi, ''));
        },
    };

    const styledInputPassword = {
        placeholder: DERIVED_PASSWORD_PLACEHOLDER,
        className: subHeadingfontFamilyClass,
        value: password,
        height: '15px',
        onChange: (t: string) => {
            setPasswordError('');
            return t.length <= 19 && setPassword(t);
        },
        hideHandler: () => setShowPassword(!showPassword),
        hideState: showPassword,
    };

    const styledInputConfirmPass = {
        placeholder: RE_ENTER_PASSWORD,
        className: subHeadingfontFamilyClass,
        value: confirmPassword,
        height: '15px',
        onChange: (t: string) => {
            setPasswordError('');
            return t.length <= 19 && setConfirmPassword(t);
        },
        hideHandler: () => setShowConfirmPassword(!showConfirmPassword),
        hideState: showConfirmPassword,
    };

    const btn = {
        text: CREATE_DERIVE_ACCOUNT_BUTTON,
        style: {
            width: '100%',
            height: 50,
            borderRadius: 40,
        },
        disabled: !(derivePath && password) && true,
        handleClick: async () => {
            setIsLoading(true);
            await clickHandler();
        },
        isLoading,
    };

    return (
        <VerticalContentDiv
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column',
                height: '520px',
            }}
        >
            <UnAuthScreensContentWrapper mb="0px">
                <AccountCard publicKey={deriveAddress} accountName="Unknown" />
                <LabelAndTextWrapper>
                    <SubHeading {...walletNameText}>
                        {WALLET_NAME_LABEL}
                    </SubHeading>
                    <Input id="wallet-name" isCorrect {...styledInputName} />
                    {isValidWalletName && (
                        <WarningText
                            id="warning-text"
                            className={subHeadingfontFamilyClass}
                            visibility={isValidWalletName}
                        >
                            {NAME_WARNING}
                        </WarningText>
                    )}
                </LabelAndTextWrapper>

                <LabelAndTextWrapper marginTop="10px">
                    <SubHeading
                        className={mainHeadingfontFamilyClass}
                        marginTop="0px"
                        mb="10px"
                    >
                        {PASSWORD}
                    </SubHeading>
                    <Input
                        id="password"
                        fullWidth="76%"
                        {...styledInputPassword}
                        typePassword
                        isCorrect
                        rightIcon
                        rightPosition="24px"
                        topPosition="28px"
                    />
                    {passwordError === minimumCharacterWarning && (
                        <WarningText
                            id="warning-text-1"
                            mb="10px"
                            visibility={
                                passwordError === minimumCharacterWarning
                            }
                            className={subHeadingfontFamilyClass}
                        >
                            {minimumCharacterWarning}
                        </WarningText>
                    )}
                    {passwordError === passwordValidation && (
                        <WarningText
                            id="warning-text-2"
                            mb="10px"
                            visibility={passwordError === passwordValidation}
                            className={subHeadingfontFamilyClass}
                        >
                            {passwordValidation}
                        </WarningText>
                    )}
                    {passwordError === didnotMatchWarning && (
                        <WarningText
                            id="warning-text-3"
                            mb="10px"
                            visibility={passwordError === didnotMatchWarning}
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
                        {CONFIRM_PASSWORD_LABEL}
                    </SubHeading>
                    <Input
                        id="confirm-password"
                        fullWidth="76%"
                        {...styledInputConfirmPass}
                        typePassword
                        rightIcon
                        isCorrect
                        rightPosition="24px"
                        topPosition="28px"
                    />

                    {passwordError === didnotMatchWarning && (
                        <WarningText
                            id="warning-text"
                            mb="5px"
                            className={subHeadingfontFamilyClass}
                            visibility={passwordError === didnotMatchWarning}
                        >
                            {didnotMatchWarning}
                        </WarningText>
                    )}
                </LabelAndTextWrapper>
            </UnAuthScreensContentWrapper>
            <Button id="auth-continue" {...btn} />
        </VerticalContentDiv>
    );
};

export default Step2;
