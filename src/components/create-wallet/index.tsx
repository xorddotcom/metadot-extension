import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Wrapper,
    LabelAndTextWrapper,
    UnAuthScreensContentWrapper,
} from '../common/wrapper';
import { WarningText, SubHeading } from '../common/text';
import { Button, Input, Header } from '../common';
import { fonts, helpers } from '../../utils';
import accounts from '../../utils/accounts';

import {
    setIsResponseModalOpen,
    setLoadingForApi,
    setMainTextForSuccessModal,
    setResponseImage,
    setSubTextForSuccessModal,
} from '../../redux/slices/modalHandling';
import {
    setAccountCreationStep,
    setTempSeed,
} from '../../redux/slices/activeAccount';

import ImportIcon from '../../assets/images/modalIcons/import.svg';
import AccountCreate from '../../assets/images/modalIcons/accountCreate.svg';
import { RootState } from '../../redux/store';
import { DASHBOARD, IMPORT_WALLET } from '../../constants';
import {
    CONFIRM_PASSWORD_LABEL,
    CONTINUE_BUTTON,
    CREATE_WALLET_DESCRIPTION,
    CREATE_WALLET_HEADER,
    NAME_WARNING,
    PASSWORD,
    PASSWORD_LABEL,
    RE_ENTER_PASSWORD,
    WALLET_NAME_LABEL,
} from '../../utils/app-content';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;
const { AccountCreation } = accounts;
const { isUserNameValid } = helpers;

const passwordErrorMessages = {
    minimumCharacterWarning: 'Password should not be less than 8 characters',
    didnotMatchWarning: 'Password did not match!',
    passwordValidation: `Password must contain at least one lower case,
         one upper case, one number and a special character`,
};

const { minimumCharacterWarning, didnotMatchWarning, passwordValidation } =
    passwordErrorMessages;

const CreateWallet: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation().state as {
        prevRoute: string;
        seedToPass: string;
    };

    const { tempSeed } = useSelector((state: RootState) => state.activeAccount);

    const operation =
        location.prevRoute === IMPORT_WALLET ? 'Imported' : 'Created';

    const currSeed =
        operation === 'Imported'
            ? location.seedToPass && location.seedToPass
            : tempSeed;

    const [walletName, setWalletName] = useState('');
    const [isValidWalletName, setIsValidWalletName] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');

    const validatePassword = (): boolean => {
        const regexRes = password.match(
            // eslint-disable-next-line max-len
            /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\\~!><@#$%?,;.^/&}{*)(_+:[}="|`'-])[a-zA-Z0-9\\.~!><@,;#$%?^}{/&*)(+:[}=|"`'\w-]{7,19}/
        );

        if (password.length < 8) {
            setPasswordError(minimumCharacterWarning);
            return false;
        }
        if (!(password === confirmPassword)) {
            setPasswordError(didnotMatchWarning);
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

    const createAccount = async (
        name: string,
        pass: string,
        seedPhrase: string
    ): Promise<boolean> => {
        const res = await AccountCreation(name, pass, seedPhrase);
        return res;
    };

    const showSuccessModalAndNavigateToDashboard = (): void => {
        if (operation === 'Imported') {
            dispatch(setIsResponseModalOpen(true));
            dispatch(setResponseImage(ImportIcon));
            dispatch(setMainTextForSuccessModal(`Successfully ${operation}!`));
            dispatch(setSubTextForSuccessModal(''));
            navigate(DASHBOARD);
        } else {
            dispatch(setIsResponseModalOpen(true));
            dispatch(setResponseImage(AccountCreate));
            dispatch(setMainTextForSuccessModal(`Successfully ${operation}!`));
            dispatch(setSubTextForSuccessModal(''));
            navigate(DASHBOARD);
        }

        setTimeout(() => {
            dispatch(setIsResponseModalOpen(false));
        }, 2500);
    };

    const handleContinue = async (): Promise<void> => {
        try {
            if (!isUserNameValid(walletName) || walletName.length < 3) {
                setIsValidWalletName(true);
                validatePassword();
                setIsLoading(false);
                return;
            }
            if (!validatePassword()) {
                setIsLoading(false);
                return;
            }
            await createAccount(walletName, password, currSeed);
            dispatch(setTempSeed(''));
            dispatch(setAccountCreationStep(0));
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
        placeholder: WALLET_NAME_LABEL,
        height: '15px',
        value: walletName,
        onChange: (t: string) => {
            setIsValidWalletName(false);
            if (t.length < 20) setWalletName(t.replace(/[^A-Z0-9]/gi, ''));
        },
    };

    const styledInputPassword = {
        placeholder: PASSWORD,
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
        placeholder: RE_ENTER_PASSWORD,
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
        text: CONTINUE_BUTTON,
        width: '300px',
        disabled: !(walletName && password && confirmPassword) && true,
        handleClick: async () => {
            setIsLoading(true);
            await handleContinue();
        },
        isLoading,
    };

    return (
        <Wrapper>
            <Header
                centerText={CREATE_WALLET_HEADER}
                backHandler={() => dispatch(setAccountCreationStep(2))}
            />
            <UnAuthScreensContentWrapper>
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
                        {PASSWORD_LABEL}
                    </SubHeading>
                    <Input
                        id="password"
                        fullWidth="76%"
                        {...styledInputPassword}
                        typePassword
                        isCorrect
                        rightIcon
                        leftPosition="15px"
                        topPosition="1px"
                    />
                    {passwordError === minimumCharacterWarning && (
                        <WarningText
                            id="warning-text-1"
                            mb="10px"
                            className={subHeadingfontFamilyClass}
                            visibility={
                                passwordError === minimumCharacterWarning
                            }
                        >
                            {minimumCharacterWarning}
                        </WarningText>
                    )}
                    {passwordError === passwordValidation && (
                        <WarningText
                            id="warning-text-2"
                            mb="10px"
                            className={subHeadingfontFamilyClass}
                            visibility={passwordError === passwordValidation}
                        >
                            {passwordValidation}
                        </WarningText>
                    )}
                    {passwordError === didnotMatchWarning && (
                        <WarningText
                            id="warning-text-3"
                            mb="10px"
                            className={subHeadingfontFamilyClass}
                            visibility={passwordError === didnotMatchWarning}
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
                        leftPosition="15px"
                        topPosition="1px"
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

                <SubHeading
                    mb="0"
                    textLightColor
                    marginTop="5px"
                    className={subHeadingfontFamilyClass}
                >
                    {CREATE_WALLET_DESCRIPTION}
                </SubHeading>
            </UnAuthScreensContentWrapper>
            <div
                className="btn-wrapper"
                style={{ marginLeft: '0', marginBottom: '10px' }}
            >
                <Button id="auth-continue" {...btn} />
            </div>
        </Wrapper>
    );
};

export default CreateWallet;
