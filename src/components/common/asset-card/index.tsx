import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
    AssetCardWrapper,
    CoinAmount,
    CoinName,
    NameAndAmount,
} from './styles';
import { EquivalentInUSDT } from '../text';
import { HorizontalContentDiv } from '../wrapper';
import Button from '../button';
import { fonts } from '../../../utils';
import { Props } from './type';
import { RootState } from '../../../redux/store';

const AssetCard: React.FunctionComponent<Props> = ({
    name,
    amount,
    shortName,
    amountInUsd,
    logo,
}): React.ReactElement => {
    const { apiInitializationStarts } = useSelector(
        (state: RootState) => state.api
    );
    const navigate = useNavigate();
    const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

    const sendBtn = {
        id: 'send-button',
        text: 'Send',
        width: '60px',
        fontSize: '12px',
        fontWeight: 500,
        height: '30px',
        br: '4px',
        handleClick: () => navigate('/send'),
        disabled: !!apiInitializationStarts,
    };

    return (
        <AssetCardWrapper id="asset-card">
            <HorizontalContentDiv>
                {!apiInitializationStarts ? (
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
                )}
                <NameAndAmount>
                    <CoinName className={mainHeadingfontFamilyClass}>
                        {name === 'Polkadot Main Network' ? 'Polkadot' : name}
                    </CoinName>
                    {!apiInitializationStarts ? (
                        <HorizontalContentDiv width="120px" height="17px">
                            <CoinAmount
                                id="coin-amount"
                                className={mainHeadingfontFamilyClass}
                            >
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
                    )}
                </NameAndAmount>
            </HorizontalContentDiv>

            <div style={{ marginRight: '0.2rem', marginTop: '0.5rem' }}>
                <Button {...sendBtn} />
            </div>
        </AssetCardWrapper>
    );
};

export default AssetCard;
