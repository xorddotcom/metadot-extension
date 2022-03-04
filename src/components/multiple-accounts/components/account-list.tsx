import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import DerivedAccountModal from './derive-modal';
import AccountDropDown from './account-dropdown';
import { AccountListInterface } from '../types';
import { RootState } from '../../../redux/store';
import ParentAccount from './parent-account';
import DerivedAccounts from './derived-accounts';
import { AuthModal } from '../../common/modals';
import { setAuthScreenModal } from '../../../redux/slices/modalHandling';

const AccountList: React.FunctionComponent<AccountListInterface> = ({
    accounts,
    activateAccount,
    deleteAccount,
    downloadJSON,
}) => {
    const { authScreenModal } = useSelector(
        (state: RootState) => state.modalHandling
    );

    const dispatch = useDispatch();

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [dropDownData, setDropDownData] = useState<{
        publicKey: string;
        accountName: string;
        parentAddress?: string;
    }>({ publicKey: '', accountName: '', parentAddress: '' });

    const expandModal = (account: any): void => {
        setDropDownData(account);
        setModalIsOpen(true);
    };

    const closeModal = (): void => {
        setModalIsOpen(false);
    };

    // account dropdown
    const [anchorEl, setAnchorEl] = useState<any>(null);
    const open = Boolean(anchorEl);

    const openAccountDropDownHandler = (
        event: any,
        publicKey: string,
        accountName: string
    ): void => {
        setDropDownData({ publicKey, accountName });
        setAnchorEl(event.currentTarget);
    };

    const closeAccountDropDownHandler = (): void => {
        setAnchorEl(null);
    };
    // account dropdown end

    return (
        <>
            {accounts.map(({ publicKey, accountName, childAccounts }) => {
                return (
                    <>
                        <ParentAccount
                            publicKey={publicKey}
                            accountName={accountName}
                            activateAccount={activateAccount}
                            openAccountDropDownHandler={
                                openAccountDropDownHandler
                            }
                        />
                        ;
                        {childAccounts.length > 0 && (
                            <DerivedAccounts
                                accounts={childAccounts}
                                activateAccount={activateAccount}
                                openAccountDropDownHandler={
                                    openAccountDropDownHandler
                                }
                            />
                        )}
                    </>
                );
            })}

            <AccountDropDown
                anchorEl={anchorEl}
                open={open}
                handleClose={closeAccountDropDownHandler}
                account={dropDownData}
                expandModal={expandModal}
                deleteAccount={deleteAccount}
                isThisAParent
            />

            <DerivedAccountModal
                open={modalIsOpen}
                handleClose={closeModal}
                publicKey={dropDownData ? dropDownData.publicKey : ''}
                style={{
                    width: '300px',
                    background: '#141414',
                    position: 'relative',
                    bottom: 30,
                    p: 2,
                    px: 2,
                    pb: 3,
                    marginTop: '10rem',
                }}
            />
            <AuthModal
                publicKey={dropDownData.publicKey}
                open={authScreenModal}
                handleClose={() => {
                    dispatch(setAuthScreenModal(false));
                }}
                onConfirm={downloadJSON}
            />
        </>
    );
};

export default AccountList;
