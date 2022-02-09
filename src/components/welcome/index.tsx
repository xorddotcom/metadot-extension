import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { fonts, accounts } from '../../utils';
import { MainHeading, SubHeading } from '../common/text';
import Button from '../common/button';

import './index.css';
import AddSharpIcon from '../../assets/images/icons/add.svg';
import DownloadIcon from '../../assets/images/icons/download.svg';
import AppLogo from '../../assets/images/logo.svg';
import metaDot from '../../assets/images/metadot.svg';

const { subHeadingfontFamilyClass } = fonts;
const { GenerateSeedPhrase } = accounts;

function Welcome(): JSX.Element {
    const location = useLocation().pathname;
    const navigate = useNavigate();
    const { jsonFileUploadScreen } = useSelector(
        (state: RootState) => state.activeAccount
    );

    const [seedToPass, setSeedToPass] = useState('');

    console.log('location on welcome.js ============>>>', {
        jsonFileUploadScreen,
    });

    useEffect(() => {
        try {
            const newSeed = GenerateSeedPhrase();
            setSeedToPass(newSeed);
        } catch (error) {
            console.log(
                'ERROR while generating new seed for parent account',
                error
            );
        }
    }, []);

    const createHandler = (): void => {
        navigate('/ShowSeed', {
            state: { prevRoute: location, seedToPass },
        });
    };

    const importHandler = (): void => {
        navigate('/ImportWallet', {
            state: { seedToPass },
        });
    };

    if (jsonFileUploadScreen) {
        navigate('/ImportWallet');
    }
    return (
        <>
            <div className="app-logo1">
                <img src={AppLogo} alt="logo" />
            </div>

            <div className="main-content">
                <MainHeading>
                    <img src={metaDot} alt="metadot" />
                </MainHeading>
                <SubHeading className={subHeadingfontFamilyClass}>
                    Passion, Progress, Polkadot
                </SubHeading>
            </div>

            <div
                className="btn-wrapper"
                style={{ marginLeft: '0', marginBottom: 0 }}
            >
                <Button
                    id="btn-create"
                    text="Create"
                    width="270px"
                    StartIcon={AddSharpIcon}
                    handleClick={createHandler}
                />
                <div style={{ margin: '0.5rem' }} />
                <Button
                    id="btn-import"
                    cancel
                    text="Import"
                    width="270px"
                    StartIcon={DownloadIcon}
                    handleClick={importHandler}
                />
            </div>
        </>
    );
}

export default Welcome;
