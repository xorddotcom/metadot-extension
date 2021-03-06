import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { ApiPromise as ApiPromiseType } from '@polkadot/api';
import { AssetCardWrapper, CoinName, NameAndAmount } from './styles';
import { HorizontalContentDiv } from '../wrapper';
import Button from '../button';
import { SEND } from '../../../constants';

import { ViewProps } from './type';
import { fonts } from '../../../utils';
import { RootState } from '../../../redux/store';

const { mainHeadingfontFamilyClass } = fonts;

const AssetCardView: React.FunctionComponent<ViewProps> = ({
    tokenLogo,
    chainName,
    AssetDetails,
    apiInitializationStarts,
    balance,
    tokenName,
    isNative,
    decimal,
}) => {
    const navigate = useNavigate();
    const currReduxState = useSelector((state: RootState) => state);
    const api = currReduxState.api.api as unknown as ApiPromiseType;
    const [tokenPrice, setTokenPrice] = useState('0');
    const sendBtn = {
        id: 'send-button',
        text: 'Send',
        style: {
            width: '65px',
            height: '22px',
            borderRadius: '4px',
            fontSize: '10px',
            marginTop: 10,
        },
        handleClick: () =>
            navigate(SEND, {
                state: {
                    tokenName,
                    balance,
                    isNative,
                    decimal,
                    dollarAmount: tokenPrice,
                },
            }),
        disabled: !!apiInitializationStarts,
    };

    const fetchTokenPrice = async (): Promise<void> => {
        const txChainName = api?.runtimeChain?.toString();
        const isTestNet = txChainName.includes('Testnet');

        if (!isTestNet) {
            await fetch(
                `https://api.polkawallet.io/price-server/?token=${tokenName}&from=market`
            )
                .then((res) => res.json())
                .then(({ data: { price } }) => {
                    const dollarAmount = (
                        Number(balance) * Number(price[0])
                    ).toFixed(2);
                    setTokenPrice(dollarAmount);
                });
        } else {
            setTokenPrice('0');
        }
    };

    useEffect(() => {
        const getTokenPrice = async (): Promise<void> => {
            await fetchTokenPrice();
        };
        getTokenPrice();
    }, [!!apiInitializationStarts]);

    return (
        <AssetCardWrapper id="asset-card">
            <HorizontalContentDiv>
                {tokenLogo}
                <NameAndAmount>
                    <CoinName className={mainHeadingfontFamilyClass}>
                        {tokenName}
                    </CoinName>
                    {AssetDetails}
                </NameAndAmount>
            </HorizontalContentDiv>

            <CoinName className={mainHeadingfontFamilyClass}>
                {`${tokenPrice} $`}
            </CoinName>

            <Button {...sendBtn} />
        </AssetCardWrapper>
    );
};

export default AssetCardView;
