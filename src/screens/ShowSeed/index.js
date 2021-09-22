import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  MainHeading,
  SubHeading,
  SubMainWrapperForAuthScreens,
} from '../../components/CommonStyledComponents';
import Header from '../../components/Header';
import Button from '../../components/Button';
import { fonts } from '../../utils';
import { IndexText, SeedText, SeedWrapper } from './StyledComponents';
import WarningModal from '../../components/Modals';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

function ShowSeed(props) {
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const phrases = [
    'abc',
    'def',
    'ghi',
    'abc',
    'def',
    'ghi',
    'abc',
    'def',
    'ghi',
    'abc',
    'def',
    'ghi',
  ];

  const SinglePhrase = ({ index, phrase }) => {
    return (
      <SeedWrapper>
        <IndexText className={mainHeadingfontFamilyClass}>
          {index + 1}
        </IndexText>
        <SeedText className={mainHeadingfontFamilyClass}>{phrase}</SeedText>
      </SeedWrapper>
    );
  };

  return (
    <div>
      <Header centerText="Show Seed" />
      <div style={{ paddingLeft: 20 }}>
        <MainHeading className={mainHeadingfontFamilyClass}>
          Write down your seed phrase{' '}
        </MainHeading>
        <SubHeading className={subHeadingfontFamilyClass}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat
          cursus sit diam Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Volutpat cursus sit diam{' '}
        </SubHeading>
      </div>
      <SubMainWrapperForAuthScreens>
        {phrases.map((phrase, i) => (
          <SinglePhrase index={i} key={i} phrase={phrase} />
        ))}
      </SubMainWrapperForAuthScreens>
      <div>
        <Button text="Continue" handleClick={() => setIsModalOpen(true)} />
      </div>
      <WarningModal
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        style={{
          width: 400,
          background: '#141414',
          p: 2,
          px: 4,
          pb: 3,
        }}
      />
    </div>
  );
}

export default ShowSeed;
