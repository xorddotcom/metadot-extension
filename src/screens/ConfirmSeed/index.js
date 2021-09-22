import React from 'react';
import { useHistory } from 'react-router-dom';
import { Input } from '@mui/material';
import {
  MainHeading,
  StyledMUiInput,
  SubHeading,
  SubMainWrapperForAuthScreens,
} from '../../components/CommonStyledComponents';
import Header from '../../components/Header';
import Button from '../../components/Button';
import { fonts, colors } from '../../utils';

const {
  mainHeadingfontFamilyClass,
  subHeadingfontFamilyClass,
  subHeadingFontSize,
} = fonts;
const { primaryTextColor } = colors;

function ConfirmSeed(props) {
  const history = useHistory();

  return (
    <div>
      <Header centerText="Show Seed" />
      <div style={{ paddingLeft: 20 }}>
        <MainHeading className={mainHeadingfontFamilyClass}>
          Confirm seed phrase{' '}
        </MainHeading>
        <SubHeading className={subHeadingfontFamilyClass}>
          Lorem WWipsum dolor sit amet, consectetur adipiscing elit. Volutpat
          cursus sit diam Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Volutpat cursus sit diam{' '}
        </SubHeading>
      </div>
      <SubMainWrapperForAuthScreens>
        <StyledMUiInput
          placeholder="Word #1"
          fullWidth={true}
          disableUnderline={true}
          className={subHeadingfontFamilyClass}
        />
        <StyledMUiInput
          placeholder="Word #4"
          fullWidth={true}
          disableUnderline={true}
          className={subHeadingfontFamilyClass}
        />
        <StyledMUiInput
          placeholder="Word #8"
          fullWidth={true}
          disableUnderline={true}
          className={subHeadingfontFamilyClass}
        />
        <StyledMUiInput
          placeholder="Word #11"
          fullWidth={true}
          disableUnderline={true}
          className={subHeadingfontFamilyClass}
        />
      </SubMainWrapperForAuthScreens>
      <div>
        <Button
          text="Continue"
          handleClick={() => history.push('/CreateWallet')}
        />
      </div>
    </div>
  );
}

const styles = {
  input: {
    paddingLeft: 25,
    paddingTop: 13,
    paddingBottom: 13,
    color: primaryTextColor,
    background: '#212121',
    fontSize: 16,
    borderRadius: 8,
    height: 45,
    fontFamily: subHeadingfontFamilyClass,
    marginBottom: 10,
  },
};

export default ConfirmSeed;
