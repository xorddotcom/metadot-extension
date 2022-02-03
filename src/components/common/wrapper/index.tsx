import React from 'react';
import styled from 'styled-components';
import {
    HorizontalContentInterface,
    UnAuthScreensContentInterface,
} from './type';

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

export const VerticalContentDiv = styled.div`
    display: flex;
    flex-direction: column;
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
