import React, { useState } from 'react';
import {
  Border, DrivedAccount, DrivedAccountMain, DrivedAccountText, DropDownIcon,
} from './styledComponent';
import { fonts } from '../../../utils';

import downIcon from '../../../assets/images/icons/downArrow.svg';
import upArrowIcon from '../../../assets/images/icons/upArrow.svg';
import AccountList from './account';

const { subHeadingfontFamilyClass } = fonts;

const DrivedAccountList = ({ publicKey, handleClick }) => {
  const [drivedDropDownOpen, setdrivedDropDownOpen] = useState(false);

  const simpleData = [
    {
      name: 'Accc...Abc//1',
      publicKey,
    },
    {
      name: 'Accc...Abc//1',
      publicKey,
    },
  ];

  return (
    <DrivedAccountMain>
      <Border />
      <DrivedAccount>
        <DrivedAccountText className={subHeadingfontFamilyClass}>
          2 Drived Accounts
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
      {drivedDropDownOpen && simpleData.map((data) => {
        const accountList = {
          publicKey: data.publicKey,
          accountName: data.name,
          handleClick,
        };
        return (
          // eslint-disable-next-line react/jsx-key
          <AccountList margin="1rem 0" {...accountList} />
        );
      })}
    </DrivedAccountMain>
  );
};

export default DrivedAccountList;
