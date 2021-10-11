import styled from 'styled-components';
import { fonts, colors } from '../../../../utils';

const { mainHeadingFontSize } = fonts;
const { primaryTextColor } = colors;

export const SeedWrapper = styled.div`
  background-color: #212121;
  width: 33%;
  height: 15px;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding-left: 25px;
  padding-right: 25px;
  padding-top: 14px;
  padding-bottom: 13px;
  margin-top: 18px;
`;

export const IndexText = styled.span`
  /* font-size: ${mainHeadingFontSize}; */
  font-size: 14px;
  opacity: 0.6;
  color: ${primaryTextColor};
  position: absolute;
`;

export const SeedText = styled.p`
  font-size: 14px;
  color: ${primaryTextColor};
  opacity: 0.7;
  width: 100%;
`;

export const CopyText = styled.p`
font-size: 0.99rem;
line-height: 25px;
height: 25px;
text-align:start;
color: rgba(250, 250, 250, 0.83);

`;

export const HorizontalContentDiv = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
`;
