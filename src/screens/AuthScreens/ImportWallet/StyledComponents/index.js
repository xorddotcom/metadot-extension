import styled from 'styled-components';
import { colors, fonts } from '../../../../utils';

const { primaryTextColor } = colors;
const { subHeadingFontSize } = fonts;

export const OptionDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: -0.7rem;
`;

export const Option = styled.p`
  width: 190px;
  padding: 10px 0;
  background-color: ${(props) => (props.selected ? '#2d111e' : '#212121')};
  margin-right: 20px;
  font-style: normal;
  font-weight: 500;
  font-size: ${subHeadingFontSize};
  line-height: 16px;
  letter-spacing: 0.02em;
  color: ${primaryTextColor};
  opacity: 0.8;
  border-radius: 20px;
  font-size: 0.8rem;
  cursor: pointer;
`;
