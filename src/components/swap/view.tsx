import React, { useState } from 'react';
import { images } from '../../utils';
import { HorizontalContentDiv } from '../common/wrapper';
import { SubHeading } from '../common/text';
import { Button, Header } from '../common';
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

const { SwapIcon } = images;

const SwapView: React.FunctionComponent = (): JSX.Element => {
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

    const [confirm, setConfirm] = useState(false);
    const [showDetail, setShowDetail] = useState(false);

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
            setConfirm(true);
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
                <Header
                    centerText={confirm ? 'Confirmation' : 'Swap Token'}
                    backHandler={() => console.log('object')}
                />
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
                        <NetworkDiv>
                            <SubHeading
                                lineHeight="18px"
                                style={{ fontWeight: '800' }}
                            >
                                0.000
                            </SubHeading>
                            <SelectNetworkDiv>
                                <Circle color="#E6007AE5" />
                                <SubHeading
                                    lineHeight="14px"
                                    fontSize="12px"
                                    style={{ fontWeight: '500' }}
                                >
                                    DOT
                                </SubHeading>
                                <DownIcon />
                            </SelectNetworkDiv>
                        </NetworkDiv>
                        <BalDiv>
                            <SubHeading lineHeight="14px" fontSize="12px">
                                $23.498
                            </SubHeading>
                            <SubHeading lineHeight="14px" fontSize="12px">
                                {' '}
                                Balance: 712.938 DOT
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
                        <NetworkDiv>
                            <SubHeading
                                lineHeight="18px"
                                style={{ fontWeight: '800' }}
                            >
                                0.000
                            </SubHeading>
                            <SelectNetworkDiv>
                                <Circle color="#E6007AE5" />
                                <SubHeading
                                    lineHeight="14px"
                                    fontSize="12px"
                                    style={{ fontWeight: '500' }}
                                >
                                    DOT
                                </SubHeading>
                                <DownIcon />
                            </SelectNetworkDiv>
                        </NetworkDiv>
                        <BalDiv>
                            <SubHeading lineHeight="14px" fontSize="12px">
                                $23.498
                            </SubHeading>
                            <SubHeading lineHeight="14px" fontSize="12px">
                                {' '}
                                Balance: 712.938
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
