import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { IndexText, SeedText, SeedWrapper } from './StyledComponents';

import {
  AuthWrapper,
  Header,
  Button,
  MainHeading,
  SubHeading,
  SubMainWrapperForAuthScreens,
  WarningModal,
} from '../../components';

import { fonts } from '../../utils';

import { GenerateSeedPhrase } from '../../ToolBox/accounts';

import { resetAccountSlice, setSeed } from '../../redux/slices/account';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

function ShowSeed() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <AuthWrapper>
      <Header
        centerText="Show Seed"
        backHandler={() => dispatch(resetAccountSlice())}
      />
      <div>
        <MainHeading className={mainHeadingfontFamilyClass}>
          Write down your seed phrase{' '}
        </MainHeading>
        <SubHeading className={subHeadingfontFamilyClass}>
          Please write the mnemonic down in order to ensure the backup is
          correct. Obtaining mnemonic is equivalent to owning wallet assets.
          Don't take screenshots or copy, otherwise it may cause asset loss
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
      <div className="btn-wrapper">
        <Button text="Continue" handleClick={() => setIsModalOpen(true)} />
      </div>
      <WarningModal
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        style={{
          width: '78%',
          background: '#141414',
          p: 2,
          px: 2,
          pb: 3,
        }}
      />
    </AuthWrapper>
  );
}

export default ShowSeed;
