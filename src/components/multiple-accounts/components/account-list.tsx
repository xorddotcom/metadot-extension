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
    renameAccount,
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
        accountName: string,
        parentAddress?: string
    ): void => {
        setDropDownData({ publicKey, accountName, parentAddress });
        setAnchorEl(event.currentTarget);
    };

    const closeAccountDropDownHandler = (): void => {
        setAnchorEl(null);
    };
    // account dropdown end

    return (
        <>
            {Object.values(accounts).map(
                ({ publicKey, accountName, parentAddress, childAccounts }) => {
                    return (
                        <>
                            <ParentAccount
                                publicKey={publicKey}
                                accountName={accountName}
                                parentAddress={parentAddress}
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
                deriveAccount={deriveAccount}
                setAuthModalFunction={setAuthModalFunction}
            />

            <AuthModal
                publicKey={dropDownData.publicKey}
                open={authScreenModal}
                handleClose={() => {
                    dispatch(setAuthScreenModal(false));
                }}
                functionType={authModalFunction}
                onConfirm={
                    // eslint-disable-next-line no-nested-ternary
                    authModalFunction === 'ExportAccount'
                        ? downloadJSON
                        : renameAccount
                }
                style={{
                    width: '290px',
                    background: '#141414',
                    position: 'relative',
                    bottom: 30,
                    px: 2,
                    pb: 3,
                }}
            />
        </>
    );
};

export default AccountList;
