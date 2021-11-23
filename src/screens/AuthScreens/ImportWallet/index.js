/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-throw-literal */
/* eslint import/no-cycle: [2, { maxDepth: 1 }] */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Input } from '@material-ui/core';
import {
  Option, OptionDiv, UploadFile, FileChosen, UploadFileDiv,
} from './StyledComponents';
import {
  AuthWrapper,
  Header,
  Button,
  MainHeading,
  SubHeading,
  SubMainWrapperForAuthScreens,
} from '../../../components';
import CustomUploadFile from './CustomUploadFile';
import { fonts, colors } from '../../../utils';
import { setSeed } from '../../../redux/slices/account';
import { WarningText } from '../CreateWallet/StyledComponents';
import { encrypt, KeyringInitialization, validatingSeedPhrase } from '../../../utils/accounts';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;
const { primaryTextColor, darkBgColor } = colors;

const invalidSeedMessages = {
  minimumWords: 'At least 12 words required!',
  maxWords: 'Only 12 words required!',
  seedDoesnotExist: 'Seed does not exists!',
};

function ImportWallet() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [selectedType, setSelectedType] = useState('seed');
  const [seedPhrase, setSeedPhrase] = useState('');
  const [invalidSeedMessage, setInvalidSeedMessage] = useState('');

  const handleChange = (input) => {
    setInvalidSeedMessage('');
    setSeedPhrase(input);
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
      await KeyringInitialization();
      const res = validatingSeedPhrase(seedPhrase);
      res
        .then((r) => {
          console.log('r value', r);
          if (r) {
            console.log('r in if ');
            const tmpPassword = '123';
            const encryptedSeed = encrypt(seedPhrase, tmpPassword);

            dispatch(setSeed(encryptedSeed));
            history.push('/createWallet');
          } else if (!isErrorOccur) {
            console.log('r in else if ');
            setInvalidSeedMessage(seedDoesnotExist);
          }
        }).catch((e) => console.log('err', e));

      return true;
    } catch (err) {
      console.log('error in import wallet', err);
      const res = validatingSeedPhrase(seedPhrase);
      res
        .then((r) => {
          console.log('r value', r);
          if (r) {
            console.log('r in if ');
            const tmpPassword = '123';
            const encryptedSeed = encrypt(seedPhrase, tmpPassword);

            dispatch(setSeed(encryptedSeed));
            history.push('/createWallet');
          } else if (!isErrorOccur) {
            console.log('r in else if ');
            setInvalidSeedMessage(seedDoesnotExist);
          }
        }).catch((e) => console.log('err', e));

      return err;
    }
  };

  const downloadSeed = () => {
    const seed = 'seed phrase';
    const data = new Blob([seed], { type: 'text/plain' });
    const csvURL = window.URL.createObjectURL(data);
    const tempLink = document.createElement('a');
    tempLink.href = csvURL;
    tempLink.setAttribute('download', 'seed.txt');
    tempLink.click();
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
    onClick: () => setSelectedType('seed'),
    selected: selectedType === 'seed',
    className: mainHeadingfontFamilyClass,
  };

  const option2 = {
    onClick: () => setSelectedType('json'),
    className: mainHeadingfontFamilyClass,
    selected: selectedType === 'json',
  };

  const input = {
    style: {
      padding: '13px 15px',
      background: darkBgColor,
      color: primaryTextColor,
      width: '100%',
      borderRadius: '8px',
      fontSize: '0.8rem',
      lineHeight: '1.7em',
      border: '0.5px solid rgba(250, 250, 250, 0.5)',
    },
    className: subHeadingfontFamilyClass,
    onChange: (e) => handleChange(e.target.value.replace(/[^A-Z\s]/ig, '')),
    value: seedPhrase,
    rows: 5,
    placeholder: 'Place your seed here',
  };

  const warningText = {
    className: subHeadingfontFamilyClass,
    visibility: invalidSeedMessage ? 'visible' : 'hidden',
  };

  const btn = {
    text: 'Import',
    width: '300px',
    handleClick: validateSeed,
    disabled: seedPhrase.length === 0,
  };

  // Create a reference to the hidden file input element
  const hiddenFileInput = React.useRef(null);
  const [fileName, setFileName] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const showFile = async (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = (e.target.result);
      console.log(text);
    };
    reader.readAsText(e.target.files[0]);
    setFileName(e.target.files[0]);
    setIsFilePicked(true);
  };

  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  return (
    <AuthWrapper>
      <Header centerText="Import Wallet" backHandler={() => console.log('goBack')} />
      <div>
        <MainHeading {...mainHeading}>Restore your wallet : </MainHeading>
        <SubHeading textLightColor {...subHeading}>
          To restore your wallet enter your Seed phrase or upload a Json file.
        </SubHeading>
      </div>
      <SubMainWrapperForAuthScreens flexDirection="column" mt="40px">
        <MainHeading {...selectTypeHeading}>Select Type : </MainHeading>
        <OptionDiv>
          <Option {...option1}>
            Seed Phrase
          </Option>
          {/* <div className="normalTooltip"> */}
          <Option {...option2}>
            Upload File
            {/* <span className="normalTooltiptext">Coming Soon</span> */}
          </Option>
          {/* </div> */}
        </OptionDiv>
        {selectedType === 'seed' && (
          <div style={{ marginTop: '1rem' }}>
            <Input
              {...input}
              autoFocus
              multiline
              disableUnderline
            />
            <WarningText {...warningText}>{invalidSeedMessage}</WarningText>
          </div>
        )}
        {selectedType === 'json' && (
        <>
          <CustomUploadFile />
          <button
            onClick={downloadSeed}
            style={{
              float: 'left',
              marginTop: '1rem',
            }}
          >
            Download Functionality

          </button>
        </>
        )}
      </SubMainWrapperForAuthScreens>
      {selectedType === 'seed' && (
        <div style={{ marginLeft: '0' }} className="btn-wrapper">
          <Button {...btn} />
        </div>
      )}
    </AuthWrapper>
  );
}

export default ImportWallet;
