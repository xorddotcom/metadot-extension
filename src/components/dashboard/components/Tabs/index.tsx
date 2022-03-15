/* eslint-disable react/destructuring-assignment */
/* eslint-disable radix */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from 'react-query';

import AssetCard from '../../../common/asset-card';
import TxCard from '../../../common/tx-card';

import { queryData } from '../../../../utils/queryData';
import { fonts, helpers } from '../../../../utils';
import {
    AssetsAndTransactionsWrapper,
    Tabs,
    TabSection,
} from '../../styledComponents';

import {
    AssetsAndTransactionsPropsInterface,
    TransactionRecord,
    TransactionRecordFromSubQuery,
    TxViewProps,
} from '../../types';
import { RootState } from '../../../../redux/store';
import { addTransaction } from '../../../../redux/slices/transactions';
import { ASSETS, TRANSACTIONS } from '../../../../utils/app-content';
import { SubHeading } from '../../../common/text/index';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;
const { trimBalance } = helpers;

const TxView: React.FunctionComponent<TxViewProps> = (
    props
): React.ReactElement => {
    const { transactionData, tokenName, handleClickOnTxCard } = props;
    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            {transactionData.length > 0 ? (
                transactionData
                    .filter(
                        (transaction: TransactionRecord) =>
                            transaction.tokenName === tokenName
                    )
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
                            coin: tokenNames,
                            amountInUsd: tokenNames === 'WND' ? '$0' : '$0',
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
        chainName,
        tokenName,
        tokenImage,
        balance,
        balanceInUsd,
        publicKey,
        prefix,
        queryEndpoint,
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

    const handleTransaction = (transactionObject: any): TransactionRecord => {
        // list all the previous hashes
        // and then dispatch new data if it's txhash is not in previousHashes

        const previousTransactionHashList = transactionData.map(
            (transaction: any) => transaction.hash
        );

        if (transactionObject.data.account.transferTo) {
            transactionObject.data.account.transferTo.nodes.map(
                (tempObj: TransactionRecordFromSubQuery) => {
                    const sendObj: TransactionRecord = {};
                    if (
                        !previousTransactionHashList.includes(
                            tempObj.extrinsicHash
                        )
                    ) {
                        const abc =
                            parseInt(tempObj.amount) /
                            parseInt(tempObj.decimals);

                        sendObj.accountFrom = tempObj.fromId;
                        sendObj.accountTo = tempObj.toId;
                        sendObj.amount = abc.toString();
                        sendObj.hash = tempObj.extrinsicHash;
                        sendObj.operation = 'Receive';
                        sendObj.status = tempObj.status
                            ? 'Confirmed'
                            : 'Failed';
                        sendObj.chainName = tempObj.token;
                        sendObj.tokenName = tempObj.token;
                        sendObj.transactionFee = '0';
                        sendObj.timestamp = tempObj.timestamp;
                        dispatch(addTransaction(sendObj));
                    }

                    return sendObj;
                }
            );
        }

        if (transactionObject.data.account.transferFrom) {
            transactionObject.data.account.transferFrom.nodes.map(
                (tempObj: TransactionRecordFromSubQuery) => {
                    const obj: TransactionRecord = {};
                    if (
                        !previousTransactionHashList.includes(
                            tempObj.extrinsicHash
                        )
                    ) {
                        const abc =
                            parseInt(tempObj.amount) /
                            parseInt(tempObj.decimals);
                        obj.accountFrom = tempObj.fromId;
                        obj.accountTo = tempObj.toId;
                        obj.amount = abc.toString();
                        obj.hash = tempObj.extrinsicHash;
                        obj.operation = 'Send';
                        obj.status = tempObj.status ? 'Confirmed' : 'Failed';
                        obj.chainName = tempObj.token;
                        obj.tokenName = tempObj.token;
                        obj.transactionFee = '0';
                        obj.timestamp = tempObj.timestamp;
                        dispatch(addTransaction(obj));
                    }

                    return obj;
                }
            );
        }

        return transactionObject;
    };

    const { query, endPoint } = queryData(queryEndpoint, publicKey, prefix);

    const fetchTransactions = async (): Promise<any> =>
        fetch(endPoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query,
            }),
        })
            .then((r) => r.json())
            .then((r) => handleTransaction(r))
            .catch((e) => console.log(e));

    useQuery('user-transaction', fetchTransactions, {
        refetchInterval: 5000,
    });

    return (
        <AssetsAndTransactionsWrapper>
            <Tabs>
                <TabSection {...tabSectionAssets}>{ASSETS}</TabSection>
                <TabSection {...tabSectionTransactions}>
                    {TRANSACTIONS}
                </TabSection>
            </Tabs>
            <div className="scrollbar" style={{ marginTop: '0' }}>
                {isTab1Active && (
                    <AssetCard
                        name={chainName}
                        shortName={tokenName}
                        amount={trimBalance(balance)}
                        amountInUsd={balanceInUsd}
                        logo={tokenImage}
                    />
                )}
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
