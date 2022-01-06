import React, { useState } from 'react';
import {
  Account,
  AccountCircle,
  AccountFlex,
  AccountMainText,
  AccountSubText,
  AccountText,
  Border, DrivedAccount, DrivedAccountMain, DrivedAccountText, DropDownIcon,
} from './styledComponent';
import { fonts, helpers } from '../../../utils';

import downIcon from '../../../assets/images/icons/downArrow.svg';
import upArrowIcon from '../../../assets/images/icons/upArrow.svg';
// import AccountList from './account';

const { subHeadingfontFamilyClass, mainHeadingfontFamilyClass } = fonts;
const { addressModifier } = helpers;

const DrivedAccountList = ({ childAccount, childAccountActive }) => {
  const [drivedDropDownOpen, setdrivedDropDownOpen] = useState(false);

  // const simpleData = [
  //   {
  //     name: 'Accc...Abc//1',
  //     publicKey,
  //   },
  //   {
  //     name: 'Accc...Abc//1',
  //     publicKey,
  //   },
  // ];

  // const accountList = {
  //   publicKey: addressModifier(childAccount.publicKey),
  //   accountName: `${childAccount.accountName}//0`,
  //   margin: '1rem 0',
  // };

  return (
    <DrivedAccountMain>
      <Border />
      <DrivedAccount>
        <DrivedAccountText className={subHeadingfontFamilyClass}>
          1 Drived Accounts
        </DrivedAccountText>
        <DropDownIcon>
          <div
            // eslint-disable-next-line no-shadow
            onClick={() => setdrivedDropDownOpen((drivedDropDownOpen) => !drivedDropDownOpen)}
            aria-hidden="true"
          >
            {!drivedDropDownOpen
              ? <img src={downIcon} alt="drop-down-icon" />
              : <img src={upArrowIcon} alt="drop-down-icon" />}
          </div>
        </DropDownIcon>
      </DrivedAccount>
      {/* {drivedDropDownOpen
          && <AccountList onClick={() => childAccountActive()} {...accountList} />} */}

      {drivedDropDownOpen && (
      <Account margin="1rem 0">
        <AccountFlex>
          <AccountCircle />
          <AccountText>
            <AccountMainText
              onClick={childAccountActive}
              className={mainHeadingfontFamilyClass}
            >
              {`${childAccount.accountName}//0`}
            </AccountMainText>
            <AccountSubText className={subHeadingfontFamilyClass}>
              {addressModifier(childAccount.publicKey)}
            </AccountSubText>
          </AccountText>
        </AccountFlex>
      </Account>
      )}
    </DrivedAccountMain>
  );
};

export default DrivedAccountList;
