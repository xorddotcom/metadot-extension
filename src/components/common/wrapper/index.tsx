import React from 'react';
import styled, { css } from 'styled-components';

import {
    HorizontalContentInterface,
    VerticalContentDivPropsInterface,
    UnAuthScreensContentInterface,
} from './type';

import { colors } from '../../../utils';

const { darkBackground1 } = colors;

export const Wrapper = styled.div`
    padding: 18px 20px 8px;
`;

const HorizontalContentDivPropsInterfaceWrapper: React.FunctionComponent<
    HorizontalContentInterface
> = ({ children }) => {
    return <div>{children}</div>;
};

export const HorizontalContentDiv = styled(
    HorizontalContentDivPropsInterfaceWrapper
)`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: ${(props) => (props.height ? props.height : 'auto')};
    width: ${(props) => (props.width ? props.width : 'auto')};
    background-color: ${(props) =>
        props.backgroundColor && props.backgroundColor};
    border-radius: ${(props) => props.borderRadius && props.borderRadius};
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
    margin-top: ${(props) => props.marginTop && props.marginTop};
    ${(props) =>
        props.border &&
        css`
            border: 1px solid ${darkBackground1};
            box-sizing: border-box;
            filter: drop-shadow(0px 0px 40px rgba(13, 13, 13, 0.2));
            border-radius: 8px;
        `}
    ${(props) =>
        props.specialPadding &&
        css`
            padding-left: 10px;
            padding-right: 10px;
        `}
`;

const UnAuthScreensContentWrapperPropsInterfaceWrapper: React.FunctionComponent<
    UnAuthScreensContentInterface
> = ({ children }) => {
    return <div>{children}</div>;
};

export const UnAuthScreensContentWrapper = styled(
    UnAuthScreensContentWrapperPropsInterfaceWrapper
)`
    display: ${(props) => (props.flexDirection ? 'block' : 'flex')};
    flex-direction: ${(props) =>
        props.flexDirection ? props.flexDirection : 'row'};
    align-items: center;
    justify-content: ${(props) =>
        props.flexDirection ? 'flex-start' : 'space-between'};
    flex-wrap: wrap;
    width: 100%;
    height: auto;
    height: auto;
    margin: 17px auto 25px;
    margin-bottom: ${(props) => (props.mb ? props.mb : '2rem')};
`;

export const LabelAndTextWrapper = styled.div`
    width: 100%;
    min-height: ${(props: { minHeight: string; marginTop: string }) =>
        props.minHeight ? props.minHeight : '103px'};
    margin-top: ${(props: { minHeight: string; marginTop: string }) =>
        props.marginTop && props.marginTop};
    position: relative;
`;
