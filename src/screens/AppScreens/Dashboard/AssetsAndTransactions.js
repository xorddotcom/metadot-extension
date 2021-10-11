import { useState } from 'react';
import { AssetCard, TxCard } from '../../../components';
import { fonts } from '../../../utils';

import BTCIcon from '../../../assets/images/btc.svg';

import {
  AssetsAndTransactionsWrapper,
  Tabs,
  TabSection,
} from './StyledComponents';

const { mainHeadingfontFamilyClass } = fonts;

function AssetsAndTransactions({ handleOpenTxDetailsModal }) {
  const [isTab1Active, setIsTab1Active] = useState(true);
  const [isTab2Active, setIsTab2Active] = useState(false);

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
          name="Polkadot"
          shortName="DOT"
          amount={0.0636}
          amountInUsd={107.17}
          logo={BTCIcon}
        />
      )}
      {isTab2Active && (
        <TxCard
          operation="Received"
          status="Confirmed"
          coin="DOT"
          amount={0.0636}
          amountInUsd={107.17}
          logo={BTCIcon}
          handleClick={() => handleOpenTxDetailsModal()}
        />
      )}

    </AssetsAndTransactionsWrapper>
  );
}

export default AssetsAndTransactions;
