import React from 'react';
import { useNavigate } from 'react-router-dom';

import { AssetCardWrapper, CoinName, NameAndAmount } from './styles';
import { HorizontalContentDiv } from '../wrapper';
import Button from '../button';
import { SEND } from '../../../constants';

import { ViewProps } from './type';
import { fonts } from '../../../utils';

const { mainHeadingfontFamilyClass } = fonts;

const AssetCardView: React.FunctionComponent<ViewProps> = ({
    tokenLogo,
    chainName,
    AssetDetails,
    apiInitializationStarts,
}) => {
    const navigate = useNavigate();
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
        handleClick: () => navigate(SEND),
        disabled: !!apiInitializationStarts,
    };

    return (
        <AssetCardWrapper id="asset-card">
            <HorizontalContentDiv>
                {tokenLogo}
                <NameAndAmount>
                    <CoinName className={mainHeadingfontFamilyClass}>
                        {chainName}
                    </CoinName>
                    {AssetDetails}
                </NameAndAmount>
            </HorizontalContentDiv>

            <Button {...sendBtn} />
        </AssetCardWrapper>
    );
};

export default AssetCardView;
