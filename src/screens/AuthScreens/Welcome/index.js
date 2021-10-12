import React from 'react';
import {
  useHistory,
} from 'react-router-dom';

import AddSharpIcon from '@mui/icons-material/AddSharp';
import DownloadIcon from '@mui/icons-material/Download';

import { useSelector, useDispatch } from 'react-redux';
import AppLogo from '../../../assets/images/Group.svg';
import { Button } from '../../../components';

import { MainHeading, SubHeading } from './StyledComponents';
import { fonts } from '../../../utils';
import { emptyReduxState } from '../../../redux/slices/account';
import './index.css';

const {
  subHeadingfontFamilyClass,
  mainHeadingfontFamilyClass,
} = fonts;

function Welcome() {
  const history = useHistory();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.account);
  console.log('Current user', currentUser);

  return (
    <div>
      <div className="app-logo">
        <img src={AppLogo} alt="logo" />
      </div>

      <div className="main-content">
        <MainHeading className={mainHeadingfontFamilyClass}>
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
        <button type="button" onClick={() => dispatch(emptyReduxState())}>Clear redux</button>

      </div>
    </div>
  );
}

export default Welcome;
