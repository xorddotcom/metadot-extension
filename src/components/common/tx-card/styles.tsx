import styled from 'styled-components';
import { TxDateRowInterface } from './types';

export const TxCardWrapper = styled.div`
    width: 94%;
    height: 108px;
    background: linear-gradient(
        98.61deg,
        #1e1e1e -29.86%,
        #383838 123.74%,
        rgba(56, 56, 56, 0.72) 123.74%
    );
    box-shadow: 0px 0px 40px rgba(13, 13, 13, 0.2);
    border-radius: 5px;
    margin-top: 15px;
    margin-bottom: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`;

export const TxCardSubWrapper = styled.div`
    width: 97%;
    height: 108px;
    margin-top: 5px;
    margin-bottom: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const TxEquivalentInUSDT = styled.p`
    font-size: 12px;
    width: 100%;
    color: rgba(250, 250, 250, 0.8);
    text-align: end;
`;

export const TxHorizontalContentDiv = styled.div`
    display: flex;
    align-items: center;
    height: 17px;
    margin-top: 12px;
`;

export const TxDateRow = styled.p<TxDateRowInterface>`
    width: 82.5%;
    height: 14px;
    font-size: 12px;
    font-weight: normal;
    border-bottom: 0.5px solid rgba(250, 250, 250, 0.1);
    line-height: 14px;
    letter-spacing: 0.01em;
    color: ${(props) => (props.color ? props.color : '#ffffff')};
    margin-top: 0px;
    margin-bottom: 3px;
    text-align: start;
    padding: 9px 9px 9px 0px;
`;
