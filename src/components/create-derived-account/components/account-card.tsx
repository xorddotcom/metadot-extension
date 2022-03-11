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
const { addressModifier } = helpers;
const { addressMapper } = services;

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
                {activeAccount.publicKey === publicKey && (
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
                        {addressModifier(
                            addressMapper(publicKey, activeAccount.prefix)
                        )}
                    </AccountSubText>
                </AccountText>
            </AccountFlex>
        </Account>
    );
};

export default AccountCard;
