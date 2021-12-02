import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import AddSharpIcon from '../../../assets/images/icons/add.svg';
import DownloadIcon from '../../../assets/images/icons/download.svg';

import AppLogo from '../../../assets/images/logo.svg';
import metaDot from '../../../assets/images/metadot.svg';
import { Button } from '../../../components';

import { MainHeading, SubHeading } from './StyledComponents';
import { fonts } from '../../../utils';
import './index.css';
import { setKeyringInitialized, setSeed } from '../../../redux/slices/account';
import { encrypt, GenerateSeedPhrase, KeyringInitialization } from '../../../utils/accounts';

const { subHeadingfontFamilyClass } = fonts;

function Welcome() {
  const history = useHistory();

  const currentUser = useSelector((state) => state.account);
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

  useEffect(() => {
    if (!currentUser.keyringInitialized) {
      KeyringInitialization();
      dispatch(setKeyringInitialized(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
