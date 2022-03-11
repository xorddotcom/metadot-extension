import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { helpers } from '../../utils';

import { IMPORT_WALLET, SHOW_SEED } from '../../constants';
import WelcomeView from './view';

const { openOptions } = helpers;

const Welcome: React.FunctionComponent = (): JSX.Element | null => {
    const navigate = useNavigate();
    const { jsonFileUploadScreen } = useSelector(
        (state: RootState) => state.activeAccount
    );

    const createHandler = (): void => {
        const url = `${chrome.extension.getURL('index.html')}#${SHOW_SEED}`;
        openOptions(url);
    };

    const importHandler = (): void => navigate(IMPORT_WALLET);

    if (jsonFileUploadScreen) {
        navigate(IMPORT_WALLET);
    }
    return (
        <WelcomeView
            importHandler={importHandler}
            createHandler={createHandler}
        />
    );
};

export default Welcome;
