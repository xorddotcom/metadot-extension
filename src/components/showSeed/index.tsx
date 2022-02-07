/* eslint-disable no-unused-vars */
/* eslint import/no-cycle: [2, { maxDepth: 1 }] */
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ContentCopyIcon from '../../assets/images/icons/copyIcon.svg';
import { CopyIcon, CopyText, IndexText, SeedText, SeedWrapper } from './styles';
import { Wrapper, UnAuthScreensContentWrapper } from '../common/wrapper';
import { MainHeading, SubHeading } from '../common/text';
import { WarningModal } from '../common/modals';
import { Header, Button } from '../common';

import { fonts } from '../../utils';

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
    const navigate: any = useNavigate();
    const location: any = useLocation();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [copy, setCopy] = useState('Copy');

    let currSeed = '';

    if (navigate.entries[navigate.entries.length - 2].pathname === '/') {
        currSeed = location.state.seedToPass && location.state.seedToPass;
    }

    if (
        navigate.entries[navigate.entries.length - 2].pathname ===
            '/accounts' ||
        navigate.entries[navigate.entries.length - 2].pathname === '/ShowSeed'
    ) {
        currSeed = location.state.seedToPass && location.state.seedToPass;
    }

    const copySeedText = (): void => {
        navigator.clipboard.writeText(currSeed);
        setCopy('Copied');
    };

    const contentCopyIcon = {
        id: 'copy-seed',
        onClick: copySeedText,
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
            navigate('/ConfirmSeed', {
                state: { seedToPass: location.state.seedToPass },
            });
        },
        style: {
            width: '290px',
            background: '#141414',
            position: 'relative',
            bottom: 30,
            p: 2,
            px: 2,
            pb: 3,
        },
        mainText: 'Warning',
        subText:
            'Proceeding will not let you view your mnemonic again. Do you still wish to continue?',
    };

    return (
        <Wrapper>
            <Header
                centerText="Seed Phrase"
                backHandler={() => console.log('goBack')}
            />
            <div style={{ marginTop: '29px' }}>
                <MainHeading className={mainHeadingfontFamilyClass}>
                    Write down your seed phrase :
                </MainHeading>
                <SubHeading className={subHeadingfontFamilyClass}>
                    To ensure backup a mnemonic is required. It would be used to
                    access your wallet in future. Please write down this
                    mnemonic and memorize it. Once your sentence has been set,
                    it cannot be viewed again. Losing the mnemonic may cause
                    permanent asset loss. Taking screenshots is not encouraged.
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
