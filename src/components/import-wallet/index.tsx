import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    setJsonFileUploadScreen,
    setLoggedIn,
} from '../../redux/slices/activeAccount';
import {
    setIsResponseModalOpen,
    setMainTextForSuccessModal,
    setResponseImage,
    setSubTextForSuccessModal,
} from '../../redux/slices/modalHandling';

import { Header, Button } from '../common';
import { MainHeading, SubHeading } from '../common/text';

import Options from './components/options';
import EnterSeed from './components/enter-seed';
import UploadJson from './components/upload-json';

import { fonts, helpers, images } from '../../utils';
import accounts from '../../utils/accounts';
import services from '../../utils/services';

import { RootState } from '../../redux/store';

import { Wrapper, UnAuthScreensContentWrapper } from '../common/wrapper';
import { CREATE_WALLET, DASHBOARD, IMPORT_WALLET } from '../../constants';
import {
    IMPORT_WALLET_HEADER,
    RESTORE_WALLET,
    RESTORE_WALLET_DESCRIPTION,
} from '../../utils/app-content';
import useDispatcher from '../../hooks/useDispatcher';

const { openOptions, isTabViewOpened } = helpers;
const { ImportIcon } = images;
const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;
const { validatingSeedPhrase, createAccountFromJSON } = accounts;

const invalidSeedMessages = {
    minimumWords: 'At least 12 words required!',
    maxWords: 'Only 12 words required!',
    seedDoesnotExist: 'Seed does not exists!',
};

function ImportWallet(): JSX.Element {
    const location = useLocation().pathname;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const generalDispatcher = useDispatcher();

    const currentUser = useSelector((state: RootState) => state);
    const { jsonFileUploadScreen, prefix } = currentUser.activeAccount;

    const [selectedType, setSelectedType] = useState(
        jsonFileUploadScreen ? 'json' : 'seed'
    );
    const [seedPhrase, setSeedPhrase] = useState('');
    const [invalidSeedMessage, setInvalidSeedMessage] = useState('');
    const [password, setPassword] = useState('');
    const [invalidJSONFileError, setInvalidJSONFileError] = useState(false);

    const [fileName, setFileName] = useState<File | { name: string }>({
        name: 'file',
    });
    const [isFilePicked, setIsFilePicked] = useState(false);

    const [json, setJson] = useState<any>();

    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setSelectedType(jsonFileUploadScreen ? 'json' : 'seed');
    }, []);

    const passwordChangeHandler = (value: string): void => {
        setPasswordError(false);
        setPassword(value);
    };

    const showSuccessModalAndNavigateToDashboard = (): void => {
        dispatch(setIsResponseModalOpen(true));
        dispatch(setResponseImage(ImportIcon));
        dispatch(setMainTextForSuccessModal('Successfully Imported!'));
        dispatch(setSubTextForSuccessModal(''));
        dispatch(setJsonFileUploadScreen(false));
        setSelectedType('seed');
        dispatch(setLoggedIn(true));
        navigate(DASHBOARD);

        setTimeout(() => {
            dispatch(setIsResponseModalOpen(false));
        }, 2500);
    };

    const importAccountFromJson = async (): Promise<void> => {
        try {
            const res = await createAccountFromJSON(json, password);
            if (res) {
                dispatch(setJsonFileUploadScreen(false));
                showSuccessModalAndNavigateToDashboard();
            } else {
                setPasswordError(true);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const importAccountFromSeed = async (): Promise<void> => {
        const { minimumWords, maxWords, seedDoesnotExist } =
            invalidSeedMessages;
        try {
            if (seedPhrase.split(' ').length > 12) {
                setInvalidSeedMessage(maxWords);
                return;
            }

            if (seedPhrase.split(' ').length < 12) {
                setInvalidSeedMessage(minimumWords);
                return;
            }

            const res = await validatingSeedPhrase(seedPhrase);

            if (res) {
                navigate(CREATE_WALLET, {
                    state: { prevRoute: location, newPhrase: seedPhrase },
                });
            } else {
                setInvalidSeedMessage(seedDoesnotExist);
                return;
            }
        } catch (err) {
            setInvalidSeedMessage(seedDoesnotExist);
        }
    };

    const importButtonHandler = (): void => {
        dispatch(setJsonFileUploadScreen(false));
        setSelectedType('seed');
    };

    const uploadButtonHandler = (): void => {
        if (!jsonFileUploadScreen) {
            dispatch(setJsonFileUploadScreen(true));
            setSelectedType('json');
            const url = `${chrome.extension.getURL(
                'index.html'
            )}#${IMPORT_WALLET}`;
            openOptions(url);
        } else {
            setSelectedType('json');
        }
    };

    const handleChange = (input: string): void => {
        setInvalidSeedMessage('');
        const reg = /^[^\n]{0,65}(?:\n?[^\n]{0,65}){0,1}$/;
        if (reg.test(input)) {
            setSeedPhrase(input);
        } else {
            setIsLoading(true);
            if (selectedType === 'json') {
                importAccountFromJson();
            } else {
                importAccountFromSeed();
            }
            setIsLoading(false);
        }
    };

    const mainHeading = {
        marginTop: '34px',
        marginBottom: '12px',
        className: mainHeadingfontFamilyClass,
    };

    const subHeading = {
        marginTop: '12px',
        className: subHeadingfontFamilyClass,
        opacity: '80%',
        weight: '400',
    };

    const selectTypeHeading = {
        marginTop: '16px',
        marginBottom: '8px',
        className: mainHeadingfontFamilyClass,
        fontWeight: 'bold',
        lineHeight: '21px',
        fontSize: '16px',
    };

    const btn = {
        id: 'import',
        text: 'Import',
        style: {
            width: '100%',
            height: 50,
            borderRadius: 40,
            marginTop: '20px',
        },
        handleClick: () => {
            setIsLoading(true);
            if (selectedType === 'json') {
                importAccountFromJson();
            } else {
                importAccountFromSeed();
            }
            setIsLoading(false);
        },
        disabled: seedPhrase.length === 0 && password.length === 0,
        isLoading,
    };

    const onSubmit = (): void => {
        if (!btn.disabled) {
            setIsLoading(true);
            if (selectedType === 'json') {
                importAccountFromJson();
            } else {
                importAccountFromSeed();
            }
            setIsLoading(false);
        }
    };

    const UploadJsonProps = {
        fileName,
        isFilePicked,
        json,
        password,
        showPassword,
        passwordError,
        setFileName,
        setIsFilePicked,
        setJson,
        passwordChangeHandler,
        setShowPassword,
        setPasswordError,
        invalidJSONFileError,
        setInvalidJSONFileError,
        setSeedPhrase,
        setInvalidSeedMessage,
        onSubmit,
    };

    return (
        <Wrapper>
            <Header
                centerText={IMPORT_WALLET_HEADER}
                overWriteBackHandler={() => {
                    dispatch(setJsonFileUploadScreen(false));
                    navigate(DASHBOARD);
                }}
            />
            <div>
                <MainHeading {...mainHeading}>
                    {`${RESTORE_WALLET} `}
                </MainHeading>
                <SubHeading {...subHeading} textLightColor>
                    {RESTORE_WALLET_DESCRIPTION}
                </SubHeading>
            </div>
            <UnAuthScreensContentWrapper flexDirection="column" mb="22px">
                <MainHeading {...selectTypeHeading}>Select Type : </MainHeading>
                <Options
                    importButtonHandler={importButtonHandler}
                    uploadButtonHandler={uploadButtonHandler}
                    selectedType={selectedType}
                />
                {selectedType === 'seed' && (
                    <EnterSeed
                        handleChange={handleChange}
                        seedPhrase={seedPhrase}
                        invalidSeedMessage={invalidSeedMessage}
                        setPassword={setPassword}
                        onSubmit={onSubmit}
                    />
                )}

                {selectedType === 'json' && (
                    <div
                        style={{
                            marginTop: '16px',
                        }}
                    >
                        <UploadJson {...UploadJsonProps} />
                    </div>
                )}
                <input type="submit" style={{ display: 'none' }} />
                {/* </form> */}
            </UnAuthScreensContentWrapper>

            <Button {...btn} />
        </Wrapper>
    );
}

export default ImportWallet;
