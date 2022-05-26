import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { fonts, images } from '../../utils';
import { HorizontalContentDiv } from '../common/wrapper';
import { SubHeading } from '../common/text';
import { Button, Header, Input } from '../common';
import {
    SwapDiv,
    SwapChildDiv,
    AmountMaxDiv,
    InputAndBalanceDiv,
    BalDiv,
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
    handleMaxClicked,
    swapClickHandler,
    insufficientBalance,
    isLoading,
}) => {
    const [showDetail, setShowDetail] = useState(true);

    console.log('swap params komal ==>>', swapParams);

    const styledInputPay = {
        id: 'InputField',
        placeholder: 'Amount',
        type: 'Number',
        className: subHeadingfontFamilyClass,
        blockInvalidChar: true,
        tokenLogo: true,
        tokenDropDown: true,
        tokenImage: `https://token-resources-git-dev-acalanetwork.vercel.app/tokens/${tokenFrom?.name}.png`,
        bgColor: '#212121',
        tokenBoxColor: '#141414',
    };

    const styledInputGet = {
        id: 'InputField',
        placeholder: 'Amount',
        type: 'Number',
        className: subHeadingfontFamilyClass,
        blockInvalidChar: true,
        tokenLogo: true,
        tokenDropDown: true,
        tokenImage: `https://token-resources-git-dev-acalanetwork.vercel.app/tokens/${tokenTo?.name}.png`,
        bgColor: '#212121',
        tokenBoxColor: '#141414',
    };

    const maxBtn = {
        id: 'SendBtn',
        text: 'Max',
        style: {
            width: '38.75px',
            height: '25.12px',
            borderRadius: '6px',
            fontSize: '12px',
            margin: 0,
        },
        handleClick: () => handleMaxClicked(),
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
        disabled: !(swapParams.outputAmount > 0),
        isLoading,
    };

    const DetailsData = [
        {
            property: 'Price',
            data: `1 ${tokenFrom?.name} = ${Number(
                swapParams.price?.toString()
            ).toFixed(2)} ${tokenTo?.name}`,
        },
        {
            property: 'Price Impact',
            data: `${(Number(swapParams.priceImpact?.toString()) * 100).toFixed(
                2
            )}%`,
        },
        {
            property: 'Gas Fee',
            data: `${swapParams.tradingFee?.toString()} KAR`,
        },
    ];
    console.log(swapParams.outputAmount, 'swap param amount');

    return (
        <>
            <Wrapper>
                <Header centerText="Swap Token" />
            </Wrapper>

            <Wrapper2 pb>
                <SwapDiv>
                    {/* <SwapChildDiv style={{ border: '1px solid red' }}>
                        <AmountMaxDiv>
                            <SubHeading
                                lineHeight="0px"
                                fontSize="16px"
                                color="#FAFAFA"
                                style={{ fontWeight: '800' }}
                            >
                                You Pay
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
                    <SwapIconDiv style={{ border: '1px solid yellow' }}>
                        <img
                            src={SwapIcon}
                            alt="swap"
                            aria-hidden
                            onClick={() => handleCurrencySwitch()}
                        />
                    </SwapIconDiv>
                    <SwapChildDiv style={{ border: '1px solid green' }}>
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
                    </SwapChildDiv> */}
                    <SwapChildDiv>
                        <AmountMaxDiv>
                            <SubHeading
                                lineHeight="0px"
                                fontSize="16px"
                                color="#FAFAFA"
                                style={{ fontWeight: '800' }}
                            >
                                You Pay
                            </SubHeading>
                            <Button {...maxBtn} />
                        </AmountMaxDiv>
                        <InputAndBalanceDiv>
                            <Input
                                {...styledInputPay}
                                value={amountFrom}
                                tokenName={tokenFrom?.name}
                                onChange={(value: string) => {
                                    handleAmountChange(value);
                                }}
                                tokenDropDownHandler={() =>
                                    handleOpen('tokenFrom')
                                }
                            />
                            {insufficientBalance && (
                                <SubHeading
                                    lineHeight="0px"
                                    fontSize="12px"
                                    marginTop="0px"
                                    color="#F63A3AB2"
                                    opacity="0.7"
                                >
                                    Insufficient Balance to cover transaction
                                    fee
                                </SubHeading>
                            )}
                            <BalDiv>
                                <SubHeading
                                    lineHeight="0px"
                                    fontSize="12px"
                                    marginTop="0px"
                                >
                                    $23.498
                                </SubHeading>
                                <SubHeading lineHeight="0px" fontSize="12px">
                                    Balance:
                                    {` ${tokenFrom?.balance} ${tokenFrom?.name}`}
                                </SubHeading>
                            </BalDiv>
                        </InputAndBalanceDiv>
                    </SwapChildDiv>
                    <img
                        src={SwapIcon}
                        alt="swap"
                        aria-hidden
                        onClick={handleCurrencySwitch}
                    />
                    <SwapChildDiv>
                        <AmountMaxDiv>
                            <SubHeading
                                lineHeight="0px"
                                fontSize="16px"
                                color="#FAFAFA"
                                style={{ fontWeight: '800' }}
                            >
                                You Get
                            </SubHeading>
                        </AmountMaxDiv>
                        <InputAndBalanceDiv>
                            <Input
                                {...styledInputGet}
                                value={
                                    swapParams.outputAmount.toString() === 'NaN'
                                        ? '0'
                                        : Number(
                                              swapParams.outputAmount.toString()
                                          ).toFixed(4)
                                }
                                tokenName={tokenTo?.name}
                                onChange={(value: string) => {
                                    console.log('amountTo value');
                                }}
                                disabled
                                tokenDropDownHandler={() =>
                                    handleOpen('tokenTo')
                                }
                            />
                            <BalDiv>
                                <SubHeading
                                    lineHeight="0px"
                                    fontSize="12px"
                                    marginTop="0px"
                                >
                                    $23.498
                                </SubHeading>
                                <SubHeading lineHeight="0px" fontSize="12px">
                                    Balance:
                                    {` ${tokenTo?.balance} ${tokenTo?.name}`}
                                </SubHeading>
                            </BalDiv>
                        </InputAndBalanceDiv>
                    </SwapChildDiv>
                </SwapDiv>

                {swapParams.outputAmount > 0 && (
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
                        <HorizontalContentDiv
                            key={Math.random()}
                            justifyContent="space-between"
                        >
                            <SubHeading
                                lineHeight="0px"
                                fontSize="12px"
                                opacity="0.8"
                            >
                                Path
                            </SubHeading>
                            <SubHeading
                                lineHeight="0px"
                                fontSize="12px"
                                color="#cccccc"
                            >
                                {swapParams.path?.map(
                                    (element: any, index: any) => {
                                        if (
                                            index ===
                                            swapParams.path.length - 1
                                        ) {
                                            return element.name;
                                        }
                                        return `${element.name} -->`;
                                    }
                                )}
                            </SubHeading>
                        </HorizontalContentDiv>
                    </SwapDetailDiv>
                )}
                <Button {...btn} />
            </Wrapper2>
        </>
    );
};

export default SwapView;
