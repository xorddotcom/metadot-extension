/* eslint-disable no-unused-vars */
/* eslint-disable no-throw-literal */
/* eslint import/no-cycle: [2, { maxDepth: 1 }] */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Input } from '@material-ui/core';
import { Option, OptionDiv } from './StyledComponents';
import {
  AuthWrapper,
  Header,
  Button,
  MainHeading,
  SubHeading,
  SubMainWrapperForAuthScreens,
} from '../../../components';
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
    // onClick: () => setSelectedType('json'),
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
    onChange: (e) => handleChange(e.target.value),
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
        {/* <OptionDiv>
          <Option {...option1}>
            Seed Phrase
          </Option>
          <div className="normalTooltip">
            <Option {...option2}>
              Json File
              <span className="normalTooltiptext">Coming Soon</span>
            </Option>
          </div>
        </OptionDiv> */}
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
        <MainHeading className={mainHeadingfontFamilyClass}>Coming Soon!</MainHeading>
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
