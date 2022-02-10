import React from 'react';
import styled from 'styled-components';
import { WrapperInterface, FieldInterface, IconInterface } from './types';

import { colors, fonts } from '../../../utils';

const { primaryText, darkBackground1 } = colors;
const { subHeadingFontSize } = fonts;

const WrapperPropsInterfaceWrapper: React.FunctionComponent<
    WrapperInterface
> = ({ children }) => {
    return <div>{children}</div>;
};
export const Wrapper = styled(WrapperPropsInterfaceWrapper)`
    width: 100%;
    border: ${(props) => {
        if (props.isCorrect) return '0px';
        if (!props.isCorrect) return '1px solid red';
        return '0px';
    }};
    border-radius: 8px;
    position: relative;
    margin-bottom: ${(props) => props.marginBottom && props.marginBottom};
`;

const FieldPropsInterfaceWrapper: React.FunctionComponent<FieldInterface> = ({
    disabled,
    onChange,
}) => {
    return <input disabled={disabled} onChange={onChange} />;
};
export const Field = styled(FieldPropsInterfaceWrapper)`
    /* padding-left: 25px; */
    padding: 10px 12.5px;
    color: ${primaryText};
    background-color: ${darkBackground1};
    font-size: 14px !important;
    line-height: 17px;
    border-radius: 8px;
    opacity: 0.8;
    letter-spacing: 0.02em;
    width: ${(props) => (props.fullWidth ? props.fullWidth : '90%')};
    font-family: ${subHeadingFontSize};
    border: ${(props) => {
        if (props.isCorrect) return 'none';
        if (!props.isCorrect) return '1px solid red';
        return '0px';
    }};
    font-size: ${(props) => (props.fontSize ? props.fontSize : '16px')};
    height: ${(props) => (props.height ? props.height : 'auto')};
`;

const IconPropsInterfaceWrapper: React.FunctionComponent<IconInterface> = ({
    children,
}) => {
    return <span>{children}</span>;
};
export const Icon = styled(IconPropsInterfaceWrapper)`
    position: absolute;
    right: ${(props) =>
        props.rightAbsPosition ? props.rightAbsPosition : '18px'};
    top: ${(props) => (props.leftAbsPosition ? props.leftAbsPosition : '11px')};
    color: rgba(250, 250, 250, 0.8);
    cursor: pointer;
`;
