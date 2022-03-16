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

    const contentCopyIconDivProps = {
        id: 'copy-seed',
        onClick: () => {
            copySeedText();
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
