import styled from 'styled-components';
import { colors, fonts } from '../../utils';
import { ImportLinkInterface } from './types';

const { subHeadingFontSize } = fonts;
const { primaryBackground } = colors;

export const ImportLink = styled.span<ImportLinkInterface>`
    font-size: ${subHeadingFontSize};
    color: ${(props) => (props.color ? props.color : primaryBackground)};
`;
