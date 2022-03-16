/* eslint-disable arrow-parens */
import React from 'react';
import styled from 'styled-components';
import { colors } from '../../utils';
import {
    MainText1PropsInterface,
    VerticalContentDivPropsInterface,
    MainTextPropsInterface,
} from '../common/modals/authorization/styledComponent/types';
import { CalculatedAmountInterface } from './types';
// import { PlainIcon } from '../common/modals/selectNetwork/styledComponents';
// import { PlainIcon as PlainIconInterface } from '../common/modals/selectNetwork/styledComponents/types';

const { primaryText, primaryBackground, darkBackground1 } = colors;

export const Wrapper = styled.div`
    width: 133%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-bottom: ${(props: { pb: string | boolean }) => props.pb && '0'};
    /* border: 1px solid red; */
`;

export const MainContent = styled.div`
    margin: 34px auto 25px;
    width: 100%;
`;

export const VerticalContentDiv = styled.div<VerticalContentDivPropsInterface>`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: ${(props) => (props.mb ? props.mb : '0px')};
`;

export const HorizontalContentDiv = styled.div<VerticalContentDivPropsInterface>`
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
`;

export const FromAccount = styled(HorizontalContentDiv)`
    width: 92%;
    height: 60px;
    align-items: center;
    justify-content: space-between;
    padding-left: 10px;
    padding-right: 10px;
    background: ${darkBackground1};
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

export const MainText = styled.p<MainTextPropsInterface>`
    height: 14px;
    font-size: ${(props) => (props.fs ? props.fs : '16px')};
    line-height: ${(props) => (props.lh ? props.lh : '19px')};
    font-weight: 500;
    letter-spacing: ${(props) => (props.ls ? props.ls : '0.01em')};
    color: ${(props) => (props.color ? props.color : primaryText)};
    width: 100%;
    text-align: start;
    margin: ${(props) => (props.m ? props.m : '0px')};
    margin-bottom: ${(props) => (props.mb ? props.mb : '12px')};
    margin-top: ${(props) => props.mt && props.mt};
`;

export const Balance = styled.p`
    font-size: 12px;
    width: 100%;
    height: 14.12px;
    line-height: 16px;
    letter-spacing: 0.02em;
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
    margin-top: -1rem;
`;

export const CalculatedAmount = styled.div<CalculatedAmountInterface>`
    width: 96%;
    height: 15px;
    display: flex !important;
    justify-content: space-around;
    align-items: center;
    flex-direction: row;
    align-items: center;
    margin-left: 0.3rem;
    margin-top: ${(props) => props.marginTop && props.marginTop};
`;

export const CenterContent = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`;

export const FlexBetween = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
