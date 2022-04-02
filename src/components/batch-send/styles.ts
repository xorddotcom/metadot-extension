import styled from 'styled-components';
import { fonts, colors } from '../../utils';

const { mainHeadingFontSize } = fonts;
const { primaryText, darkBackground1, secondaryBlack, primaryBackground } =
    colors;

export const RecepientDetailDiv = styled.div`
    height: 133px;
    width: 100%;
    border: 0.8px solid rgba(250, 250, 250, 0.1);
    box-sizing: border-box;
    filter: drop-shadow(0px 0px 16px rgba(46, 155, 155, 0.08));
    border-radius: 6px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-left: 15px;
    padding-right: 15px;
`;

export const TransactionDetailDiv = styled.div`
    height: 143px;
    border: 1px solid rgba(250, 250, 250, 0.05);
    box-sizing: border-box;
    filter: drop-shadow(0px 0px 40px rgba(13, 13, 13, 0.2));
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-left: 15px;
    padding-right: 15px;
`;

export const Divider = styled.div`
    width: 100%;
    height: 0px;
    border: 1px solid rgba(250, 250, 250, 0.07);
`;
