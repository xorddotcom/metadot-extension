import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import CreateWalletView from './view';

import { fonts, helpers, images } from '../../utils';
import accounts from '../../utils/accounts';

import {
    setIsResponseModalOpen,
    setLoadingForApi,
} from '../../redux/slices/modalHandling';
import {
    setAccountCreationStep,
    setTempSeed,
    setLoggedIn,
} from '../../redux/slices/activeAccount';

import { RootState } from '../../redux/store';
import { DASHBOARD, IMPORT_WALLET } from '../../constants';
import useDispatcher from '../../hooks/useDispatcher';
import useResponseModal from '../../hooks/useResponseModal';
import {
    CONTINUE_BUTTON,
    PASSWORD,
    RE_ENTER_PASSWORD,
    WALLET_NAME_LABEL,
} from '../../utils/app-content';

const { ImportIcon, AccountCreate } = images;
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
    const navigate = useNavigate();
    const generalDispatcher = useDispatcher();
    const openModalForImportSuccess = useResponseModal({
        isOpen: true,
        modalImage: ImportIcon,
        mainText: 'Successfully Imported!',
        subText: '',
    });
    const openModalForCreateSuccess = useResponseModal({
        isOpen: true,
        modalImage: AccountCreate,
        mainText: 'Successfully Created!',
        subText: '',
    });
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
            openModalForImportSuccess();
            navigate(DASHBOARD);
        } else {
            openModalForCreateSuccess();
            navigate(DASHBOARD);
        }

        generalDispatcher(() => setLoggedIn(true));

        setTimeout(() => {
            generalDispatcher(() => setIsResponseModalOpen(false));
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
            generalDispatcher(() => setTempSeed(''));
            generalDispatcher(() => setAccountCreationStep(0));
            generalDispatcher(() => setLoadingForApi(false));
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

    const continueBtn = {
        text: CONTINUE_BUTTON,
        style: {
            width: '100%',
            height: 50,
            borderRadius: 40,
        },
        disabled: !(walletName && password && confirmPassword) && true,
        handleClick: async () => {
            setIsLoading(true);
            await handleContinue();
        },
        isLoading,
    };

    const backHandler = (): void =>
        generalDispatcher(() => setAccountCreationStep(2));

    return (
        <CreateWalletView
            backHandler={backHandler}
            isValidWalletName={isValidWalletName}
            passwordError={passwordError}
            walletNameText={walletNameText}
            styledInputName={styledInputName}
            styledInputPassword={styledInputPassword}
            styledInputConfirmPass={styledInputConfirmPass}
            continueBtn={continueBtn}
        />
    );
};

export default CreateWallet;
