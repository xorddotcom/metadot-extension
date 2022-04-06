import React from 'react';
import { useSelector } from 'react-redux';

import AssetCardView from './view';
import { CoinAmount } from './styles';
import { EquivalentInUSDT } from '../text';
import { HorizontalContentDiv } from '../wrapper';

import { Props } from './type';
import { RootState } from '../../../redux/store';
import { fonts } from '../../../utils';

const AssetCard: React.FunctionComponent<Props> = ({
    name,
    amount,
    shortName,
    amountInUsd,
    logo,
    isNative,
    decimal,
}): React.ReactElement => {
    const { apiInitializationStarts } = useSelector(
        (state: RootState) => state.api
    );
    const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

    const tokenLogo = !apiInitializationStarts ? (
        <img
            src={logo}
            alt="currency icon"
            width="30px"
            height="30px"
            style={{
                borderRadius: '50%',
            }}
        />
    ) : (
        <div
            style={{ width: 30, height: 30, borderRadius: '50%' }}
            className="wave"
        />
    );

    const AssetDetails = !apiInitializationStarts ? (
        <HorizontalContentDiv width="120px" height="17px">
            <CoinAmount id="coin-amount" className={mainHeadingfontFamilyClass}>
                {`${amount} ${shortName}`}
            </CoinAmount>
            <EquivalentInUSDT
                id="equivalent-in-usd"
                className={subHeadingfontFamilyClass}
            >
                ($
                {amountInUsd})
            </EquivalentInUSDT>
        </HorizontalContentDiv>
    ) : (
        <HorizontalContentDiv
            id="loading"
            className="wave"
            height="8px"
            width="103px"
            borderRadius="4px"
        />
    );

    return (
        <AssetCardView
            tokenLogo={tokenLogo}
            chainName={name}
            AssetDetails={AssetDetails}
            apiInitializationStarts={apiInitializationStarts}
            balance={amount}
            tokenName={shortName}
            isNative={isNative}
            decimal={decimal}
        />
    );
};

export default AssetCard;
