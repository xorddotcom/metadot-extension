import styled from 'styled-components';
import { colors } from '../../../utils';

const { primaryText, primaryBackground, secondaryBlack } = colors;

export const FromAccount = styled.div`
    display: flex;
    width: 100%;
    flex-direction: ${(props: { flexDirection?: string }) =>
        props.flexDirection ? props.flexDirection : 'row'};
    align-items: ${(props) =>
        props.flexDirection ? props.flexDirection : 'center'};
    width: 92%;
    height: 60px;
    align-items: center;
    justify-content: space-between;
    padding-left: 10px;
    padding-right: 10px;
    background: ${secondaryBlack};
    border-radius: 8px;
    color: ${primaryText};
    margin-bottom: 20px;
    margin-top: 12px;
`;

export const PlainIcon = styled.div`
    width: 25px;
    height: 25px;
    border-radius: 25px;
    margin-left: 5px;
    margin-right: 20px;
    background: ${(props: { bgColor?: string }) =>
        props.bgColor ? props.bgColor : primaryBackground};
`;

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
