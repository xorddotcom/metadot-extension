import styled from 'styled-components';
import { WrapperInterface, FieldInterface, IconInterface } from './types';

import { colors, fonts } from '../../../utils';

const { primaryText, darkBackground1 } = colors;
const { subHeadingFontSize } = fonts;

export const Wrapper = styled.div`
    width: 100%;
    border: ${(props: WrapperInterface) => {
        if (props.isCorrect) return '0px';
        if (!props.isCorrect) return '1px solid red';
        return '0px';
    }};
    border-radius: 8px;
    position: relative;
    margin-bottom: ${(props: WrapperInterface) =>
        props.marginBottom && props.marginBottom};
`;

export const Field = styled.input`
    /* padding-left: 25px; */
    padding: 10px 12.5px;
    color: ${primaryText};
    background-color: ${darkBackground1};
    font-size: 14px !important;
    line-height: 17px;
    border-radius: 8px;
    opacity: 0.8;
    letter-spacing: 0.02em;
    width: ${(props: FieldInterface) =>
        props.fullWidth ? props.fullWidth : '90%'};
    font-family: ${subHeadingFontSize};
    border: ${(props: FieldInterface) => {
        if (props.isCorrect) return 'none';
        if (!props.isCorrect) return '1px solid red';
        return '0px';
    }};
    font-size: ${(props: FieldInterface) =>
        props.fontSize ? props.fontSize : '16px'};
    height: ${(props: FieldInterface) =>
        props.height ? props.height : 'auto'};
`;

export const Icon = styled.span`
    position: absolute;
    right: ${(props: IconInterface) =>
        props.rightAbsPosition ? props.rightAbsPosition : '18px'};
    top: ${(props: IconInterface) =>
        props.leftAbsPosition ? props.leftAbsPosition : '11px'};
    color: rgba(250, 250, 250, 0.8);
    cursor: pointer;
`;
