/* eslint-disable no-throw-literal */
/* eslint import/no-cycle: [2, { maxDepth: 1 }] */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';
import { Input } from '@material-ui/core';
import keyring from '@polkadot/ui-keyring';
import { Tooltip, tooltipClasses } from '@mui/material';
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
import { encrypt } from '../../../utils/accounts';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;
const { primaryTextColor } = colors;

const invalidSeedMessages = {
  minimumWords: 'At least 12 words required!',
  maxWords: 'Only 12 words required!',
  seedDoesnotExist: 'Seed does not exists!',
};

function ImportWallet() {
  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: theme.shadows[1],
      fontSize: 11,
      zIndex: -2,
    },
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.white,
    },
  }));

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

      // verifiying if seed exist in blockchain or not
      keyring.loadAll({ ss58Format: 42, type: 'sr25519' });
      await keyring.addUri(seedPhrase);

      const tmpPassword = '123';
      const encryptedSeed = encrypt(seedPhrase, tmpPassword);

      dispatch(setSeed(encryptedSeed));
      history.push('/createWallet');

      return true;
    } catch (err) {
      try {
        await keyring.addUri(seedPhrase);

        const tmpPassword = '123';
        const encryptedSeed = encrypt(seedPhrase, tmpPassword);

        dispatch(setSeed(encryptedSeed));
        history.push('/createWallet');
      } catch (error) {
        if (!isErrorOccur) {
          setInvalidSeedMessage(seedDoesnotExist);
        }
      }
      return err;
    }
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
      background: '#212121',
      color: primaryTextColor,
      width: '100%',
      borderRadius: '5px',
      fontSize: '0.8rem',
      lineHeight: '1.7em',
    },
    className: subHeadingfontFamilyClass,
    onChange: (e) => handleChange(e.target.value),
    value: seedPhrase,
    rows: 5,
    placeholder: 'Place your seed here to be replaced by Mnemonic',
  };

  const warningText = {
    className: subHeadingfontFamilyClass,
    visibility: invalidSeedMessage ? 'visible' : 'hidden',
  };

  const btn = {
    text: 'Import',
    width: '60%',
    handleClick: validateSeed,
    disabled: seedPhrase.length === 0,
  };

  return (
    <AuthWrapper>
      <Header centerText="Import Wallet" />
      <div>
        <MainHeading className={mainHeadingfontFamilyClass}>Restore your wallet : </MainHeading>
        <SubHeading className={subHeadingfontFamilyClass}>
          To restore your wallet enter your Seed phrase or upload a Json file.
        </SubHeading>
      </div>
      <SubMainWrapperForAuthScreens flexDirection="column" style={{ marginTop: '2rem' }}>
        <MainHeading className={mainHeadingfontFamilyClass}>Select Type : </MainHeading>
        <OptionDiv>
          <Option {...option1}>
            Seed Phrase
          </Option>
          <LightTooltip title="Coming Soon" arrow placement="top">
            <Option {...option2}>
              Json File
            </Option>
          </LightTooltip>
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
        <MainHeading className={mainHeadingfontFamilyClass}>Coming Soon!</MainHeading>
        )}
      </SubMainWrapperForAuthScreens>
      {selectedType === 'seed' && (
        <div className="btn-wrapper">
          <Button {...btn} />
        </div>
      )}
    </AuthWrapper>
  );
}

export default ImportWallet;
