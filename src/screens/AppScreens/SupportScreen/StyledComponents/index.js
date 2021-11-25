import styled from 'styled-components';
import { fonts, colors } from '../../../../utils';

const { mainHeadingFontSize, subHeadingFontSize } = fonts;
const { primaryTextColor, secondaryTextColor } = colors;
export const MainHeading = styled.p`
  font-style: normal;
  font-size: ${mainHeadingFontSize};
  line-height: 18.75px;
  text-align: start;
  font-size: 16px;
  font-weight: ${(props) => (props.fw ? props.fw : '500')};
  color: ${(props) => (props.color ? props.color : primaryTextColor)};
  margin-bottom: ${(props) => props.marginBottom && props.marginBottom};
`;

export const SubHeading = styled.p`
  font-style: normal;
  font-size: ${subHeadingFontSize};
  color: ${secondaryTextColor};
  text-align: ${(props) => (props.textAlign ? props.textAlign : 'start')};
  text-align-last: ${(props) => (props.textAlignLast ? props.textAlignLast : 'start')};
  line-height: ${(props) => (props.lineHeight ? props.lineHeight : '22px')};
  font-size: 0.90rem;
  text-align: justify;
  text-justify: auto;
  margin-top: ${(props) => props.marginTop && props.marginTop};
  margin-bottom: ${(props) => props.mb && props.mb};
  margin-left: ${(props) => props.ml && props.ml};
`;
