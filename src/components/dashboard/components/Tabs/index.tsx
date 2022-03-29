/* eslint-disable react/destructuring-assignment */
/* eslint-disable radix */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

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
    const { publicKey } = useSelector(
        (state: RootState) => state.activeAccount
    );
    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            {Object.values(transactionData[publicKey]).length > 0 ? (
                Object.values(transactionData[publicKey])
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
        rpcUrl,
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

    const handleTransaction = (transactionObject: any): void => {
        const transactions = [
            ...transactionObject.data.account.transferTo.nodes,
            ...transactionObject.data.account.transferFrom.nodes,
        ].map((transaction) => {
            return {
                accountFrom: transaction.fromId,
                accountTo: transaction.toId,
                amount: (
                    parseInt(transaction.amount) /
                    parseInt(transaction.decimals)
                ).toString(),
                hash: transaction.extrinsicHash,
                operation:
                    publicKey === transaction.fromId ? 'Send' : 'Receive',
                status: transaction.status ? 'Confirmed' : 'Failed',
                chainName: transaction.token,
                tokenName: transaction.token,
                transactionFee: '0',
                timestamp: transaction.timestamp,
            };
        });

        dispatch(addTransaction({ transactions, publicKey }));
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
            .catch((e) => console.log('fetching tx records...'));

    useEffect(() => {
        if (publicKey) {
            fetchTransactions();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rpcUrl, publicKey]);

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
                        balanceInUsd={balanceInUsd}
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
