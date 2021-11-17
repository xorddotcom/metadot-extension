import styled from 'styled-components';
import { colors, fonts } from '../../../../utils';

const { primaryTextColor } = colors;
const { subHeadingFontSize } = fonts;

export const OptionDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 0;
`;

export const Option = styled.p`
  width: 133px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.selected ? 'rgba(33, 154, 154, 0.3);' : '#212121')};
  margin-right: 20px;
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
