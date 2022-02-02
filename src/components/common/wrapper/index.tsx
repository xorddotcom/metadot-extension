import React from 'react';
import styled from 'styled-components';
import { HorizontalContentInterface } from './type';

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
