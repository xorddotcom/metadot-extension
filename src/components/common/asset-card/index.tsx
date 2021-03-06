import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import AssetCardView from './view';
import { CoinAmount } from './styles';
import { EquivalentInUSDT } from '../text';
import { HorizontalContentDiv } from '../wrapper';

import { Props } from './type';
import { RootState } from '../../../redux/store';
import { fonts, helpers } from '../../../utils';

const AssetCard: React.FunctionComponent<Props> = ({
    name,
    amount,
    shortName,
    balanceInUsd,
    logo,
    isNative,
    decimal,
}): React.ReactElement => {
    const { apiInitializationStarts } = useSelector(
        (state: RootState) => state.api
    );
    const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;
    const { trimBalance } = helpers;

    // const ifUrlImage = logo.includes('http') ? fetch(logo) : logo;

    const tokenLogo = !apiInitializationStarts ? (
        <img
            // src={ifUrlImage.then((res: string) => res)}
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
        <HorizontalContentDiv height="17px">
            <CoinAmount id="coin-amount" className={mainHeadingfontFamilyClass}>
                {`${trimBalance(amount)}`}
            </CoinAmount>
            <EquivalentInUSDT
                id="equivalent-in-usd"
                className={subHeadingfontFamilyClass}
            >
                ${balanceInUsd === 0 ? 0 : trimBalance(balanceInUsd.toFixed(5))}
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
