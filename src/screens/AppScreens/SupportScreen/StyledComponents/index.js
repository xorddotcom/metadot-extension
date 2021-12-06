import styled from 'styled-components';
import { fonts, colors } from '../../../../utils';

const { mainHeadingFontSize, subHeadingFontSize } = fonts;
const { primaryTextColor, secondaryTextColor } = colors;

export const MainDiv = styled.div`
  margin-top: ${(props) => (props.mt ? props.mt : '34px')};
  margin-bottom: ${(props) => (props.mb ? props.mb : '34px')};
`;

export const SocialDiv = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const MainHeading = styled.p`
  font-style: normal;
  font-size: ${mainHeadingFontSize};
  line-height: 18.75px;
  text-align: start;
  font-size: 16px;
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

export const VerticalContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: ${(props) => (props.mb ? props.mb : '0px')};
`;

export const MainText = styled.p`
  height: 14px;
  font-size: ${(props) => (props.fs ? props.fs : '16px')};
  line-height: ${(props) => (props.lh ? props.lh : '19px')};
  font-weight: 500;
  letter-spacing: ${(props) => (props.ls ? props.ls : '0.01em')};
  color: ${(props) => (props.color ? props.color : primaryTextColor)};
  width: 100%;
  text-align: start;
  margin: ${(props) => (props.m ? props.m : '0px')};
  margin-bottom: ${(props) => (props.mb ? props.mb : '12px')};
  margin-top: ${(props) => (props.mt && props.mt)};
`;

export const Wrapper = styled.div`
  padding: 18px 20px 8px;
  overflow-y: scroll;
  min-height: 100%;
  max-height: 100%;
  height: 556px;
`;
