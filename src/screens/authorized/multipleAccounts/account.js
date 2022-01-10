/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import RemoveIcon from '../../../assets/images/icons/Remove.svg';
import dropDownIcon from '../../../assets/images/icons/3Dots.svg';
import derivedIcon from '../../../assets/images/icons/deriveAccount.svg';
import { fonts } from '../../../utils';
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
import { DerivedAccountModal } from '../../../components/modals';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

const AccountList = ({
  publicKey,
  accountName,
  margin,
  accountActive,
  accountSeed,
  publicKeyy,
  account,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const activeAccount = useSelector((state) => state.activeAccount);
  const accounts = useSelector((state) => state.accounts);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

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

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = () => {
    console.log('public key', { publicKey });
    if (publicKeyy === activeAccount.publicKey) {
      dispatch(deleteAccount(publicKeyy));
      // dispatch(setSeed(''));
      dispatch(setPublicKey(''));
      dispatch(setAccountName(''));
      // dispatch(setSeed(Object.values(accounts)[0].seed));
      dispatch(setPublicKey(Object.values(accounts)[0].publicKey));
      dispatch(setAccountName(Object.values(accounts)[0].accountName));
      history.push('/');
    }
    dispatch(deleteAccount(publicKeyy));
    history.push('/');
    setIsOpen(false);
  };

  return (
    <>
      <Account margin={margin}>
        <AccountFlex>
          <AccountCircle />
          <AccountText>
            <AccountMainText
              onClick={accountActive}
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
          <DropDownIcon onClick={toggling}>
            <img src={dropDownIcon} alt="3-dots" />
          </DropDownIcon>

          {isOpen && (
            <DropDownListContainer>
              <DropDownList>
                <ListItem
                  onClick={() => {
                    expandModal(account);
                  }}
                  key={publicKeyy}
                >
                  <img
                    src={derivedIcon}
                    alt="remove-account"
                    width="16"
                    height="17"
                    style={{ marginLeft: '1.2rem' }}
                  />
                  &nbsp; &nbsp;
                  <span style={{ fontSize: '0.85rem' }}>
                    Create Derive Account
                  </span>
                </ListItem>
                <ListItem
                  onClick={() => {
                    history.push('/viewSeed');
                  }}
                  key={Math.random()}
                >
                  <img
                    src={derivedIcon}
                    alt="remove-account"
                    width="16"
                    height="17"
                    style={{ marginLeft: '1.2rem' }}
                  />
                  &nbsp; &nbsp;
                  <span style={{ fontSize: '0.85rem' }}>View Seed</span>
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
          )}
        </DropDownContainer>

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

        {/* <DerivedModal
          key={publicKeyy}
          show={modalIsOpen}
          onClose={closeModal}
        >
          <div className="content">
            <img
              src="https://cdn.pixabay.com/photo/2015/01/09/11/11/office-594132__340.jpg"
              alt="Developer"
            />
            <div className="text">
              <h2>{selectedProject && selectedProject.publicKey}</h2>
              <p>
                {selectedProject && selectedProject.seed}
              </p>
            </div>
          </div>
        </DerivedModal> */}
      </Account>
    </>
  );
};

export default AccountList;
