import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Menu from '@mui/material/Menu';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';

import { setLoggedIn } from '../../../../redux/slices/activeAccount';
import { setAuthScreenModal } from '../../../../redux/slices/modalHandling';

import { About, AuthModal } from '../../../common/modals';
import { fonts, images } from '../../../../utils';
import account from '../../../../utils/accounts';

import { DropDownMainText } from '../../styledComponents';
import { DropDownProps } from '../../types';
import { RootState } from '../../../../redux/store';
import { ACCOUNTS, IMPORT_WALLET, SUPPORT } from '../../../../constants';
import {
    MY_PROFILE,
    ACCOUNTS_HEADING,
    IMPORT_ACCOUNT,
    EXPORT_ACCOUNT,
    SUPPORT_TEXT,
    ABOUT_TEXT,
    LOCK_TEXT,
} from '../../../../utils/app-content';

const {
    accountIcon,
    LockOutlinedIcon,
    ForumOutlinedIcon,
    aboutIcon,
    FileUploadOutlinedIcon,
    FileDownloadOutlinedIcon,
} = images;
const { mainHeadingfontFamilyClass } = fonts;
const { getJsonBackup } = account;

const DropDown: React.FunctionComponent<DropDownProps> = ({
    open,
    handleClose,
    anchorEl,
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { modalHandling } = useSelector((state: RootState) => state);
    const { publicKey } = useSelector(
        (state: RootState) => state.activeAccount
    );

    const [aboutOpen, setAboutOpen] = useState(false);

    const downloadJson = async (
        address: string,
        password: string
    ): Promise<void> => {
        await getJsonBackup(address, password);
        dispatch(setAuthScreenModal(false));
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
                }}
                // className={`${classes.customWidth} ${classes.flex}`}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        bgcolor: 'none',
                        mt: 2.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                id="menu"
            >
                <Paper
                    id="paper"
                    style={{
                        width: '210px',
                        marginLeft: '-2.6rem',
                        marginTop: '-1rem',
                        backgroundColor: '#212121',
                        border: '0.9px solid #219A9A',
                        boxShadow: '0px 0px 20px 5px rgba(33, 154, 154, 0.08)',
                        borderRadius: '8px',
                        paddingBottom: '0.7rem',
                    }}
                >
                    <MenuList id="menu-list">
                        <DropDownMainText
                            className={mainHeadingfontFamilyClass}
                        >
                            {MY_PROFILE}
                        </DropDownMainText>
                        <MenuItem
                            style={{
                                minHeight: '37px',
                                color: '#fafafa',
                                fontSize: '15px',
                            }}
                            onClick={() => {
                                navigate(ACCOUNTS);
                            }}
                        >
                            <ListItemIcon
                                className="flexStart"
                                style={{ color: '#fafafa' }}
                            >
                                <img
                                    src={accountIcon}
                                    alt="lock-icon"
                                    style={{ marginTop: '-0.2rem' }}
                                />
                                &nbsp; &nbsp;
                                <span style={{ fontSize: '0.85rem' }}>
                                    {ACCOUNTS_HEADING}
                                </span>
                            </ListItemIcon>
                        </MenuItem>

                        <MenuItem
                            id="menu-item-2"
                            style={{ minHeight: '37px', color: '#fafafa' }}
                            onClick={() => {
                                navigate(IMPORT_WALLET);
                            }}
                        >
                            <ListItemIcon
                                className="flexStart"
                                style={{ color: '#fafafa' }}
                            >
                                <img
                                    src={FileDownloadOutlinedIcon}
                                    alt="download-icon"
                                    style={{ marginTop: '-0.2rem' }}
                                />
                                &nbsp; &nbsp;
                                <span style={{ fontSize: '0.85rem' }}>
                                    {IMPORT_ACCOUNT}
                                </span>
                            </ListItemIcon>
                        </MenuItem>

                        <MenuItem
                            style={{
                                minHeight: '37px',
                                color: 'rgba(250, 250, 250, 0.6)',
                            }}
                            onClick={() => dispatch(setAuthScreenModal(true))}
                        >
                            <ListItemIcon
                                className="flexStart"
                                style={{ color: '#fafafa' }}
                            >
                                <img
                                    src={FileUploadOutlinedIcon}
                                    alt="export-icon"
                                    style={{ marginTop: '-0.2rem' }}
                                />
                                &nbsp; &nbsp;
                                <span style={{ fontSize: '0.85rem' }}>
                                    {EXPORT_ACCOUNT}
                                </span>
                            </ListItemIcon>
                        </MenuItem>

                        <MenuItem
                            style={{
                                minHeight: '37px',
                                color: '#fafafa',
                                fontSize: '15px',
                            }}
                            onClick={() => {
                                navigate(SUPPORT);
                            }}
                        >
                            <ListItemIcon
                                className="flexStart"
                                style={{ color: '#fafafa' }}
                            >
                                <img
                                    src={ForumOutlinedIcon}
                                    alt="lock-icon"
                                    style={{ marginTop: '-0.2rem' }}
                                />
                                &nbsp; &nbsp;
                                <span style={{ fontSize: '0.85rem' }}>
                                    {SUPPORT_TEXT}
                                </span>
                            </ListItemIcon>
                        </MenuItem>

                        <MenuItem
                            style={{
                                minHeight: '37px',
                                color: '#fafafa',
                                fontSize: '15px',
                            }}
                            onClick={() => setAboutOpen(true)}
                        >
                            <ListItemIcon
                                className="flexStart"
                                style={{ color: '#fafafa' }}
                            >
                                <img
                                    src={aboutIcon}
                                    alt="lock-icon"
                                    style={{ marginTop: '-0.2rem' }}
                                />
                                &nbsp; &nbsp;
                                <span style={{ fontSize: '0.85rem' }}>
                                    {ABOUT_TEXT}
                                </span>
                            </ListItemIcon>
                        </MenuItem>

                        <MenuItem
                            id="menu-item-1"
                            style={{ minHeight: '37px', color: '#fafafa' }}
                            onClick={() => {
                                dispatch(setLoggedIn(false));
                            }}
                        >
                            <ListItemIcon
                                className="flexStart"
                                style={{ color: '#fafafa' }}
                            >
                                <img
                                    src={LockOutlinedIcon}
                                    alt="lock-icon"
                                    style={{ marginTop: '-0.3rem' }}
                                />
                                &nbsp; &nbsp;
                                <span style={{ fontSize: '0.85rem' }}>
                                    {LOCK_TEXT}
                                </span>
                            </ListItemIcon>
                        </MenuItem>
                    </MenuList>
                </Paper>
            </Menu>

            {/* About Modal */}
            <About
                open={aboutOpen}
                handleClose={() => setAboutOpen(false)}
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
            <AuthModal
                publicKey={publicKey}
                open={modalHandling.authScreenModal}
                handleClose={() => {
                    dispatch(setAuthScreenModal(false));
                }}
                onConfirm={downloadJson}
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
export default DropDown;
