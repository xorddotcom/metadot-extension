import styled from 'styled-components';
import { colors, fonts } from '../../utils';
import { warningTextInterface } from './type';

const { warningText } = colors;
const { subHeadingFontSize } = fonts;

export const WarningText = styled.p`
    font-size: ${subHeadingFontSize};
    font-size: 12.5px;
    color: ${warningText} !important;
    width: 100%;
    font-weight: 400;
    text-align: start;
    margin-left: 2px;
    margin-bottom: 0px;
    visibility: ${(props: warningTextInterface) =>
        props.visibility ? 'visible' : 'hidden'};
    margin-left: ${(props: warningTextInterface) => props.ml && props.ml};
    margin-bottom: ${(props: warningTextInterface) => props.mb && props.mb};
`;
