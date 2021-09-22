import React from 'react';
import { useHistory } from 'react-router-dom';

import {
  MainHeading,
  StyledMUiInput,
  SubHeading,
  SubMainWrapperForAuthScreens,
} from '../../components/CommonStyledComponents';
import Header from '../../components/Header';
import Button from '../../components/Button';
import { fonts } from '../../utils';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

function CreateWallet(props) {
  const history = useHistory();

  return (
    <div>
      <Header centerText="Create Wallet" />
      <div style={{ paddingLeft: 20 }}>
        <MainHeading className={mainHeadingfontFamilyClass}>
          Authentication
        </MainHeading>
      </div>
      <SubMainWrapperForAuthScreens>
        <SubHeading className={mainHeadingfontFamilyClass}>
          Wallet Name
        </SubHeading>
        <StyledMUiInput
          placeholder="Account 0"
          fullWidth={true}
          disableUnderline={true}
          className={subHeadingfontFamilyClass}
        />

        <SubHeading className={mainHeadingfontFamilyClass}>Password</SubHeading>
        <StyledMUiInput
          placeholder="password"
          fullWidth={true}
          disableUnderline={true}
          className={subHeadingfontFamilyClass}
        />

        <SubHeading className={mainHeadingfontFamilyClass}>
          Confirm Password
        </SubHeading>
        <StyledMUiInput
          placeholder="re-enter password"
          fullWidth={true}
          disableUnderline={true}
          className={subHeadingfontFamilyClass}
        />

        <SubHeading className={subHeadingfontFamilyClass}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat
          cursus sit diam Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Volutpat cursus sit diam{' '}
        </SubHeading>
      </SubMainWrapperForAuthScreens>
      <div>
        <Button text="Continue" handleClick={() => history.push('/')} />
      </div>
    </div>
  );
}

export default CreateWallet;
