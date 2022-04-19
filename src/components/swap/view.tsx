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
    handleAmountChange,
    swapClickHandler,
}) => {
    const [confirm, setConfirm] = useState(false);
    const [showDetail, setShowDetail] = useState(false);

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
        text: confirm ? 'Swap' : 'Continue',
        style: {
            width: '95%',
            height: 50,
            borderRadius: 40,
            marginTop: 40,
        },
        handleClick: () => {
            return confirm ? swapClickHandler() : setConfirm(true);
        },
        disabled: false,
    };

    const DetailsData = [
        [
            { property: 'Minimum Received', data: '0.2345 DOT' },
            { property: 'Price', data: '0.2345 DOT' },
            { property: 'Price Impact', data: '0.2345 DOT' },
            { property: 'Gas Fee', data: '0.2345 DOT' },
            { property: '', data: '0.2345 DOT' },
        ],
        [
            { property: 'Amount', data: '0.2345 DOT' },
            { property: 'Estimated Gas Fee', data: '0.00403 DOT' },
            { property: 'Total', data: '0.2388 DOT' },
            { property: 'Dollar Value', data: '$23.98' },
        ],
    ];

    return (
        <>
            <Wrapper>
                <Header centerText={confirm ? 'Confirmation' : 'Swap Token'} />
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
                            onClick={() => setShowDetail(true)}
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
                            value="0"
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
                        {DetailsData[confirm ? 1 : 0].map((el) => (
                            <HorizontalContentDiv justifyContent="space-between">
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
