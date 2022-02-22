import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Header, Button } from '../common';
import {
    setAccountName,
    setPublicKey,
    setAccountCreationStep,
    setTempSeed,
} from '../../redux/slices/activeAccount';
import { setDerivedAccountModal } from '../../redux/slices/modalHandling';
import { Wrapper, Div, ButtonDiv, MarginSet, WrapperScroll } from './styles';
import AccountList from './account-list';
import DrivedAccountList from './drived-account';
import { helpers } from '../../utils';
import accounts from '../../utils/accounts';
import { resetTransactions } from '../../redux/slices/transactions';
import { RootState } from '../../redux/store';
import services from '../../utils/services';

const { addressMapper } = services;

const { GenerateSeedPhrase } = accounts;

const { addressModifier } = helpers;

const MultipleAccounts: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allAccounts = useSelector((state: RootState) => state.accounts);
    const { prefix } = useSelector((state: RootState) => state.activeAccount);

    const [seedToPass, setSeedToPass] = useState('');
    const [derivedDropDown, setDerivedDropDown] = useState(true);

    useEffect(() => {
        try {
            const newSeed = GenerateSeedPhrase();
            setSeedToPass(newSeed);
        } catch (error) {
            console.log(
                'ERROR while generating new seed for parent account',
                error
            );
        }
    }, [dispatch]);

    const checkDrivedDropdownOpen = (data: any): void => {
        setDerivedDropDown(data);
        return data;
    };

    const [parentAccounts, setParentAccounts] = useState<
        { publicKey: string; accountName: string; parentAddress: string }[]
    >([]);

    const [childAccounts, setChildAccounts] = useState<
        { publicKey: string; parentAddress: string; accountName: string }[]
    >([]);

    const btn = {
        id: 'create-new-button',
        text: 'Create New Account',
        width: '300px',
        fontSize: '18px',
        handleClick: () => {
            dispatch(setAccountCreationStep(1));
            dispatch(setTempSeed(seedToPass));
            navigate('/ShowSeed', {
                state: { seedToPass },
            });
        },
    };

    useEffect(() => {
        const parentChildR = (): void => {
            const ParentAccounts: {
                publicKey: string;
                accountName: string;
                parentAddress: string;
            }[] = [];
            const ChildAccounts: {
                publicKey: string;
                accountName: string;
                parentAddress: string;
            }[] = [];
            Object.values(allAccounts).forEach((account) => {
                console.log('account mapping ==>>', account);
                if (account && !account.parentAddress) {
                    console.log('setting parent account');
                    ParentAccounts.push(account as any);
                    // setParentAccounts([
                    //     account,
                    //     ...(parentAccounts as Array<any>),
                    // ]);
                } else {
                    ChildAccounts.push(account as any);
                    // setChildAccounts([
                    //     account,
                    //     ...(childAccounts as Array<any>),
                    // ]);
                }
            });
            setParentAccounts(ParentAccounts);
            setChildAccounts(ChildAccounts);
        };

        parentChildR();
    }, [allAccounts]);

    useEffect(() => {
        console.log(
            'parentAccounts childAccounts ==>>',
            parentAccounts,
            childAccounts
        );
    }, [parentAccounts, childAccounts]);

    const accountActive = (pk: string, name: string): void => {
        const publicKeyOfRespectiveChain = addressMapper(pk, prefix);
        dispatch(setPublicKey(publicKeyOfRespectiveChain));
        dispatch(setAccountName(name));
        dispatch(resetTransactions());
        navigate('/');
    };

    const derivedChildAccount = (): void => {
        dispatch(setDerivedAccountModal(true));
    };

    const allParentAddresses = parentAccounts?.map((pAcc) => pAcc.publicKey);

    const allChildsWithoutParents = childAccounts?.filter(
        (childAccount) =>
            !allParentAddresses?.includes(childAccount.parentAddress)
    );

    console.log('allChildsWithoutParents', {
        allChildsWithoutParents,
        allParentAddresses,
    });

    // eslint-disable-next-line no-unused-vars
    const derivedChildWithoutParents = (): JSX.Element[] | undefined =>
        allChildsWithoutParents?.map((account) => {
            const accountList = {
                publicKey: addressModifier(account.publicKey),
                publicKeyy: account.publicKey,
                accountName: account.accountName,
                accountActive: () =>
                    accountActive(account.publicKey, account.accountName),
                derivedChildAccount,
                account,
                derivedDropDown,
                childAccounts,
                marginBottom: '10px',
                marginTop: '10px',
            };
            return <AccountList key={account.publicKey} {...accountList} />;
        });

    const childAccountActive = (pk: string, name: string): void => {
        const publicKeyOfRespectiveChain = addressMapper(pk, prefix);
        dispatch(setPublicKey(publicKeyOfRespectiveChain));
        dispatch(setAccountName(name));
        dispatch(resetTransactions());
        navigate('/');
    };

    return (
        <Wrapper>
            <WrapperScroll>
                <Header
                    centerText="Accounts"
                    backHandler={() => console.log('goBack')}
                />
                {parentAccounts &&
                    parentAccounts.map((account) => {
                        const accountList = {
                            publicKey: addressModifier(account.publicKey),
                            publicKeyy: account.publicKey,
                            accountName: account.accountName,
                            accountActive,
                            derivedChildAccount,
                            account,
                            derivedDropDown,
                            childAccounts,
                        };

                        const derivedChild = (): void | JSX.Element | null => {
                            if (childAccounts)
                                // eslint-disable-next-line no-plusplus
                                for (let i = 0; i < childAccounts.length; i++) {
                                    if (
                                        childAccounts &&
                                        childAccounts[i].parentAddress ===
                                            account.publicKey
                                    ) {
                                        const drivedAccountList = {
                                            childAccount: childAccounts[i],
                                            childAccountActive,
                                            checkDrivedDropdownOpen,
                                        };

                                        return (
                                            <div>
                                                <DrivedAccountList
                                                    {...drivedAccountList}
                                                />
                                            </div>
                                        );
                                        // eslint-disable-next-line no-else-return
                                    }
                                }
                            return null;
                        };

                        return (
                            <Div key={account.publicKey} mt="28px">
                                <MarginSet>
                                    <AccountList {...accountList} />
                                    {derivedChild()}
                                </MarginSet>
                            </Div>
                        );
                    })}
                {derivedChildWithoutParents()}
            </WrapperScroll>

            <ButtonDiv>
                <Button {...btn} />
            </ButtonDiv>
        </Wrapper>
    );
};

export default MultipleAccounts;
