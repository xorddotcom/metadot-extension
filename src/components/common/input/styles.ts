import styled from 'styled-components';
import {
    WrapperInterface,
    FieldInterface,
    IconInterface,
    NewWrapperInterface,
} from './types';

import { colors, fonts } from '../../../utils';

const { primaryText, darkBackground1, secondaryBlack } = colors;
const { subHeadingFontSize } = fonts;

export const Wrapper = styled.div<WrapperInterface>`
    width: ${(props) =>
        props.inputWrapperWidth ? props.inputWrapperWidth : '100%'};
    height: 45px;
    border: ${(props) => (props.isCorrect === false ? '1px solid red' : '0px')};
    border-radius: 8px;
    background-color: ${darkBackground1};
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: start;
    opacity: ${(props) => (props.disabled ? 0.5 : 1)};
    margin-bottom: ${(props) => props.marginBottom && props.marginBottom};
`;

export const NewWrapper = styled.div<NewWrapperInterface>`
    width: '100%';
    height: 40px;
    border: ${(props) => (props.isCorrect === false ? '1px solid red' : '0px')};
    border-radius: 8px;
    background-color: ${darkBackground1};
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: start;
`;

export const TokenBox = styled.div`
    position: absolute;
    right: 16px;
    top: 22px;
    width: 86px;
    height: 42px;
    border-radius: 8px;
    background: #141414;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const TokenName = styled.p`
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    margin-left: 6px;

    /* identical to box height */

    color: #fafafa;
`;

export const Field = styled.input<FieldInterface>`
    padding: 0px 42px 0px 15px;
    margin-top: 12px;
    margin-bottom: 8px;
    color: ${primaryText};
    background-color: ${(props) =>
        props.bgColor ? props.bgColor : secondaryBlack};
    font-size: 14px !important;
    line-height: 17px;
    border-radius: 8px;
    border: ${(props) => (props.isCorrect === false ? '1px solid red' : '0px')};
    opacity: 0.8;
    letter-spacing: 0.02em;
    width: ${(props) => (props.fullWidth ? props.fullWidth : '80%')};
    height: ${(props) =>
        props.tokenLogo ? '60px !important' : '45px !important'};
    font-family: ${subHeadingFontSize};
    font-size: ${(props) => (props.fontSize ? props.fontSize : '16px')};
    height: ${(props) => (props.height ? props.height : 'auto')};
    &:focus {
        outline: none;
    }
`;

export const Icon = styled.span<IconInterface>`
    position: absolute;
    right: ${(props) => (props.rightPosition ? props.rightPosition : '9px')};
    top: ${(props) => (props.topPosition ? props.topPosition : '4px')};
    color: rgba(250, 250, 250, 0.8);
    cursor: pointer;
`;
