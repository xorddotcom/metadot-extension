import React from 'react';
import {
    Account,
    AccountCircle,
    AccountFlex,
    AccountMainText,
    AccountSubText,
    AccountText,
    DropDownContainer,
    DropDownIcon,
} from '../styles';
import { AccountCardInterface } from '../types';
import { fonts, images } from '../../../utils';

const { dropDownIcon } = images;
const { subHeadingfontFamilyClass, mainHeadingfontFamilyClass } = fonts;

const AccountCard: React.FunctionComponent<AccountCardInterface> = ({
    publicKey,
    accountName,
    activateAccount,
    openAccountDropDownHandler,
}) => {
    return (
        <Account
            key={publicKey}
            marginBottom="10px"
            marginTop="10px"
            onClick={() => activateAccount(publicKey, accountName)}
        >
            <AccountFlex>
                <AccountCircle />
                <AccountText>
                    <AccountMainText className={mainHeadingfontFamilyClass}>
                        {accountName}
                    </AccountMainText>
                    <AccountSubText className={subHeadingfontFamilyClass}>
                        {}
                    </AccountSubText>
                </AccountText>
            </AccountFlex>

            <DropDownContainer className={mainHeadingfontFamilyClass}>
                <DropDownIcon
                    onClick={(e) => {
                        e.stopPropagation();
                        openAccountDropDownHandler(e, publicKey, accountName);
                    }}
                >
                    <img src={dropDownIcon} alt="3-dots" />
                </DropDownIcon>
            </DropDownContainer>
        </Account>
    );
};

export default AccountCard;
