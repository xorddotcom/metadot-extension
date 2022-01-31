import styled from 'styled-components';
import { colors, fonts } from '../../../utils';
import { MainHeadingInterface, SubHeadingInterface } from './type';

const { primaryText, secondaryText } = colors;
const { mainHeadingFontSize, subHeadingFontSize } = fonts;

export const MainHeading = styled.p`
    font-style: normal;
    font-size: ${mainHeadingFontSize};
    line-height: 18.75px;
    text-align: start;
    font-size: 16px;
    font-weight: ${(props: MainHeadingInterface) =>
        props.fw ? props.fw : '500'};
    color: ${(props: MainHeadingInterface) =>
        props.color ? props.color : primaryText};
    margin-bottom: ${(props: MainHeadingInterface) =>
        props.marginBottom && props.marginBottom};
`;

export const SubHeading = styled.p`
    font-style: normal;
    font-size: ${subHeadingFontSize};
    color: ${secondaryText};
    text-align: ${(props: SubHeadingInterface) =>
        props.textAlign ? props.textAlign : 'start'};
    text-align-last: ${(props: SubHeadingInterface) =>
        props.textAlignLast ? props.textAlignLast : 'start'};
    line-height: ${(props: SubHeadingInterface) =>
        props.lineHeight ? props.lineHeight : '22px'};
    font-size: 0.9rem;
    text-align: justify;
    text-justify: auto;
    margin-top: ${(props: SubHeadingInterface) =>
        props.marginTop && props.marginTop};
    margin-bottom: ${(props: SubHeadingInterface) => props.mb && props.mb};
    margin-left: ${(props: SubHeadingInterface) => props.ml && props.ml};
`;
