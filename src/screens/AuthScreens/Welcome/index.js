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
import { setKeyringInitialized } from '../../../redux/slices/account';
import { KeyringInitialization } from '../../../utils/accounts';

const { subHeadingfontFamilyClass } = fonts;

function Welcome() {
  const history = useHistory();

  const currentUser = useSelector((state) => state.account);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentUser.keyringInitialized) {
      KeyringInitialization();
      dispatch(setKeyringInitialized(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const btnCreate = {
    text: 'Create',
    StartIcon: AddSharpIcon,
    handleClick: () => {
      history.push('/ShowSeed');
    },
  };

  const btnImport = {
    text: 'Import',
    StartIcon: DownloadIcon,
    handleClick: () => {
      history.push('/ImportWallet');
    },
  };

  return (
    <div>
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
      <div className="btn-wrapper">
        <Button {...btnCreate} />
        <div style={{ margin: '0.5rem' }} />
        <Button cancel {...btnImport} />
      </div>
    </div>
  );
}

export default Welcome;
