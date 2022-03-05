import React from 'react';
import { useSelector } from 'react-redux';
import {
    Account,
    AccountCircle,
    AccountFlex,
    AccountMainText,
    AccountActiveText,
    AccountSubText,
    AccountText,
    DropDownContainer,
    DropDownIcon,
} from '../styles';
import { AccountCardInterface } from '../types';
import { fonts, images } from '../../../utils';
import { RootState } from '../../../redux/store';
import services from '../../../utils/services';

const { dropDownIcon } = images;
const { subHeadingfontFamilyClass, mainHeadingfontFamilyClass } = fonts;
const { addressMapper } = services;

const AccountCard: React.FunctionComponent<AccountCardInterface> = ({
    publicKey,
    accountName,
    activateAccount,
    openAccountDropDownHandler,
    marginTop,
}) => {
    const activeAccount = useSelector(
        (state: RootState) => state.activeAccount
    );

    return (
        <Account
            key={publicKey}
            marginBottom="10px"
            marginTop={marginTop || '10px'}
            onClick={() => activateAccount(publicKey, accountName)}
        >
            <AccountFlex>
                <AccountCircle />
                <AccountText>
                    <AccountMainText className={mainHeadingfontFamilyClass}>
                        {accountName}
                    </AccountMainText>
                    <AccountActiveText>
                        {activeAccount.publicKey ===
                        addressMapper(publicKey, activeAccount.prefix)
                            ? '(Active)'
                            : ''}
                    </AccountActiveText>
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
