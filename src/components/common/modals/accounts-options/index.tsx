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
    Title,
    TitleDiv,
} from './styles';
import { fonts, helpers, images } from '../../../../utils';

import {
    resetAccountSlice,
    setAccountName,
    setPublicKey,
} from '../../../../redux/slices/activeAccount';
import { resetAccountsSlice } from '../../../../redux/slices/accounts';
import { ACCOUNT_DELETION_WARNING } from '../../../../utils/app-content';

import { setAuthScreenModal } from '../../../../redux/slices/modalHandling';

import { MyAccountsProps } from './types';
import { RootState } from '../../../../redux/store';
import accounts from '../../../../utils/accounts';
import WarningModal from '../warningModal';
import AuthModal from '../authorization';
import useDispatcher from '../../../../hooks/useDispatcher';
import {
    ACCOUNTS,
    CREATE_DERIVED_ACCOUNT,
    DASHBOARD,
    IMPORT_WALLET,
    SHOW_SEED,
    WELCOME,
} from '../../../../constants';

const {
    crossIcon,
    visibilityOn,
    renameAccountImage,
    RemoveIcon,
    FileUploadOutlinedIcon,
    derivedAccountIcon,
    Importicon,
    AddSharpIcon,
} = images;
const { mainHeadingfontFamilyClass } = fonts;
const { deleteAccount, renameAccount } = accounts;
const { openOptions } = helpers;

const MyAccounts: React.FunctionComponent<MyAccountsProps> = (props) => {
    const { open, handleClose, style, onSelection, closeDropDown } = props;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const generalDispatcher = useDispatcher();

    const [openWarnModal, setOpenWarnModal] = useState(false);
    const [showRenameAccountModal, setShowRenameAccountModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const currentUser = useSelector((state: RootState) => state);
    const { accounts: allAccounts } = currentUser;
    const { activeAccount } = currentUser;

    const checkIfDerivedAccount = (): boolean => {
        if (
            activeAccount.publicKey &&
            allAccounts[activeAccount.publicKey]?.parentAddress
        )
            return true;
        return false;
    };

    const warnModalHandler = (e: boolean): void => {
        setOpenWarnModal(e);
    };

    const deleteAccountHandler = async (publicKey: string): Promise<void> => {
        await deleteAccount(publicKey);
        if (Object.values(allAccounts).length === 1) {
            dispatch(resetAccountsSlice());
            dispatch(resetAccountSlice());
            navigate(WELCOME);
        }
    };

    const warningModal = {
        open: openWarnModal,
        handleClose: () => setOpenWarnModal(false),
        onConfirm: () => {
            setIsLoading(true);
            deleteAccountHandler(activeAccount.publicKey);
            setOpenWarnModal(false);
            handleClose();
            onSelection();
            setIsLoading(true);
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
        mainText: 'Remove Account',
        subText: ACCOUNT_DELETION_WARNING,
        isLoading,
    };

    const accountCreation = async (): Promise<void> => {
        const url = `${chrome.extension.getURL('index.html')}#${SHOW_SEED}`;
        openOptions(url);
    };

    const newDeriveAccount = (): void => {
        const filteredArray = Object.values(allAccounts).filter(
            (singleAccount) =>
                activeAccount.publicKey === singleAccount.parentAddress
        );

        navigate(CREATE_DERIVED_ACCOUNT, {
            state: {
                parentAddress: activeAccount.publicKey,
                parentName: activeAccount.accountName,
                path: filteredArray.length.toString(),
            },
        });
    };

    const accountOptions = [
        { name: 'View Accounts', image: visibilityOn, navigation: ACCOUNTS },
        {
            name: 'Add Account',
            image: AddSharpIcon,
            modal: () => accountCreation(),
        },
        {
            name: 'Derive an Account',
            image: derivedAccountIcon,
            modal: () => newDeriveAccount,
        },
        {
            name: 'Import Account',
            image: Importicon,
            navigation: IMPORT_WALLET,
        },
        {
            name: 'Export Account',
            image: FileUploadOutlinedIcon,
            modal: (e: boolean) => setAuthScreenModal(e),
        },
        {
            name: 'Rename Account',
            image: renameAccountImage,
            modal: () => setShowRenameAccountModal(true),
        },
        {
            name: 'Remove Account',
            image: RemoveIcon,
            modal: (e: boolean) => warnModalHandler(e),
        },
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
                        <AuthModal
                            publicKey={activeAccount.publicKey}
                            open={showRenameAccountModal}
                            handleClose={() => {
                                setShowRenameAccountModal(false);
                                dispatch(setAuthScreenModal(false));
                                handleClose();
                                closeDropDown();
                            }}
                            functionType="RenameAccount"
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
                        {accountOptions.map((account: any) => {
                            if (
                                account.name === 'Derive an Account' &&
                                checkIfDerivedAccount()
                            )
                                return null;

                            return (
                                <OptionRow
                                    className="abc"
                                    onClick={() => {
                                        account.navigation
                                            ? navigate(account.navigation)
                                            : dispatch(account.modal(true));
                                    }}
                                >
                                    <HorizontalContentDiv>
                                        <img src={account.image} alt="icon" />
                                        <OptionText
                                            className={
                                                mainHeadingfontFamilyClass
                                            }
                                        >
                                            {account.name}
                                        </OptionText>
                                    </HorizontalContentDiv>
                                </OptionRow>
                            );
                        })}
                    </NetworkModalContent>
                </div>
            </Box>
        </Modal>
    );
};

export default MyAccounts;
