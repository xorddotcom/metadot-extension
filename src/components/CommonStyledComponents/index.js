import styled from 'styled-components';
import { colors, fonts } from '../../utils';
import { Input } from '@mui/material';

const { primaryTextColor, secondaryTextColor } = colors;
const { mainHeadingFontSize, subHeadingFontSize } = fonts;

export const MainHeading = styled.p`
  font-style: normal;
  font-size: ${mainHeadingFontSize};
  color: ${props => (props.color ? props.color : primaryTextColor)};
  line-height: 21px;
  text-align: start;
  padding: 0px;
`;

export const SubHeading = styled.p`
  font-style: normal;
  font-size: ${subHeadingFontSize};
  color: ${secondaryTextColor};
  text-align: start;
  padding: 0px;
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
  width: 90%;
  height: auto;
  min-height: 340px;
  margin: 25px auto 100px;
`;

export const StyledMUiInput = ({ placeholder }) => (
  <Input
    placeholder={placeholder}
    fullWidth={true}
    disableUnderline={true}
    style={{
      paddingLeft: 25,
      paddingTop: 13,
      paddingBottom: 13,
      color: primaryTextColor,
      background: '#212121',
      fontSize: 16,
      borderRadius: 8,
      height: 45,
      marginBottom: 10,
    }}
  />
);
