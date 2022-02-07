import styled from 'styled-components';
import { fonts, colors } from '../../utils';

const { mainHeadingFontSize } = fonts;
const { primaryText, darkBackground1, primaryBackground } = colors;

export const SeedWrapper = styled.div`
    background-color: ${darkBackground1};
    width: 79px;
    height: 20px;
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding-bottom: 5px;
    padding-top: 5px;
    margin-top: 8px;
    margin-right: 3px;
`;

export const IndexText = styled.span`
    font-size: ${mainHeadingFontSize};
    opacity: 0.6;
    color: ${primaryText};
    position: absolute;
`;

export const SeedText = styled.span`
    background: ${darkBackground1} !important;
    cursor: pointer;
    height: 35px;
    line-height: 35px;
    border-radius: 8px;
    margin-top: 8px;
    font-size: 14px;
    color: ${primaryText};
    visibility: ${(props: { selected: boolean }) =>
        props.selected === true ? 'hidden' : 'visible'};

    &:hover {
        background-color: ${primaryBackground} !important;
    }
`;

export const SeedGridRow = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    width: 100%;
    border-radius: 8px;
    grid-column-gap: 0.4rem;
`;

export const SeedGrid = styled.div`
    border: 1px solid ${darkBackground1};
    box-sizing: border-box;
    border-radius: 8px;
    padding: 10px;
    width: 100%;
    margin: 5px auto;
    padding-top: 1px !important;
`;
