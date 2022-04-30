import React from 'react';

import { useSelector } from 'react-redux';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import MainCard from './components/MainCard';
import SelectFeature from './components/SelectFeature';
import AssetsAndTransactions from './components/Tabs';
import DropDown from './components/Dropdown';
import { SelectNetwork, TxDetails } from '../common/modals';

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
import { RootState } from '../../redux/store';

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
        prefix,
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

    const { tokenImage } = useSelector(
        (state: RootState) => state.activeAccount
    );

    const api = useSelector((state: RootState) => state);

    const allMainnetsName = [
        'Polkadot',
        'Kusama',
        'Karura',
        'Astar',
        'Shiden',
        'Acala',
    ];
    const chainNameAltered = allMainnetsName.includes(chainName)
        ? `${chainName} Main Network`
        : `${chainName} Test Network`;

    return (
        <Wrapper pb>
            <DashboardHeader>
                <LogoContainer>
                    <img
                        src={MainLogo}
                        width="30px"
                        height="34px"
                        alt="Metadot Logo"
                        role="presentation"
                    />
                </LogoContainer>

                <NetworkContainer>
                    <SelectChain
                        onClick={() =>
                            !apiInitializationStarts && setIsModalOpen(true)
                        }
                        disabled={!!apiInitializationStarts}
                    >
                        <img
                            src={tokenImage}
                            alt="chain"
                            width="16px"
                            height="16px"
                            style={{
                                borderRadius: '50%',
                                marginRight: '5px',
                            }}
                        />
                        <SelectedChain className={subHeadingfontFamilyClass}>
                            {chainNameAltered}
                        </SelectedChain>
                        <ArrowDropDownIcon
                            id="arrow-drop-down-icon"
                            style={{ height: '100%' }}
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
                    handleClickOnAccountSettings={handleClickOnAccountSettings}
                    // classes={classes}
                />
                {/* Menu End */}
            </DashboardHeader>
            <MainCard
                balance={balance}
                tokenName={tokenName}
                address={publicKey}
                prefix={prefix}
                balanceInUsd={balanceInUsd || 0}
                accountName={accountName}
            />

            <SelectFeature />
            <AssetsAndTransactions
                handleOpenTxDetailsModal={() => setIsTxDetailsModalOpen(true)}
                setTxDetailsModalData={setTxDetailsModalData}
                transactionData={transactionData}
            />

            <SelectNetwork
                open={isModalOpen}
                handleClose={() => {
                    resetState();
                    setIsModalOpen(false);
                }}
                modalState={modalState}
                resetState={resetState}
                handleClickForOthers={handleSelection}
                handleClickForKusama={handleSelectionOnKusamaMainNetwork}
                style={{
                    position: 'relative',
                    width: '285px',
                    background: '#141414',
                    pb: 3,
                    overflowY: 'scroll',
                    overflowX: 'hidden',
                    marginBottom: '220px',
                }}
                isLoading={isLoading}
            />
            <TxDetails
                open={isTxDetailsModalOpen}
                handleClose={() => setIsTxDetailsModalOpen(false)}
                txDetailsModalData={txDetailsModalData}
                style={{
                    width: '315px',
                    background: '#141414',
                    position: 'relative',
                    p: 2,
                    px: 2,
                    pb: 3,
                    maxHeight: `calc(100vh - 80px)`,
                    overflowY: 'scroll',
                }}
            />
        </Wrapper>
    );
};

export default DashboardView;
