import styled from 'styled-components';
import { colors, fonts } from '../../../../utils';

const { primaryTextColor } = colors;
const { subHeadingFontSize } = fonts;

export const OptionDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Option = styled.p`
  width: 190px;
  height: 30px;
  background-color: ${(props) => (props.selected ? '#2d111e' : '#212121')};
  margin-right: 25px;
  font-style: normal;
  font-weight: 500;
  font-size: ${subHeadingFontSize};
  line-height: 16px;

  letter-spacing: 0.02em;

  color: ${primaryTextColor};

  opacity: 0.8;
  border-radius: 20px;
  padding-top: 15px;

  cursor: pointer;
`;
