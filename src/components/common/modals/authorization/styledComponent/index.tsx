import React from 'react';
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
    padding: 0rem 0.5rem;
    box-sizing: border-box;
    border-radius: 6px;
`;

const MainText1PropsInterfaceWrapper: React.FunctionComponent<
    MainText1PropsInterface
> = ({ children }) => {
    return <p>{children}</p>;
};

export const SubText = styled(MainText1PropsInterfaceWrapper)`
    font-size: ${subHeadingFontSize};
    line-height: 19px;
    margin-top: ${(props) => props.marginTop && props.marginTop};
    color: rgba(250, 250, 250, 0.85);
    text-align: ${(props) => props.textAlign};
`;

const verticalContentDivPropsInterfaceWrapper: React.FunctionComponent<
    VerticalContentDivPropsInterface
> = ({ children }) => {
    return <div>{children}</div>;
};

export const VerticalContentDiv = styled(
    verticalContentDivPropsInterfaceWrapper
)`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: ${(props) => (props.mb ? props.mb : '0px')};
    margin-top: ${(props) => props.marginTop && props.marginTop};
`;

const mainTextPropsInterfaceWrapper: React.FunctionComponent<
    MainTextPropsInterface
> = ({ children }) => {
    return <p>{children}</p>;
};

export const MainText = styled(mainTextPropsInterfaceWrapper)`
    height: 14px;
    font-size: ${(props) => (props.fontSize ? props.fontSize : '16px')};
    line-height: ${(props) => (props.lh ? props.lh : '19px')};
    font-weight: 500;
    letter-spacing: ${(props) => (props.ls ? props.ls : '0.01em')};
    color: ${(props) => (props.color ? props.color : primaryText)};
    width: 100%;
    text-align: start;
    margin: ${(props) => (props.m ? props.m : '0px')};
    margin-bottom: ${(props) =>
        props.marginBottom ? props.marginBottom : '12px'};
    margin-top: ${(props) => props.mt && props.mt};
`;
