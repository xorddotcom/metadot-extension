import styled from 'styled-components';
import { WrapperInterface, FieldInterface, IconInterface } from './types';

import { colors, fonts } from '../../../utils';

const { primaryText, darkBackground1 } = colors;
const { subHeadingFontSize } = fonts;

export const Wrapper = styled.div<WrapperInterface>`
    width: ${(props) =>
        props.inputWrapperWidth ? props.inputWrapperWidth : '100%'};
    height: 40px;
    border: ${(props) => {
        if (props.isCorrect) return '0px';
        if (!props.isCorrect) return '1px solid red';
        return '0px';
    }};
    border: ${(props) => (props.isCorrect === false ? '1px solid red' : '0px')};
    border-radius: 8px;
    background-color: ${darkBackground1};
    margin-bottom: ${(props) => props.marginBottom && props.marginBottom};
    display: flex;
    align-items: center;
    justify-content: start;
`;

export const Field = styled.input<FieldInterface>`
    padding: 10px 12px 10px 15px;
    color: ${primaryText};
    background-color: ${darkBackground1};
    font-size: 14px !important;
    line-height: 17px;
    border-radius: 8px;
    border: 0px;
    opacity: 0.8;
    letter-spacing: 0.02em;
    width: ${(props) => (props.fullWidth ? props.fullWidth : '90%')};
    font-family: ${subHeadingFontSize};
    font-size: ${(props) => (props.fontSize ? props.fontSize : '16px')};
    height: ${(props) => (props.height ? props.height : 'auto')};
`;

export const Icon = styled.span<IconInterface>`
    position: relative;
    left: ${(props) => (props.leftPosition ? props.leftPosition : '7px')};
    top: ${(props) => (props.topPosition ? props.topPosition : '4px')};
    color: rgba(250, 250, 250, 0.8);
    cursor: pointer;
`;
