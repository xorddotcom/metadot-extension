import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { DASHBOARD, SEEDPHRASE_WARNING } from '../../constants';
import ShowSeedView from './view';
import accounts from '../../utils/accounts';

const { GenerateSeedPhrase } = accounts;

const ShowSeed: React.FunctionComponent = () => {
    const navigate = useNavigate();

    const [newPhrase, setNewPhrase] = useState('');
    useEffect(() => {
        const newSeed = GenerateSeedPhrase();
        setNewPhrase(newSeed);
    }, []);

    const [copy, setCopy] = useState('Copy');

    const currSeed = newPhrase;

    const copySeedText = (): void => {
        navigator.clipboard.writeText(currSeed);
        setCopy('Copied');
    };

    function getJsonBackup(seedPhrase: string): void {
        try {
            const jsonContent = seedPhrase;

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
            console.log('error in backup func', e);
        }
    }

    const contentCopyIconDivProps = {
        id: 'copy-seed',
        onClick: () => {
            copySeedText();
            getJsonBackup(currSeed);
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
        handleClick: () =>
            navigate(SEEDPHRASE_WARNING, { state: { newPhrase } }),
    };

    return (
        <ShowSeedView
            copy={copy}
            currSeed={currSeed}
            continueBtnProps={continueBtnProps}
            contentCopyIconDivProps={contentCopyIconDivProps}
            backHandler={() => {
                navigate(DASHBOARD);
            }}
        />
    );
};

export default ShowSeed;
