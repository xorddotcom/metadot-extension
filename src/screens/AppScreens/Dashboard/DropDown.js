/* eslint-disable max-len */
import React from 'react';
import Menu from '@mui/material/Menu';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ListItemIcon from '@mui/material/ListItemIcon';
// import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '../../../assets/images/icons/lock.svg';
import RemoveIcon from '../../../assets/images/icons/Remove.svg';
import ForumOutlinedIcon from '../../../assets/images/icons/support.svg';
import { resetAccountSlice, setLoggedIn } from '../../../redux/slices/account';
import { resetTransactions } from '../../../redux/slices/transactions';
// import SettingsOutlinedIcon from '../../../assets/images/icons/setting.svg';
// import FileUploadOutlinedIcon from '../../../assets/images/icons/export.svg';
// import FileDownloadOutlinedIcon from '../../../assets/images/icons/download.svg';
// import AddOutlinedIcon from '../../../assets/images/icons/add.svg';
// import PersonOutlinedIcon from '../../../assets/images/icons/user.svg';
// import ChevronRightOutlinedIcon from '../../../assets/images/icons/rightArrowIcon.svg';

const DropDown = ({
  open, handleClose, anchorEl, classes,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  return (
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
          marginTop: '-0.5rem',
          backgroundColor: '#212121',
          border: '0.9px solid #219A9A',
          boxShadow: '0px 0px 20px 5px rgba(33, 154, 154, 0.08)',
          borderRadius: '8px',
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
              dispatch(resetAccountSlice());
              dispatch(resetTransactions());
            }}
          >
            <ListItemIcon className="flexStart" style={{ color: '#fafafa' }}>
              <img
                src={RemoveIcon}
                alt="remove-account"
                width="14.55"
                height="15"
                style={{ marginTop: '0.15rem' }}
              />
                  &nbsp; &nbsp;
              <span style={{ fontSize: '0.85rem' }}>Remove Account</span>
            </ListItemIcon>
          </MenuItem>
          <MenuItem
            style={{ minHeight: '37px', color: '#fafafa' }}
            onClick={() => {
              console.log('abc');
              // const logOut = async () => {
              history.push('/Support');

              // };
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
        </MenuList>
      </Paper>
    </Menu>
  );
};
export default DropDown;
