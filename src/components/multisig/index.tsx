import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { AccountInterface } from './types';
import MultisigView from './view';

import { RootState } from '../../redux/store';
import { MyAccounts, WarningModal } from '../common/modals';
import { Account } from '../../redux/types';
import { isValidAddressPolkadotAddress } from '../../utils/helpers';
import createMultiSigAcc from './createMultiSigAccount';
import useDispatcher from '../../hooks/useDispatcher';
import { addAccount } from '../../redux/slices/accounts';
import { setAccountName, setPublicKey } from '../../redux/slices/activeAccount';

function Multisig(): JSX.Element {
    const generalDispatcher = useDispatcher();
    const navigate = useNavigate();

    const [threshold, setThreshold] = React.useState(2);
    const [name, setName] = React.useState('');
    const allAccounts = useSelector((state: RootState) =>
        Object.values(state.accounts)
    );
    const [accountList, setAccountList] = React.useState<AccountInterface[]>([
        { address: '', err: false, errMessage: '' },
        { address: '', err: false, errMessage: '' },
    ]);
    const [unselectedAccounts, setUnSelectedAccounts] =
        React.useState<Account[]>(allAccounts);

    const [activeIndex, setActiveIndex] = React.useState(-1);
    const [openAccountsModal, setOpenAccountsModal] = React.useState(false);
    const [openWarningModal, setOpenWarningModal] = React.useState(false);

    const deleteWarning = {
        open: openWarningModal,
        handleClose: () => {
            setOpenWarningModal(false);
        },
        onConfirm: () => {
            console.log('delete');
        },
        style: {
            width: '290px',
            background: '#141414',
            position: 'relative',
            bottom: 30,
            p: 2,
            px: 2,
            pb: 3,
        },
        mainText: 'Minimum Multisig Requirement',
        subText:
            'A Mulitsig Account requires 2 or more Addresses. Would you like to abort the process instead?',
    };

    const handleOpenModal = (index: number): void => {
        setActiveIndex(index);
        setOpenAccountsModal(true);
    };
    const handleCloseModal = (): void => {
        setOpenAccountsModal(false);
    };
    const setAddressError = (
        value: boolean,
        index: number,
        message: string
    ): void => {
        const newState = [...accountList];
        newState[index].err = value;
        newState[index].errMessage = message;
        setAccountList([...newState]);
    };

    const removeAllErrors = (): void => {
        accountList.forEach((account, index) => {
            setAddressError(false, index, '');
        });
    };

    const onChangeAddress = (index: number, value: string): void => {
        const newState = [...accountList];
        newState[index].address = value;
        setAccountList([...newState]);
        removeAllErrors();
    };
    const updateAccount = (): void => {
        setAccountList([
            ...accountList,
            { address: '', err: false, errMessage: '' },
        ]);
    };

    const onAccountSelection = (data: {
        publicKey: string;
        accountName: string;
        parentAddress?: string;
    }): void => {
        const filteredNewState = unselectedAccounts.filter(
            (acc) => acc !== data
        );
        setUnSelectedAccounts(filteredNewState);
        const newState = [...accountList];
        newState[activeIndex].accountFromMetadot = true;
        newState[activeIndex].address = data.publicKey;
        newState[activeIndex].name = data.accountName;

        setAccountList(newState);

        handleCloseModal();
    };

    const onRemoveAccount = (index: number): void => {
        if (accountList.length === 2) {
            setOpenWarningModal(true);
            return;
        }
        const newState = [...accountList];
        newState.splice(index, 1);
        setAccountList(newState);
    };

    const validateAddresses = (): boolean => {
        const invalidAddressList = [];
        accountList.forEach((account, index) => {
            if (account.address === '') {
                invalidAddressList.push(account);
                setAddressError(true, index, 'Empty Address');
            } else if (!isValidAddressPolkadotAddress(account.address)) {
                invalidAddressList.push(account);
                setAddressError(true, index, 'Invalid Address');
            }
        });
        if (invalidAddressList.length > 0) return false;
        return true;
    };

    const onSubmit = (): void => {
        const allAddressValidated = validateAddresses();
        const allSignatoriesAddresses = accountList.map((acc) => acc.address);
        if (allAddressValidated) {
            console.log('saare sahi hain');
            const multisigAddress = createMultiSigAcc(
                allSignatoriesAddresses,
                threshold
            );
            console.log(
                'allSignatoriesAddresses, threshold',
                { allSignatoriesAddresses, threshold },
                'multisigAddress ',
                multisigAddress
            );
            const allAccFromRedux = allAccounts;

            multisigAddress
                .then((resAdd) => {
                    console.log('resAdd', {
                        address: resAdd,
                        accountName: name,
                        multisig: true,
                    });

                    const newMultisigAccount = {
                        // [resAdd]: {
                        publicKey: resAdd,
                        accountName: name,
                        multisig: true,
                        parentAddress: null,
                        multisigDetails: {
                            members: allSignatoriesAddresses,
                            threshold,
                        },
                        // },
                    };

                    generalDispatcher(() =>
                        addAccount([newMultisigAccount, ...allAccounts])
                    );

                    generalDispatcher(() => setPublicKey(resAdd));
                    generalDispatcher(() => setAccountName(name));

                    navigate('/');
                })
                .catch((error) => console.log('error on multisig', error));
        }
    };

    console.log('here', { accountList, allAccounts });

    return (
        <>
            <MultisigView
                accountList={accountList}
                onChangeAddress={onChangeAddress}
                addAccount={updateAccount}
                onRemoveAccount={onRemoveAccount}
                handleOpenModal={handleOpenModal}
                onSubmit={onSubmit}
                threshold={threshold}
                setThreshold={setThreshold}
                name={name}
                setName={setName}
            />
            <WarningModal {...deleteWarning} />
            <MyAccounts
                open={openAccountsModal}
                handleClose={() => setOpenAccountsModal(false)}
                onSelection={onAccountSelection}
                style={{
                    position: 'relative',
                    width: '300px',
                    background: '#141414',
                    pb: 3,
                    overflowY: 'scroll',
                    overflowX: 'hidden',
                    marginTop: '144px',
                }}
                accountList={unselectedAccounts}
            />
        </>
    );
}

export default Multisig;
