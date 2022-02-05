import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    setAccountName,
    setJsonFileUploadScreen,
    setLoggedIn,
    setPublicKey,
} from '../../redux/slices/activeAccount';
import {
    // setAuthScreenModal,
    setIsResponseModalOpen,
    setLoadingForApi,
    setMainTextForSuccessModal,
    setResponseImage,
    setSubTextForSuccessModal,
} from '../../redux/slices/modalHandling';
import { addAccount } from '../../redux/slices/accounts';

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

// import AuthScreen from '../../components/modals/authorization';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;
const { validatingSeedPhrase } = accounts;

const invalidSeedMessages = {
    minimumWords: 'At least 12 words required!',
    maxWords: 'Only 12 words required!',
    seedDoesnotExist: 'Seed does not exists!',
};

function ImportWallet(): JSX.Element {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const currentUser = useSelector((state: RootState) => state);
    const { jsonFileUploadScreen } = currentUser.activeAccount;

    const [selectedType, setSelectedType] = useState(
        jsonFileUploadScreen ? 'json' : 'seed'
    );
    const [seedPhrase, setSeedPhrase] = useState('');
    const [invalidSeedMessage, setInvalidSeedMessage] = useState('');
    const [password, setPassword] = useState('');
    // const [derivedAccountSeed, setDerivedAccountSeed] = useState('');

    // const derivedAccountSeedHandler = (data) => {
    //     setDerivedAccountSeed(data);
    // };

    // const authModal = {
    //     open: currentUser.modalHandling.authScreenModal,
    //     handleClose: () => {
    //         dispatch(setAuthScreenModal(false));
    //     },
    //     derivedAccountSeedHandler,
    //     style: {
    //         width: '290px',
    //         background: '#141414',
    //         position: 'relative',
    //         bottom: 30,
    //         p: 2,
    //         px: 2,
    //         pb: 3,
    //         marginTop: '10rem',
    //     },
    // };

    const [fileName, setFileName] = useState<File | { name: string }>({
        name: 'file',
    });
    const [isFilePicked, setIsFilePicked] = useState(false);

    const [pair, setPair] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    function setLoading(value: boolean): void {
        console.log('setter ran with value', value);
        setIsLoading(value);
        console.log('setter end', value);
    }

    const UploadJsonProps = {
        fileName,
        isFilePicked,
        pair,
        password,
        showPassword,
        passwordError,
        setFileName,
        setIsFilePicked,
        setPair,
        setPassword,
        setShowPassword,
        setPasswordError,
    };

    // const keyringFunc = async () =>
    //     new Promise((resolve, reject) => {
    //         try {
    //             const acc = keyring.addPair(pair, password);
    //             resolve(acc);
    //             return acc;
    //         } catch (err) {
    //             reject(err);
    //             return err;
    //         }
    //     });

    // const createAccount = async (jsonKeyring) => {
    //     const res = await keyring.createFromJson(jsonKeyring);
    //     return res;
    // };

    // const saveAccountInRedux = (add, name, pass) => {
    //     dispatch(setLoggedIn(true));
    //     dispatch(setPublicKey(add));
    //     dispatch(setAccountName(name));

    //     dispatch(
    //         addAccount({
    //             accountName: name,
    //             publicKey: add,
    //         })
    //     );
    // };

    // const showSuccessModalAndNavigateToDashboard = () => {
    //     dispatch(setIsResponseModalOpen(true));
    //     dispatch(setResponseImage(ImportIcon));
    //     dispatch(setMainTextForSuccessModal('Successfully Imported!'));
    //     dispatch(setSubTextForSuccessModal(''));
    //     dispatch(setJsonFileUploadScreen(true));
    //     navigate('/');

    //     setTimeout(() => {
    //         dispatch(setIsResponseModalOpen(false));
    //     }, 2500);

    //     // navigate to dashboard on success
    // };

    // const proceedToImportAccount = () => {
    //     keyringFunc()
    //         .then(async (val) => {
    //             console.log('now my loading setting to false', val);
    //             setLoading(false);
    //             setPasswordError(false);
    //             console.log('SUCESS');

    //             // const res = await createAccount(pair);
    //             // console.log('res-------------', res);
    //             await saveAccountInRedux(
    //                 val.json.address,
    //                 val.json.meta.name,
    //                 password
    //             );
    //             dispatch(setLoadingForApi(false));
    //             await showSuccessModalAndNavigateToDashboard();
    //         })
    //         .catch((err) => {
    //             console.log('now my loading setting to false', err);
    //             setLoading(false);
    //             setPasswordError(true);
    //             console.log('FAIL');
    //         });
    // };

    const handleChange = (input: string): void => {
        setInvalidSeedMessage('');
        setSeedPhrase(input);
    };

    // const passwordChangeHandler = (e) => {
    //     setPassword(e.target.value);
    // };

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
                    state: { seedToPass: seedPhrase },
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
            if (selectedType === 'json') {
                setLoading(true);
                // Import account with message passing
                // proceedToImportAccount();
            } else {
                importAccountFromSeed();
            }
        },
        disabled: seedPhrase.length === 0 && password.length === 0,
        isLoading,
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

            {/* <AuthScreen {...authModal} /> */}
        </Wrapper>
    );
}

export default ImportWallet;
