/* eslint-disable max-len */
import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ListItemIcon from '@mui/material/ListItemIcon';
import { DropDownMainText } from './styledComponents';
// import { setLoggedIn } from '../../../redux/slices/account';
// import Typography from '@mui/material/Typography';
import accountIcon from '../../../assets/images/icons/user.svg';
import LockOutlinedIcon from '../../../assets/images/icons/lock.svg';
import ForumOutlinedIcon from '../../../assets/images/icons/support.svg';
import aboutIcon from '../../../assets/images/icons/aboutIcon.svg';
import { About } from '../../../components/modals';
import { fonts } from '../../../utils';
// import viewSeedIcon from '../../../assets/images/icons/openEye.svg';
// import { resetAccountSlice, setLoggedIn } from '../../../redux/slices/activeAccount';
// import { resetTransactions } from '../../../redux/slices/transactions';
// eslint-disable-next-line no-unused-vars
import viewSeedIcon from '../../../assets/images/icons/openEye.svg';
import {
  setLoggedIn, setPublicKey, setAccountName,
} from '../../../redux/slices/activeAccount';
// eslint-disable-next-line no-unused-vars
import { deleteAccount } from '../../../redux/slices/accounts';

const { mainHeadingfontFamilyClass } = fonts;
// import SettingsOutlinedIcon from '../../../assets/images/icons/setting.svg';
// import FileUploadOutlinedIcon from '../../../assets/images/icons/export.svg';
// import FileDownloadOutlinedIcon from '../../../assets/images/icons/download.svg';
// import AddOutlinedIcon from '../../../assets/images/icons/add.svg';
// import PersonOutlinedIcon from '../../../assets/images/icons/user.svg';
// import ChevronRightOutlinedIcon from '../../../assets/images/icons/rightArrowIcon.svg';

const DropDown = ({
  // eslint-disable-next-line no-unused-vars
  open, handleClose, anchorEl, classes, activeAccount, accounts,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [aboutOpen, setAboutOpen] = useState(false);
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
        className={`${classes.customWidth} ${classes.flex}`}
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
            {/* <Typography style={{
        textAlign: 'center',
        fontWeight: '600',
        paddingTop: '0.8rem',
        color: '#fafafa',
      }}
      >
        My Profile
      </Typography>
      <MenuList>
        <MenuItem
          style={{ minHeight: '37px', color: 'rgba(250, 250, 250, 0.6)' }}
        >
          <ListItemIcon style={{ color: 'rgba(250, 250, 250, 0.6)' }} className="flexStart">
            <img src={PersonOutlinedIcon} alt="user-icon" />
                  &nbsp; &nbsp;
            <span style={{ fontSize: '0.9rem' }}>Accounts</span>
          </ListItemIcon>
          <img src={ChevronRightOutlinedIcon} alt="icon" style={{ marginLeft: '3.8rem', marginTop: '-0.4rem' }} />
        </MenuItem>
        <MenuItem style={{ minHeight: '37px', color: 'rgba(250, 250, 250, 0.6)' }}>
          <ListItemIcon className="flexStart" style={{ color: 'rgba(250, 250, 250, 0.6)' }}>
            <img src={AddOutlinedIcon} alt="add-icon" />
                  &nbsp; &nbsp;
            <span style={{ fontSize: '0.85rem' }}>Add Account</span>
          </ListItemIcon>
          <img src={ChevronRightOutlinedIcon} alt="icon" style={{ marginLeft: '2.85rem', marginTop: '-0.4rem' }} />
        </MenuItem>
        <MenuItem style={{ minHeight: '37px', color: 'rgba(250, 250, 250, 0.6)' }}>
          <ListItemIcon className="flexStart" style={{ color: 'rgba(250, 250, 250, 0.6)' }}>
            <img src={FileDownloadOutlinedIcon} alt="download-icon" />
                  &nbsp; &nbsp;
            <span style={{ fontSize: '0.85rem' }}>Import Account</span>
          </ListItemIcon>
          <img src={ChevronRightOutlinedIcon} alt="icon" style={{ marginLeft: '1.8rem', marginTop: '-0.4rem' }} />
        </MenuItem>
        <MenuItem style={{ minHeight: '37px', color: 'rgba(250, 250, 250, 0.6)' }}>
          <ListItemIcon className="flexStart" style={{ color: 'rgba(250, 250, 250, 0.6)' }}>
            <img src={FileUploadOutlinedIcon} alt="export-icon" />
                  &nbsp; &nbsp;
            <span style={{ fontSize: '0.85rem' }}>Export Account</span>
          </ListItemIcon>
          <img src={ChevronRightOutlinedIcon} alt="icon" style={{ marginLeft: '1.65rem', marginTop: '-0.4rem' }} />
        </MenuItem>
        <MenuItem style={{ minHeight: '37px', color: 'rgba(250, 250, 250, 0.6)' }}>
          <ListItemIcon className="flexStart" style={{ color: 'rgba(250, 250, 250, 0.6)' }}>
            <img src={ForumOutlinedIcon} alt="support-icon" />
                  &nbsp; &nbsp;
            <span style={{ fontSize: '0.85rem' }}>Support</span>
          </ListItemIcon>
          <img src={ChevronRightOutlinedIcon} alt="icon" style={{ marginLeft: '4.7rem', marginTop: '-0.4rem' }} />
        </MenuItem>
        <MenuItem style={{ minHeight: '37px', color: '#fafafa' }}>
          <ListItemIcon className="flexStart" style={{ color: '#fafafa' }}>
            <img src={SettingsOutlinedIcon} alt="setting-icon" />
                  &nbsp; &nbsp;
            <span style={{ fontSize: '0.85rem' }}>Setting</span>
          </ListItemIcon>
          <img src={ChevronRightOutlinedIcon} alt="icon" style={{ marginLeft: '5.04rem', marginTop: '-0.4rem' }} />
        </MenuItem> */}
            {Object.values(accounts).map((account) => (
              <MenuItem
                key={account.publicKey}
                id="menu-item-1"
                style={{ minHeight: '37px', color: '#fafafa' }}
                onClick={() => {
                  console.log('Testing something==>>', account);
                  // dispatch(setSeed(account.seed));
                  dispatch(setPublicKey(account.publicKey));
                  dispatch(setAccountName(account.accountName));
                }}
              >
                <ListItemIcon className="flexStart" style={{ color: '#fafafa' }}>
                  <img
                    src={LockOutlinedIcon}
                    alt="lock-icon"
                    style={{ marginTop: '-0.2rem' }}
                  />
                  &nbsp; &nbsp;
                  <span style={{ fontSize: '0.85rem' }}>{account.accountName}</span>
                  <button
                    type="button"
                    onClick={() => {
                      history.push(`/ImportWallet/${account.seed}`);
                    }}
                  >
                    D
                  </button>
                </ListItemIcon>
              </MenuItem>
            ))}

            <DropDownMainText className={mainHeadingfontFamilyClass}>
              My Profile
            </DropDownMainText>
            <MenuItem
              style={{ minHeight: '37px', color: '#fafafa', fontSize: '15px' }}
              onClick={() => {
                history.push('/accounts');
              }}
            >
              <ListItemIcon className="flexStart" style={{ color: '#fafafa' }}>
                <img
                  src={accountIcon}
                  alt="lock-icon"
                  style={{ marginTop: '-0.2rem' }}
                />
                  &nbsp; &nbsp;
                <span style={{ fontSize: '0.85rem' }}>Accounts</span>
              </ListItemIcon>
            </MenuItem>

            {/* <MenuItem
              style={{ minHeight: '37px', color: '#fafafa' }}
              onClick={() => {
                history.push('/viewSeed');
              }}
            >
              <ListItemIcon className="flexStart" style={{ color: '#fafafa' }}>
                <img
                  src={viewSeedIcon}
                  alt="lock-icon"
                  style={{ marginTop: '-0.2rem' }}
                />
                  &nbsp; &nbsp;
                <span style={{ fontSize: '0.85rem' }}>View Seed</span>
              </ListItemIcon>
            </MenuItem> */}

            <MenuItem
              style={{ minHeight: '37px', color: '#fafafa', fontSize: '15px' }}
              onClick={() => {
                history.push('/Support');
              }}
            >
              <ListItemIcon className="flexStart" style={{ color: '#fafafa' }}>
                <img
                  src={ForumOutlinedIcon}
                  alt="lock-icon"
                  style={{ marginTop: '-0.2rem' }}
                />
                     &nbsp; &nbsp;
                <span style={{ fontSize: '0.85rem' }}>Support</span>
              </ListItemIcon>
            </MenuItem>

            <MenuItem
              id="menu-item-1"
              style={{ minHeight: '37px', color: '#fafafa' }}
              onClick={() => {
                console.log('abc');
                // const logOut = async () => {
                console.log('Log Out working');
                dispatch(setLoggedIn(false));
                // };
              }}
            >
              <ListItemIcon className="flexStart" style={{ color: '#fafafa' }}>
                <img
                  src={LockOutlinedIcon}
                  alt="lock-icon"
                  style={{ marginTop: '-0.3rem' }}
                />
                  &nbsp; &nbsp;
                <span style={{ fontSize: '0.85rem' }}>Lock</span>
              </ListItemIcon>
            </MenuItem>

            <MenuItem
              id="menu-item-2"
              style={{ minHeight: '37px', color: '#fafafa' }}
              onClick={() => {
                history.push('/ImportWallet');
              }}
            >
              <ListItemIcon className="flexStart" style={{ color: '#fafafa' }}>
                <img
                  src={LockOutlinedIcon}
                  alt="remove-account"
                  width="14.55"
                  height="15"
                  style={{ marginTop: '0.15rem' }}
                />
                  &nbsp; &nbsp;
                <span style={{ fontSize: '0.85rem' }}>Add Account</span>
              </ListItemIcon>
            </MenuItem>
            {/* <MenuItem
            id="menu-item-2"
            style={{ minHeight: '37px', color: '#fafafa' }}
            onClick={() => {
              dispatch(deleteAccount(activeAccount));
              // dispatch(resetAccountSlice());
              // dispatch(resetTransactions());
              dispatch(setSeed(Object.values(accounts)[0].seed));
              dispatch(setPublicKey(Object.values(accounts)[0].publicKey));
              dispatch(setAccountName(Object.values(accounts)[0].accountName));
            }}
          >
            <ListItemIcon className="flexStart" style={{ color: '#fafafa' }}>
              <img
                src={RemoveIcon}
                alt="remove-account"
                width="14.55"
                height="15"
                style={{ marginTop: '0.15rem' }}
              /> */}

            <MenuItem
              id="menu-item-1"
              style={{ minHeight: '37px', color: '#fafafa', fontSize: '15px' }}
              onClick={() => {
                console.log('abc');
                // const logOut = async () => {
                console.log('Log Out working');
                dispatch(setLoggedIn(false));
                // };
              }}
            >
              <ListItemIcon className="flexStart" style={{ color: '#fafafa' }}>
                <img
                  src={LockOutlinedIcon}
                  alt="lock-icon"
                  style={{ marginTop: '-0.3rem', marginLeft: '-0.1rem' }}
                />
                  &nbsp; &nbsp;
                <span style={{ fontSize: '0.85rem' }}>Lock</span>
              </ListItemIcon>
            </MenuItem>

            <MenuItem
              style={{ minHeight: '37px', color: '#fafafa', fontSize: '15px' }}
              onClick={() => setAboutOpen(true)}
            >
              <ListItemIcon className="flexStart" style={{ color: '#fafafa' }}>
                <img
                  src={aboutIcon}
                  alt="lock-icon"
                  style={{ marginTop: '-0.2rem' }}
                />
                  &nbsp; &nbsp;
                <span style={{ fontSize: '0.85rem' }}>About</span>
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
          width: '78%',
          minHeight: 380,
          background: '#141414',
          padding: '0 20px',
          pb: 3,
          height: '320px',
          marginTop: '7rem',
        }}
      />
    </>
  );
};
export default DropDown;
