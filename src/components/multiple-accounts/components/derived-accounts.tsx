import React, { useState } from 'react';

import AccountCard from './account-card';

import {
    Border,
    DrivedAccount,
    DrivedAccountMain,
    DrivedAccountText,
    DropDownIcon,
} from '../styles';

import { fonts, images } from '../../../utils';

import { DerivedAccountsInterface, ChildAccountInterface } from '../types';

const { downIcon, upArrowIcon } = images;

const { subHeadingfontFamilyClass } = fonts;

const DerivedAccount: React.FunctionComponent<DerivedAccountsInterface> = ({
    accounts,
    activateAccount,
    openAccountDropDownHandler,
}) => {
    const [drivedDropDownOpen, setdrivedDropDownOpen] = useState(false);

    return (
        <DrivedAccountMain>
            <Border />
            <DrivedAccount
                onClick={() => {
                    setdrivedDropDownOpen(
                        (drivedDropDownOpens) => !drivedDropDownOpens
                    );
                }}
            >
                <DrivedAccountText className={subHeadingfontFamilyClass}>
                    {`${accounts.length} Derived Account`}
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
            {drivedDropDownOpen &&
                accounts.map((account: ChildAccountInterface) => {
                    return (
                        <AccountCard
                            publicKey={account.publicKey}
                            accountName={account.accountName}
                            activateAccount={activateAccount}
                            openAccountDropDownHandler={
                                openAccountDropDownHandler
                            }
                        />
                    );
                })}
        </DrivedAccountMain>
    );
};

export default DerivedAccount;
