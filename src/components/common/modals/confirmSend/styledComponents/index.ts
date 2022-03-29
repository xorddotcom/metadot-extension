import styled, { css } from 'styled-components';
import { colors, fonts } from '../../../../../utils';
import {
    HorizontalContentInterface,
    ModalText2Interface,
    SubTextInterface,
    VerticalContentInterface,
} from './types';

const { primaryText, darkBackground1 } = colors;
const { buttonFontSize } = fonts;

export const CloseIconDiv = styled.div`
    position: absolute;
    right: 10px;
    top: 10px;
    color: ${primaryText};
    cursor: pointer;
`;

export const HorizontalContentDiv = styled.div<HorizontalContentInterface>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-bottom: ${(props) => props.paddingBottom && '10px'};
    padding-top: ${(props) => props.paddingTop && '10px'};
    margin-bottom: ${(props) => props.marginBottom && '10px'};
    margin-top: ${(props) => props.marginTop && props.marginTop};
    border-bottom: ${(props) =>
        props.borderBottom && '1px solid rgba(250, 250, 250, 0.15)'};
`;

export const VerticalContentDiv = styled.div<VerticalContentInterface>`
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

export const ModalText2 = styled.p<ModalText2Interface>`
    font-size: ${buttonFontSize};
    font-weight: 500;
    line-height: 19px;
    height: 20px;
    color: ${primaryText};
    text-align: ${(props) => props.textAlign};
    margin: 0px 0px 5px 0px;
    visibility: ${(props) => (props.hide ? 'hidden' : 'normal')};
    margin-top: ${(props) => props.marginTop && props.marginTop};
    margin-bottom: ${(props) => props.marginBottom && props.marginBottom};
`;

export const SubText1 = styled.p<SubTextInterface>`
    font-size: 12px;
    line-height: 16px;
    height: 16px;
    visibility: ${(props) => (props.hide ? 'hidden' : 'normal')};
    /* identical to box height, or 114% */
    letter-spacing: 0.32px;
    /* Text and Icons */
    color: ${primaryText};
    opacity: 0.8;
    text-align: ${(props) => props.textAlign};
    margin: 0px 0px 3px 0px;
`;

export const SubText2 = styled.p<SubTextInterface>`
    font-size: 12px;
    line-height: 16px;
    height: 16px;
    letter-spacing: 0.32px;
    color: rgba(250, 250, 250, 0.7);
    opacity: 0.8;
    text-align: ${(props) => props.textAlign};
    margin: 0px;
`;
