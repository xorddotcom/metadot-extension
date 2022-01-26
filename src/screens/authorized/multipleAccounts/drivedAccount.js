/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { deleteAccount } from '../../../redux/slices/accounts';
import {
  setAccountName,
  setPublicKey,
} from '../../../redux/slices/activeAccount';
import {
  Account,
  AccountCircle,
  AccountFlex,
  AccountMainText,
  AccountSubText,
  AccountText,
  Border,
  DrivedAccount,
  DrivedAccountMain,
  DrivedAccountText,
  DropDownContainer,
  DropDownIcon,
  DropDownList,
  ListItem,
  DropDownListContainer,
} from './styledComponent';
import { fonts, helpers } from '../../../utils';
import downIcon from '../../../assets/images/icons/downArrow.svg';
import upArrowIcon from '../../../assets/images/icons/upArrow.svg';
import RemoveIcon from '../../../assets/images/icons/Remove.svg';
import dropDownIcon from '../../../assets/images/icons/3Dots.svg';
import exportIcon from '../../../assets/images/icons/export.svg';
import ChildAccountDropDown from './childAccountDropDown';

const { subHeadingfontFamilyClass, mainHeadingfontFamilyClass } = fonts;
const { addressModifier } = helpers;

const DrivedAccountList = ({
  childAccount,
  childAccountActive,
  checkDrivedDropdownOpen,
}) => {
  console.log('childAccount inside++++++++', childAccount);
  const { publicKey } = childAccount;
  const ref = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const activeAccount = useSelector((state) => state.activeAccount);
  const accounts = useSelector((state) => state.accounts);

  const [drivedDropDownOpen, setdrivedDropDownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (isOpen && ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener('click', checkIfClickedOutside);
    };
  }, [isOpen]);

  const onOptionClicked = () => {
    console.log('ran!!!!!', publicKey, activeAccount.publicKey);
    if (publicKey === activeAccount.publicKey) {
      dispatch(deleteAccount(publicKey));
      // dispatch(setSeed(''));
      dispatch(setPublicKey(''));
      dispatch(setAccountName(''));
      // dispatch(setSeed(Object.values(accounts)[0].seed));
      dispatch(setPublicKey(Object.values(accounts)[0].publicKey));
      dispatch(setAccountName(Object.values(accounts)[0].accountName));
      history.push('/');
    }
    dispatch(deleteAccount(publicKey));
    // history.push('/');
    setIsOpen(false);
  };

  // account dropdown
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    Object.values(accounts).map((acc) => {
      if (acc.publicKey === publicKey) {
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
      <DrivedAccountMain>
        <Border />
        <DrivedAccount
          onClick={() => {
            // eslint-disable-next-line no-shadow
            setdrivedDropDownOpen(
              (drivedDropDownOpen) => !drivedDropDownOpen,
            );
            checkDrivedDropdownOpen(drivedDropDownOpen);
          }}
        >
          <DrivedAccountText className={subHeadingfontFamilyClass}>
            1 Derived Account
          </DrivedAccountText>
          <DropDownIcon>
            <div aria-hidden="true">
              {!drivedDropDownOpen ? (
                <img src={downIcon} alt="drop-down-icon" />
              ) : (
                <img src={upArrowIcon} alt="drop-down-icon" />
              )}
            </div>
          </DropDownIcon>
        </DrivedAccount>

        {/* Derived Account Drop Down */}

        {drivedDropDownOpen && (

        <>
          <Account margin="1rem 0">
            <AccountFlex>
              <AccountCircle />
              <AccountText onClick={childAccountActive}>
                <AccountMainText
                  className={mainHeadingfontFamilyClass}
                >
                  {`${childAccount.accountName}//0`}
                </AccountMainText>
                <AccountSubText className={subHeadingfontFamilyClass}>
                  {addressModifier(childAccount.publicKey)}
                </AccountSubText>
              </AccountText>
            </AccountFlex>

            {/* Drop Down 3 dots */}

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
                  <ListItem
                    onClick={() => console.log('clicked')}
                    key={Math.random()}
                  >
                    <img
                      src={exportIcon}
                      alt="remove-account"
                      width="16"
                      height="17"
                      style={{ marginLeft: '1.2rem' }}
                    />
                              &nbsp; &nbsp;
                    <span style={{ fontSize: '0.85rem' }}>
                      Export Account
                    </span>
                  </ListItem>
                  <ListItem
                    onClick={() => onOptionClicked()}
                    key={Math.random()}
                  >
                    <img
                      src={RemoveIcon}
                      alt="remove-account"
                      width="16"
                      height="17"
                      style={{ marginLeft: '1.2rem' }}
                    />
                              &nbsp; &nbsp;
                    <span style={{ fontSize: '0.85rem' }}>
                      Remove Account
                    </span>
                  </ListItem>
                </DropDownList>
              </DropDownListContainer>
              )} */}
            </DropDownContainer>
            <ChildAccountDropDown
              anchorEl={anchorEl}
              open={open}
              key={accounts.publicKey}
              handleClose={handleClose}
              publicKeyy={publicKey}
              onOptionClicked={onOptionClicked}
            />
          </Account>
        </>
        )}
      </DrivedAccountMain>
    </>
  );
};

export default DrivedAccountList;
