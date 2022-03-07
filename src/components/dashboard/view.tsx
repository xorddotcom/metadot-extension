import React from 'react';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MainCard from './components/MainCard';
import AssetsAndTransactions from './components/Tabs';
import DropDown from './components/Dropdown';
import { SelectNetwork, TxDetails, About } from '../common/modals';
import { getAuthList } from '../../messaging';

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
import { setWalletConnected } from '../../redux/slices/activeAccount';

import useDispatcher from '../../hooks/useDispatcher';
import { DashboardViewProps } from './types';
import { RootState } from '../../redux/store';

const { MainLogo } = images;
const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

const DashboardView: React.FunctionComponent<DashboardViewProps> = (props) => {
    const generalDispatcher = useDispatcher();
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

    const navigate = useNavigate();

    const { tokenImage } = useSelector(
        (state: RootState) => state.activeAccount
    );

    const allMainnetsName = ['Polkadot', 'Kusama', 'Karura'];
    const chainNameAltered = allMainnetsName.includes(chainName)
        ? `${chainName} Main Network`
        : `${chainName} Test Network`;

    function check(arr: any, sub: any): any {
        console.log(sub, '|||||', arr);
        const sub2 = sub.toLowerCase();
        return arr.filter((str: any) =>
            str
                .toLowerCase()
                .startsWith(sub2.slice(0, Math.max(str.length - 1, 1)))
        );
    }

    // const getOpenTab = async (): Promise<any> => {
    //     chrome.tabs.query({ active: true,
    // lastFocusedWindow: true }, (tabs) => {
    //         const { url } = tabs[0];
    //         // console.log('Url', url);
    //         return url;
    //         // use `url` here inside the callback because it's asynchronous!
    //     });
    // };
    // const test = async (): Promise<void> => {
    //     let url: any;
    //     const arr: any = [];
    //     const res: any = await getAuthList();
    //     console.log('res', res);
    //     //         Object.values(res.list).filter((site)=>{
    //     // site.url
    //     //         })
    //     Object.values(res.list).map((site: any) =>
    //         console.log('site', site.url)
    //     );
    //     console.log('res.list', res.list[url]);
    //     chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    //         url = tabs[0].url;
    //         // console.log('Url', url);
    //         // const array = Object.keys(res.list);
    //         // console.log('Array', array);

    //         Object.values(res.list).map((site: any) => arr.push(site.url));
    //         const isAllowed = check(arr, url);
    //         if (isAllowed.length === 0) console.log('now allowed', isAllowed);
    //         else generalDispatcher(() => setWalletConnected(true));

    //         // use `url` here inside the callback because it's asynchronous!
    //     });
    // };

    return (
        <Wrapper pb>
            <DashboardHeader>
                <LogoContainer>
                    <img
                        src={MainLogo}
                        width="30px"
                        height="34px"
                        alt="Metadot Logo"
                        onClick={() => navigate('/swap')}
                        onKeyDown={() => navigate('/swap')}
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
                    handleClickOnAccountSettings={handleClickOnAccountSettings}
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
