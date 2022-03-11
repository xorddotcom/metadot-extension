/* eslint-disable no-unused-expressions */
import React, { useState } from 'react';

import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { encodeAddress } from '@polkadot/util-crypto';

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
    resetAccountSlice,
    setAccountCreationStep,
    setAccountName,
    setPublicKey,
    setTempSeed,
} from '../../../../redux/slices/activeAccount';
import {
    ACCOUNT_DELETION_WARNING,
    WARNING,
} from '../../../../utils/app-content';

import { setAuthScreenModal } from '../../../../redux/slices/modalHandling';

import { MyAccountsProps } from './types';
import { RootState } from '../../../../redux/store';
import accounts from '../../../../utils/accounts';
import services from '../../../../utils/services';
import WarningModal from '../warningModal';
import AuthModal from '../authorization';
import { resetTransactions } from '../../../../redux/slices/transactions';
import useDispatcher from '../../../../hooks/useDispatcher';
import {
    ACCOUNTS,
    CREATE_DERIVED_ACCOUNT,
    DASHBOARD,
    IMPORT_WALLET,
    SHOW_SEED,
} from '../../../../constants';

const {
    crossIcon,
    visibilityOn,
    renameAccountImage,
    RemoveIcon,
    FileUploadOutlinedIcon,
    derivedAccountIcon,
    FileDownloadOutlinedIcon,
    AddSharpIcon,
} = images;
const { mainHeadingfontFamilyClass } = fonts;
const { deleteAccount, renameAccount, GenerateSeedPhrase } = accounts;

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

    const warnModalHandler = (e: boolean): void => {
        setOpenWarnModal(e);
    };

    // Account Handlers
    const activateAccountHandler = (pk: string, name: string): void => {
        generalDispatcher(() => setPublicKey(pk));
        generalDispatcher(() => setAccountName(name));
        generalDispatcher(() => resetTransactions());
        navigate(DASHBOARD);
    };

    const deleteAccountHandler = async (publicKey: string): Promise<void> => {
        await deleteAccount(publicKey);
        if (publicKey === activeAccount.publicKey) {
            if (Object.keys(allAccounts).length > 1) {
                if (Object.keys(allAccounts)[0] !== publicKey) {
                    activateAccountHandler(
                        Object.values(allAccounts)[0].publicKey,
                        Object.values(allAccounts)[0].accountName
                    );
                } else {
                    activateAccountHandler(
                        Object.values(allAccounts)[1].publicKey,
                        Object.values(allAccounts)[1].accountName
                    );
                }
            } else {
                generalDispatcher(() => resetAccountSlice());
            }
            navigate(DASHBOARD);
        } else {
            navigate(DASHBOARD);
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
        const newSeed = await GenerateSeedPhrase();
        dispatch(setAccountCreationStep(1));
        dispatch(setTempSeed(newSeed));
        navigate(SHOW_SEED, {
            state: { seedToPass: newSeed },
        });
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
            name: 'Create Account',
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
            image: FileDownloadOutlinedIcon,
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
                        {accountOptions.map((account: any) => (
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
                                        className={mainHeadingfontFamilyClass}
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
