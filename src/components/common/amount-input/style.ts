import styled from 'styled-components';

import { CalculatedAmountInterface } from './types';

export const Balance = styled.p`
    font-size: 12px;
    width: 100%;
    height: 14.12px;
    line-height: 16px;
    letter-spacing: 0.32px;
    margin: 0px;
    color: rgba(250, 250, 250, 0.8);
    text-align: ${(props: { textAlign?: string }) =>
        props.textAlign ? props.textAlign : 'start'};
    margin-top: 5px;
`;

export const EquivalentInUSDT = styled.p`
    font-size: 12px;
    width: 100%;
    color: rgba(250, 250, 250, 0.8);
    text-align: start;
    margin: 0px;
    margin-top: -16px;
    visibility: hidden;
`;

export const CalculatedAmount = styled.div<CalculatedAmountInterface>`
    width: 96%;
    height: 15px;
    display: flex !important;
    justify-content: space-around;
    align-items: center;
    flex-direction: row;
    align-items: center;
    margin-left: 5px;
    margin-top: ${(props) => props.marginTop && props.marginTop};
`;

export const FlexBetween = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
