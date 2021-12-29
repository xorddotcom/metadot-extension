/* eslint-disable import/no-cycle */
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

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
import {
  SeedGridRow, SeedText, SeedGrid,
} from './styledComponents';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;
const { arrayFromSeedSentence, arrayOfFourRandomNumbers, shuffleItemsWithinArray } = helpers;
const fourRandomIndexes = arrayOfFourRandomNumbers();

function ConfirmSeed() {
  const history = useHistory();
  const location = useLocation();

  const currSeed = location.state.seedToPass;

  // eslint-disable-next-line no-unused-vars
  const [shuffledSeed, setShuffledSeed] = useState(
    shuffleItemsWithinArray(arrayFromSeedSentence(currSeed)),
  );

  // eslint-disable-next-line no-unused-vars
  const [seedArrayForGrid, setSeedArrayForGrid] = useState(shuffledSeed.map((seedStr, i) => (
    { value: seedStr, indexValue: i, selected: false }
  )));

  const seedArray = arrayFromSeedSentence(currSeed);

  const phrase1 = seedArray[fourRandomIndexes[0]];
  const phrase2 = seedArray[fourRandomIndexes[1]];
  const phrase3 = seedArray[fourRandomIndexes[2]];
  const phrase4 = seedArray[fourRandomIndexes[3]];

  const [word1, setWord1] = useState('');
  const [word2, setWord2] = useState('');
  const [word3, setWord3] = useState('');
  const [word4, setWord4] = useState('');
  const [validations, setValidations] = useState([true, true, true, true]);

  const checkWordsAndNavigate = () => {
    const first = word1 === phrase1;
    const second = word2 === phrase2;
    const third = word3 === phrase3;
    const fourth = word4 === phrase4;

    setValidations([first, second, third, fourth]);

    // eslint-disable-next-line no-unused-expressions
    first && second && third && fourth && history.push({
      pathname: '/createWallet',
      state: { seedToPass: currSeed },
    });
  };

  const handleSelect = (seedObj) => {
    const { value, indexValue } = seedObj;
    if (!word1) {
      setWord1(value);
    } else if (!word2) {
      setWord2(value);
    } else if (!word3) {
      setWord3(value);
    } else if (!word4) {
      setWord4(value);
    } else {
      console.log('All are selected!');
    }
    if (!word1 || !word2 || !word3 || !word4) {
      const copyOfSeedForGrid = seedArrayForGrid;
      copyOfSeedForGrid[indexValue] = { value, indexValue, selected: true };
      setSeedArrayForGrid(copyOfSeedForGrid);
    }
  };

  const handleCancel = (word, cb1ForSettingWordState) => {
    const gridItem = seedArrayForGrid.find((s) => s.value === word);
    const { value, indexValue } = gridItem;
    const copyOfSeedForGrid = seedArrayForGrid;
    copyOfSeedForGrid[indexValue] = { value, indexValue, selected: false };

    setSeedArrayForGrid(copyOfSeedForGrid);
    cb1ForSettingWordState('');
  };

  function xyz1(ind, arr) {
    const updated = arr;
    updated[ind] = true;
    setValidations(updated);
    return updated;
  }

  const styledInput1 = {
    onChange: (text) => {
      setWord1(text);
    },
    placeholder: `Word #${fourRandomIndexes[0] + 1}`,
    value: word1,
    className: subHeadingfontFamilyClass,
    isCorrect: validations[0],
    marginBottom: '10px',
    rightIconCross: word1,
    rightIconCrossClickHandler: () => {
      handleCancel(word1, setWord1);
      xyz1(0, validations);
    },
  };

  const styledInput2 = {
    onChange: (text) => setWord2(text),
    placeholder: `Word #${fourRandomIndexes[1] + 1}`,
    value: word2,
    className: subHeadingfontFamilyClass,
    isCorrect: validations[1],
    marginBottom: '10px',
    rightIconCross: word2,
    rightIconCrossClickHandler: () => {
      handleCancel(word2, setWord2);
      xyz1(1, validations);
    },
  };

  const styledInput3 = {
    onChange: (text) => setWord3(text),
    placeholder: `Word #${fourRandomIndexes[2] + 1}`,
    value: word3,
    className: subHeadingfontFamilyClass,
    isCorrect: validations[2],
    marginBottom: '10px',
    rightIconCross: word3,
    rightIconCrossClickHandler: () => {
      handleCancel(word3, setWord3);
      xyz1(2, validations);
    },
  };

  const styledInput4 = {
    onChange: (text) => setWord4(text),
    placeholder: `Word #${fourRandomIndexes[3] + 1}`,
    value: word4,
    className: subHeadingfontFamilyClass,
    isCorrect: validations[3],
    marginBottom: '20px',
    rightIconCross: word4,
    rightIconCrossClickHandler: () => {
      handleCancel(word4, setWord4);
      xyz1(3, validations);
    },
  };

  const btn = {
    text: 'Continue',
    width: '300px',
    disabled: !(word1 && word2 && word3 && word4),
    handleClick: () => checkWordsAndNavigate(),
  };

  const mainHeading = {
    marginTop: '30.25px',
    className: mainHeadingfontFamilyClass,
  };

  const subHeading = {
    marginTop: '12px',
    className: subHeadingfontFamilyClass,
  };

  return (
    <AuthWrapper>
      <Header centerText="Confirm Seed" backHandler={() => console.log('goBack')} />
      <div>
        <MainHeading {...mainHeading}>
          Confirm seed phrase
        </MainHeading>
        <SubHeading textLightColor {...subHeading}>
          To confirm the mnemonic, enter the right words in the space provided below.
        </SubHeading>
      </div>
      <SubMainWrapperForAuthScreens mb="2rem">
        <StyledInput
          id="word-1"
          disableUnderline
          {...styledInput1}
          disabled
        />

        <StyledInput
          id="word-2"
          disableUnderline
          {...styledInput2}
          disabled
        />

        <StyledInput
          id="word-3"
          disableUnderline
          {...styledInput3}
          disabled
        />

        <StyledInput
          id="word-4"
          disableUnderline
          {...styledInput4}
          disabled
        />

        <SeedGrid>
          <SeedGridRow>
            {seedArrayForGrid.map((s, i) => (
              <SeedText
                id={`seed-${i}`}
                key={s.value}
                className={subHeadingfontFamilyClass}
                onClick={() => handleSelect(s)}
                selected={s.selected}
              >
                {s.value}
              </SeedText>
            ))}
          </SeedGridRow>
        </SeedGrid>

      </SubMainWrapperForAuthScreens>
      <div style={{ marginLeft: '0' }} className="btn-wrapper">
        <Button id="confirm-continue" {...btn} />
      </div>
    </AuthWrapper>
  );
}

export default ConfirmSeed;
