/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-alert */
/* eslint-disable no-shadow */
import React, { useState } from 'react';
import { keyring } from '@polkadot/ui-keyring';
import CancelIcon from '@mui/icons-material/Cancel';
import { fonts } from '../../../utils';
import accounts from '../../../utils/accounts';
// eslint-disable-next-line no-unused-vars
import { FileChosen, UploadFile, UploadFileDiv } from './styledComponents';
import UploadFileIcon from '../../../assets/images/icons/uploadFile.svg';
import {
  StyledInput, HorizontalContentDiv, SubHeading, WarningText,
} from '../../../components';

const { subHeadingfontFamilyClass, mainHeadingfontFamilyClass } = fonts;
const { KeyringInitialization } = accounts;

const CustomUploadFile = (props) => {
  const {
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
  } = props;

  // Create a reference to the hidden file input element
  const hiddenFileInput = React.useRef(null);
  const [fileError, setFileError] = useState(false);

  const validateJson = (jsonContent) => {
    try {
      try {
        keyring.createFromJson(jsonContent);
        return true;
      } catch (e) {
        KeyringInitialization();
        keyring.createFromJson(jsonContent);
        return true;
      }
    } catch (err) {
      return false;
    }
  };

  const showFile = async (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    console.log('mark1', e.target.files[0].name.length);

    reader.onabort = () => {
      console.log('aborting file upload');
    };

    reader.onload = async (e) => {
      const fileContent = (e.target.result);

      const parsedFileContent = JSON.parse(fileContent);

      if (parsedFileContent.address) {
        const isJsonValidate = validateJson(parsedFileContent);
        if (isJsonValidate) {
          keyring.createFromJson(parsedFileContent);
          try {
            const pairData = keyring.createFromJson(parsedFileContent);
            console.log(pairData, 'ghalat json file');
            setPair(pairData);
          } catch (e) {
            console.log('mark5');
            await KeyringInitialization();
            const pairData = keyring.createFromJson(parsedFileContent);
            console.log(' real val', pairData);
            setPair(pairData);
            console.log('pair in catch---------', e);
          }
        } else { setFileError(true); }
      } else {
        setFileError(true);
      }
    };

    reader.readAsText(file);

    setFileName(e.target.files[0]);
    setIsFilePicked(true);
  };

  const handleClick = (operation) => {
    if (operation === 'select') {
      if (isFilePicked) {
        console.log('already selected!');
      } else {
        hiddenFileInput.current.click();
        console.log('select');
      }
    } else if (operation === 'cancel') {
      console.log('cancel');
      console.log('file value', document.getElementsByTagName('input')[0].value);
      document.getElementsByTagName('input')[0].value = '';
      setFileName('');
      setIsFilePicked(false);
      setPassword('');
      setShowPassword(false);
      setPasswordError(false);
      setPair('');
      setFileError(false);
    }
  };

  const styledInputPassword = {
    placeholder: 'Password',
    className: subHeadingfontFamilyClass,
    value: password,
    height: '14px',
    onChange: (t) => {
      setPasswordError(false);
      // eslint-disable-next-line no-unused-expressions
      setPassword(t);
    },
    hideHandler: () => setShowPassword(!showPassword),
    hideState: showPassword,
    disabled: !pair,
  };

  console.log('pass ------', { password });

  return (
    <UploadFileDiv className={subHeadingfontFamilyClass}>
      <form onSubmit={(e) => e.preventDefault()}>
        {/*  our custom upload button --> */}
        <UploadFile htmlFor="actual-btn" onClick={() => handleClick('select')}>

          <HorizontalContentDiv width="91%">

            <img src={UploadFileIcon} alt="upload-file-icon" style={{ marginRight: '1rem' }} />
            <div>{!isFilePicked ? 'Choose File' : fileName.name.length > 20 ? `${fileName.name.slice(0, 8)}...${fileName.name.slice(fileName.name.length - 8, fileName.name.length)}` : fileName.name}</div>

          </HorizontalContentDiv>
          {
            isFilePicked
          && (
          <div onClick={() => handleClick('cancel')}>
            <CancelIcon fontSize="small" style={{ marginTop: '0.2rem', marginRight: '-0.3rem' }} />
          </div>
          )

          }
        </UploadFile>
        {/* {
          isFilePicked &&
          <p></p>
        } */}
        {fileError && (
        <WarningText
          id="warning-text-3"
          mb="10px"
          className={subHeadingfontFamilyClass}
        >
          Invalid JSON File!
        </WarningText>
        )}
        <SubHeading
          className={mainHeadingfontFamilyClass}
          marginTop="40px"
          mb="10px"
        >
          Password
        </SubHeading>
        <StyledInput
          inputWrapperWidth="87%"
          id="password"
          fullWidth="68%"
          {...styledInputPassword}
          typePassword
          isCorrect
          rightIcon
        />
        {passwordError && (
        <WarningText
          id="warning-text-3"
          mb="10px"
          className={subHeadingfontFamilyClass}
        >
          Invalid Password!
        </WarningText>
        )}

        {/* <button type="button" onClick={() => proceed()}>Proceed</button> */}

        <input
          id="upload-file"
          type="file"
          accept=".json"
          ref={hiddenFileInput}
          onChange={showFile}
          style={{ display: 'none' }}
        />
      </form>
    </UploadFileDiv>
  );
};

export default CustomUploadFile;
