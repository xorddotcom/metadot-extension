import styled from 'styled-components';
import { colors, fonts } from '../../utils';
import { Input, InputAdornment } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

const { primaryTextColor, secondaryTextColor } = colors;
const { mainHeadingFontSize, subHeadingFontSize } = fonts;

export const MainHeading = styled.p`
  font-style: normal;
  font-size: ${mainHeadingFontSize};
  color: ${props => (props.color ? props.color : primaryTextColor)};
  line-height: 21px;
  text-align: start;
`;

export const SubHeading = styled.p`
  font-style: normal;
  font-size: ${subHeadingFontSize};
  color: ${secondaryTextColor};
  text-align: start;
  text-align-last: ${props =>
    props.textAlignLast ? props.textAlignLast : 'start'};
  line-height: 21px;
`;

export const SubMainWrapperForAuthScreens = styled.div`
  display: ${props => (props.flexDirection ? 'block' : 'flex')};
  flex-direction: ${props =>
    props.flexDirection ? props.flexDirection : 'row'};
  align-items: center;
  justify-content: ${props =>
    props.flexDirection ? 'flex-start' : 'space-between'};
  flex-wrap: wrap;
  width: 100%;
  height: auto;
  min-height: 340px;
  margin: 25px auto 25px;
`;

export const TextInputWrapper = styled.div`
  width: 100%;
  border: ${props =>
    props.isCorrect
      ? '0px'
      : props.isCorrect === false
      ? '1px solid red'
      : '0px'};
  border-radius: 8px;
  position: relative;
`;
