import React from 'react';
import { CopyIcon, CopyText } from './styles';
import { Wrapper, UnAuthScreensContentWrapper } from '../common/wrapper';
import { MainHeading, SubHeading } from '../common/text';
import { WarningModal } from '../common/modals';
import { Header, Button } from '../common';

import { fonts, images } from '../../utils';
import SinglePhrase from './components/single-phrase';
import { ShowSeedViewProps } from './types';

const { ContentCopyIcon } = images;
const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

const ShowSeedView: React.FunctionComponent<ShowSeedViewProps> = (props) => {
    const {
        copy,
        currSeed,
        backHandler,
        contentCopyIconDivProps,
        continueBtnProps,
        warningModal,
    } = props;
    return (
        <Wrapper>
            <Header
                centerText="Seed Phrase"
                backHandler={() => backHandler()}
            />
            <div style={{ marginTop: '29px' }}>
                <MainHeading className={mainHeadingfontFamilyClass}>
                    Write down your seed phrase :
                </MainHeading>
                <SubHeading className={subHeadingfontFamilyClass}>
                    Please note down your mnemonic seed phrase. As of now, it is
                    the only access point to your Metadot wallet in case of any
                    mishap. Screenshots are not encouraged.
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
            <WarningModal {...warningModal} />
        </Wrapper>
    );
};

export default ShowSeedView;
