import React, { useState } from 'react';
import {
  MainHeading,
  SubHeading,
  SubMainWrapperForAuthScreens,
} from '../../components/CommonStyledComponents';
import Button from '../../components/Button';
import Header from '../../components/Header';
import { Option, OptionDiv } from './StyledComponents';
import { colors, fonts } from '../../utils';
import { TextField } from '@mui/material';
import { styled } from '@mui/system';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;
const { primaryTextColor } = colors;

function ImportWallet(props) {
  const [selectedType, setSelectedType] = useState('');

  // const TextArea = styled(TextField)`
  //   width: 500px;
  //   height: 170px;
  //   background: '#212121';
  //   color: ${primaryTextColor};
  //   border-radius: 8px;
  // `;

  const TypeSeedPhrase = () => (
    <div>
      <MainHeading className={mainHeadingfontFamilyClass}>
        Place your seed here :
      </MainHeading>
      <TextField
        multiline={true}
        disabled
        style={{
          width: 500,
          height: 170,
          background: '#212121',
          color: { primaryTextColor },
          borderRadius: 8,
        }}
      />
      {/* <TextArea multiline={true} /> */}
    </div>
  );

  return (
    <div>
      <Header centerText="Import Wallet" />
      <div style={{ paddingLeft: 20 }}>
        <MainHeading className={mainHeadingfontFamilyClass}>
          Restore your wallet{' '}
        </MainHeading>
        <SubHeading className={subHeadingfontFamilyClass}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat
          cursus sit diam Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Volutpat cursus sit diam{' '}
        </SubHeading>
      </div>
      <SubMainWrapperForAuthScreens flexDirection={'column'}>
        <MainHeading className={mainHeadingfontFamilyClass}>
          Select Type :{' '}
        </MainHeading>
        <OptionDiv>
          <Option className={mainHeadingfontFamilyClass}>Seed Phrase</Option>
          <Option className={mainHeadingfontFamilyClass}>Json File</Option>
        </OptionDiv>
        <TypeSeedPhrase />
      </SubMainWrapperForAuthScreens>
      <div>
        <Button text="Import" handleClick={() => console.log('object')} />
      </div>
    </div>
  );
}

export default ImportWallet;
