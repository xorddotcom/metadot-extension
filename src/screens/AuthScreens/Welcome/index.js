import React from 'react';
import { Button } from '../../../components';
import { useHistory } from 'react-router-dom';

import AddSharpIcon from '@mui/icons-material/AddSharp';
import DownloadIcon from '@mui/icons-material/Download';

import AppLogo from '../../../assets/images/Group.svg';

import { MainHeading, SubHeading } from './StyledComponents';
import { fonts } from '../../../utils';
import './index.css';

const { welcomeScreenMainHeadingFontSize, subHeadingfontFamilyClass } = fonts;

function Welcome(props) {
  const history = useHistory();

  return (
    <div>
      <div className="app-logo">
        <img src={AppLogo} alt="logo" />
      </div>

      <div className="main-content">
        <MainHeading className={welcomeScreenMainHeadingFontSize}>
          welcome to polo
        </MainHeading>
        <SubHeading className={subHeadingfontFamilyClass}>
          For Passionates, For Progress, For Polkadot
        </SubHeading>
      </div>
      <div className="btn-wrapper">
        <Button
          text="Create"
          StartIcon={AddSharpIcon}
          handleClick={() => {
            console.log('clicked');
            history.push('/ShowSeed');
          }}
        />
        <Button
          text="Import"
          StartIcon={DownloadIcon}
          handleClick={() => {
            console.log('clicked Import');
            history.push('/ImportWallet');
          }}
        />
      </div>
    </div>
  );
}

export default Welcome;
