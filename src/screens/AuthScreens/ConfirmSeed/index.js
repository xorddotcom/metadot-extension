import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';

import { useSelector } from 'react-redux';

import {
  AuthWrapper,
  Header,
  StyledInput,
  Button,
  MainHeading,
  SubHeading,
  SubMainWrapperForAuthScreens,
} from '../../../components';

import { fonts, helpers } from '../../../utils';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;
const { arrayFromSeedSentence, arrayOfFourRandomNumbers } = helpers;
const fourRandomIndexes = arrayOfFourRandomNumbers();

function ConfirmSeed() {
  const history = useHistory();

  const { seed } = useSelector((state) => state.account);

  const seedArray = arrayFromSeedSentence(seed);

  const phrase1 = seedArray[fourRandomIndexes[0]];
  const phrase2 = seedArray[fourRandomIndexes[1]];
  const phrase3 = seedArray[fourRandomIndexes[2]];
  const phrase4 = seedArray[fourRandomIndexes[3]];

  const [word1, setWord1] = useState(phrase1);
  const [word2, setWord2] = useState(phrase2);
  const [word3, setWord3] = useState(phrase3);
  const [word4, setWord4] = useState(phrase4);
  const [validations, setValidations] = useState([true, true, true, true]);

  const checkWords = () => {
    const first = word1 === phrase1;
    const second = word2 === phrase2;
    const third = word3 === phrase3;
    const fourth = word4 === phrase4;

    setValidations([first, second, third, fourth]);
    // eslint-disable-next-line no-unused-expressions
    first && second && third && fourth && history.push('/CreateWallet');
  };

  console.log('object', {
    word1, word2, word3, word4,
  });

  return (
    <AuthWrapper>
      <Header centerText="Confirm Seed" />
      <div>
        <MainHeading className={mainHeadingfontFamilyClass}>
          Confirm seed phrase
          {' '}
        </MainHeading>
        <SubHeading className={subHeadingfontFamilyClass}>
          Lorem WWipsum dolor sit amet, consectetur adipiscing elit. Volutpat
          cursus sit diam Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Volutpat cursus sit diam
          {' '}
        </SubHeading>
      </div>
      <SubMainWrapperForAuthScreens>
        <StyledInput
          onChange={(text) => setWord1(text)}
          placeholder={`Word #${fourRandomIndexes[0] + 1}`}
          disableUnderline
          value={word1}
          className={subHeadingfontFamilyClass}
          isCorrect={validations[0]}
        />

        <StyledInput
          onChange={(text) => setWord2(text)}
          placeholder={`Word #${fourRandomIndexes[1] + 1}`}
          disableUnderline
          value={word2}
          className={subHeadingfontFamilyClass}
          isCorrect={validations[1]}
        />

        <StyledInput
          onChange={(text) => setWord3(text)}
          placeholder={`Word #${fourRandomIndexes[2] + 1}`}
          disableUnderline
          value={word3}
          className={subHeadingfontFamilyClass}
          isCorrect={validations[2]}
        />

        <StyledInput
          onChange={(text) => setWord4(text)}
          placeholder={`Word #${fourRandomIndexes[3] + 1}`}
          disableUnderline
          value={word4}
          className={subHeadingfontFamilyClass}
          isCorrect={validations[3]}
        />
      </SubMainWrapperForAuthScreens>
      <div className="btn-wrapper">
        <Button
          text="Continue"
          disabled={!(word1 && word2 && word3 && word4)}
          handleClick={() => checkWords()}
        />
      </div>
    </AuthWrapper>
  );
}

export default ConfirmSeed;
