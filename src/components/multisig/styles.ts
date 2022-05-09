import styled from 'styled-components';
import { colors, fonts } from '../../utils';
import { ImportLinkInterface } from './types';

const { subHeadingFontSize } = fonts;
const { primaryBackground } = colors;

export const ImportLink = styled.span<ImportLinkInterface>`
    font-size: ${subHeadingFontSize};
    color: ${(props) => (props.color ? props.color : primaryBackground)};
`;

export const AddCircle = styled.div`
    height: 44px;
    width: 44px;
    border-radius: 22px;
    background: #2e9b9b;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
`;
