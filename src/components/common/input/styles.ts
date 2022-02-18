import styled from 'styled-components';
import { WrapperInterface, FieldInterface, IconInterface } from './types';

import { colors, fonts } from '../../../utils';

const { primaryText, darkBackground1 } = colors;
const { subHeadingFontSize } = fonts;

export const Wrapper = styled.div<WrapperInterface>`
    width: 100%;
    /* border: ${(props) => {
        if (props.isCorrect) return '0px';
        if (!props.isCorrect) return '1px solid red';
        return '0px';
    }}; */
    border: ${(props) => (props.isCorrect === false ? '1px solid red' : '0px')};
    /* border: 1px solid red; */
    border-radius: 8px;
    position: relative;
    margin-bottom: ${(props) => props.marginBottom && props.marginBottom};
`;

export const Field = styled.input<FieldInterface>`
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
    /* border: ${(props) => {
        let res;
        if (props.isCorrect === true) res = 'none';
        if (props.isCorrect === false) res = '1px solid red';
        return res;
    }}; */
    border: 0px;
    font-size: ${(props) => (props.fontSize ? props.fontSize : '16px')};
    height: ${(props) => (props.height ? props.height : 'auto')};
`;

export const Icon = styled.span<IconInterface>`
    position: absolute;
    right: ${(props) =>
        props.rightAbsPosition ? props.rightAbsPosition : '18px'};
    top: ${(props) => (props.leftAbsPosition ? props.leftAbsPosition : '11px')};
    color: rgba(250, 250, 250, 0.8);
    cursor: pointer;
`;
