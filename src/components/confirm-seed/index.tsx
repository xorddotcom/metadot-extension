import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { Header, Input, Button } from '../common';
import { Wrapper, UnAuthScreensContentWrapper } from '../common/wrapper';
import { MainHeading, SubHeading } from '../common/text';

import { fonts, helpers } from '../../utils';
import { SeedGridRow, SeedText, SeedGrid } from './styles';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;
const {
    arrayFromSeedSentence,
    arrayOfFourRandomNumbers,
    shuffleItemsWithinArray,
} = helpers;
const fourRandomIndexes = arrayOfFourRandomNumbers();

const ConfirmSeed: React.FunctionComponent = () => {
    const navigate: any = useNavigate();
    const location: any = useLocation();

    const currSeed = location.state.seedToPass;

    const shuffledSeed = shuffleItemsWithinArray(
        arrayFromSeedSentence(currSeed)
    );

    const [seedArrayForGrid, setSeedArrayForGrid] = useState<
        {
            value: string;
            indexValue: number;
            selected: boolean;
        }[]
    >(
        shuffledSeed.map((seedStr, i) => ({
            value: seedStr,
            indexValue: i,
            selected: false,
        }))
    );

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

    const checkWordsAndNavigate = (): void => {
        const first = word1 === phrase1;
        const second = word2 === phrase2;
        const third = word3 === phrase3;
        const fourth = word4 === phrase4;

        setValidations([first, second, third, fourth]);

        if (first && second && third && fourth)
            navigate('/createWallet', {
                state: { seedToPass: currSeed },
            });
    };

    const handleSelect = (seedObj: {
        value: string;
        indexValue: number;
    }): void => {
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
            copyOfSeedForGrid[indexValue] = {
                value,
                indexValue,
                selected: true,
            };
            setSeedArrayForGrid(copyOfSeedForGrid);
        }
    };

    const handleCancel = (
        word: string,
        cb1ForSettingWordState: {
            (value: React.SetStateAction<string>): void;
        }
    ): void => {
        if (seedArrayForGrid.length > 0) {
            const seedArrayCancel = seedArrayForGrid.find(
                (s) => s.value === word
            );
            if (seedArrayCancel) {
                const { value, indexValue } = seedArrayCancel;
                const copyOfSeedForGrid = seedArrayForGrid;
                copyOfSeedForGrid[indexValue] = {
                    value,
                    indexValue,
                    selected: false,
                };

                setSeedArrayForGrid(copyOfSeedForGrid);
                cb1ForSettingWordState('');
            }
        }
    };

    function updateWordValidation(ind: number, arr: Array<boolean>): void {
        const updated = arr;
        updated[ind] = true;
        setValidations(updated);
    }

    const styledInput1 = {
        onChange: (text: string) => {
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
            updateWordValidation(0, validations);
        },
    };

    const styledInput2 = {
        onChange: (text: string) => setWord2(text),
        placeholder: `Word #${fourRandomIndexes[1] + 1}`,
        value: word2,
        className: subHeadingfontFamilyClass,
        isCorrect: validations[1],
        marginBottom: '10px',
        rightIconCross: word2,
        rightIconCrossClickHandler: () => {
            handleCancel(word2, setWord2);
            updateWordValidation(1, validations);
        },
    };

    const styledInput3 = {
        onChange: (text: string) => setWord3(text),
        placeholder: `Word #${fourRandomIndexes[2] + 1}`,
        value: word3,
        className: subHeadingfontFamilyClass,
        isCorrect: validations[2],
        marginBottom: '10px',
        rightIconCross: word3,
        rightIconCrossClickHandler: () => {
            handleCancel(word3, setWord3);
            updateWordValidation(2, validations);
        },
    };

    const styledInput4 = {
        onChange: (text: string) => setWord4(text),
        placeholder: `Word #${fourRandomIndexes[3] + 1}`,
        value: word4,
        className: subHeadingfontFamilyClass,
        isCorrect: validations[3],
        marginBottom: '20px',
        rightIconCross: word4,
        rightIconCrossClickHandler: () => {
            handleCancel(word4, setWord4);
            updateWordValidation(3, validations);
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
        <Wrapper>
            <Header
                centerText="Confirm Seed"
                backHandler={() => console.log('goBack')}
            />
            <div>
                <MainHeading {...mainHeading}>Confirm seed phrase</MainHeading>
                <SubHeading textLightColor {...subHeading}>
                    To confirm the mnemonic, enter the right words in the space
                    provided below.
                </SubHeading>
            </div>
            <UnAuthScreensContentWrapper mb="2rem">
                <Input id="word-1" {...styledInput1} disabled />

                <Input id="word-2" {...styledInput2} disabled />

                <Input id="word-3" {...styledInput3} disabled />

                <Input id="word-4" {...styledInput4} disabled />

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
            </UnAuthScreensContentWrapper>
            <div style={{ marginLeft: '0' }} className="btn-wrapper">
                <Button id="confirm-continue" {...btn} />
            </div>
        </Wrapper>
    );
};

export default ConfirmSeed;
