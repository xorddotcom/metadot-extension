/* eslint-disable no-unused-expressions */
import React, { useState } from 'react';

import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import {
    CloseIconDiv,
    HorizontalContentDiv,
    NetworkModalContent,
    OptionRow,
    OptionText,
    PlainIcon,
    Title,
    TitleDiv,
} from './styles';
import { fonts, images } from '../../../../utils';

import {
    setAccountCreationStep,
    setTempSeed,
} from '../../../../redux/slices/activeAccount';
import {
    ACCOUNT_DELETION_WARNING,
    WARNING,
} from '../../../../utils/app-content';

import { MyAccountsProps } from './types';
import { RootState } from '../../../../redux/store';
import accounts from '../../../../utils/accounts';
import WarningModal from '../warningModal';
import AuthModal from '../authorization';

const { crossIcon, visibilityOn } = images;
const { mainHeadingfontFamilyClass } = fonts;
const { deleteAccount, renameAccount, GenerateSeedPhrase } = accounts;

const MyAccounts: React.FunctionComponent<MyAccountsProps> = (props) => {
    const { open, handleClose, style, onSelection } = props;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [openWarnModal, setOpenWarnModal] = useState(false);
    const [authScreenModal, setAuthScreenModal] = useState(false);

    // const activeAccount: any = useSelector(
    //     (state: RootState['activeAccount']) => activeAccount
    // );

    const currentUser = useSelector((state: RootState) => state);
    const { activeAccount } = currentUser;

    const warnModalHandler = (e: boolean): void => {
        console.log('warn modal handler working ====>>');
        setOpenWarnModal(e);
    };

    // const renameAccount = (e: boolean): any => {
    //     return (
    //         <AuthModal
    //             publicKey={activeAccount.publicKey}
    //             open={e}
    //             handleClose={() => {
    //                 dispatch(setAuthScreenModal(false));
    //             }}
    //             // functionType={authModalFunction}
    //             onConfirm={renameAccount}
    //             style={{
    //                 width: '290px',
    //                 background: '#141414',
    //                 position: 'relative',
    //                 bottom: 30,
    //                 px: 2,
    //                 pb: 3,
    //             }}
    //         />
    //     );
    // };

    const warningModal = {
        open: openWarnModal,
        handleClose: () => setOpenWarnModal(false),
        onConfirm: () => {
            deleteAccount(activeAccount.publicKey);
        },
        style: {
            width: '290px',
            background: '#141414',
            position: 'relative',
            bottom: 30,
            p: 2,
            px: 2,
            pb: 3,
        },
        mainText: WARNING,
        subText: ACCOUNT_DELETION_WARNING,
    };

    const accountCreation = (): void => {
        const newSeed = GenerateSeedPhrase();
        // setSeedToPass(newSeed);
        dispatch(setAccountCreationStep(1));
        dispatch(setTempSeed(newSeed));
        navigate('/show-seed', {
            state: { newSeed },
        });
    };

    const arr = [
        { name: 'View Accounts', image: visibilityOn, navigation: '/accounts' },
        {
            name: 'Add Account',
            image: visibilityOn,
            modal: () => accountCreation(),
        },
        { name: 'New Derive Account', navigation: '' },
        { name: 'Import Account', navigation: '/import-wallet' },
        {
            name: 'Export Account',
            modal: (e: boolean) => setAuthScreenModal(e),
        },
        { name: 'Rename Account', modal: () => setAuthScreenModal(true) },
        { name: 'Remove Account', modal: (e: boolean) => warnModalHandler(e) },
    ];

    return (
        <Modal open={open} onClose={handleClose} className="Dark-bg-network">
            <Box
                sx={style}
                className="select-network-modal-style network-scrollbar"
            >
                <div>
                    <TitleDiv>
                        <Title className={mainHeadingfontFamilyClass}>
                            Accounts
                        </Title>
                        <CloseIconDiv onClick={() => handleClose()}>
                            <img src={crossIcon} alt="cross icon" />
                        </CloseIconDiv>
                    </TitleDiv>
                    <NetworkModalContent>
                        <WarningModal {...warningModal} />
                        {/* {allAccounts.map((account) => (
                            <OptionRow
                                className="abc"
                                onClick={() => onSelection(account)}
                            >
                                <HorizontalContentDiv>
                                    <PlainIcon />
                                    <OptionText
                                        className={mainHeadingfontFamilyClass}
                                    >F
                                        {account.accountName}
                                    </OptionText>
                                </HorizontalContentDiv>
                            </OptionRow>
                        ))} */}
                        <AuthModal
                            publicKey={activeAccount.publicKey}
                            open={authScreenModal}
                            handleClose={() => {
                                dispatch(setAuthScreenModal(false));
                            }}
                            functionType="renameAccount"
                            onConfirm={renameAccount}
                            style={{
                                width: '290px',
                                background: '#141414',
                                position: 'relative',
                                bottom: 30,
                                px: 2,
                                pb: 3,
                            }}
                        />
                        );
                        {arr.map((account: any) => (
                            <OptionRow
                                className="abc"
                                onClick={() => onSelection(account.name)}
                            >
                                <HorizontalContentDiv>
                                    <PlainIcon />
                                    <OptionText
                                        className={mainHeadingfontFamilyClass}
                                        onClick={() => {
                                            console.log('click', account);
                                            account.navigation
                                                ? navigate(account.navigation)
                                                : dispatch(account.modal(true));
                                        }}
                                    >
                                        {account.name}
                                    </OptionText>
                                </HorizontalContentDiv>
                            </OptionRow>
                        ))}
                    </NetworkModalContent>
                </div>
            </Box>
        </Modal>
    );
};

export default MyAccounts;
