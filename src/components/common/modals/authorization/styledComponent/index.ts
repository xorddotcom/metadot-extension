import styled from 'styled-components';

import {
    MainText1PropsInterface,
    VerticalContentDivPropsInterface,
    MainTextPropsInterface,
} from './types';
import { colors, fonts } from '../../../../../utils';

const { primaryText } = colors;
const { subHeadingFontSize } = fonts;

export const MainDiv = styled.div`
    border: 0.8px solid primaryBackground;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    padding: 0px 0.8px;
    box-sizing: border-box;
    border-radius: 6px;
`;

export const SubText = styled.p<MainText1PropsInterface>`
    font-size: ${subHeadingFontSize};
    line-height: 19px;
    margin-top: ${(props) => props.marginTop && props.marginTop};
    color: rgba(250, 250, 250, 0.85);
    text-align: ${(props) => props.textAlign};
`;

export const HorizontalContentDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const VerticalContentDiv = styled.div<VerticalContentDivPropsInterface>`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: ${(props) => (props.mb ? props.mb : '0px')};
    margin-top: ${(props) => props.marginTop && props.marginTop};
`;

export const MainText = styled.p<MainTextPropsInterface>`
    height: 14px;
    font-size: ${(props) => (props.fontSize ? props.fontSize : '16px')};
    line-height: ${(props) => (props.lh ? props.lh : '19px')};
    font-weight: 500;
    letter-spacing: ${(props) => (props.ls ? props.ls : '0.16px')};
    color: ${(props) => (props.color ? props.color : primaryText)};
    width: 100%;
    text-align: start;
    margin: ${(props) => (props.m ? props.m : '0px')};
    margin-bottom: ${(props) =>
        props.marginBottom ? props.marginBottom : '12px'};
    margin-top: ${(props) => props.mt && props.mt};
`;
