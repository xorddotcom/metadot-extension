import React from 'react';
import styled, { css } from 'styled-components';
import { colors, fonts } from '../../../utils';
import {
    MainHeadingInterface,
    SubHeadingInterface,
    MainTextInterface,
    WarningTextInterface,
    ModalTextPropsInterface,
} from './type';

const { primaryText, secondaryText, warningText } = colors;
const { mainHeadingFontSize, subHeadingFontSize } = fonts;

const MainHeadingPropsInterfaceWrapper: React.FunctionComponent<
    MainHeadingInterface
> = ({ children }) => {
    return <p>{children}</p>;
};
export const MainHeading = styled(MainHeadingPropsInterfaceWrapper)`
    font-style: normal;
    font-size: ${mainHeadingFontSize};
    line-height: 18.75px;
    text-align: start;
    font-size: 16px;
    font-weight: ${(props) => (props.fw ? props.fw : '500')};
    color: ${(props) => (props.color ? props.color : primaryText)};
    margin-bottom: ${(props) => props.marginBottom && props.marginBottom};
`;

const SubHeadingPropsInterfaceWrapper: React.FunctionComponent<
    SubHeadingInterface
> = ({ children }) => {
    return <p>{children}</p>;
};
export const SubHeading = styled(SubHeadingPropsInterfaceWrapper)`
    font-style: normal;
    font-size: ${subHeadingFontSize};
    color: ${secondaryText};
    text-align: ${(props) => (props.textAlign ? props.textAlign : 'start')};
    text-align-last: ${(props) =>
        props.textAlignLast ? props.textAlignLast : 'start'};
    line-height: ${(props) => (props.lineHeight ? props.lineHeight : '22px')};
    font-size: 0.9rem;
    text-align: justify;
    text-justify: auto;
    margin-top: ${(props) => props.marginTop && props.marginTop};
    margin-bottom: ${(props) => props.mb && props.mb};
    margin-left: ${(props) => props.ml && props.ml};
`;

const WarningTextPropsInterfaceWrapper: React.FunctionComponent<
    WarningTextInterface
> = ({ children }) => {
    return <p>{children}</p>;
};
export const WarningText = styled(WarningTextPropsInterfaceWrapper)`
    font-size: ${subHeadingFontSize};
    font-size: 12.5px;
    color: ${warningText} !important;
    width: 100%;
    font-weight: 400;
    text-align: start;
    margin-left: 2px;
    margin-bottom: 0px;
    visibility: ${(props) => (props.visibility ? 'visible' : 'hidden')};
    margin-left: ${(props) => props.ml && props.ml};
    margin-bottom: ${(props) => props.mb && props.mb};
`;

export const EquivalentInUSDT = styled.p`
    font-size: 12px;
    color: rgba(250, 250, 250, 0.8);
    margin-left: 8px;
`;

const MainTextPropsInterfaceWrapper: React.FunctionComponent<
    MainTextInterface
> = ({ children }) => {
    return <p>{children}</p>;
};
export const MainText = styled(MainTextPropsInterfaceWrapper)`
    height: 14px;
    font-size: 12px;
    line-height: 14px;
    letter-spacing: 0.01em;
    color: ${(props) => (props.color ? props.color : '#ffffff')};
    margin-top: 0px;
    margin-bottom: 3px;
    text-align: start;
    ${(props) =>
        props.balOverFlow &&
        css`
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 45px;
        `}
`;

const ModalTextPropsInterfaceWrapper: React.FunctionComponent<
    ModalTextPropsInterface
> = ({ children }) => {
    return <p>{children}</p>;
};

export const ModalText = styled(ModalTextPropsInterfaceWrapper)`
    font-size: ${mainHeadingFontSize};
    line-height: 21px;
    margin-top: ${(props) => props.marginTop && props.marginTop};
    color: rgba(250, 250, 250, 0.85);
    text-align: ${(props) => props.textAlign};
`;
