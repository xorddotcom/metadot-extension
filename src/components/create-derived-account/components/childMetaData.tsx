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
    const [walletName, setWalletName] = useState('Unknown');
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
            // eslint-disable-next-line max-len
            /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\\~!><@#$%?,;.^/&}{*)(_+:[}="|`'-])[a-zA-Z0-9\\.~!><@,;#$%?^}{/&*)(+:[}=|"`'\w-]{7,19}/
        );

        if (!(password === confirmPassword)) {
            setPasswordError(didnotMatchWarning);
            return false;
        }
        if (password.length < 8) {
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
            if (walletName.length < 1) {
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
        value: walletName,
        onChange: (t: string) => {
            setIsValidWalletName(false);
            if (t.length < 20) setWalletName(t);
        },
    };

    const styledInputPassword = {
        placeholder: DERIVED_PASSWORD_PLACEHOLDER,
        className: subHeadingfontFamilyClass,
        value: password,
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
        disabled: !(walletName && password && confirmPassword) && true,
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
                height: '600px',
            }}
        >
            <UnAuthScreensContentWrapper mb="0px">
                <AccountCard
                    publicKey={deriveAddress}
                    accountName={walletName}
                />
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
                        fullWidth="80%"
                        {...styledInputPassword}
                        typePassword
                        isCorrect
                        rightIcon
                        rightPosition="24px"
                        topPosition="28px"
                    />
                    <SubHeading
                        mb="0"
                        textLightColor
                        marginTop="5px"
                        className={subHeadingfontFamilyClass}
                        style={
                            passwordError === passwordValidation
                                ? { color: '#F63A3A', opacity: 0.7 }
                                : { color: '#FFFFFF', opacity: 0.56 }
                        }
                        fontSize="11px"
                    >
                        Password must contain at least one lower case, one upper
                        case, one number and a special character
                    </SubHeading>
                </LabelAndTextWrapper>

                <LabelAndTextWrapper marginTop="55px">
                    <SubHeading
                        className={mainHeadingfontFamilyClass}
                        marginTop="0"
                        mb="10px"
                    >
                        {CONFIRM_PASSWORD_LABEL}
                    </SubHeading>
                    <Input
                        id="confirm-password"
                        {...styledInputConfirmPass}
                        fullWidth="80%"
                        typePassword
                        rightIcon
                        isCorrect
                        rightPosition="24px"
                        topPosition="28px"
                    />

                    {passwordError === didnotMatchWarning && (
                        <WarningText
                            id="warning-text"
                            mb="10px"
                            className={subHeadingfontFamilyClass}
                            visibility={passwordError === didnotMatchWarning}
                        >
                            {didnotMatchWarning}
                        </WarningText>
                    )}
                    {passwordError === minimumCharacterWarning && (
                        <WarningText
                            id="warning-text-1"
                            className={subHeadingfontFamilyClass}
                            mb="10px"
                            visibility={
                                passwordError === minimumCharacterWarning
                            }
                        >
                            {minimumCharacterWarning}
                        </WarningText>
                    )}
                </LabelAndTextWrapper>
            </UnAuthScreensContentWrapper>
            <Button id="auth-continue" {...btn} />
        </VerticalContentDiv>
    );
};

export default Step2;
