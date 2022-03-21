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

import { About, AuthModal, AccountOptions } from '../../../common/modals';
import { fonts, helpers, images } from '../../../../utils';
import account from '../../../../utils/accounts';
import services from '../../../../utils/services';

import { DropDownMainText } from '../../styledComponents';
import { DropDownProps } from '../../types';
import { RootState } from '../../../../redux/store';
import {
    ACCOUNTS,
    DASHBOARD,
    IMPORT_WALLET,
    SUPPORT,
} from '../../../../constants';
import {
    MY_PROFILE,
    ACCOUNTS_HEADING,
    IMPORT_ACCOUNT,
    EXPORT_ACCOUNT,
    SUPPORT_TEXT,
    ABOUT_TEXT,
    LOCK_TEXT,
} from '../../../../utils/app-content';
import manageAccess from '../../../../assets/images/icons/manage_access_logo.svg';
import constants from '../../../../constants/onchain';

const {
    accountIcon,
    LockOutlinedIcon,
    ForumOutlinedIcon,
    aboutIcon,
    rightArrowIcon,
    externalLink,
    expandView,
} = images;
const { mainHeadingfontFamilyClass } = fonts;
const { getJsonBackup } = account;
const { openOptions } = helpers;
const { addressMapper } = services;

const {
    CONTEXTFREE_CONFIG,
    POLKADOT_CONFIG,
    KUSAMA_CONFIG,
    SHIDEN_CONFIG,
    KARURA_CONFIG,
    WESTEND_CONFIG,
    ASTAR_CONFIG,
    SHIBUYA_CONFIG,
    ACALA_CONFIG,
} = constants;

const DropDown: React.FunctionComponent<DropDownProps> = (props) => {
    const { open, handleClose, anchorEl } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { modalHandling } = useSelector((state: RootState) => state);
    const { publicKey, chainName, prefix } = useSelector(
        (state: RootState) => state.activeAccount
    );

    const [openAccountsOptions, setOpenAccountsOptions] = useState(false);
    const [aboutOpen, setAboutOpen] = useState(false);

    const downloadJson = async (
        address: string,
        password: string
    ): Promise<boolean> => {
        const res = await getJsonBackup(address, password);
        if (!res) return false;
        return true;
    };

    const onSelection = (): void => {
        handleClose();
    };

    const getURl = (address: string): string => {
        const chains = [
            CONTEXTFREE_CONFIG,
            POLKADOT_CONFIG,
            KUSAMA_CONFIG,
            SHIDEN_CONFIG,
            KARURA_CONFIG,
            WESTEND_CONFIG,
            ASTAR_CONFIG,
            SHIBUYA_CONFIG,
            ACALA_CONFIG,
        ];

        const currentChain = chains.filter((chain) => chain.name === chainName);

        const url = currentChain[0].explorer.length
            ? `${currentChain[0].explorer}account/${addressMapper(
                  address,
                  prefix
              )}`
            : `https://polkadot.subscan.io/account/${addressMapper(
                  address,
                  prefix
              )}`;

        return url;
    };

    return (
        <>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                // onClick={handleClose}
                sx={{
                    borderRadius: '20px',
                    height: '280px',
                    width: '160px',
                    marginTop: '-1px',
                }}
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
                <AccountOptions
                    open={openAccountsOptions}
                    handleClose={() => setOpenAccountsOptions(false)}
                    style={{
                        position: 'relative',
                        width: '275px',
                        background: '#141414',
                        pb: 3,
                        overflowY: 'scroll',
                        overflowX: 'hidden',
                        marginBottom: '30vh',
                    }}
                    onSelection={onSelection}
                    // open, handleClose, style, onSelection
                    // onSelection={() => setOpenAccountsOptions(true)}
                    closeDropDown={handleClose}
                />
                <Paper
                    id="paper"
                    style={{
                        width: '247px',
                        marginLeft: '-120px',
                        marginTop: '-16px',
                        backgroundColor: '#141414',
                        border: '0.9px solid #219A9A',
                        boxShadow: '0px 0px 20px 5px rgba(33, 154, 154, 0.08)',
                        borderRadius: '8px',
                        paddingBottom: '11.2px',
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
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}
                            onClick={() => {
                                setOpenAccountsOptions(true);
                            }}
                        >
                            <ListItemIcon
                                className="flexStart"
                                style={{ color: '#fafafa' }}
                            >
                                <img
                                    src={accountIcon}
                                    alt="lock-icon"
                                    style={{
                                        marginTop: '-3.2px',
                                        marginLeft: '5px',
                                    }}
                                />
                                &nbsp; &nbsp;
                                <span
                                    style={{
                                        fontSize: '14px',
                                        marginLeft: '7px',
                                    }}
                                >
                                    {ACCOUNTS_HEADING}
                                </span>
                            </ListItemIcon>
                            <img
                                src={rightArrowIcon}
                                alt="lock-icon"
                                style={{
                                    marginTop: '-3.2px',
                                }}
                            />
                        </MenuItem>

                        <MenuItem
                            style={{
                                minHeight: '37px',
                                color: '#fafafa',
                                fontSize: '15px',
                            }}
                            onClick={() => {
                                const url = `${chrome.extension.getURL(
                                    'index.html'
                                )}#${DASHBOARD}`;
                                openOptions(url);
                            }}
                        >
                            <ListItemIcon
                                className="flexStart"
                                style={{ color: '#fafafa' }}
                            >
                                <img
                                    src={expandView}
                                    alt="lock-icon"
                                    style={{
                                        marginTop: '-3.2px',
                                        marginLeft: '5px',
                                    }}
                                />
                                &nbsp; &nbsp;
                                <span
                                    style={{
                                        fontSize: '14px',
                                        marginLeft: '7px',
                                    }}
                                >
                                    Expand view
                                </span>
                            </ListItemIcon>
                        </MenuItem>
                        <MenuItem
                            style={{
                                minHeight: '37px',
                                color: '#fafafa',
                                fontSize: '15px',
                            }}
                            onClick={() => window.open(getURl(publicKey))}
                        >
                            <ListItemIcon
                                className="flexStart"
                                style={{ color: '#fafafa' }}
                            >
                                <img
                                    src={externalLink}
                                    alt="lock-icon"
                                    style={{
                                        marginTop: '-3.2px',
                                        marginLeft: '5px',
                                    }}
                                />
                                &nbsp; &nbsp;
                                <span
                                    style={{
                                        fontSize: '14px',
                                        marginLeft: '7px',
                                    }}
                                >
                                    View on Explorer
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
                                navigate('/manageAccess');
                            }}
                        >
                            <ListItemIcon
                                className="flexStart"
                                style={{ color: '#fafafa' }}
                            >
                                <img
                                    src={manageAccess}
                                    alt="lock-icon"
                                    style={{
                                        marginTop: '-3.2px',
                                        marginLeft: '5px',
                                    }}
                                />
                                &nbsp; &nbsp;
                                <span
                                    style={{
                                        fontSize: '14px',
                                        marginLeft: '7px',
                                    }}
                                >
                                    Manage Website Access
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
                                    style={{
                                        marginTop: '-3.2px',
                                        marginLeft: '5px',
                                    }}
                                />
                                &nbsp; &nbsp;
                                <span
                                    style={{
                                        fontSize: '14px',
                                        marginLeft: '7px',
                                    }}
                                >
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
                                    style={{
                                        marginTop: '-3.2px',
                                        marginLeft: '5px',
                                    }}
                                />
                                &nbsp; &nbsp;
                                <span
                                    style={{
                                        fontSize: '14px',
                                        marginLeft: '7px',
                                    }}
                                >
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
                                    style={{
                                        marginTop: '-4.8px',
                                        marginLeft: '5px',
                                    }}
                                />
                                &nbsp; &nbsp;
                                <span
                                    style={{
                                        fontSize: '14px',
                                        marginLeft: '7px',
                                    }}
                                >
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
                    marginTop: '112px',
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
