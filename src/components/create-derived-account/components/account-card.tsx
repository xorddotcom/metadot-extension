import React from 'react';
import { useSelector } from 'react-redux';
import {
    Account,
    AccountCircle,
    AccountFlex,
    AccountMainText,
    AccountSubText,
    AccountText,
} from '../styles';

import { fonts, images, helpers } from '../../../utils';
import { RootState } from '../../../redux/store';
import services from '../../../utils/services';

const { activeIcon } = images;
const { subHeadingfontFamilyClass, mainHeadingfontFamilyClass } = fonts;
const { addressMapper } = services;
const { addressModifier } = helpers;

const AccountCard: React.FunctionComponent<{
    publicKey: string;
    accountName: string;
}> = ({ publicKey, accountName }) => {
    const activeAccount = useSelector(
        (state: RootState) => state.activeAccount
    );

    return (
        <Account key={publicKey} marginBottom="10px" marginTop="10px">
            <AccountFlex>
                {activeAccount.publicKey ===
                    addressMapper(publicKey, activeAccount.prefix) && (
                    <img
                        style={{
                            position: 'relative',
                            left: '24px',
                            bottom: '8px',
                        }}
                        src={activeIcon}
                        alt="active-account-icon"
                    />
                )}
                <AccountCircle />
                <AccountText>
                    <AccountMainText className={mainHeadingfontFamilyClass}>
                        {accountName}
                    </AccountMainText>
                    <AccountSubText className={subHeadingfontFamilyClass}>
                        {addressModifier(publicKey)}
                    </AccountSubText>
                </AccountText>
            </AccountFlex>
        </Account>
    );
};

export default AccountCard;
