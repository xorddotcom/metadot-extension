/* eslint-disable no-throw-literal */
import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Input } from '@material-ui/core';

import keyring from '@polkadot/ui-keyring';
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

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;
const { primaryTextColor } = colors;

const invalidSeedMessages = {
  minimumWords: 'Atleast 12 words required!',
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
    console.log('Import wallet from seed working ', input);
    setInvalidSeedMessage('');
    setSeedPhrase(input);
  };

  const validateSeed = async () => {
    const { minimumWords, maxWords, seedDoesnotExist } = invalidSeedMessages;

    let isErrorOccur = '';

    try {
      if (seedPhrase.split(' ').length > 12) {
        console.log('object1');
        isErrorOccur = maxWords;
        setInvalidSeedMessage(maxWords);
        throw maxWords;
      }

      if (seedPhrase.split(' ').length < 12) {
        console.log('object2');
        isErrorOccur = minimumWords;
        setInvalidSeedMessage(minimumWords);
        throw minimumWords;
      }

      // verifiying if seed exist in blockchain or not
      keyring.loadAll({ ss58Format: 42, type: 'sr25519' });
      await keyring.addUri(seedPhrase);

      dispatch(setSeed(seedPhrase));
      history.push('/createWallet');

      return true;
    } catch (err) {
      try {
        await keyring.addUri(seedPhrase);

        dispatch(setSeed(seedPhrase));
        history.push('/createWallet');
      } catch (error) {
        console.log('Error>', error);
        if (!isErrorOccur) {
          setInvalidSeedMessage(seedDoesnotExist);
        }
      }

      console.log('Error', err);
      return err;
    }
  };

  return (
    <AuthWrapper>
      <Header centerText="Import Wallet" />
      <div>
        <MainHeading className={mainHeadingfontFamilyClass}>Restore your wallet </MainHeading>
        <SubHeading className={subHeadingfontFamilyClass}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat cursus sit diam Lorem
          ipsum dolor sit amet, consectetur adipiscing elit. Volutpat cursus sit diam
          {' '}
        </SubHeading>
      </div>
      <SubMainWrapperForAuthScreens flexDirection="column">
        <MainHeading className={mainHeadingfontFamilyClass}>Select Type : </MainHeading>
        <OptionDiv>
          <Option
            onClick={() => setSelectedType('seed')}
            selected={selectedType === 'seed'}
            className={mainHeadingfontFamilyClass}
          >
            Seed Phrase
          </Option>
          <Option
            onClick={() => setSelectedType('json')}
            className={mainHeadingfontFamilyClass}
            selected={selectedType === 'json'}
          >
            Json File
          </Option>
        </OptionDiv>
        {selectedType === 'seed' && (
          <div style={{ height: 227 }}>
            <MainHeading className={mainHeadingfontFamilyClass}>Place your seed here :</MainHeading>
            <Input
              className={subHeadingfontFamilyClass}
              onChange={(e) => handleChange(e.target.value)}
              value={seedPhrase}
              rows={7}
              multiline
              disableUnderline
              style={{
                background: '#212121',
                color: primaryTextColor,
                width: '100%',
                paddingtTop: 13,
                borderRadius: '8px',
              }}
            />
            <WarningText visibility={invalidSeedMessage ? 'visible' : 'hidden'}>{invalidSeedMessage}</WarningText>
          </div>
        )}
        {selectedType === 'json' && (
          <MainHeading className={mainHeadingfontFamilyClass}>Coming Soon!</MainHeading>
        )}
      </SubMainWrapperForAuthScreens>
      {selectedType === 'seed' && (
        <div className="btn-wrapper">
          <Button text="Import" handleClick={validateSeed} disabled={seedPhrase.length === 0} />
        </div>
      )}
    </AuthWrapper>
  );
}

export default ImportWallet;
