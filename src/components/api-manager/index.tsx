import React, { useEffect, memo } from 'react';
import { useSelector } from 'react-redux';
import type { ApiPromise as ApiPromiseType } from '@polkadot/api';

import { setApi, setApiInitializationStarts } from '../../redux/slices/api';
import {
    setBalance,
    setBalanceInUsd,
    setTokenName,
    setWalletConnected,
} from '../../redux/slices/activeAccount';
import { setIsResponseModalOpen } from '../../redux/slices/modalHandling';
import { RootState } from '../../redux/store';

import { helpers, images } from '../../utils';
import services from '../../utils/services';
import useResponseModal from '../../hooks/useResponseModal';
import useDispatcher from '../../hooks/useDispatcher';
import { getAuthList } from '../../messaging';

const { wifiOff, SuccessCheckIcon } = images;

const ApiManager: React.FunctionComponent<{ rpc: string }> = ({ rpc }) => {
    const setIsWalletConnected = localStorage.getItem('setIsWalletConnected');
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

    const { convertIntoUsd } = helpers;
    const { getBalance, providerInitialization } = services;
    const { publicKey, chainName, tokenName } = activeAccount;

    const compareSites = (arr: any, sub: any): any => {
        const sub2 = sub.toLowerCase();
        return arr.filter((str: any) =>
            str
                .toLowerCase()
                .startsWith(sub2.slice(0, Math.max(str.length - 1, 1)))
        );
    };

    // const mainListenerForRecievingTx = async (): Promise<void> => {
    //     const res = await api.query.system.account(publicKey);
    //     const now = api.query.timestamp.now();
    //     // const res2 = await api.hi
    //     console.log('Res', res.toString());
    //     console.log('Time', now);

    //     const [entryHash, entrySize] = await Promise.all([
    //         api.query.system.account.hash(publicKey),
    //         api.query.system.account.size(publicKey),
    //     ]);

    //     // Output the info
    //     console.log(
    //         `The current size is ${entrySize}
    //      bytes with a hash of ${entryHash}`
    //     );
    //     Subscribe to system events via storage
    //     api.query.system.events((events) => {
    //         console.log('Events [][]', events);
    //                 // console.log(`\nReceived ${events.length} events:`);

    //         Loop through the Vec<EventRecord>
    //         events.forEach((record: any) => {
    //             Extract the phase, event and the event types
    //             const { event, phase } = record;
    //             const types = event.typeDef;

    //             console.log('Event', event.data.toString());
    //             Show what we are busy with
    //             console.log(
    //                 `Hello ===>>> \t${event.section}:${event.method}
    //                 :: (phase=${phase})`
    //             );
    //             console.log(`Bye [][] \t\t${event.meta.documentation}`);

    //             Loop through each of the parameters,
    //             displaying the type and data
    //             console.log('Events ===>>>>', event.data.toString());

    //             event.data.forEach((data: any, index: any) => {
    //                 console.log(
    //                     `Hello \t\t\t${types[index].type}
    //                 : ${data.toString()}`
    //                 );
    //                 console.log('Accounts ===>>', data.toString());
    //                 if (
    //                     types[index].type === 'AccountId32' &&
    //                     data.toString() === publicKey
    //                 ) {
    //                     txData.type = types[index].type;
    //                     txData.value = data;
    //                     console.log('IN if');
    //                     console.log('if check', types[index]);
    //                     setTx(types[index].type);
    //                 }
    //             });
    //         });
    //     });
    // };

    // mainListenerForRecievingTx().catch((err) => console.log('Error', err));

    useEffect(() => {
        let unsub: any;
        let unsub2: any;
        (async () => {
            if (api) {
                const decimals = api?.registry?.chainDecimals[0];

                unsub = await api.query.system.account(
                    publicKey,
                    ({ data: balance }) => {
                        generalDispatcher(() =>
                            setBalance(Number(balance.free) / 10 ** decimals)
                        );
                    }
                );

                unsub2 = api.query.system.events((events) => {
                    console.log('events length ==>>', events.length);
                    events.forEach((record: any) => {
                        const { event } = record;

                        if (event.data.method === 'ExtrinsicSuccess') {
                            console.log('events ==>>', event);
                            console.log(`hash: ${event.hash.toString()}`);
                        }
                    });
                });
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
    }, [setIsWalletConnected]);

    useEffect(() => {
        const setAPI = async (rpcUrl: string): Promise<void> => {
            try {
                generalDispatcher(() => setApiInitializationStarts(true));

                if (window.navigator.onLine) {
                    // setting api instance of selected network
                    const newApiInstance = await providerInitialization(rpcUrl);

                    // getting token name
                    const tokenNameofSelectedNetwork = await newApiInstance
                        .registry.chainTokens[0];

                    // getting token balance
                    const balanceOfSelectedNetwork = await getBalance(
                        newApiInstance,
                        publicKey
                    );

                    // getting token balance in usd
                    const dollarAmount = await convertIntoUsd(
                        tokenNameofSelectedNetwork,
                        balanceOfSelectedNetwork
                    );
                    await newApiInstance.isReady;
                    generalDispatcher(() => setBalanceInUsd(dollarAmount));

                    generalDispatcher(() => setApi(newApiInstance));

                    generalDispatcher(() => setApiInitializationStarts(false));
                    generalDispatcher(() =>
                        setTokenName(tokenNameofSelectedNetwork)
                    );
                    generalDispatcher(() =>
                        setBalance(balanceOfSelectedNetwork)
                    );

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
        generalDispatcher(() => setApiInitializationStarts(true));
        const accountChanged = async (): Promise<void> => {
            // getting token balance
            const balanceOfSelectedNetwork = await getBalance(api, publicKey);
            // getting token balance in usd
            const dollarAmount = await convertIntoUsd(
                tokenName,
                balanceOfSelectedNetwork
            );
            generalDispatcher(() => setBalanceInUsd(dollarAmount));
            generalDispatcher(() => setBalance(balanceOfSelectedNetwork));

            generalDispatcher(() => setApiInitializationStarts(false));
        };
        accountChanged();
    }, [publicKey]);
    return null;
};

export default memo(ApiManager);
