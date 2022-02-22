import styled from 'styled-components';

import { MainText1PropsInterface } from './types';

import { colors, fonts } from '../../../../../utils';

const { primaryText, primaryBackground } = colors;
const { mainHeadingFontSize } = fonts;

export const CloseIconDiv = styled.div`
    position: absolute;
    right: 10px;
    top: 10px;
    color: ${primaryText};
    cursor: pointer;
`;

export const MainText1 = styled.h3<MainText1PropsInterface>`
    font-size: ${mainHeadingFontSize};
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
    margin-top: ${(props) => props.marginTop && props.marginTop};
    color: ${primaryText};
    text-align: ${(props) => props.textAlign};
`;

export const MainText2 = styled.h3<MainText1PropsInterface>`
    font-size: 16px;
    line-height: 16px;
    color: ${primaryText};
    letter-spacing: 0.02em;
    text-align: ${(props) => props.textAlign};
    margin-top: ${(props) => props.marginTop && props.marginTop};
`;

export const SubText2 = styled.h3<MainText1PropsInterface>`
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: 0.02em;
    color: rgba(250, 250, 250, 0.8);
    opacity: 0.8;
    margin: 0;
    text-align: ${(props) => props.textAlign};
    margin-top: ${(props) => props.marginTop};
`;

export const MainLinks = styled.div`
    margin: 25px 0;
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    color: ${primaryBackground};
`;
