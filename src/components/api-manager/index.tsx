import React, { useEffect, memo, useState } from 'react';
import { useSelector } from 'react-redux';
import type { ApiPromise as ApiPromiseType } from '@polkadot/api';
import { setApi, setApiInitializationStarts } from '../../redux/slices/api';
import {
    setBalance,
    setBalances,
    setBalanceInUsd,
    setTokenName,
    setWalletConnected,
    updateBalance,
    setPrefix,
} from '../../redux/slices/activeAccount';
import { setIsResponseModalOpen } from '../../redux/slices/modalHandling';
import { RootState } from '../../redux/store';
import { helpers, images, exponentConversion } from '../../utils';
import services from '../../utils/services';
import useResponseModal from '../../hooks/useResponseModal';
import useDispatcher from '../../hooks/useDispatcher';
import { getAuthList } from '../../messaging';
import { addTransaction } from '../../redux/slices/transactions';

const { wifiOff, SuccessCheckIcon } = images;
const ApiManager: React.FunctionComponent<{ rpc: string }> = ({ rpc }) => {
    // const setIsWalletConnected = chrome.storage.local.get(
    //     ['setIsWalletConnected'],
    //     function (result) {
    //         console.log(`Value currently is ${result.key}`);
    //     }
    // );
    const currentUser = useSelector((state: RootState) => state);
    const openModal = useResponseModal({
        isOpen: true,
        modalImage: SuccessCheckIcon,
        mainText: 'Successfully Converted!',
        subText: '',
    });
    const openModalForInternetIssue = useResponseModal({
        isOpen: true,
        modalImage: wifiOff,
        mainText: 'Internet is down!',
        subText: '',
    });
    const generalDispatcher = useDispatcher();
    const { activeAccount, modalHandling } = currentUser;
    const api = currentUser.api.api as ApiPromiseType;
    const { loadingForApi } = modalHandling;
    const { apiInitializationStarts } = currentUser.api;
    const { convertIntoUsd, formatExtrinsic, txMadeOrReceiveByUser } = helpers;
    const { getBalance, providerInitialization, addressMapper } = services;
    const { publicKey, chainName, tokenName, balances } = activeAccount;
    const compareSites = (arr: any, sub: any): any => {
        const sub2 = sub.toLowerCase();
        return arr.filter((str: any) =>
            str
                .toLowerCase()
                .startsWith(sub2.slice(0, Math.max(str.length - 1, 1)))
        );
    };
    useEffect(() => {
        const setConnectedSites = async (): Promise<void> => {
            const arr: string[] = [];
            const res: any = await getAuthList();
            chrome.tabs.query(
                { active: true, lastFocusedWindow: true },
                (tabs) => {
                    const { url } = tabs[0];
                    Object.values(res.list).map((site: any): boolean => {
                        if (site.isAllowed) {
                            arr.push(site.url);
                        }
                        return true;
                    });
                    const isAllowed = compareSites(arr, url);
                    if (isAllowed.length === 0)
                        generalDispatcher(() => setWalletConnected(false));
                    else generalDispatcher(() => setWalletConnected(true));
                }
            );
        };
        setConnectedSites();
    }, []);
    useEffect(() => {
        const setAPI = async (rpcUrl: string): Promise<void> => {
            try {
                generalDispatcher(() => setApiInitializationStarts(true));
                if (window.navigator.onLine) {
                    // setting api instance of selected network
                    const newApiInstance = await providerInitialization(rpcUrl);
                    // getting token name
                    const tokenNameofSelectedNetwork = await newApiInstance
                        ?.registry?.chainTokens[0];
                    // getting token balance
                    // const balanceOfSelectedNetwork = await getBalance(
                    //     newApiInstance,
                    //     publicKey
                    // );
                    const balanceOfSelectedNetwork = await getBalance(
                        newApiInstance,
                        publicKey
                    );
                    // generalDispatcher(() =>
                    //     setBalance(exponentConversion(balanceOfSelectedNetwork))
                    // );
                    generalDispatcher(() =>
                        setBalances(balanceOfSelectedNetwork)
                    );
                    // const res = await fetchBalanceWithMultipleTokens(
                    //     newApiInstance,
                    //     publicKey
                    // );
                    const dollarAmount = await convertIntoUsd(
                        tokenNameofSelectedNetwork,
                        10
                    );
                    await newApiInstance.isReady;
                    generalDispatcher(() => setBalanceInUsd(dollarAmount));
                    generalDispatcher(() => setApi(newApiInstance));
                    generalDispatcher(() => setApiInitializationStarts(false));
                    generalDispatcher(() =>
                        setTokenName(tokenNameofSelectedNetwork)
                    );
                    const chainInfo =
                        await newApiInstance?.registry?.getChainProperties();
                    generalDispatcher(() =>
                        setPrefix(Number(chainInfo?.ss58Format.toString()))
                    );
                    // generalDispatcher(() =>
                    //     setBalances(balanceOfSelectedNetwork)
                    // );
                    if (loadingForApi) {
                        openModal();
                        setTimeout(() => {
                            generalDispatcher(() =>
                                setIsResponseModalOpen(false)
                            );
                        }, 2500);
                    }
                } else {
                    openModalForInternetIssue();
                    setTimeout(() => {
                        generalDispatcher(() => setIsResponseModalOpen(false));
                    }, 2500);
                    setTimeout(() => {
                        generalDispatcher(() =>
                            setApiInitializationStarts(false)
                        );
                    }, 2000);
                }
            } catch (error) {
                console.log('In catch api manager', error);
            }
        };
        setAPI(rpc);
    }, [chainName, loadingForApi, rpc]);
    useEffect(() => {
        const accountChanged = async (): Promise<void> => {
            // getting token balance
            const balanceOfSelectedNetwork = await getBalance(api, publicKey);
            // getting token balance in usd
            const dollarAmount = await convertIntoUsd(
                tokenName,
                balanceOfSelectedNetwork
            );
            generalDispatcher(() => setBalanceInUsd(dollarAmount));
            generalDispatcher(() =>
                setBalance(exponentConversion(balanceOfSelectedNetwork))
            );
            generalDispatcher(() => setBalances(balanceOfSelectedNetwork));
        };
        accountChanged();
    }, [publicKey]);
    useEffect(() => {
        let unsub: any;
        let unsub2: any;
        (async () => {
            const tokens = api?.registry?.chainTokens;
            const allDecimals = api?.registry?.chainDecimals;
            if (api && publicKey) {
                tokens.map(async (token: any, index: number) => {
                    unsub = await api?.query?.tokens?.accounts(
                        publicKey,
                        {
                            Token: token,
                        },
                        (res: any) => {
                            if (
                                Number(
                                    res.free.toString() /
                                        10 ** allDecimals[index]
                                ) !== Number(balances[index].balance) &&
                                !balances[index].isNative
                            ) {
                                generalDispatcher(() =>
                                    updateBalance({
                                        balances,
                                        token,
                                        updBalance:
                                            res.free.toString() /
                                            10 ** allDecimals[index],
                                    })
                                );
                            }
                        }
                    );
                });
                unsub = await api?.query?.system?.account(
                    publicKey,
                    ({ data: balance }: any) => {
                        const res: number =
                            Number(balance.free) - Number(balance.miscFrozen);
                        const newBalance: number = res / 10 ** allDecimals[0];
                        const updBalance: number =
                            Number(balance.free.toString()) /
                            10 ** allDecimals[0];
                        const exponentConverted =
                            exponentConversion(newBalance);
                        generalDispatcher(() =>
                            setBalance(Number(exponentConverted))
                        );
                        generalDispatcher(() =>
                            updateBalance({
                                balances,
                                token: tokens[0],
                                updBalance,
                            })
                        );
                    }
                );
                unsub2 = await api?.rpc?.chain?.subscribeNewHeads(
                    async (header) => {
                        const signedBlock = await api?.rpc?.chain?.getBlock(
                            header.hash
                        );
                        const apiAt = await api.at(header.hash);
                        const allEvents: any =
                            await apiAt?.query?.system.events();
                        const transactions: any = [];
                        signedBlock.block.extrinsics.forEach(
                            (extrinsic, index) => {
                                let blockTimeStamp: string;
                                if (
                                    extrinsic.method.method === 'set' &&
                                    extrinsic.method.section === 'timestamp'
                                ) {
                                    blockTimeStamp = new Date(
                                        Number(extrinsic?.args?.[0].toString())
                                    ).toISOString();
                                } else {
                                    blockTimeStamp = new Date().toISOString();
                                }
                                const userAddress = addressMapper(
                                    publicKey,
                                    api?.registry?.chainSS58 as number
                                );
                                allEvents
                                    .filter(
                                        ({ event, phase }: any) =>
                                            phase.isApplyExtrinsic &&
                                            phase.asApplyExtrinsic.eq(index)
                                    )
                                    .forEach((event: any) => {
                                        const userSentOrReceiveTx =
                                            txMadeOrReceiveByUser(
                                                extrinsic,
                                                event.event.section,
                                                event.event.method,
                                                userAddress,
                                                event
                                            );
                                        if (userSentOrReceiveTx.bool) {
                                            const chainDecimal =
                                                api?.registry?.chainDecimals[0];
                                            const txChainName =
                                                api.runtimeChain.toString();
                                            const txTokenName =
                                                api?.registry?.chainTokens[0];
                                            const formattedExtrinsic =
                                                formatExtrinsic(
                                                    extrinsic,
                                                    userAddress,
                                                    userSentOrReceiveTx.method,
                                                    chainDecimal,
                                                    api?.registry
                                                        ?.chainDecimals,
                                                    api?.registry?.chainTokens
                                                );
                                            const {
                                                accountFrom,
                                                accountTo,
                                                amount,
                                                hash,
                                                operation,
                                                tokenList,
                                            } = formattedExtrinsic;
                                            console.log(
                                                'formatted result =>',
                                                accountFrom,
                                                accountTo,
                                                amount,
                                                hash,
                                                operation,
                                                tokenList
                                            );
                                            if (!amount.includes(NaN)) {
                                                transactions.push({
                                                    accountFrom,
                                                    accountTo,
                                                    amount,
                                                    hash,
                                                    operation,
                                                    status: 'Confirmed',
                                                    chainName: txChainName,
                                                    tokenName: tokenList,
                                                    transactionFee: '0',
                                                    timestamp:
                                                        blockTimeStamp.slice(
                                                            0,
                                                            -1
                                                        ),
                                                });
                                            }
                                        }
                                    });
                            }
                        );
                        const txHashes = new Set();
                        const uniqueTransactions = transactions.filter(
                            (el: any) => {
                                const duplicate = txHashes.has(el.hash);
                                txHashes.add(el.hash);
                                return !duplicate;
                            }
                        );
                        if (uniqueTransactions.length > 0)
                            console.log(
                                'transaction hogayi:',
                                uniqueTransactions
                            );
                        generalDispatcher(() =>
                            addTransaction({
                                transactions: uniqueTransactions,
                                publicKey,
                            })
                        );
                    }
                );
            }
        })();
        return () => {
            if (unsub) {
                unsub();
            }
            if (unsub2) {
                unsub2();
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [api, publicKey]);
    return null;
};
export default memo(ApiManager);
