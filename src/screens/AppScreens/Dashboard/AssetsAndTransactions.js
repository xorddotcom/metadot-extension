/* eslint-disable no-else-return */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { AssetCard, TxCard } from '../../../components';
import { fonts, helpers } from '../../../utils';

import {
  AssetsAndTransactionsWrapper,
  Tabs,
  TabSection,
} from './StyledComponents';

// Assests Token images
import dusty from '../../../assets/images/tokenImg/dusty.png';
import kusamaKsm from '../../../assets/images/tokenImg/kusama-ksm.svg';
import polkadotDot from '../../../assets/images/tokenImg/polkadot-dot.svg';
import westendColour from '../../../assets/images/tokenImg/westend_colour.svg';
import acala from '../../../assets/images/tokenImg/acala-circle.svg';

const { mainHeadingfontFamilyClass } = fonts;
const { trimBalance } = helpers;

function AssetsAndTransactions({
  handleOpenTxDetailsModal,
  setTxDetailsModalData,
  transactionData,
}) {
  const assetsData = useSelector((state) => state.account);
  const [isTab1Active, setIsTab1Active] = useState(true);
  const [isTab2Active, setIsTab2Active] = useState(false);
  console.log('Transaction data [][]', transactionData);
  console.log('Tx detail modal', setTxDetailsModalData);
  // const transactions = useSelector((state) => state.transactions.transactions);
  // console.log('transactions', transactions);
  // console.log('===============', assetsData);
  const logoChangeHandler = (token) => {
    console.log('-------------', token);
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
    } else {
      return polkadotDot;
    }
  };
  return (
    <AssetsAndTransactionsWrapper>
      <Tabs>
        <TabSection
          isActive={isTab1Active}
          className={mainHeadingfontFamilyClass}
          onClick={() => {
            setIsTab1Active(true);
            setIsTab2Active(false);
          }}
        >
          Assets
        </TabSection>
        <TabSection
          isActive={isTab2Active}
          className={mainHeadingfontFamilyClass}
          onClick={() => {
            setIsTab1Active(false);
            setIsTab2Active(true);
          }}
        >
          Transactions
        </TabSection>
      </Tabs>
      {isTab1Active && (
        <AssetCard
          name={assetsData.chainName}
          shortName={assetsData.tokenName[0]}
          amount={(trimBalance(assetsData.balance))}
          amountInUsd={0}
          logo={logoChangeHandler(assetsData.tokenName)}
        />
      )}
      {console.log('===============', assetsData)}
      {isTab2Active && (
        // eslint-disable-next-line arrow-body-style
        transactionData.length > 0 && transactionData.map((transaction) => {
          return (
            <TxCard
              key={transaction.hash}
              operation={transaction.operation}
              status={transaction.status}
              coin={transaction.tokenName}
              amount={transaction.amount}
              // amountInUsd={transaction.amountInUSD}
              amountInUsd={transaction.tokenName === 'WND' ? '$0' : '$107.17'}
              logo="https://s2.coinmarketcap.com/static/img/coins/64x64/6636.png"
              handleClick={() => {
                setTxDetailsModalData(transaction);
                handleOpenTxDetailsModal();
              }}
            />
          );
        })
      )}

    </AssetsAndTransactionsWrapper>
  );
}

export default AssetsAndTransactions;
