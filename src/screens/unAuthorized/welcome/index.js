/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import AddSharpIcon from '../../../assets/images/icons/add.svg';
import DownloadIcon from '../../../assets/images/icons/download.svg';

import AppLogo from '../../../assets/images/logo.svg';
import metaDot from '../../../assets/images/metadot.svg';
import { Button } from '../../../components';

import { MainHeading, SubHeading } from './styledComponents';
import { fonts } from '../../../utils';
import accounts from '../../../utils/accounts';
import './index.css';
import { setSeed } from '../../../redux/slices/account';

const { subHeadingfontFamilyClass } = fonts;
const {
  encrypt,
  GenerateSeedPhrase,
} = accounts;

function Welcome() {
  const history = useHistory();

  const dispatch = useDispatch();

  // generate new seed for parent account
  useEffect(() => {
    try {
      // if (!seed) {
      // checking whether seed needs to be created or not
      const newSeed = GenerateSeedPhrase();
      const tmpPassword = '123';
      const encryptedSeed = encrypt(newSeed, tmpPassword);
      dispatch(setSeed(encryptedSeed)); // store newSeed in redux
      // }
    } catch (error) {
      console.log('ERROR while generating new seed for parent account', error);
    }
  }, [dispatch]);

  const btnCreate = {
    text: 'Create',
    width: '270px',
    StartIcon: AddSharpIcon,
    handleClick: () => {
      history.push('/ShowSeed');
    },
  };

  const btnImport = {
    text: 'Import',
    width: '270px',
    StartIcon: DownloadIcon,
    handleClick: () => {
      history.push('/ImportWallet');
    },
  };

  const divProps = {
    className: 'btn-wrapper',
    style: { marginLeft: '0', marginBottom: 0 },
  };

  return (
    <div className="welcome">
      <div className="app-logo">
        <img src={AppLogo} alt="logo" />
      </div>

      <div className="main-content">
        <MainHeading>
          <img src={metaDot} alt="metadot" />
        </MainHeading>
        <SubHeading className={subHeadingfontFamilyClass}>
          Passion, Progress, Polkadot
        </SubHeading>
      </div>
      <div {...divProps}>
        <Button id="btn-create" {...btnCreate} />
        <div style={{ margin: '0.5rem' }} />
        <Button id="btn-import" cancel {...btnImport} />
      </div>
    </div>
  );
}

export default Welcome;
