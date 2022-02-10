import React, { useState } from 'react';
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

import { fonts } from '../../utils';
import accounts from '../../utils/accounts';
import ImportIcon from '../../assets/images/modalIcons/import.svg';

import { RootState } from '../../redux/store';

import { Wrapper, UnAuthScreensContentWrapper } from '../common/wrapper';

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

    const currentUser = useSelector((state: RootState) => state);
    const { jsonFileUploadScreen } = currentUser.activeAccount;

    const [selectedType, setSelectedType] = useState(
        jsonFileUploadScreen ? 'json' : 'seed'
    );
    const [seedPhrase, setSeedPhrase] = useState('');
    const [invalidSeedMessage, setInvalidSeedMessage] = useState('');
    const [password, setPassword] = useState('123456');

    const [fileName, setFileName] = useState<File | { name: string }>({
        name: 'file',
    });
    const [isFilePicked, setIsFilePicked] = useState(false);

    const [json, setJson] = useState<any>('');

    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const passwordChangeHandler = (value: string): void => {
        setPassword(value);
    };

    const showSuccessModalAndNavigateToDashboard = (): void => {
        dispatch(setIsResponseModalOpen(true));
        dispatch(setResponseImage(ImportIcon));
        dispatch(setMainTextForSuccessModal('Successfully Imported!'));
        dispatch(setSubTextForSuccessModal(''));
        dispatch(setJsonFileUploadScreen(true));
        navigate('/');

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
            const res = await createAccountFromJSON(json, password);
            console.log('Create account from json ==>>', res);
            if (res) {
                showSuccessModalAndNavigateToDashboard();
            }
        } catch (err) {
            console.log(err);
        }
    };

    const importAccountFromSeed = async (): Promise<void> => {
        try {
            const { minimumWords, maxWords, seedDoesnotExist } =
                invalidSeedMessages;

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
                navigate('/createWallet', {
                    state: { prevRoute: location, seedToPass: seedPhrase },
                });
            } else {
                setInvalidSeedMessage(seedDoesnotExist);
                return;
            }
        } catch (err) {
            console.log('errr', err);
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
            console.log('already opened!');
            chrome.tabs.update(tabd.id, { active: true });
        } else {
            console.log('not opened!');
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
            const url = `${chrome.extension.getURL('index.html')}`;
            openOptions(url);
        } else {
            setSelectedType('json');
        }
    };

    const mainHeading = {
        marginTop: '29px',
        className: mainHeadingfontFamilyClass,
    };

    const subHeading = {
        marginTop: '12px',
        className: subHeadingfontFamilyClass,
    };

    const selectTypeHeading = {
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
    };

    return (
        <Wrapper>
            <Header
                centerText="Import Wallet"
                backHandler={() => {
                    dispatch(setJsonFileUploadScreen(false));
                }}
            />
            <div>
                <MainHeading {...mainHeading}>
                    Restore your wallet :{' '}
                </MainHeading>
                <SubHeading {...subHeading}>
                    To restore your wallet enter your Seed phrase.
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
