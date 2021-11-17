/* eslint-disable no-nested-ternary */
import styled from 'styled-components';
import { colors, fonts } from '../../utils';

const { primaryTextColor, secondaryTextColor, warningTextColor } = colors;
const { mainHeadingFontSize, subHeadingFontSize } = fonts;

export const MainHeading = styled.p`
  font-weight: 500;
  font-size: ${mainHeadingFontSize};
  line-height: ${(props) => (!props.lineHeight ? '19px' : props.lineHeight)};
  font-size: ${(props) => (!props.fontSize ? '16px' : props.fontSize)};
  font-weight: ${(props) => (!props.fontWeight ? '500' : props.fontWeight)};
  text-align: start;
  /* color: ${(props) => (props.color ? props.color : primaryTextColor)}; */
  color: ${(props) => (props.warning ? warningTextColor : primaryTextColor)};
  margin-top: ${(props) => props.marginTop && props.marginTop};
  margin-bottom: ${(props) => props.marginBottom && props.marginBottom};
`;

export const SubHeading = styled.p`
  /* font-weight: 500; */
  font-size: ${subHeadingFontSize};
  color: ${(props) => (props.textLightColor ? 'rgba(250, 250, 250, 0.76)' : secondaryTextColor)};
  text-align: ${(props) => (props.textAlign ? props.textAlign : 'start')};
  text-align-last: ${(props) => (props.textAlignLast ? props.textAlignLast : 'start')};
  line-height: ${(props) => (props.lineHeight ? props.lineHeight : '22px')};
  text-align-last: ${(props) => (props.fontSize ? props.fontSize : '14px')};
  margin-top: ${(props) => props.marginTop && props.marginTop};
  margin-bottom: ${(props) => props.marginBottom && props.marginBottom};
  font-weight: 300;
  letter-spacing: 0.02em;
  text-align: justify;
  text-justify: auto;
`;

export const SubMainWrapperForAuthScreens = styled.div`
  display: ${(props) => (props.flexDirection ? 'block' : 'flex')};
  flex-direction: ${(props) => (props.flexDirection ? props.flexDirection : 'row')};
  align-items: center;
  justify-content: ${(props) => (props.flexDirection ? 'flex-start' : 'space-between')};
  flex-wrap: wrap;
  width: 100%;
  height: auto;
  height: auto;
  margin: 17px auto 25px;
  margin-bottom: ${(props) => (props.mb ? props.mb : '2rem')};
  margin-top: ${(props) => (props.mt && props.mt)};
`;

export const TextInputWrapper = styled.div`
  width: 100%;
  border: ${(props) => (props.isCorrect
    ? '0px'
    : props.isCorrect === false
      ? '1px solid red'
      : '0px')};
  border-radius: 8px;
  position: relative;
  margin-bottom:${(props) => props.marginBottom && props.marginBottom}
`;
