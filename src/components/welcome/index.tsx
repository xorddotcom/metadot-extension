import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { fonts, accounts } from '../../utils';
import { MainHeading, SubHeading } from '../common/text';
import Button from '../common/button';

import './index.css';
import AddSharpIcon from '../../assets/images/icons/add.svg';
import DownloadIcon from '../../assets/images/icons/download.svg';
import AppLogo from '../../assets/images/logo.svg';
import metaDot from '../../assets/images/metadot.svg';

import {
    setAccountCreationStep,
    setTempSeed,
} from '../../redux/slices/activeAccount';

const { subHeadingfontFamilyClass } = fonts;
const { GenerateSeedPhrase } = accounts;

function Welcome(): JSX.Element | null {
    const location = useLocation().pathname;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { jsonFileUploadScreen, tempSeed, accountCreationStep } = useSelector(
        (state: RootState) => state.activeAccount
    );

    const [seedToPass, setSeedToPass] = useState('');

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
        dispatch(setTempSeed(seedToPass));
        dispatch(setAccountCreationStep(1));
        navigate('/ShowSeed', {
            state: { prevRoute: location, seedToPass },
        });
    };

    const importHandler = (): void => {
        navigate('/ImportWallet', {
            state: { seedToPass },
        });
    };

    const lastTime = localStorage.getItem('timestamp');

    const lastVisited = (Date.now() - Number(lastTime) || 0) / 1000;

    if (accountCreationStep === 1 && lastVisited < 90) {
        navigate('/ShowSeed', {
            state: { seedToPass: tempSeed },
        });
        return null;
    }

    if (accountCreationStep === 2 && tempSeed.length && lastVisited < 90) {
        navigate('/ConfirmSeed', {
            state: { seedToPass: tempSeed },
        });
        return null;
    }
    if (accountCreationStep === 3 && tempSeed.length && lastVisited < 90) {
        navigate('/createWallet', {
            state: { seedToPass: tempSeed },
        });
        return null;
    }

    if (jsonFileUploadScreen) {
        navigate('/ImportWallet');
    }
    return (
        <>
            <div className="app-logo1">
                <img src={AppLogo} alt="logo" />
            </div>

            <div className="main-content">
                <MainHeading textAlign="center">
                    <img src={metaDot} alt="metadot" />
                </MainHeading>
                <SubHeading
                    className={subHeadingfontFamilyClass}
                    textAlign="center"
                >
                    Your Gateway To Polkadot And Its Parachains.
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
