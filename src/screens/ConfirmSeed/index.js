import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  MainHeading,
  StyledMUiInput,
  SubHeading,
  SubMainWrapperForAuthScreens,
} from '../../components/CommonStyledComponents';
import Header from '../../components/Header';
import Button from '../../components/Button';
import { fonts } from '../../utils';
import { arrayFromSeedSentence } from '../../utils/helpers';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

function ConfirmSeed(props) {
  const history = useHistory();

  const { seed } = useSelector(state => state.account);

  const seedArray = arrayFromSeedSentence(seed);
  const phrase1 = seedArray[0];
  const phrase4 = seedArray[3];
  const phrase8 = seedArray[7];
  const phrase11 = seedArray[10];

  const [word1, setWord1] = useState(phrase1);
  const [word4, setWord4] = useState(phrase4);
  const [word8, setWord8] = useState(phrase8);
  const [word11, setWord11] = useState(phrase11);
  const [validations, setValidations] = useState([true, true, true, true]);

  const checkWords = () => {
    const first = word1 === phrase1;
    const second = word4 === phrase4;
    const third = word8 === phrase8;
    const fourth = word11 === phrase11;

    setValidations([first, second, third, fourth]);
    first && second && third && fourth && history.push('/CreateWallet');
  };

  console.log('object', { word1, word4, word8, word11 });

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
          onChange={text => setWord1(text)}
          placeholder="Word #1"
          fullWidth={true}
          disableUnderline={true}
          value={word1}
          className={subHeadingfontFamilyClass}
          isCorrect={validations[0]}
        />

        <StyledMUiInput
          onChange={text => setWord4(text)}
          placeholder="Word #4"
          fullWidth={true}
          disableUnderline={true}
          value={word4}
          className={subHeadingfontFamilyClass}
          isCorrect={validations[1]}
        />

        <StyledMUiInput
          onChange={text => setWord8(text)}
          placeholder="Word #8"
          fullWidth={true}
          disableUnderline={true}
          value={word8}
          className={subHeadingfontFamilyClass}
          isCorrect={validations[2]}
        />

        <StyledMUiInput
          onChange={text => setWord11(text)}
          placeholder="Word #11"
          fullWidth={true}
          disableUnderline={true}
          value={word11}
          className={subHeadingfontFamilyClass}
          isCorrect={validations[3]}
        />
      </SubMainWrapperForAuthScreens>
      <div className="btn-wrapper">
        <Button
          text="Continue"
          disabled={word1 && word4 && word8 && word11 ? false : true}
          handleClick={() => checkWords()}
        />
      </div>
    </div>
  );
}

export default ConfirmSeed;
