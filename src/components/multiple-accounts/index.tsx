import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { encodeAddress } from '@polkadot/util-crypto';
import { Header } from '../common';
import {
    setAccountName,
    setPublicKey,
    resetAccountSlice,
} from '../../redux/slices/activeAccount';
import { resetAccountsSlice } from '../../redux/slices/accounts';
import { Wrapper, WrapperScroll } from './styles';
import { resetTransactions } from '../../redux/slices/transactions';
import { RootState } from '../../redux/store';
import services from '../../utils/services';
import { DASHBOARD, CREATE_DERIVED_ACCOUNT, WELCOME } from '../../constants';
import {
    ParentAccountInterface,
    ChildAccountInterface,
    TransformedAccountsInterface,
} from './types';
import AccountsList from './components/account-list';
import accountUtils from '../../utils/accounts';
import { setAuthScreenModal } from '../../redux/slices/modalHandling';

const MultipleAccounts: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const activeAccount = useSelector(
        (state: RootState) => state.activeAccount
    );
    const { getJsonBackup, deleteAccount, renameAccount } = accountUtils;

    // account single state formation
    const allAccounts = useSelector((state: RootState) => state.accounts);
    const [parentAccounts, setParentAccounts] = useState<
        ParentAccountInterface[]
    >([]);
    const [childAccounts, setChildAccounts] = useState<ChildAccountInterface[]>(
        []
    );
    const [transformedAccounts, setTransformedAccounts] =
        useState<TransformedAccountsInterface>({});
    useEffect(() => {
        const seperateParentAndChildAccounts = (): void => {
            const ParentAccounts: ParentAccountInterface[] = [];
            const ChildAccounts: ChildAccountInterface[] = [];
            Object.values(allAccounts).forEach((account) => {
                if (account) {
                    if (
                        !account.parentAddress ||
                        !allAccounts[account.parentAddress]
                    ) {
                        ParentAccounts.push(account);
                    } else if (account.parentAddress) {
                        ChildAccounts.push(account as ChildAccountInterface);
                    }
                }
            });
            setParentAccounts(ParentAccounts);
            setChildAccounts(ChildAccounts);
        };

        if (allAccounts && Object.keys(allAccounts).length > 0)
            seperateParentAndChildAccounts();
    }, [allAccounts]);
    useEffect(() => {
        const TransformedAccounts: TransformedAccountsInterface = {};
        parentAccounts.forEach((parent) => {
            const children = childAccounts.filter(
                (child) => child.parentAddress === parent.publicKey
            );

            TransformedAccounts[parent.publicKey] = {
                ...parent,
                childAccounts: children,
            };
        });

        setTransformedAccounts(TransformedAccounts);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [parentAccounts, childAccounts]);

    // Account Handlers
    const activateAccountHandler = (pk: string, name: string): void => {
        dispatch(setPublicKey(pk));
        dispatch(setAccountName(name));
        dispatch(resetTransactions());
        navigate(DASHBOARD);
    };

    const deleteAccountHandler = async (publicKey: string): Promise<void> => {
        await deleteAccount(publicKey);
        if (Object.values(allAccounts).length === 1) {
            dispatch(resetAccountsSlice());
            dispatch(resetAccountSlice());
            navigate(WELCOME);
        }
    };

    const downloadJsonHandler = async (
        address: string,
        password: string
    ): Promise<boolean> => {
        const res = await getJsonBackup(address, password);
        if (!res) return false;

        dispatch(setAuthScreenModal(false));
        return true;
    };

    const deriveAccountHandler = async (
        address: string,
        accountName: string
    ): Promise<void> => {
        navigate(CREATE_DERIVED_ACCOUNT, {
            state: {
                parentAddress: address,
                parentName: accountName,
                path: transformedAccounts[
                    address
                ].childAccounts.length.toString(),
            },
        });
    };

    const renameAccountHandler = async (
        address: string,
        name: string
    ): Promise<boolean> => {
        const result = await renameAccount(address, name);
        if (result) return result;
        return false;
    };

    return (
        <Wrapper>
            <WrapperScroll>
                <Header centerText="Accounts" />
                <AccountsList
                    accounts={transformedAccounts}
                    activateAccount={activateAccountHandler}
                    deleteAccount={deleteAccountHandler}
                    downloadJSON={downloadJsonHandler}
                    deriveAccount={deriveAccountHandler}
                    renameAccount={renameAccountHandler}
                />
            </WrapperScroll>
        </Wrapper>
    );
};

export default MultipleAccounts;
