import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useDispatch } from 'react-redux';
import { WarningModal } from '../../common/modals';

import { setAuthScreenModal } from '../../../redux/slices/modalHandling';
import {
    AccountDropDownInterface,
    DropdownOptionStyleInterface,
} from '../types';
import {
    ACCOUNT_DELETION_WARNING,
    CREATE_DERIVE_ACCOUNT_TEXT,
    EXPORT_ACCOUNT,
    REMOVE_ACCOUNT,
    RENAME_ACCOUNT,
    WARNING,
} from '../../../utils/app-content';
import { images } from '../../../utils';

const {
    RemoveIcon,
    FileUploadOutlinedIcon,
    derivedAccountIcon,
    renameAccountImage,
} = images;

const AccountDropDown: React.FunctionComponent<AccountDropDownInterface> = ({
    anchorEl,
    open,
    handleClose,
    account,
    deleteAccount,
    deriveAccount,
    setAuthModalFunction,
}) => {
    const dispatch = useDispatch();

    const [openWarnModal, setOpenWarnModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const authModalHandler = (authModalFunction: string): void => {
        setAuthModalFunction(authModalFunction);
        dispatch(setAuthScreenModal(true));
    };

    const warnModalHandler = (): void => {
        setOpenWarnModal(true);
    };

    const warningModal = {
        open: openWarnModal,
        handleClose: () => setOpenWarnModal(false),
        onConfirm: () => {
            setIsLoading(true);
            deleteAccount(account.publicKey);
            setOpenWarnModal(false);
            setIsLoading(false);
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

    const dropdownOptionStyle: DropdownOptionStyleInterface = {
        fontSize: '14px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: '160',
    };

    return (
        <>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                sx={{
                    borderRadius: '20px',
                    width: '160px',
                    height: '110px',
                    marginTop: '12px',
                }}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        bgcolor: 'none',
                        ml: 3.3,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                            mt: 10,
                        },
                        '& .MuiMenu-list': {
                            mt: -1,
                        },
                    },
                }}
                // classes={{ paper: classes.paperMenu }}
                // style={{ border: '1px solid #fff' }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                id="menu"
            >
                <Paper
                    id="paper"
                    style={{
                        width: '210px',
                        marginLeft: '-4.9rem',
                        marginTop: '-0.5rem',
                        backgroundColor: '#212121',
                        border: '0.9px solid #219A9A',
                        boxShadow: '0px 0px 20px 5px rgba(33, 154, 154, 0.08)',
                        borderRadius: '8px',
                    }}
                >
                    <MenuList id="menu-list">
                        {!account.parentAddress && (
                            <MenuItem
                                id="menu-item-1"
                                style={{ minHeight: '37px', color: '#fafafa' }}
                                onClick={() => {
                                    deriveAccount(
                                        account.publicKey,
                                        account.accountName
                                    );
                                }}
                                key={account.publicKey}
                            >
                                <ListItemIcon
                                    className="flexStart"
                                    style={{ color: '#fafafa' }}
                                >
                                    <img
                                        src={derivedAccountIcon}
                                        alt="create-account"
                                        width="14.55"
                                        height="15"
                                        style={{ marginTop: '0.15rem' }}
                                    />
                                    &nbsp; &nbsp;
                                    <span style={dropdownOptionStyle}>
                                        {CREATE_DERIVE_ACCOUNT_TEXT}
                                    </span>
                                </ListItemIcon>
                            </MenuItem>
                        )}

                        <MenuItem
                            id="menu-item-2"
                            style={{ minHeight: '37px', color: '#fafafa' }}
                            onClick={() => {
                                authModalHandler('RenameAccount');
                            }}
                            key={Math.random()}
                        >
                            <ListItemIcon
                                className="flexStart"
                                style={{ color: '#fafafa' }}
                            >
                                <img
                                    src={renameAccountImage}
                                    alt="rename-account"
                                    width="14.55"
                                    height="15"
                                    style={{ marginTop: '0.15rem' }}
                                />
                                &nbsp; &nbsp;
                                <span style={dropdownOptionStyle}>
                                    {RENAME_ACCOUNT}
                                </span>
                            </ListItemIcon>
                        </MenuItem>

                        <MenuItem
                            id="menu-item-3"
                            style={{ minHeight: '37px', color: '#fafafa' }}
                            onClick={() => {
                                authModalHandler('ExportAccount');
                            }}
                            key={Math.random()}
                        >
                            <ListItemIcon
                                className="flexStart"
                                style={{ color: '#fafafa' }}
                            >
                                <img
                                    src={FileUploadOutlinedIcon}
                                    alt="export-account"
                                    style={{ marginTop: '-0.2rem' }}
                                />
                                &nbsp; &nbsp;
                                <span style={dropdownOptionStyle}>
                                    {EXPORT_ACCOUNT}
                                </span>
                            </ListItemIcon>
                        </MenuItem>

                        <MenuItem
                            id="menu-item-4"
                            style={{ minHeight: '37px', color: '#fafafa' }}
                            onClick={warnModalHandler}
                            key={Math.random()}
                        >
                            <ListItemIcon
                                className="flexStart"
                                style={{ color: '#fafafa' }}
                            >
                                <img
                                    src={RemoveIcon}
                                    alt="remove-account"
                                    width="14.55"
                                    height="15"
                                    style={{ marginTop: '0.15rem' }}
                                />
                                &nbsp; &nbsp;
                                <span style={dropdownOptionStyle}>
                                    {REMOVE_ACCOUNT}
                                </span>
                            </ListItemIcon>
                        </MenuItem>
                    </MenuList>
                </Paper>
            </Menu>

            <WarningModal {...warningModal} />
        </>
    );
};
export default AccountDropDown;
