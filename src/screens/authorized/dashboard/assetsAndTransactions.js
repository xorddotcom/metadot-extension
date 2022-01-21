/* eslint-disable no-else-return */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from 'react-query';
import { AssetCard, TxCard } from '../../../components';
import { fonts, helpers } from '../../../utils';
import {
  AssetsAndTransactionsWrapper,
  Tabs,
  TabSection,
} from './styledComponents';

// Assests Token images
import dusty from '../../../assets/images/tokenImg/dusty.png';
import kusamaKsm from '../../../assets/images/tokenImg/kusama-ksm.svg';
import polkadotDot from '../../../assets/images/tokenImg/polkadot.png';
import westendColour from '../../../assets/images/tokenImg/westend_colour.svg';
import acala from '../../../assets/images/tokenImg/acala-circle.svg';
import astar from '../../../assets/images/astar.png';
import rococo from '../../../assets/images/rococo.svg';
import karura from '../../../assets/images/karura.svg';
import { addTransaction } from '../../../redux/slices/transactions';
import { queryData } from '../../../utils/queryData';

const { mainHeadingfontFamilyClass } = fonts;
const { trimBalance, reverseArray } = helpers;

function AssetsAndTransactions({
  handleOpenTxDetailsModal,
  setTxDetailsModalData,
  transactionData,
}) {
  const dispatch = useDispatch();
  const assetsData = useSelector((state) => state.activeAccount);
  const {
    chainName, tokenName, balance, balanceInUsd,
  } = assetsData;
  const [isTab1Active, setIsTab1Active] = useState(true);
  const [isTab2Active, setIsTab2Active] = useState(false);
  const logoChangeHandler = (token) => {
    if (token === 'DOT') {
      return polkadotDot;
    } else if (token === 'KSM') {
      return kusamaKsm;
    } else if (token === 'WND') {
      return westendColour;
    } else if (token === 'PLD') {
      return dusty;
    } else if (token === 'ACA') {
      return acala;
    } else if (token === 'PLM') {
      return astar;
    } else if (token === 'ROC') {
      return rococo;
    } else if (token === 'KAR') {
      return karura;
    } else {
      return polkadotDot;
    }
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

  const { query, endPoint } = queryData(chainName);

  const fetchTransactions = async () => fetch(endPoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query,
    }),
  }).then((r) => r.json())
    .then((r) => handleTransaction(r))
    .catch((e) => console.log(e));

  useQuery(
    'user-transaction',
    fetchTransactions,
    {
      refetchInterval: 5000,
    },
  );

  const handleTransaction = (transactionObject) => {
    // list all the previous hashes
    // and then dispatch new data if it's txhash is not in previousHashes

    console.log('handle transaction runninggggggggg', transactionObject);

    const previousTransactionHashList = transactionData.map((transaction) => transaction.hash);

    console.log(transactionObject.data.account, 'abc test');

    if (transactionObject.data.account) {
      transactionObject.data.account.transferTo.nodes.map((tempObj) => {
        const obj = {};
        if (!previousTransactionHashList.includes(tempObj.extrinsicHash)) {
          obj.accountFrom = tempObj.fromId;
          obj.accountTo = tempObj.toId;
          // eslint-disable-next-line radix
          obj.amount = parseInt(tempObj.amount) / parseInt(tempObj.decimals);
          obj.hash = tempObj.extrinsicHash;
          obj.operation = 'Receive';
          obj.status = tempObj.status ? 'Success' : 'Failed';
          obj.chainName = tempObj.token;
          obj.tokenName = tempObj.token;
          obj.transactionFee = 0;
          console.log('object from send', obj);
          dispatch(addTransaction(obj));
        }

        return obj;
      });

      transactionObject.data.account.transferFrom.nodes.map((tempObj) => {
        const obj = {};
        if (!previousTransactionHashList.includes(tempObj.extrinsicHash)) {
          obj.accountFrom = tempObj.fromId;
          obj.accountTo = tempObj.toId;
          // eslint-disable-next-line radix
          obj.amount = parseInt(tempObj.amount) / parseInt(tempObj.decimals);
          obj.hash = tempObj.extrinsicHash;
          obj.operation = 'Send';
          obj.status = tempObj.status ? 'Success' : 'Failed';
          obj.chainName = tempObj.token;
          obj.tokenName = tempObj.token;
          obj.transactionFee = 0;
          console.log('object from rec', obj);
          dispatch(addTransaction(obj));
        }

        return obj;
      });
    }

    return transactionObject;
  };

  return (
    <AssetsAndTransactionsWrapper>
      <Tabs>
        <TabSection {...tabSectionAssets}>
          Assets
        </TabSection>
        <TabSection {...tabSectionTransactions}>
          Transactions
        </TabSection>
      </Tabs>
      <div className="scrollbar" style={{ marginTop: '0' }}>
        {isTab1Active && (
        <AssetCard
          name={chainName}
          shortName={tokenName}
          amount={(trimBalance(balance))}
          amountInUsd={balanceInUsd}
          logo={logoChangeHandler(tokenName)}
        />
        )}
        {isTab2Active && (
        // eslint-disable-next-line arrow-body-style
          transactionData.length > 0 && transactionData
            .filter((transaction) => transaction.tokenName === tokenName)
            .map((transaction) => {
              const {
                hash, operation, status, tokenName: tokenNames, amount,
              } = transaction;

              const txCard = {
                coin: tokenNames,
                amountInUsd: tokenNames === 'WND' ? '$0' : '$0',
                logo: logoChangeHandler(tokenNames),
                handleClick: () => {
                  setTxDetailsModalData(transaction);
                  handleOpenTxDetailsModal();
                },
                operation,
                status,
                amount,
              };
              return (
                <TxCard key={hash} {...txCard} />
              );
            })
        )}
      </div>

    </AssetsAndTransactionsWrapper>
  );
}

export default AssetsAndTransactions;
