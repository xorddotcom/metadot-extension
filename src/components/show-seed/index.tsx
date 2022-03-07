import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
    setAccountCreationStep,
    setTempSeed,
} from '../../redux/slices/activeAccount';

import { RootState } from '../../redux/store';
import { CONFIRM_SEED, SEEDPHRASE_WARNING } from '../../constants';
import useDispatcher from '../../hooks/useDispatcher';
import ShowSeedView from './view';
import { COPY_SEED_WARNING, WARNING } from '../../utils/app-content';

const ShowSeed: React.FunctionComponent = () => {
    const navigate = useNavigate();
    const generalDispatcher = useDispatcher();
    const location = useLocation().state as {
        prevRoute: string;
        seedToPass: string;
    };

    const { tempSeed } = useSelector((state: RootState) => state.activeAccount);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [copy, setCopy] = useState('Copy');

    const currSeed = tempSeed;

    const copySeedText = (): void => {
        navigator.clipboard.writeText(currSeed);
        setCopy('Copied');
    };

    function getJsonBackup(seedPhrase: string): void {
        try {
            const jsonContent = seedPhrase;
            console.log('jsonContent', jsonContent);

            // ***Download JSON file***
            const fileName = 'seed';
            const data = JSON.stringify(jsonContent);
            const blob = new Blob([data], { type: 'application/json' });
            const href = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = href;
            link.download = `${fileName}.txt`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            // ***Download JSON file***
        } catch (e) {
            console.log('e in backup func', e);
        }
    }

    const contentCopyIconDivProps = {
        id: 'copy-seed',
        onClick: () => {
            copySeedText();
            getJsonBackup(currSeed);
            // for maintaining extension state
            // if user closes it for pasting the seed
            generalDispatcher(() => setTempSeed(currSeed));
        },
        onMouseOver: () => setCopy('Copy'),
        style: { cursor: 'pointer' },
    };

    const continueBtnProps = {
        id: 'seed-continue',
        text: 'Continue',
        style: {
            width: '100%',
            height: 50,
            borderRadius: 40,
        },
        handleClick: () => navigate(SEEDPHRASE_WARNING),
    };

    const warningModal = {
        open: isModalOpen,
        handleClose: () => setIsModalOpen(false),
        onConfirm: () => {
            // for maintaining extension state
            // if user closes it for pasting the seed
            generalDispatcher(() => setAccountCreationStep(2));
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
        mainText: WARNING,
        subText: COPY_SEED_WARNING,
    };

    return (
        <ShowSeedView
            warningModal={warningModal}
            copy={copy}
            currSeed={currSeed}
            continueBtnProps={continueBtnProps}
            contentCopyIconDivProps={contentCopyIconDivProps}
            backHandler={() => {
                generalDispatcher(() => setTempSeed(''));
                generalDispatcher(() => setAccountCreationStep(0));
            }}
        />
    );
};

export default ShowSeed;
