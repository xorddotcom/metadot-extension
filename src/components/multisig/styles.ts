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

export const AddAccountInput = styled.div`
    width: 100%;
    background: #141414;
    height: 45px;
    opacity: 0.6;
    margin-top: 12px;
    margin-bottom: 12px;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
`;
