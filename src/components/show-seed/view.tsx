import React from 'react';
import { CopyIcon, CopyText } from './styles';
import { Wrapper, UnAuthScreensContentWrapper } from '../common/wrapper';
import { MainHeading, SubHeading } from '../common/text';
import { Header, Button } from '../common';

import { fonts, images } from '../../utils';
import SinglePhrase from './components/single-phrase';
import { ShowSeedViewProps } from './types';
import {
    WRITE_SEED_PHRASE,
    WRITE_SEED_PHRASE_DESCRIPTION,
} from '../../utils/app-content';

const { ContentCopyIcon } = images;
const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

const ShowSeedView: React.FunctionComponent<ShowSeedViewProps> = (props) => {
    const {
        copy,
        currSeed,
        backHandler,
        contentCopyIconDivProps,
        continueBtnProps,
    } = props;
    return (
        <Wrapper>
            <Header
                centerText="Seed Phrase"
                overWriteBackHandler={() => backHandler()}
            />
            <div style={{ marginTop: '29px' }}>
                <MainHeading
                    className={mainHeadingfontFamilyClass}
                    weight="700"
                >
                    {WRITE_SEED_PHRASE}
                </MainHeading>
                <SubHeading
                    className={subHeadingfontFamilyClass}
                    weight="400"
                    textAlign="justify"
                >
                    {WRITE_SEED_PHRASE_DESCRIPTION}
                </SubHeading>
            </div>
            <CopyText className={subHeadingfontFamilyClass}>
                Copy seed phrase
                <span style={{ width: '200px', visibility: 'hidden' }}>A</span>
                <div className="tooltip" {...contentCopyIconDivProps}>
                    <CopyIcon src={ContentCopyIcon} alt="copyIcon" />
                    <span className="tooltiptext">{copy}</span>
                </div>
            </CopyText>
            <UnAuthScreensContentWrapper mb="3rem">
                {currSeed &&
                    currSeed
                        .split(' ')
                        .map((phrase, i) => (
                            <SinglePhrase
                                index={i}
                                key={phrase}
                                phrase={phrase}
                            />
                        ))}
            </UnAuthScreensContentWrapper>
            <div style={{ marginLeft: '0' }} className="btn-wrapper">
                <Button {...continueBtnProps} />
            </div>
        </Wrapper>
    );
};

export default ShowSeedView;
