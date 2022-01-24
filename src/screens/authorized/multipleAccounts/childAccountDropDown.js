import React from 'react';
import Menu from '@mui/material/Menu';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';
import RemoveIcon from '../../../assets/images/icons/Remove.svg';
import viewSeedIcon from '../../../assets/images/icons/openEye.svg';
import {
  setAuthScreenModal,
  setDerivedAccountModal,
} from '../../../redux/slices/modalHandling';

const useStyles = makeStyles(() => ({
  customWidth: {
    '& div': {
      // this is just an example, you can use vw, etc.
      background: 'transparent',
      // border: '1px solid green',
    },
  },
}));

const ChildAccountDropDown = ({
  open,
  handleClose,
  anchorEl,
  //   publicKeyy,
  onOptionClicked,
}) => {
  // eslint-disable-next-line no-unused-vars
  const classes = useStyles();
  const dispatch = useDispatch();
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
          mt: 0.9,
          ml: 3.3,
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
          <MenuItem
            id="menu-item-2"
            style={{ minHeight: '37px', color: '#fafafa' }}
            onClick={() => {
              // history.push('/viewSeed');
              dispatch(setDerivedAccountModal(true));
              dispatch(setAuthScreenModal(true));
            }}
            key={Math.random()}
          >
            <ListItemIcon className="flexStart" style={{ color: '#fafafa' }}>
              <img
                src={viewSeedIcon}
                alt="lock-icon"
                style={{ marginTop: '-0.2rem' }}
              />
              &nbsp; &nbsp;
              <span style={{ fontSize: '0.85rem' }}>Export Account</span>
            </ListItemIcon>
          </MenuItem>

          <MenuItem
            id="menu-item-3"
            style={{ minHeight: '37px', color: '#fafafa' }}
            onClick={() => onOptionClicked()}
            key={Math.random()}
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
          {/* <MenuItem
            id="menu-item-3"
            style={{ minHeight: '37px', color: '#fafafa' }}
            key={Math.random()}
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
              <span style={{ fontSize: '0.85rem' }}>{publicKeyy}</span>
            </ListItemIcon>
          </MenuItem> */}
        </MenuList>
      </Paper>
    </Menu>
  );
};
export default ChildAccountDropDown;
