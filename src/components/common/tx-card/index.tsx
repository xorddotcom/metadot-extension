import React from 'react';
import { Props } from './types';
import { HorizontalContentDiv, VerticalContentDiv } from '../wrapper';
import { MainText } from '../text';
import {
    TxCardWrapper,
    TxEquivalentInUSDT,
    TxHorizontalContentDiv,
} from './styles';
import { fonts, colors, helpers } from '../../../utils';

const TxCard: React.FunctionComponent<Props> = ({
    operation,
    status,
    coin,
    amount,
    amountInUsd,
    logo,
    handleClick,
}) => {
    const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;
    const { green, red } = colors;
    const { trimBalance } = helpers;
    return (
        <TxCardWrapper
            id="tx-card-wrapper"
            style={{ cursor: 'pointer' }}
            onClick={() => handleClick()}
        >
            <HorizontalContentDiv>
                <div style={{ marginLeft: 10 }}>
                    <img
                        id="logo"
                        src={logo}
                        alt="btc icon"
                        width="30px"
                        height="30px"
                    />
                </div>
                <div style={{ marginLeft: 10 }}>
                    <VerticalContentDiv>
                        <MainText
                            id="operation-coin"
                            className={mainHeadingfontFamilyClass}
                        >{`${operation} ${coin}`}</MainText>
                        <TxHorizontalContentDiv>
                            <MainText
                                id="status"
                                className={mainHeadingfontFamilyClass}
                                color={status === 'Failed' ? red : green}
                            >
                                {status}
                            </MainText>
                        </TxHorizontalContentDiv>
                    </VerticalContentDiv>
                </div>
            </HorizontalContentDiv>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    width: '20%',
                    paddingLeft: 10,
                    alignItems: 'center',
                    marginRight: '0.45rem',
                }}
            >
                <VerticalContentDiv>
                    <MainText
                        className={mainHeadingfontFamilyClass}
                        balOverFlow
                    >
                        {`${trimBalance(Number(amount))} ${coin}`}
                    </MainText>
                    <TxHorizontalContentDiv>
                        <TxEquivalentInUSDT
                            id="tx-equivalent-in-usd"
                            className={subHeadingfontFamilyClass}
                        >
                            {amountInUsd}
                        </TxEquivalentInUSDT>
                    </TxHorizontalContentDiv>
                </VerticalContentDiv>
            </div>
        </TxCardWrapper>
    );
};

export default TxCard;
