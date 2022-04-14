import styled from 'styled-components';
import { CircleProps } from './types';

export const SwapDiv = styled.div`
    width: 90%;
    height: 377px;
    background: #141414;
    border: 0.8px solid #2e9b9b;
    box-sizing: border-box;
    box-shadow: 0px 0px 20px rgba(46, 155, 155, 0.08);
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
`;

export const SwapChildDiv = styled.div`
    width: 90%;
    height: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const SwapIconDiv = styled.div`
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const NetworkDiv = styled.div`
    height: 60px;
    background: #212121;
    border-radius: 8px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-left: 10px;
    padding-right: 10px;
`;

export const SelectNetworkDiv = styled.div`
    background-color: #141414;
    border-radius: 8px;
    height: 42px;
    width: 86px;
    display: flex;
    flexdirection: row;
    align-items: center;
    justify-content: space-around;
`;

export const AmountMaxDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
export const BalDiv = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
`;

export const Circle = styled.div<CircleProps>`
    background: ${(props) => props.color && props.color};
    height: 15px;
    width: 15px;
    border-radius: 7.5px;
`;

export const DownIcon = styled.div`
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid #fafafa;
    opacity: 0.9;
`;

export const Wrapper2 = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 528px;
    padding-bottom: ${(props: { pb: string | boolean }) => props.pb && '0'};
    width: 90%;
    align-self: center;
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
    padding: 25px 20px;
`;

export const SwapDetailDiv = styled.div`
    width: 90%;
    height: 176px;
    border: 1px solid #212121;
    box-sizing: border-box;
    filter: drop-shadow(0px 0px 40px rgba(13, 13, 13, 0.2));
    border-radius: 8px;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    padding: 10px 20px 10px 20px;
    background: rgba(20, 20, 20);
`;
