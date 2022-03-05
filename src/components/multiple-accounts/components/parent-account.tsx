import React from 'react';
import AccountCard from './account-card';
import { AccountCardInterface } from '../types';

const ParentAccount: React.FunctionComponent<AccountCardInterface> = ({
    publicKey,
    accountName,
    activateAccount,
    openAccountDropDownHandler,
}) => {
    return (
        <AccountCard
            publicKey={publicKey}
            accountName={accountName}
            activateAccount={activateAccount}
            openAccountDropDownHandler={openAccountDropDownHandler}
            marginTop="16px"
        />
    );
};

export default ParentAccount;
