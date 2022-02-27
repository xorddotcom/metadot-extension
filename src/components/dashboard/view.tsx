import React from 'react';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import MainCard from './components/MainCard';
import AssetsAndTransactions from './components/Tabs';
import DropDown from './components/Dropdown';
import { SelectNetwork, TxDetails, About } from '../common/modals';

import {
    AccountContainer,
    AccountSetting,
    AccountText,
    DashboardHeader,
    LogoContainer,
    NetworkContainer,
    SelectChain,
    SelectedChain,
    Wrapper,
} from './styledComponents';

import { fonts, images } from '../../utils';

import { DashboardViewProps } from './types';

const { MainLogo } = images;
const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

const DashboardView: React.FunctionComponent<DashboardViewProps> = (props) => {
    const {
        isLoading,
        transactionData,
        txDetailsModalData,
        setTxDetailsModalData,
        isTxDetailsModalOpen,
        setIsTxDetailsModalOpen,
        publicKey,
        chainName,
        balance,
        balanceInUsd,
        tokenName,
        accountName,
        isModalOpen,
        setIsModalOpen,
        modalState,
        resetState,
        handleSelectionOnKusamaMainNetwork,
        handleSelection,
        anchorEl,
        open,
        handleClickOnAccountSettings,
        handleCloseDropDown,
        apiInitializationStarts,
    } = props;

    // --------XXXXXXXXXXXXXXX-----------

    const ifKusama = chainName.includes('Kusama')
        ? `${chainName} Main Network`
        : `${chainName} Network`;

    return (
        <Wrapper pb>
            <DashboardHeader>
                <LogoContainer>
                    <img
                        src={MainLogo}
                        width="30px"
                        height="34px"
                        alt="Metadot Logo"
                    />
                </LogoContainer>

                <NetworkContainer>
                    <SelectChain
                        onClick={() =>
                            !apiInitializationStarts && setIsModalOpen(true)
                        }
                        disabled={!!apiInitializationStarts}
                    >
                        <SelectedChain className={subHeadingfontFamilyClass}>
                            {chainName.includes('Network')
                                ? chainName
                                : ifKusama}
                        </SelectedChain>
                        <ArrowDropDownIcon
                            id="arrow-drop-down-icon"
                            style={{ fontSize: '1.7rem' }}
                        />
                    </SelectChain>
                </NetworkContainer>
                <AccountContainer id="account-container">
                    <AccountSetting
                        id="account-setting"
                        onClick={handleClickOnAccountSettings}
                    >
                        <AccountText
                            id="account-text"
                            className={mainHeadingfontFamilyClass}
                        >
                            {accountName.slice(0, 1)}
                        </AccountText>
                    </AccountSetting>
                </AccountContainer>

                {/* Menu Start */}
                <DropDown
                    anchorEl={anchorEl}
                    open={open}
                    handleClose={handleCloseDropDown}
                    // classes={classes}
                />
                {/* Menu End */}
            </DashboardHeader>

            <MainCard
                balance={balance}
                tokenName={tokenName}
                address={publicKey}
                balanceInUsd={balanceInUsd || 0}
                accountName={accountName}
            />

            <AssetsAndTransactions
                handleOpenTxDetailsModal={() => setIsTxDetailsModalOpen(true)}
                setTxDetailsModalData={setTxDetailsModalData}
                transactionData={transactionData}
            />

            <SelectNetwork
                open={isModalOpen}
                handleClose={() => setIsModalOpen(false)}
                modalState={modalState}
                resetState={resetState}
                handleClickForOthers={handleSelection}
                handleClickForKusama={handleSelectionOnKusamaMainNetwork}
                style={{
                    position: 'relative',
                    width: '300px',
                    background: '#141414',
                    pb: 3,
                    overflowY: 'scroll',
                    overflowX: 'hidden',
                    marginTop: '9rem',
                }}
                isLoading={isLoading}
            />
            <TxDetails
                open={isTxDetailsModalOpen}
                handleClose={() => setIsTxDetailsModalOpen(false)}
                txDetailsModalData={txDetailsModalData}
                style={{
                    width: '300px',
                    background: '#141414',
                    position: 'relative',
                    p: 2,
                    px: 2,
                    pb: 3,
                }}
            />
            <About
                open={false}
                handleClose={() => console.log(false)}
                style={{
                    position: 'relative',
                    width: '300px',
                    minHeight: 380,
                    background: '#141414',
                    padding: '0 20px',
                    pb: 3,
                    height: '320px',
                    marginTop: '7rem',
                }}
            />
        </Wrapper>
    );
};

export default DashboardView;
