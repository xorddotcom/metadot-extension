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
import {
  SeedGridRow, SeedText, SeedGrid,
} from './StyledComponents';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;
const { arrayFromSeedSentence, arrayOfFourRandomNumbers, shuffleItemsWithinArray } = helpers;
const fourRandomIndexes = arrayOfFourRandomNumbers();

function ConfirmSeed() {
  const history = useHistory();

  const { seed } = useSelector((state) => state.account);

  // eslint-disable-next-line no-unused-vars
  const [shuffledSeed, setShuffledSeed] = useState(
    shuffleItemsWithinArray(arrayFromSeedSentence(seed)),
  );

  // eslint-disable-next-line no-unused-vars
  const [seedArrayForGrid, setSeedArrayForGrid] = useState(shuffledSeed.map((seedStr, i) => (
    { value: seedStr, indexValue: i, selected: false }
  )));

  const seedArray = arrayFromSeedSentence(seed);

  const phrase1 = seedArray[fourRandomIndexes[0]];
  const phrase2 = seedArray[fourRandomIndexes[1]];
  const phrase3 = seedArray[fourRandomIndexes[2]];
  const phrase4 = seedArray[fourRandomIndexes[3]];

  console.log({ shuffledSeed });
  // const seedArrayForGrid = shuffledSeed.map((seedStr, i) => (
  //   { value: seedStr, indexValue: i, selected: false }
  // ));
  console.log({ seedArrayForGrid });

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
    first && second && third && fourth && history.push('/CreateWallet');
  };

  //   const checkWord = () => {
  //   const first = word1 === phrase1;
  //   const second = word2 === phrase2;
  //   const third = word3 === phrase3;
  //   const fourth = word4 === phrase4;

  //   setValidations([first, second, third, fourth]);
  // };

  console.log('object', {
    word1, word2, word3, word4,
  });

  const handleSelect = (seedObj) => {
    console.log({ seedObj });
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
    console.log('in check ', {
      word1, word2, word3, word4,
    });

    // switch (wordNumber) {
    //   case 1:
    //     setValidations([true])
    //     break;

    //   default:
    //     break;
    // }
  };

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
          marginBottom="10px"
          rightIconCross={word1}
          rightIconCrossClickHandler={() => handleCancel(word1, setWord1)}
        />

        <StyledInput
          onChange={(text) => setWord2(text)}
          placeholder={`Word #${fourRandomIndexes[1] + 1}`}
          disableUnderline
          value={word2}
          className={subHeadingfontFamilyClass}
          isCorrect={validations[1]}
          marginBottom="10px"
          rightIconCross={word2}
          rightIconCrossClickHandler={() => handleCancel(word2, setWord2)}
        />

        <StyledInput
          onChange={(text) => setWord3(text)}
          placeholder={`Word #${fourRandomIndexes[2] + 1}`}
          disableUnderline
          value={word3}
          className={subHeadingfontFamilyClass}
          isCorrect={validations[2]}
          marginBottom="10px"
          rightIconCross={word3}
          rightIconCrossClickHandler={() => handleCancel(word3, setWord3)}
        />

        <StyledInput
          onChange={(text) => setWord4(text)}
          placeholder={`Word #${fourRandomIndexes[3] + 1}`}
          disableUnderline
          value={word4}
          className={subHeadingfontFamilyClass}
          isCorrect={validations[3]}
          marginBottom="20px"
          rightIconCross={word4}
          rightIconCrossClickHandler={() => handleCancel(word4, setWord4)}
        />

        <SeedGrid>

          <SeedGridRow>

            {seedArrayForGrid.map((s) => (
              <SeedText
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
      <div className="btn-wrapper">
        <Button
          text="Continue"
          disabled={!(word1 && word2 && word3 && word4)}
          handleClick={() => checkWordsAndNavigate()}
        />
      </div>
    </AuthWrapper>
  );
}

export default ConfirmSeed;
