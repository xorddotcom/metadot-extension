import React from 'react';

import { Header, Input, Button } from '../common';
import { Wrapper, UnAuthScreensContentWrapper } from '../common/wrapper';
import { MainHeading, SubHeading } from '../common/text';
import { SeedGridRow, SeedText, SeedGrid } from './styles';

import { fonts } from '../../utils';
import { ConfirmSeedViewProps } from './types';
import {
    CONFIRM_SEED_DESCRIPTION,
    CONFIRM_SEED_HEADER,
    CONFIRM_SEED_MAIN_HEADING,
} from '../../utils/app-content';

const { subHeadingfontFamilyClass } = fonts;

const ConfirmSeedView: React.FunctionComponent<ConfirmSeedViewProps> = (
    props
) => {
    const {
        backHandler,
        seedArrayForGrid,
        handleSelect,
        styledInput1,
        styledInput2,
        styledInput3,
        styledInput4,
        continueBtn,
        mainHeading,
        subHeading,
    } = props;

    return (
        <Wrapper>
            <Header
                centerText={CONFIRM_SEED_HEADER}
                backHandler={() => backHandler()}
            />
            <div>
                <MainHeading {...mainHeading}>
                    {CONFIRM_SEED_MAIN_HEADING}
                </MainHeading>
                <SubHeading textLightColor {...subHeading}>
                    {CONFIRM_SEED_DESCRIPTION}
                </SubHeading>
            </div>
            <UnAuthScreensContentWrapper mb="18px">
                <Input
                    id="word-1"
                    fullWidth="76%"
                    {...styledInput1}
                    leftPosition="18px"
                    topPosition="3px"
                    disabled
                />

                <Input
                    id="word-2"
                    {...styledInput2}
                    fullWidth="76%"
                    leftPosition="18px"
                    topPosition="3px"
                    disabled
                />

                <Input
                    id="word-3"
                    {...styledInput3}
                    fullWidth="76%"
                    leftPosition="18px"
                    topPosition="3px"
                    disabled
                />

                <Input
                    id="word-4"
                    {...styledInput4}
                    fullWidth="76%"
                    leftPosition="18px"
                    topPosition="3px"
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
            </UnAuthScreensContentWrapper>
            <Button id="confirm-continue" {...continueBtn} />
        </Wrapper>
    );
};

export default ConfirmSeedView;
