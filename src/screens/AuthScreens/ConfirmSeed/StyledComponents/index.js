import styled from 'styled-components';
import { fonts, colors } from '../../../../utils';

const { mainHeadingFontSize } = fonts;
const { primaryTextColor } = colors;

export const SeedWrapper = styled.div`
  background-color: #212121;
  width: 79px;
  height: 20px;
  border-radius: 8px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  /* padding-left: 10px; */
  /* padding-right: 10px; */
  /* padding-top: 14px; */
  padding-bottom: 5px; 
  padding-top: 5px; 
  margin-top: 8px;
  margin-right: 3px;
`;

export const IndexText = styled.span`
  font-size: ${mainHeadingFontSize};
  opacity: 0.6;
  color: ${primaryTextColor};
  position: absolute;
`;

export const SeedText = styled.span`
  background: #212121 !important;
  cursor: pointer;
  /* width: 25%; */
  height: 35px;
  line-height: 35px;
  border-radius: 8px;
  margin-top: 8px;
  margin-right: 3px;
  font-size: 0.875em;
  color: ${primaryTextColor};
  opacity: 0.7;
  /* width: 20% !important; */
  display: inline;

  visibility: ${(props) => (props.selected === true ? 'hidden' : 'visible')};
  /* border: 1px solid white; */

  &:hover {
    background-color: #880041 !important;
}

`;

export const SeedGridRow = styled.div`
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
 width:100%;
border-radius: 8px;
`;

export const SeedGrid = styled.div`
border: 1px solid #212121;
box-sizing: border-box;
border-radius: 8px;
padding: 10px;
width: 100%;
margin: 5px auto;
`;
