/* eslint-disable max-len */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-throw-literal */
/* eslint import/no-cycle: [2, { maxDepth: 1 }] */
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { keyring } from '@polkadot/ui-keyring';
import { Input } from '@material-ui/core';
import {
  setAccountName,
  setJsonFileUploadScreen,
  setLoggedIn,
  setPublicKey,
} from '../../../redux/slices/activeAccount';
import {
  setAuthScreenModal,
  setIsResponseModalOpen,
  setLoadingForApi,
  setMainTextForSuccessModal,
  setResponseImage,
  setSubTextForSuccessModal,
} from '../../../redux/slices/modalHandling';
import { addAccount } from '../../../redux/slices/accounts';

import {
  Option,
  OptionDiv,
  UploadFile,
  FileChosen,
  UploadFileDiv,
} from './styledComponents';
import {
  AuthWrapper,
  Header,
  Button,
  MainHeading,
  SubHeading,
  SubMainWrapperForAuthScreens,
  WarningText,
} from '../../../components';
import CustomUploadFile from './customUploadFile';
import { fonts, colors } from '../../../utils';
import accounts from '../../../utils/accounts';
import ImportIcon from '../../../assets/images/modalIcons/import.svg';
import AuthScreen from '../../../components/modals/authorization';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;
const { primaryText, darkBackground1 } = colors;
const {
  decrypt,
  encrypt,
  KeyringInitialization,
  validatingSeedPhrase,
  AccountCreation,
} = accounts;

const invalidSeedMessages = {
  minimumWords: 'At least 12 words required!',
  maxWords: 'Only 12 words required!',
  seedDoesnotExist: 'Seed does not exists!',
};

function ImportWallet() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { jsonFileUploadScreen } = useSelector((state) => state.activeAccount);
  const params = useParams();

  const accounts = useSelector((state) => state.accounts);
  const currentUser = useSelector((state) => state);

  // eslint-disable-next-line no-console
  console.log('ahsanahmed ==>>', params);

  const [selectedType, setSelectedType] = useState(
    jsonFileUploadScreen ? 'json' : 'seed',
  );
  const [seedPhrase, setSeedPhrase] = useState('');
  const [invalidSeedMessage, setInvalidSeedMessage] = useState('');
  const [password, setPassword] = useState('');
  const [derivedAccountSeed, setDerivedAccountSeed] = useState('');

  useEffect(() => {
    console.log('select type and ', { seedPhrase, jsonFileUploadScreen });
    setSelectedType(jsonFileUploadScreen ? 'json' : 'seed');
  }, []);

  const derivedAccountSeedHandler = (data) => {
    setDerivedAccountSeed(data);
  };

  const authModal = {
    open: currentUser.modalHandling.authScreenModal,
    handleClose: () => {
      dispatch(setAuthScreenModal(false));
    },
    derivedAccountSeedHandler,
    style: {
      width: '290px',
      background: '#141414',
      position: 'relative',
      bottom: 30,
      p: 2,
      px: 2,
      pb: 3,
      marginTop: '10rem',
    },
  };

  // useEffect(() => {
  //   const accountExistCheck = async () => {
  //     if (params.seed) {
  //       console.log('params seed', params);
  //       try {
  //         // const dSeed = decrypt(params.seed, password);
  //         let derivedSeed = '';
  //         let derivedAccount = '';
  //         let i = 0;
  //         do {
  //           derivedSeed = `${derivedAccountSeed}//${i}`;
  //           console.log('derived account before');
  //           // eslint-disable-next-line no-await-in-loop
  //           derivedAccount = await
  // AccountCreation({ name: 'AAA', password: 'BBB', seed: derivedSeed });
  //           console.log('derived Account ==>>', derivedAccount);
  //           i += 1;
  //         } while (accounts[derivedAccount.address]);

  //         console.log('derived account after');
  //         setSeedPhrase(derivedSeed);
  //       } catch (err) {
  //         console.log('Drived*******************', err);
  //       }
  //     }
  //   };

  //   accountExistCheck();
  // }, [accounts, params]);

  const [fileName, setFileName] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const [pair, setPair] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  function setLoading(value) {
    console.log('setter ran with value', value);
    setIsLoading(value);
    console.log('setter end', value);
  }

  const customUploadFileProps = {
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

  const keyringFunc = async () => new Promise((resolve, reject) => {
    try {
      const acc = keyring.addPair(pair, password);
      resolve(acc);
      return acc;
    } catch (err) {
      reject(err);
      return err;
    }
  });

  const createAccount = async (jsonKeyring) => {
    const res = await keyring.createFromJson(jsonKeyring);
    return res;
  };

  const saveAccountInRedux = (add, name, pass) => {
    console.log('params-------', add, name, pass);
    // update redux data and tracking flags accordingly
    dispatch(setLoggedIn(true));
    dispatch(setPublicKey(add));
    dispatch(setAccountName(name));
    // dispatch(setWalletPassword(hashedPassword));

    dispatch(
      addAccount({
        accountName: name,
        publicKey: add,
      }),
    );

    // const encryptedSeedWithAccountPassword = encrypt(currSeed, pass);
    // dispatch(setSeed(encryptedSeedWithAccountPassword));
  };

  const showSuccessModalAndNavigateToDashboard = () => {
    dispatch(setIsResponseModalOpen(true));
    dispatch(setResponseImage(ImportIcon));
    dispatch(setMainTextForSuccessModal('Successfully Imported!'));
    dispatch(setSubTextForSuccessModal(''));
    dispatch(setJsonFileUploadScreen(false));
    history.push('/');

    setTimeout(() => {
      dispatch(setIsResponseModalOpen(false));
    }, 2500);

    // navigate to dashboard on success
  };

  const proceedToImportAccount = () => {
    keyringFunc()
      .then(async (val) => {
        console.log('now my loading setting to false', val);
        setLoading(false);
        setPasswordError(false);
        console.log('SUCESS');

        // const res = await createAccount(pair);
        // console.log('res-------------', res);
        await saveAccountInRedux(
          val.json.address,
          val.json.meta.name,
          password,
        );
        dispatch(setLoadingForApi(false));
        dispatch(setJsonFileUploadScreen(false));
        setSelectedType('seed');
        await showSuccessModalAndNavigateToDashboard();
      })
      .catch((err) => {
        console.log('now my loading setting to false', err);
        setLoading(false);
        setPasswordError(true);
        console.log('FAIL');
      });
  };

  const handleChange = (input) => {
    setInvalidSeedMessage('');
    setSeedPhrase(input);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const validateSeed = async () => {
    const { minimumWords, maxWords, seedDoesnotExist } = invalidSeedMessages;

    let isErrorOccur = '';

    try {
      if (seedPhrase.split(' ').length > 12) {
        isErrorOccur = maxWords;
        setInvalidSeedMessage(maxWords);
        return maxWords;
      }

      if (seedPhrase.split(' ').length < 12) {
        isErrorOccur = minimumWords;
        setInvalidSeedMessage(minimumWords);
        return minimumWords;
      }
      const res = validatingSeedPhrase(seedPhrase);
      res
        .then((r) => {
          console.log('r value', r);
          if (r) {
            console.log('r in if ');
            history.push({
              pathname: '/createWallet',
              state: { seedToPass: seedPhrase },
            });
          } else if (!isErrorOccur) {
            console.log('r in else if ');
            setInvalidSeedMessage(seedDoesnotExist);
          }
        })
        .catch((e) => console.log('err', e));

      return true;
    } catch (err) {
      console.log('error in import wallet', err);
      const res = validatingSeedPhrase(seedPhrase);
      res
        .then((r) => {
          console.log('r value', r);
          if (r) {
            console.log('r in if ');

            history.push({
              pathname: '/createWallet',
              state: { seedToPass: seedPhrase },
            });
          } else if (!isErrorOccur) {
            console.log('r in else if ');
            setInvalidSeedMessage(seedDoesnotExist);
          }
        })
        .catch((e) => console.log('err', e));

      return err;
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

  const option1 = {
    id: 'seed-phrase',
    onClick: () => {
      dispatch(setJsonFileUploadScreen(false));
      setSelectedType('seed');
    },
    selected: selectedType === 'seed',
    className: mainHeadingfontFamilyClass,
  };

  function getOwnTabs() {
    return Promise.all(
      chrome.extension
        .getViews({ type: 'tab' })
        .map(
          (view) => new Promise((resolve) => view.chrome.tabs.getCurrent((tab) => resolve(Object.assign(tab, { url: view.location.href })))),
        ),
    );
  }

  async function openOptions(url) {
    const ownTabs = await getOwnTabs();
    const tabd = ownTabs.find((tab) => tab.url.includes(url));
    if (tabd) {
      console.log('already opened!');
      chrome.tabs.update(tabd.id, { active: true });
    } else {
      console.log('not opened!');
      chrome.tabs.create({ url });
    }
  }

  const option2 = {
    id: 'upload-file',
    onClick: () => {
      if (!jsonFileUploadScreen) {
        dispatch(setJsonFileUploadScreen(true));
        const url = `${chrome.extension.getURL('index.html')}`;
        openOptions(url);
      } else {
        setSelectedType('json');
      }
    },
    className: mainHeadingfontFamilyClass,
    selected: selectedType === 'json',
  };

  const input = {
    id: 'seed-input',
    style: {
      padding: '13px 15px',
      background: darkBackground1,
      color: primaryText,
      width: '100%',
      borderRadius: '8px',
      fontSize: '0.8rem',
      lineHeight: '1.7em',
    },
    className: subHeadingfontFamilyClass,
    onChange: (e) => handleChange(e.target.value.replace(/[^A-Z\s]/gi, '')),
    value: seedPhrase,
    rows: 5,
    placeholder: 'Place your seed here',
  };

  const warningText = {
    id: 'warning-text',
    className: subHeadingfontFamilyClass,
    visibility: invalidSeedMessage ? 'visible' : 'hidden',
  };

  const btn = {
    id: 'import',
    text: 'Import',
    width: '300px',
    handleClick: () => {
      if (selectedType === 'json') {
        setLoading(true);
        proceedToImportAccount();
      } else {
        validateSeed();
      }
    },
    disabled: seedPhrase.length === 0 && password.length === 0,
    isLoading,
  };

  // Create a reference to the hidden file input element

  // Programatically click the hidden file input element
  // when the Button component is clicked

  console.log('main cond', { isLoading });
  return (
    <AuthWrapper>
      <Header
        centerText="Import Wallet"
        backHandler={() => {
          dispatch(setJsonFileUploadScreen(false));
          console.log('goBack');
        }}
      />
      <div>
        <MainHeading {...mainHeading}>Restore your wallet : </MainHeading>
        <SubHeading textLightColor {...subHeading}>
          Import your wallet with a seed phrase or json file. Set your wallet
          name and password to proceed. Metadot will not save your passwords and
          can not retrieve them for you.
        </SubHeading>
      </div>
      <SubMainWrapperForAuthScreens flexDirection="column" mt="40px">
        {/* following code block is important and will
         use it in upcoming versions of the extension */}

        <MainHeading {...selectTypeHeading}>Select Type : </MainHeading>
        <OptionDiv>
          <Option {...option1}>Seed Phrase</Option>
          <div className="normalTooltip">
            <Option {...option2}>Upload Json</Option>
          </div>
        </OptionDiv>

        {selectedType === 'seed' && (
          <div style={{ marginTop: '1rem' }}>
            <Input {...input} autoFocus multiline disableUnderline />
            <WarningText {...warningText}>{invalidSeedMessage}</WarningText>
          </div>
        )}

        {selectedType === 'json' && (
          <div style={{ marginTop: '1rem' }}>
            <CustomUploadFile {...customUploadFileProps} />
          </div>
        )}
      </SubMainWrapperForAuthScreens>

      <div style={{ marginLeft: '0' }} className="btn-wrapper">
        <Button {...btn} />
      </div>

      <AuthScreen {...authModal} />
    </AuthWrapper>
  );
}

export default ImportWallet;
