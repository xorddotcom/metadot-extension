import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { IndexText, SeedText, SeedWrapper } from './StyledComponents';

import {
  MainHeading,
  SubHeading,
  SubMainWrapperForAuthScreens,
} from '../../components/CommonStyledComponents';
import Header from '../../components/Header';
import Button from '../../components/Button';
import WarningModal from '../../components/Modals';

import { fonts } from '../../utils';

import { GenerateSeedPhrase } from '../../ToolBox/accounts';

import { resetAccountSlice, setSeed } from '../../redux/slices/account';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

function ShowSeed() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [seedPhrase, setSeedPhrase] = useState('');

  const { seed } = useSelector(state => state.account);

  const dispatch = useDispatch();

  //generate new seed for parent account
  useEffect(() => {
    try {
      if (!seed) {
        //checking whether seed needs to be created or not
        const newSeed = GenerateSeedPhrase();

        dispatch(setSeed(newSeed)); // store newSeed in redux
      }
    } catch (error) {
      console.log('ERROR while generating new seed for parent account', error);
    }
  }, []);

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
      <Header
        centerText="Show Seed"
        backHandler={() => dispatch(resetAccountSlice())}
      />
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
        {seed &&
          seed
            .split(' ')
            .map((phrase, i) => (
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
