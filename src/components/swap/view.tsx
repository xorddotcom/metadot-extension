import React, { useState } from 'react';
import { fonts, images } from '../../utils';
import { HorizontalContentDiv } from '../common/wrapper';
import { SubHeading } from '../common/text';
import { Button, Header, Input } from '../common';
import {
    SwapDiv,
    SwapChildDiv,
    NetworkDiv,
    AmountMaxDiv,
    SwapIconDiv,
    BalDiv,
    SelectNetworkDiv,
    Circle,
    DownIcon,
    Wrapper2,
    Wrapper,
    SwapDetailDiv,
} from './style';

import { SwapViewProps } from './types';

const { SwapIcon } = images;
const { subHeadingfontFamilyClass } = fonts;
const SwapView: React.FunctionComponent<SwapViewProps> = ({
    handleOpen,
    tokenFrom,
    tokenTo,
    tokenImage,
    amountFrom,
    swapParams,
    handleCurrencySwitch,
    handleAmountChange,
    swapClickHandler,
}) => {
    const [showDetail, setShowDetail] = useState(true);

    const styledInput = {
        id: 'InputField',
        placeholder: 'Amount',
        type: 'Number',
        className: subHeadingfontFamilyClass,
        blockInvalidChar: true,
        tokenLogo: true,
        tokenDropDown: true,
        tokenImage,
    };

    const maxBtn = {
        id: 'SendBtn',
        text: 'Max',
        style: {
            width: '38.75px',
            height: '25.12px',
            borderRadius: '6px',
            fontSize: '12px',
        },
        handleClick: () => console.log('max'),
        disabled: false,
    };

    const btn = {
        id: 'SwapBtn',
        text: 'Swap',
        style: {
            width: '95%',
            height: 50,
            borderRadius: 40,
            marginTop: 40,
        },
        handleClick: swapClickHandler,
        disabled: false,
    };

    const DetailsData = [
        { property: 'Minimum Received', data: '0.2345 DOT' },
        { property: 'Price', data: '0.2345 DOT' },
        { property: 'Price Impact', data: '0.2345 DOT' },
        { property: 'Gas Fee', data: '0.2345 DOT' },
        { property: '', data: '0.2345 DOT' },
    ];

    return (
        <>
            <Wrapper>
                <Header centerText="Swap Token" />
            </Wrapper>

            <Wrapper2 pb>
                <SwapDiv>
                    <SwapChildDiv>
                        <AmountMaxDiv>
                            <SubHeading
                                lineHeight="18px"
                                style={{ fontWeight: '800' }}
                            >
                                Amount
                            </SubHeading>
                            <Button {...maxBtn} />
                        </AmountMaxDiv>
                        <Input
                            {...styledInput}
                            value={amountFrom}
                            tokenName={tokenFrom?.name}
                            onChange={(value: string) => {
                                handleAmountChange(value);
                            }}
                            tokenDropDownHandler={() => handleOpen('tokenFrom')}
                        />
                        <BalDiv>
                            <SubHeading lineHeight="14px" fontSize="12px">
                                $23.498
                            </SubHeading>
                            <SubHeading lineHeight="14px" fontSize="12px">
                                Balance:
                                {`${tokenFrom?.balance} ${tokenFrom?.name}`}
                            </SubHeading>
                        </BalDiv>
                    </SwapChildDiv>
                    <SwapIconDiv>
                        <img
                            src={SwapIcon}
                            alt="swap"
                            aria-hidden
                            onClick={() => handleCurrencySwitch()}
                        />
                    </SwapIconDiv>
                    <SwapChildDiv>
                        <AmountMaxDiv>
                            <SubHeading
                                lineHeight="18px"
                                style={{ fontWeight: '800' }}
                            >
                                Amount
                            </SubHeading>
                        </AmountMaxDiv>
                        <Input
                            {...styledInput}
                            value={swapParams.outputAmount.toString()}
                            tokenName={tokenTo?.name}
                            onChange={(value: string) => {
                                console.log('amountTo value');
                            }}
                            disabled
                            tokenDropDownHandler={() => handleOpen('tokenTo')}
                        />
                        <BalDiv>
                            <SubHeading lineHeight="14px" fontSize="12px">
                                $23.498
                            </SubHeading>
                            <SubHeading lineHeight="14px" fontSize="12px">
                                Balance:
                                {`${tokenTo?.balance} ${tokenTo?.name}`}
                            </SubHeading>
                        </BalDiv>
                    </SwapChildDiv>
                </SwapDiv>

                {showDetail && (
                    <SwapDetailDiv>
                        <SubHeading
                            lineHeight="0px"
                            fontSize="14px"
                            style={{ fontWeight: '500', marginBottom: '15px' }}
                        >
                            Details
                        </SubHeading>
                        {DetailsData.map((el) => (
                            <HorizontalContentDiv
                                key={Math.random()}
                                justifyContent="space-between"
                            >
                                <SubHeading
                                    lineHeight="0px"
                                    fontSize="12px"
                                    opacity="0.8"
                                >
                                    {el.property === 'Dollar Value'
                                        ? ''
                                        : el.property}
                                </SubHeading>
                                <SubHeading
                                    lineHeight="0px"
                                    fontSize={
                                        el.property === 'Total'
                                            ? '18px'
                                            : '12px'
                                    }
                                    color={
                                        el.property === 'Total'
                                            ? '#2E9B9B'
                                            : '#cccccc'
                                    }
                                >
                                    {el.data}
                                </SubHeading>
                            </HorizontalContentDiv>
                        ))}
                    </SwapDetailDiv>
                )}
                <Button {...btn} />
            </Wrapper2>
        </>
    );
};

export default SwapView;
