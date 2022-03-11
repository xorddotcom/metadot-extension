import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
    Account,
    AccountCircle,
    AccountFlex,
    AccountMainText,
    AccountSubText,
    AccountText,
    CopyIconImg,
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
    const [copy, setCopy] = useState('Copy');

    const activeAccount = useSelector(
        (state: RootState) => state.activeAccount
    );

    const copyText = (): void => {
        navigator.clipboard.writeText(
            addressMapper(publicKey, activeAccount.prefix)
        );
        setCopy('Copied');
    };

    const copyIconTooltip = {
        id: 'copy-icon',
        className: `main-card-tooltip ${mainHeadingfontFamilyClass}`,
        onClick: copyText,
        onMouseOver: () => setCopy('Copy'),
        style: { cursor: 'pointer' },
    };

    const copyIconTooltipText = {
        className: 'main-card-tooltiptext',
        style: {
            maxWidth: '70px',
            left: '20%',
            bottom: '120%',
            fontSize: '0.7rem',
            fontWeight: 300,
            transition: 'all 0.1s ease-in',
        },
    };

    const { ContentCopyIcon } = images;

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
                    <AccountMainText
                        style={{ height: '18px' }}
                        className={mainHeadingfontFamilyClass}
                    >
                        {accountName}
                    </AccountMainText>
                    <AccountSubText className={subHeadingfontFamilyClass}>
                        {addressModifier(
                            addressMapper(publicKey, activeAccount.prefix)
                        )}
                    </AccountSubText>
                </AccountText>
            </AccountFlex>
            <div {...copyIconTooltip}>
                <CopyIconImg src={ContentCopyIcon} alt="copy-icon" />
                <span {...copyIconTooltipText}>{copy}</span>
            </div>
        </Account>
    );
};

export default AccountCard;
