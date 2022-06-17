/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable radix */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TransactionRecord } from '../../../../redux/types';

import AssetCard from '../../../common/asset-card';
import TxCard from '../../../common/tx-card';

import { HorizontalContentDiv } from '../../../common/wrapper';

import {
    queryData,
    queryDataForBatch,
    queryDataForSwap,
} from '../../../../utils/queryData';
import { fonts, helpers, exponentConversion } from '../../../../utils';
import services from '../../../../utils/services';
import {
    AssetsAndTransactionsWrapper,
    Tabs,
    TabSection,
} from '../../styledComponents';

import {
    AssetsAndTransactionsPropsInterface,
    TransactionRecordFromSubQuery,
    TxViewProps,
} from '../../types';
import { RootState } from '../../../../redux/store';
import { addTransaction } from '../../../../redux/slices/transactions';
import { ASSETS, TRANSACTIONS } from '../../../../utils/app-content';
import { SubHeading } from '../../../common/text/index';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;
const { addressMapper } = services;

const TxView: React.FunctionComponent<TxViewProps> = (
    props
): React.ReactElement => {
    const { transactionData, tokenName, handleClickOnTxCard } = props;
    const { publicKey, balances } = useSelector(
        (state: RootState) => state.activeAccount
    );

    const allTokens = balances.map((bal) => bal.name);

    const transactionsOfActiveAccount = transactionData[publicKey]
        ? Object.values(transactionData[publicKey])
        : [];
    const txRecordsForSelectedNetwork = transactionsOfActiveAccount.filter(
        // eslint-disable-next-line array-callback-return
        (transaction: TransactionRecord) =>
            transaction.tokenName[0] &&
            allTokens.includes(transaction.tokenName[0])
    );

    const { apiInitializationStarts } = useSelector(
        (state: RootState) => state.api
    );

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            {apiInitializationStarts ? (
                <HorizontalContentDiv
                    id="loading"
                    className="wave"
                    height="20px"
                    width="90%"
                    borderRadius="4px"
                    marginTop="75px"
                    ml="5%"
                />
            ) : transactionsOfActiveAccount.length > 0 &&
              txRecordsForSelectedNetwork.length !== 0 ? (
                txRecordsForSelectedNetwork
                    .sort(
                        (a: any, b: any) =>
                            Number(new Date(b.timestamp)) -
                            Number(new Date(a.timestamp))
                    )
                    .map((transaction) => {
                        const {
                            operation,
                            status,
                            tokenName: tokenNames,
                            amount,
                            timestamp,
                        } = transaction;

                        const txCard = {
                            coin: tokenNames[0],
                            amountInUsd: '$0',
                            handleClick: () => handleClickOnTxCard(transaction),
                            operation,
                            status,
                            amount,
                            timestamp,
                        };
                        return <TxCard key={Math.random()} {...txCard} />;
                    })
            ) : (
                <SubHeading
                    color="rgba(250, 250, 250, 0.7)"
                    className={subHeadingfontFamilyClass}
                    weight="500"
                    textAlign="center"
                    marginTop="75px"
                >
                    No Transaction History
                </SubHeading>
            )}
        </>
    );
};

const AssetsAndTransactions: React.FunctionComponent<
    AssetsAndTransactionsPropsInterface
> = ({ handleOpenTxDetailsModal, setTxDetailsModalData, transactionData }) => {
    const dispatch = useDispatch();
    const assetsData = useSelector((state: RootState) => state.activeAccount);
    const {
        rpcUrl,
        chainName,
        tokenName,
        tokenImage,
        balanceInUsd,
        publicKey,
        prefix,
        queryEndpoint,
        balance,
        balances,
    } = assetsData;
    const [isTab1Active, setIsTab1Active] = useState(true);
    const [isTab2Active, setIsTab2Active] = useState(false);

    const handleClickOnTxCard = (transaction: TransactionRecord): void => {
        setTxDetailsModalData(transaction);
        handleOpenTxDetailsModal();
    };

    const tabSectionAssets = {
        isActive: isTab1Active,
        className: mainHeadingfontFamilyClass,
        onClick: () => {
            setIsTab1Active(true);
            setIsTab2Active(false);
        },
    };

    const tabSectionTransactions = {
        isActive: isTab2Active,
        className: mainHeadingfontFamilyClass,
        onClick: () => {
            setIsTab1Active(false);
            setIsTab2Active(true);
        },
    };

    const handleTransaction = (transactionObject: any): void => {
        const transactions = [
            ...transactionObject.data.account.transferTo.nodes,
            ...transactionObject.data.account.transferFrom.nodes,
            // eslint-disable-next-line array-callback-return
        ].map((transaction) => {
            const gasFee = transaction.fees
                ? (
                      parseInt(transaction.fees) /
                      parseInt(transaction.token.decimals)
                  ).toString()
                : '0';
            return {
                accountFrom: transaction.fromId,
                accountTo: [transaction.toId],
                amount: [
                    parseInt(transaction.amount) /
                        parseInt(transaction.token.decimals),
                ],
                hash: transaction.extrinsicHash,
                operation:
                    publicKey === addressMapper(transaction.fromId, 42)
                        ? 'Send'
                        : 'Receive',
                status: transaction.status ? 'Confirmed' : 'Failed',
                chainName: transaction.token,
                tokenName: [transaction.token.name],
                transactionFee: gasFee,
                timestamp: transaction.timestamp,
            };
        });

        dispatch(addTransaction({ transactions, publicKey }));
    };

    const handleSwapRecords = (transactionObject: any): void => {
        const transactions =
            transactionObject.data.query.account.swaps.nodes.map(
                (transaction: any) => {
                    const gasFee = transaction.fees
                        ? (parseInt(transaction.fees) / 10 ** 12).toString()
                        : '0';
                    return {
                        accountFrom: transaction.fromId,
                        accountTo: [transaction.fromId],
                        amount: [
                            exponentConversion(
                                parseInt(transaction.data[0].amount) / 10 ** 12
                            ),
                            exponentConversion(
                                parseInt(
                                    transaction.data[
                                        transaction.data.length - 1
                                    ].amount
                                ) /
                                    10 ** 12
                            ),
                        ],
                        hash: transaction.extrinsicHash,
                        operation: 'Swap',
                        status: 'Success',
                        chainName: 'KAR',
                        tokenName: [
                            transaction.data[0].token,
                            transaction.data[transaction.data.length - 1].token,
                        ],
                        transactionFee: gasFee,
                        timestamp: transaction.timestamp,
                    };
                }
            );

        dispatch(addTransaction({ transactions, publicKey }));
    };

    const handleBatchRecords = (transactionObject: any): void => {
        const transactions = [
            ...transactionObject.data.query.account.batchRecordsFrom.nodes,
            ...transactionObject.data.query.account.batchRecordsTo.nodes,
            // eslint-disable-next-line array-callback-return
        ].map((transaction) => {
            // return transaction;
            const senderId =
                transaction.senderId ||
                transaction.batch.sender.nodes[0].senderId;
            const gasFee = transaction.batch.fees
                ? (
                      parseInt(transaction.batch.fees) /
                      parseInt(transaction.batch.calls[0].token.decimals)
                  ).toString()
                : '0';
            return {
                accountFrom: senderId,
                accountTo: transaction.batch.calls.map(
                    (item: any) => item.receiver
                ),
                amount: transaction.batch.calls.map((item: any) => {
                    return (
                        parseInt(item.amount) / parseInt(item.token.decimals)
                    );
                }),
                hash: transaction.batch.extrinsicHash,
                operation:
                    publicKey === addressMapper(senderId, 42)
                        ? 'Batch Send'
                        : 'Batch Receive',
                status: 'Confirmed',
                chainName: transaction.token,
                tokenName: transaction.batch.calls.map(
                    (item: any) => item.token.name
                ),
                transactionFee: gasFee,
                timestamp: transaction.batch.calls[0].timestamp,
            };
        });

        dispatch(addTransaction({ transactions, publicKey }));
    };

    const fetchTransactions = async (): Promise<any> => {
        const { query, endPoint } = queryData(queryEndpoint, publicKey, prefix);
        fetch(endPoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query,
            }),
        })
            .then((r) => r.json())
            .then((r) => handleTransaction(r))
            .catch((e) => console.log('fetching tx records...'));
    };

    const fetchBatchRecords = async (): Promise<any> => {
        const { query, endPoint } = queryDataForBatch(
            queryEndpoint,
            publicKey,
            prefix
        );
        fetch(endPoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query,
            }),
        })
            .then((r) => r.json())
            .then((r) => handleBatchRecords(r))
            .catch((e) => console.log('fetching tx records...', e));
    };

    const fetchSwapRecords = async (): Promise<any> => {
        const { query, endPoint } = queryDataForSwap(
            queryEndpoint,
            publicKey,
            prefix
        );
        fetch(endPoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query,
            }),
        })
            .then((r) => r.json())
            .then((r) => handleSwapRecords(r))
            .catch((e) => console.log('fetching SWAP tx records...', e));
    };

    useEffect(() => {
        if (publicKey) {
            fetchTransactions();
            fetchBatchRecords();
            fetchSwapRecords();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rpcUrl, publicKey, prefix]);
    return (
        <AssetsAndTransactionsWrapper>
            <Tabs>
                <TabSection {...tabSectionAssets}>{ASSETS}</TabSection>
                <TabSection {...tabSectionTransactions}>
                    {TRANSACTIONS}
                </TabSection>
            </Tabs>
            <div className="scrollbar" style={{ marginTop: '0' }}>
                {balances.length > 1
                    ? isTab1Active &&
                      balances.map((singleToken: any) => {
                          return (
                              <AssetCard
                                  name={chainName}
                                  shortName={singleToken.name}
                                  amount={String(singleToken.balance)}
                                  balanceInUsd={10}
                                  logo={singleToken.tokenImage}
                                  isNative={singleToken.isNative}
                                  decimal={singleToken.decimal}
                              />
                          );
                      })
                    : isTab1Active && (
                          <AssetCard
                              name={chainName}
                              shortName={balances[0].name}
                              amount={String(balances[0].balance.toFixed(5))}
                              balanceInUsd={10}
                              logo={balances[0].tokenImage || tokenImage}
                              isNative
                              decimal={balances[0].decimal}
                          />
                      )}

                {/* {isTab1Active &&
                    balances.map((singleToken: any) => {
                        console.log('Single token', singleToken);
                        return (
                            <AssetCard
                                name={chainName}
                                shortName={singleToken.name}
                                amount={String(singleToken.balance)}
                                amountInUsd={100}
                                logo={tokenImage}
                                isNative={singleToken.isNative}
                            />
                        );
                    })}
                 {isTab1Active && (
                    <AssetCard
                        name={chainName}
                        shortName={tokenName}
                        amount={trimBalance(balance)}
                        amountInUsd={balanceInUsd}
                        logo={tokenImage}
                        isNative
                    />
                )}  */}
                {isTab2Active && (
                    <TxView
                        transactionData={transactionData}
                        tokenName={tokenName}
                        handleClickOnTxCard={handleClickOnTxCard}
                    />
                )}
            </div>
        </AssetsAndTransactionsWrapper>
    );
};

export default AssetsAndTransactions;
