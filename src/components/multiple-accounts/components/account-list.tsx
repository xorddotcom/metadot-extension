import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

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
    deriveAccount,
}) => {
    const { authScreenModal } = useSelector(
        (state: RootState) => state.modalHandling
    );

    const dispatch = useDispatch();

    const [dropDownData, setDropDownData] = useState<{
        publicKey: string;
        accountName: string;
        parentAddress?: string;
    }>({ publicKey: '', accountName: '', parentAddress: '' });
    const [authModalFunction, setAuthModalFunction] = useState('');

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
            {Object.values(accounts).map(
                ({ publicKey, accountName, childAccounts }) => {
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
                }
            )}

            <AccountDropDown
                anchorEl={anchorEl}
                open={open}
                handleClose={closeAccountDropDownHandler}
                account={dropDownData}
                deleteAccount={deleteAccount}
                isThisAParent
                setAuthModalFunction={setAuthModalFunction}
            />

            <AuthModal
                publicKey={dropDownData.publicKey}
                open={authScreenModal}
                handleClose={() => {
                    dispatch(setAuthScreenModal(false));
                }}
                onConfirm={
                    authModalFunction === 'DownloadJson'
                        ? downloadJSON
                        : deriveAccount
                }
            />
        </>
    );
};

export default AccountList;
