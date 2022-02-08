/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { encodeAddress } from '@polkadot/util-crypto';
import RemoveIcon from '../../../assets/images/icons/Remove.svg';
import dropDownIcon from '../../../assets/images/icons/3Dots.svg';
import derivedIcon from '../../../assets/images/icons/deriveAccount.svg';
import exportIcon from '../../../assets/images/icons/export.svg';
import { fonts } from '../../../utils';
import accountUtils from '../../../utils/accounts';
import {
  Account,
  AccountCircle,
  AccountFlex,
  AccountMainText,
  AccountSubText,
  AccountText,
  DropDownContainer,
  DropDownIcon,
  DropDownList,
  DropDownListContainer,
  ListItem,
} from './styledComponent';
import { deleteAccount } from '../../../redux/slices/accounts';
import {
  resetAccountSlice,
  setAccountName,
  setPublicKey,
} from '../../../redux/slices/activeAccount';
import {
  setAuthScreenModal,
  setDerivedAccountModal,
} from '../../../redux/slices/modalHandling';
import { DerivedAccountModal } from '../../../components/modals';
import { AuthModal } from '../../../components';
import AccountDropDown from './accountDropDown';
import services from '../../../utils/services';

const { addressMapper } = services;
const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;
const { getJsonBackup } = accountUtils;

const AccountList = ({
  publicKey,
  accountName,
  margin,
  marginBottom,
  marginTop,
  accountActive,
  publicKeyy,
  account,
  derivedDropDown,
  childAccounts,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const ref = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const activeAccount = useSelector((state) => state.activeAccount);
  const { authScreenModal } = useSelector((state) => state.modalHandling);
  const accounts = useSelector((state) => state.accounts);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [checkDerivedAccount, setCheckDerivedAccount] = useState(null);

  console.log('childAccounts', childAccounts, publicKey);

  const isThisAParent = childAccounts.filter((cAcc) => cAcc.parentAddress === account.publicKey)
    .length > 0;
  console.log('The account having name ', accountName, isThisAParent);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (isOpen && ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    console.log('ref', ref);

    document.addEventListener('click', checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener('click', checkIfClickedOutside);
    };
  }, [isOpen]);

  console.log('check derivedDropDown check ', derivedDropDown);

  const checkDerivedAccountHandler = (data) => {
    setCheckDerivedAccount(data);
  };

  const expandModal = (project) => {
    setSelectedProject(project);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    const deleteActiveAccount = () => {
      if (accounts.length === 0) {
        dispatch(resetAccountSlice());
        history.push('/');
      }
    };
    deleteActiveAccount();
  }, [accounts]);

  const onOptionClicked = () => {
    console.clear();
    console.log('mark1');
    console.log('public key', { publicKey, publicKeyy });
    console.log('activeAccount.publicKey', activeAccount.publicKey, 'encoded ->', encodeAddress(activeAccount.publicKey, 42), publicKeyy === encodeAddress(activeAccount.publicKey, 42));
    console.log('mark3 this is going to delete', publicKeyy, Object.keys(accounts), Object.keys(accounts)[0] === publicKeyy);

    dispatch(deleteAccount(publicKeyy));
    if (publicKeyy === encodeAddress(activeAccount.publicKey, 42)) {
      console.log('mark3 again this is going to delete', publicKeyy, Object.keys(accounts), Object.keys(accounts)[0] === publicKeyy);
      if (Object.keys(accounts).length > 1) {
        if (Object.keys(accounts)[0] !== publicKeyy) {
          console.log('mark4 first this is going to SET', Object.values(accounts)[0].publicKey);
          accountActive(Object.values(accounts)[0].publicKey, Object.values(accounts)[0].accountName);
        } else {
          console.log('mark4 second this is going to SET', Object.values(accounts)[1].publicKey);
          accountActive(Object.values(accounts)[1].publicKey, Object.values(accounts)[1].accountName);
        }
      } else {
        console.log('mark5 else ran becuz of Object.keys(accounts).length > 1 ', Object.keys(accounts).length > 1);
        dispatch(resetAccountSlice());
      }
      history.push('/');
      setIsOpen(false);
    } else {
      console.log('no need for swithcing');
      history.push('/');
      setIsOpen(false);
    }
  };

  const downloadJson = async (address, password, sender = {}) => {
    console.log('address, password', address, password, account);
    await getJsonBackup(address, password);
    dispatch(setAuthScreenModal(false));
  };

  // account dropdown
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    Object.values(accounts).map((acc) => {
      if (acc.publicKey === publicKeyy) {
        setAnchorEl(event.currentTarget);
      }
      return null;
    });
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // account dropdown end
  return (
    <>
      <Account marginBottom={marginBottom} marginTop={marginTop}>
        <AccountFlex>
          <AccountCircle />
          <AccountText
            onClick={() => accountActive(publicKeyy, accountName)}
          >
            <AccountMainText
              className={mainHeadingfontFamilyClass}
            >
              {accountName}
            </AccountMainText>
            <AccountSubText className={subHeadingfontFamilyClass}>
              {publicKey}
            </AccountSubText>
          </AccountText>
        </AccountFlex>

        {/* 3 dots drop down */}

        <DropDownContainer className={mainHeadingfontFamilyClass}>
          <DropDownIcon
            // ref={ref}
            // onClick={() => setIsOpen((oldState) => !oldState)}
            onClick={handleClick}
          >
            <img src={dropDownIcon} alt="3-dots" />
          </DropDownIcon>

          {/* {isOpen && (
            <DropDownListContainer>
              <DropDownList>
                {
                  (!account.parentAddress && !isThisAParent)
                && (
                <ListItem
                  onClick={() => {
                    expandModal(account);
                  }}
                  key={publicKeyy}
                >
                  <img
                    src={derivedIcon}
                    alt="create-derive-account"
                    width="16"
                    height="17"
                    style={{ marginLeft: '1.2rem' }}
                  />
                  &nbsp; &nbsp;
                  <span style={{ fontSize: '0.85rem' }}>
                    Create Derive Account
                  </span>
                </ListItem>
                )
                }
                <ListItem
                  onClick={() => {
                    // history.push('/viewSeed');
                    dispatch(setDerivedAccountModal(true));
                    dispatch(setAuthScreenModal(true));
                  }}
                  key={Math.random()}
                >
                  <img
                    src={exportIcon}
                    alt="export-account"
                    width="16"
                    height="17"
                    style={{ marginLeft: '1.2rem' }}
                  />
                  &nbsp; &nbsp;
                  <span style={{ fontSize: '0.85rem' }}>Export Account</span>
                </ListItem>
                <ListItem onClick={() => onOptionClicked()} key={Math.random()}>
                  <img
                    src={RemoveIcon}
                    alt="remove-account"
                    width="16"
                    height="17"
                    style={{ marginLeft: '1.2rem' }}
                  />
                  &nbsp; &nbsp;
                  <span style={{ fontSize: '0.85rem' }}>Remove Account</span>
                </ListItem>
              </DropDownList>
            </DropDownListContainer>
          )} */}
        </DropDownContainer>

        <AccountDropDown
          anchorEl={anchorEl}
          open={open}
          key={accounts.publicKey}
          handleClose={handleClose}
          publicKey={selectedProject ? selectedProject.publicKey : null}
          account={account}
          expandModal={expandModal}
          publicKeyy={publicKeyy}
          onOptionClicked={onOptionClicked}
          isThisAParent={isThisAParent}
        />

        <DerivedAccountModal
          open={modalIsOpen}
          handleClose={closeModal}
          setModalIsOpen={setModalIsOpen}
          accountSeed={selectedProject ? selectedProject.seed : null}
          publicKey={selectedProject ? selectedProject.publicKey : null}
          setAccountNull={setSelectedProject}
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
      </Account>
      <AuthModal
        publicKey={account.publicKey}
        open={authScreenModal}
        handleClose={() => {
          dispatch(setAuthScreenModal(false));
        }}
        onConfirm={downloadJson}
      />
    </>
  );
};

export default AccountList;
