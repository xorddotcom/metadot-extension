import React from 'react';
import {
  Account,
  AccountCircle,
  AccountFlex,
  AccountMainText,
  AccountSubText,
  AccountText,
  DropDownIcon,
} from './styledComponent';
import { fonts } from '../../../utils';
import dropDownIcon from '../../../assets/images/icons/3Dots.svg';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

const AccountList = ({
  publicKey, handleClick, accountName, margin,
}) => (
  <Account margin={margin}>
    <AccountFlex>
      <AccountCircle />
      <AccountText>
        <AccountMainText className={mainHeadingfontFamilyClass}>
          {accountName}
        </AccountMainText>
        <AccountSubText className={subHeadingfontFamilyClass}>
          {publicKey}
        </AccountSubText>
      </AccountText>
    </AccountFlex>
    <DropDownIcon onClick={handleClick}>
      <img src={dropDownIcon} alt="3-dots" />
    </DropDownIcon>
  </Account>
);

export default AccountList;
