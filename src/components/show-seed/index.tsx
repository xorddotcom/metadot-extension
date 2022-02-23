import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CopyIcon, CopyText, IndexText, SeedText, SeedWrapper } from './styles';
import { Wrapper, UnAuthScreensContentWrapper } from '../common/wrapper';
import { MainHeading, SubHeading } from '../common/text';
import { WarningModal } from '../common/modals';
import { Header, Button } from '../common';
import {
    setAccountCreationStep,
    setTempSeed,
} from '../../redux/slices/activeAccount';

import { fonts, images } from '../../utils';
import { RootState } from '../../redux/store';
import { CONFIRM_SEED } from '../../constants';

const { ContentCopyIcon } = images;
const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

const SinglePhrase: React.FunctionComponent<{
    index: number;
    phrase: string;
}> = ({ index, phrase }) => (
    <SeedWrapper>
        <IndexText className={mainHeadingfontFamilyClass}>
            {index + 1}
        </IndexText>
        <SeedText className={mainHeadingfontFamilyClass}>{phrase}</SeedText>
    </SeedWrapper>
);

const ShowSeed: React.FunctionComponent = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation().state as {
        prevRoute: string;
        seedToPass: string;
    };

    const { tempSeed } = useSelector((state: RootState) => state.activeAccount);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [copy, setCopy] = useState('Copy');

    const currSeed = tempSeed;

    // if (
    //     location.prevRoute === '/' ||
    //     location.prevRoute === '/accounts' ||
    //     location.prevRoute === '/ShowSeed'
    // ) {
    //     currSeed = location.seedToPass && location.seedToPass;
    // }

    const copySeedText = (): void => {
        navigator.clipboard.writeText(currSeed);
        setCopy('Copied');
    };

    const contentCopyIcon = {
        id: 'copy-seed',
        onClick: () => {
            copySeedText();
            // for maintaining extension state
            // if user closes it for pasting the seed
            dispatch(setTempSeed(currSeed));
        },
        onMouseOver: () => setCopy('Copy'),
        style: { cursor: 'pointer' },
    };

    const btn = {
        id: 'seed-continue',
        width: '300px',
        text: 'Continue',
        handleClick: () => setIsModalOpen(true),
    };

    const warningModal = {
        open: isModalOpen,
        handleClose: () => setIsModalOpen(false),
        onConfirm: () => {
            // for maintaining extension state
            // if user closes it for pasting the seed
            dispatch(setAccountCreationStep(2));
            navigate(CONFIRM_SEED, {
                state: { seedToPass: location.seedToPass },
            });
        },
        style: {
            width: '300px',
            background: '#141414',
            position: 'relative',
            bottom: 30,
            p: 2,
            px: 2,
            pb: 2,
        },
        mainText: 'Warning',
        subText: `Proceeding will not let you view your 
        seed phrase again, once account creation process is
         finished. Do you still wish to continue?`,
    };

    return (
        <Wrapper>
            <Header
                centerText="Seed Phrase"
                backHandler={() => {
                    dispatch(setTempSeed(''));
                    dispatch(setAccountCreationStep(0));
                }}
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
                <div className="tooltip" {...contentCopyIcon}>
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
                <Button {...btn} />
            </div>
            <WarningModal {...warningModal} />
        </Wrapper>
    );
};

export default ShowSeed;
