/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Menu from '@mui/material/Menu';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import RemoveIcon from '../../../assets/images/icons/Remove.svg';
import viewSeedIcon from '../../../assets/images/icons/openEye.svg';
import derivedAccountIcon from '../../../assets/images/icons/deriveAccount.svg';
// import { resetAccountSlice } from '../../../redux/slices/activeAccount';
// import { resetTransactions } from '../../../redux/slices/transactions';
// import { deleteAccount } from '../../../redux/slices/accounts';
import {
  setAccountName, setPublicKey,
} from '../../../redux/slices/activeAccount';

const AccountDropDown = ({
  open,
  handleClose,
  anchorEl,
  classes,
  derivedAccount,
  accountPublicKey,
}) => {
  console.log('account public key in Account drop down', accountPublicKey);
  // const dispatch = useDispatch();
  const history = useHistory();
  // const accounts = useSelector((state) => state.accounts);
  // const activeAccount = useSelector((state) => state.activeAccount);
  // eslint-disable-next-line no-unused-vars
  const [addresss, setAddresss] = useState(accountPublicKey);
  // eslint-disable-next-line no-unused-vars
  const [state, setState] = useState('');
  // useEffect(() => {
  //   console.log('accounts changed bhai', accounts[activeAccount.publicKey]);
  //   if (accounts.length === 0) {
  //     dispatch(setSeed(''));
  //     dispatch(setPublicKey(''));
  //     dispatch(setAccountName(''));
  //     history.push('/');
  //   } else if (accounts[activeAccount.publicKey] === undefined) {
  //     console.log('accounts changed active ki', accounts);
  //     dispatch(setSeed(Object.values(accounts)[0].seed));
  //     dispatch(setPublicKey(Object.values(accounts)[0].publicKey));
  //     dispatch(setAccountName(Object.values(accounts)[0].accountName));
  //   }
  // }, [accounts]);

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
            onClick={derivedAccount}
          >
            <ListItemIcon className="flexStart" style={{ color: '#fafafa' }}>
              <img
                src={derivedAccountIcon}
                alt="remove-account"
                width="14.55"
                height="15"
                style={{ marginTop: '0.15rem' }}
              />
                  &nbsp; &nbsp;
              <span style={{ fontSize: '0.85rem' }}>Create Derive Account</span>
            </ListItemIcon>
          </MenuItem>

          <MenuItem
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
          </MenuItem>

          {/* {Object.values(accounts).map((account) => {
            if (account.publicKey === activeAccount.publicKey) {
              return (
                <MenuItem
                  id="menu-item-2"
                  style={{ minHeight: '37px', color: '#fafafa' }}
                  onClick={() => {
                    if (account.publicKey === activeAccount.publicKey) {
                      setState(account);
                    }
                    // dispatch(resetAccountSlice());
                    // dispatch(resetTransactions());
                    // dispatch(deleteAccount(account.publicKey));
                    // history.push('/');
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
              );
            }
            return null;
          })} */}

          <MenuItem
            id="menu-item-2"
            style={{ minHeight: '37px', color: '#fafafa' }}
            onClick={() => {
              console.log('Hiiiiiiii', addresss);
              // setState1(accountPublicKey);
              // Object.values(accounts).map((account) => {
              //   // setState(accounts);
              //   if (accountPublicKey === account.publicKey) {
              //     setState(account.publicKey);
              //   }
              //   return null;
              // });
              // dispatch(resetAccountSlice());
              // dispatch(resetTransactions());
              // dispatch(deleteAccount(account.publicKey));
              // history.push('/');
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
              <span style={{ fontSize: '0.85rem' }}>{accountPublicKey}</span>
            </ListItemIcon>
          </MenuItem>
          <button
            type="button"
            onClick={() => {
              console.log('abc abc', accountPublicKey);
            }}
          >
            abc

          </button>

          {console.log('check state', state)}
          {/* {console.log('check public key', state1)} */}

        </MenuList>
      </Paper>
    </Menu>
  );
};
export default AccountDropDown;
