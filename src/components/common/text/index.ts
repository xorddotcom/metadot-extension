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

export const MainHeading = styled.p<MainHeadingInterface>`
    font-style: normal;
    font-size: ${(props) =>
        props.fontSize ? props.fontSize : mainHeadingFontSize};
    line-height: 18.75px;
    text-align: ${(props) => (props.textAlign ? props.textAlign : 'start')};
    font-weight: ${(props) => (props.weight ? props.weight : '500')};
    color: ${(props) => (props.color ? props.color : primaryText)};
    margin-bottom: ${(props) => props.marginBottom && props.marginBottom};
`;

export const SubHeading = styled.p<SubHeadingInterface>`
    font-style: normal;
    color: ${(props) => (props.color ? props.color : secondaryText)};
    text-align: ${(props) => (props.textAlign ? props.textAlign : 'start')};
    letter-spacing: 0.32px;
    text-align-last: ${(props) => props.textAlignLast && props.textAlignLast};
    line-height: ${(props) => (props.lineHeight ? props.lineHeight : '22px')};
    font-size: ${(props) =>
        props.fontSize ? props.fontSize : subHeadingFontSize};
    font-weight: ${(props) => props.weight && props.weight};
    margin-top: ${(props) => props.marginTop && props.marginTop};
    margin-bottom: ${(props) => props.mb && props.mb};
    margin-left: ${(props) => props.ml && props.ml};
    opacity: ${(props) => props.opacity && props.opacity};
    ${(props) =>
        props.overFlow &&
        css`
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 100%;
        `}
`;

export const WarningText = styled.p<WarningTextInterface>`
    font-size: ${subHeadingFontSize};
    font-size: 12.5px;
    color: ${warningText} !important;
    width: 100%;
    font-weight: 400;
    text-align: start;
    margin-left: 2px;
    margin-bottom: 0px;
    display: ${(props) => (props.visibility ? 'none' : 'block')} 
    margin-left: ${(props) => props.ml && props.ml};
    margin-bottom: ${(props) => props.mb && props.mb};
    margin-top: ${(props) => props.mt && props.mt}
`;

export const EquivalentInUSDT = styled.p`
    font-size: 12px;
    color: rgba(250, 250, 250, 0.8);
    margin-left: 8px;
`;

export const MainText = styled.p<MainTextInterface>`
    height: ${(props) => (props.height ? props.height : '14px')};
    font-size: ${(props) => (props.fontSize ? props.fontSize : '16px')};
    font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 'bold')};
    line-height: 14px;
    letter-spacing: 0.32px;
    color: ${(props) => (props.color ? props.color : '#ffffff')};
    margin-top: 0px;
    margin-bottom: 3px;
    text-align: ${(props) => (props.textAlign ? props.textAlign : 'start')};
    ${(props) =>
        props.balOverFlow &&
        css`
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 100px;
        `}
`;

export const ModalText = styled.p<ModalTextPropsInterface>`
    font-size: ${mainHeadingFontSize};
    line-height: 21px;
    margin-top: ${(props) => props.marginTop && props.marginTop};
    color: rgba(250, 250, 250, 0.85);
    text-align: ${(props) => props.textAlign};
`;

export const CancelText = styled.p`
    font-size: 14px;
    line-height: 14px;
    color: rgba(246, 58, 58, 0.7);
    font-weight: 500;
    align-self: center;
    text-align: center;
    text-decoration: underline;
    cursor: pointer;
`;
