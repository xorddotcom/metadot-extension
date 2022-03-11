import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { Wrapper } from '../common/wrapper';

import { Header } from '../common';

import ParentMetaData from './components/parentMetaData';
import ChildMetaData from './components/childMetaData';

import {
    setIsResponseModalOpen,
    setMainTextForSuccessModal,
    setResponseImage,
    setSubTextForSuccessModal,
} from '../../redux/slices/modalHandling';
import { images } from '../../utils';
import accountsUtils from '../../utils/accounts';

import { DASHBOARD } from '../../constants';
import {
    DERIVED_ACCOUNT_HEADER,
    SUCCESSFULLY_DERIVED,
} from '../../utils/app-content';

const { ImportIcon } = images;

const { derive, derivePathValidation, validateAccount } = accountsUtils;

const CreateDerivedAccount: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation().state as {
        parentAddress: string;
        parentName: string;
        path: string;
    };

    const parentAddress = location.parentAddress && location.parentAddress;
    const parentName = location.parentName && location.parentName;
    const path = location.path && location.path;

    const [step, setStep] = useState(1);

    const [derivePath, setDerivePath] = useState(`//${path}`);
    const [parentPassword, setParentPassword] = useState('');
    const [deriveAddress, setDeriveAddress] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const showSuccessModalAndNavigateToDashboard = (): void => {
        dispatch(setIsResponseModalOpen(true));
        dispatch(setResponseImage(ImportIcon));
        dispatch(setMainTextForSuccessModal(SUCCESSFULLY_DERIVED));
        dispatch(setSubTextForSuccessModal(''));
        navigate(DASHBOARD);

        setTimeout(() => {
            dispatch(setIsResponseModalOpen(false));
        }, 2500);
    };

    return (
        <Wrapper height="650px">
            <Header
                centerText={DERIVED_ACCOUNT_HEADER}
                overWriteBackHandler={step === 2 ? () => setStep(1) : undefined}
                backHandler={() => console.log('go back')}
            />

            {step === 1 ? (
                <ParentMetaData
                    address={parentAddress}
                    accountName={parentName}
                    derivePath={derivePath}
                    setDerivePath={setDerivePath}
                    password={parentPassword}
                    setPassword={setParentPassword}
                    validateAccount={validateAccount}
                    derivePathValidation={derivePathValidation}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    setStep={setStep}
                    setDeriveAddress={setDeriveAddress}
                />
            ) : (
                <ChildMetaData
                    parentAddress={parentAddress}
                    derivePath={derivePath}
                    parentPassword={parentPassword}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    derive={derive}
                    deriveAddress={deriveAddress}
                    showSuccess={showSuccessModalAndNavigateToDashboard}
                />
            )}
        </Wrapper>
    );
};

export default CreateDerivedAccount;
