import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setJsonFileUploadScreen } from '../../redux/slices/activeAccount';
import {
    setIsResponseModalOpen,
    setMainTextForSuccessModal,
    setResponseImage,
    setSubTextForSuccessModal,
} from '../../redux/slices/modalHandling';

import { Header, Button } from '../common';
import { MainHeading, SubHeading } from '../common/text';

import Options from './options';
import EnterSeed from './enter-seed';
import UploadJson from './upload-json';

import { fonts, images } from '../../utils';
import accounts from '../../utils/accounts';
import services from '../../utils/services';
import { EnterSeedInterface } from './type';

import { RootState } from '../../redux/store';

import { Wrapper, UnAuthScreensContentWrapper } from '../common/wrapper';
import { CREATE_WALLET, DASHBOARD, IMPORT_WALLET } from '../../constants';
import {
    IMPORT_WALLET_HEADER,
    RESTORE_WALLET,
    RESTORE_WALLET_DESCRIPTION,
} from '../../utils/app-content';

const { ImportIcon } = images;
const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;
const { validatingSeedPhrase, createAccountFromJSON } = accounts;
const { addressMapper } = services;

const invalidSeedMessages = {
    minimumWords: 'At least 12 words required!',
    maxWords: 'Only 12 words required!',
    seedDoesnotExist: 'Seed does not exists!',
};

function ImportWallet(): JSX.Element {
    const location = useLocation().pathname;
    const navigate = useNavigate();
    const dispatch = useDispatch();

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

    const [json, setJson] = useState<any>('');

    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setSelectedType(jsonFileUploadScreen ? 'json' : 'seed');
    }, []);

    const passwordChangeHandler = (value: string): void => {
        setPassword(value);
    };

    const showSuccessModalAndNavigateToDashboard = (): void => {
        dispatch(setIsResponseModalOpen(true));
        dispatch(setResponseImage(ImportIcon));
        dispatch(setMainTextForSuccessModal('Successfully Imported!'));
        dispatch(setSubTextForSuccessModal(''));
        dispatch(setJsonFileUploadScreen(false));
        setSelectedType('seed');
        navigate(DASHBOARD);

        setTimeout(() => {
            dispatch(setIsResponseModalOpen(false));
        }, 2500);
    };

    const handleChange = (input: string): void => {
        setInvalidSeedMessage('');
        setSeedPhrase(input);
    };

    const importAccountFromJson = async (): Promise<void> => {
        try {
            console.log('In import account from JSON');
            const res = await createAccountFromJSON(json, password);
            console.log('Res [][]', res);
            if (res) {
                showSuccessModalAndNavigateToDashboard();
            } else {
                console.log('aksk', res);
                setPasswordError(true);
            }
        } catch (err) {
            console.log('In import account from JSON error ===>>>>');
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
                    state: { prevRoute: location, seedToPass: seedPhrase },
                });
            } else {
                setInvalidSeedMessage(seedDoesnotExist);
                return;
            }
        } catch (err) {
            setInvalidSeedMessage(seedDoesnotExist);
        }
    };

    function getOwnTabs(): any {
        return Promise.all(
            chrome.extension.getViews({ type: 'tab' }).map(
                (view) =>
                    new Promise((resolve) =>
                        // eslint-disable-next-line no-promise-executor-return
                        view.chrome.tabs.getCurrent((tab) =>
                            resolve(
                                Object.assign(tab, {
                                    url: view.location.href,
                                })
                            )
                        )
                    )
            )
        );
    }

    async function openOptions(url: string): Promise<void> {
        const ownTabs = await getOwnTabs();
        const tabd = ownTabs.find((tab: any) => tab.url.includes(url));
        if (tabd) {
            chrome.tabs.update(tabd.id, { active: true });
        } else {
            chrome.tabs.create({ url });
        }
    }

    const importButtonHandler = (): void => {
        dispatch(setJsonFileUploadScreen(false));
        setSelectedType('seed');
    };

    const uploadButtonHandler = (): void => {
        if (!jsonFileUploadScreen) {
            dispatch(setJsonFileUploadScreen(true));
            setSelectedType('json');
            const url = `${chrome.extension.getURL('index.html')}`;
            openOptions(url);
        } else {
            setSelectedType('json');
        }
        navigate(IMPORT_WALLET);
    };

    const mainHeading = {
        marginTop: '34px',
        marginBottom: '12px',
        className: mainHeadingfontFamilyClass,
    };

    const subHeading = {
        marginTop: '12px',
        className: subHeadingfontFamilyClass,
    };

    const selectTypeHeading = {
        marginTop: '16px',
        marginBottom: '8px',
        className: mainHeadingfontFamilyClass,
        fontWeight: 'bold',
        lineHeight: '21px',
        fontSize: '18px',
    };

    const btn = {
        id: 'import',
        text: 'Import',
        width: '300px',
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
    };

    return (
        <Wrapper>
            <Header
                centerText={IMPORT_WALLET_HEADER}
                backHandler={() => {
                    dispatch(setJsonFileUploadScreen(false));
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
            <UnAuthScreensContentWrapper flexDirection="column">
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
                    />
                )}

                {selectedType === 'json' && (
                    <div style={{ marginTop: '1rem' }}>
                        <UploadJson {...UploadJsonProps} />
                    </div>
                )}
            </UnAuthScreensContentWrapper>

            <div style={{ marginLeft: '0' }} className="btn-wrapper">
                <Button {...btn} />
            </div>
        </Wrapper>
    );
}

export default ImportWallet;
