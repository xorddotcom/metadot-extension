import { useState } from 'react';
import AssetCard from '../../../components/AssetCard';
import { fonts } from '../../../utils';
import {
  AssetsAndTransactionsWrapper,
  Tabs,
  TabSection,
} from './StyledComponents';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

function AssetsAndTransactions(props) {
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
          }}>
          Assets
        </TabSection>
        <TabSection
          isActive={isTab2Active}
          className={mainHeadingfontFamilyClass}
          onClick={() => {
            setIsTab1Active(false);
            setIsTab2Active(true);
          }}>
          Transactions
        </TabSection>
      </Tabs>
      <AssetCard />
    </AssetsAndTransactionsWrapper>
  );
}

export default AssetsAndTransactions;
