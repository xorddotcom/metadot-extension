import React, { useState } from 'react';
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
import { fonts, images, helpers } from '../../../utils';
import { RootState } from '../../../redux/store';
import services from '../../../utils/services';

const { dropDownIcon, activeIcon, ContentCopyIconWhite } = images;
const { subHeadingfontFamilyClass, mainHeadingfontFamilyClass } = fonts;

const { addressModifier } = helpers;
const { addressMapper } = services;

const AccountCard: React.FunctionComponent<AccountCardInterface> = ({
    publicKey,
    accountName,
    parentAddress,
    activateAccount,
    openAccountDropDownHandler,
    marginTop,
}) => {
    const activeAccount = useSelector(
        (state: RootState) => state.activeAccount
    );

    const [copyT, setCopyT] = useState('Copy');

    const copy = (e: React.ChangeEvent<EventTarget>): void => {
        e.stopPropagation();
        navigator.clipboard.writeText(
            addressMapper(publicKey, activeAccount.prefix)
        );
        setCopyT('Copied');
    };

    const copyIconTooltip = {
        id: 'copy-icon',
        // className: `main-card-tooltip ${mainHeadingfontFamilyClass}`,
        onClick: copy,
        onMouseOver: () => setCopyT('Copy'),
        style: { cursor: 'pointer' },
    };

    return (
        <Account
            key={publicKey}
            marginTop={marginTop || '10px'}
            onClick={() => activateAccount(publicKey, accountName)}
        >
            <AccountFlex>
                <AccountCircle>
                    {activeAccount.publicKey === publicKey && (
                        <img
                            height="10px"
                            width="10px"
                            src={activeIcon}
                            alt="active-account-icon"
                        />
                    )}
                </AccountCircle>
                <AccountText>
                    <AccountMainText className={mainHeadingfontFamilyClass}>
                        {accountName}
                    </AccountMainText>
                    <AccountActiveText>
                        {activeAccount.publicKey === publicKey
                            ? '(Active)'
                            : ''}
                    </AccountActiveText>
                    <AccountSubText className={subHeadingfontFamilyClass}>
                        {addressModifier(
                            addressMapper(publicKey, activeAccount.prefix)
                        )}
                    </AccountSubText>
                    <div
                        style={{ position: 'absolute' }}
                        className={`tooltip ${subHeadingfontFamilyClass}`}
                    >
                        <div
                            {...copyIconTooltip}
                            style={{
                                position: 'absolute',
                                left: '112px',
                                bottom: '14px',
                            }}
                        >
                            <img src={ContentCopyIconWhite} alt="copy-icon" />
                            <span
                                className="tooltiptext"
                                style={{ fontSize: '11px' }}
                            >
                                {copyT}
                            </span>
                        </div>
                    </div>
                </AccountText>
            </AccountFlex>

            <DropDownContainer className={mainHeadingfontFamilyClass}>
                <DropDownIcon
                    onClick={(e) => {
                        e.stopPropagation();
                        openAccountDropDownHandler(
                            e,
                            publicKey,
                            accountName,
                            parentAddress
                        );
                    }}
                >
                    <img src={dropDownIcon} alt="3-dots" />
                </DropDownIcon>
            </DropDownContainer>
        </Account>
    );
};

export default AccountCard;
