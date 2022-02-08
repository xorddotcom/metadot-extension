/* eslint import/no-cycle: [2, { maxDepth: 1 }] */
import styled, { css } from 'styled-components';
import { colors, fonts } from '../../utils';

const {
  primaryText, secondaryText, warningText, darkBackground1,
} = colors;
const { mainHeadingFontSize, subHeadingFontSize, headerHeadingFontSize } = fonts;

// ------------------ Asset cards styled components------------------ //

export const AssetCardWrapper = styled.div`
  width: 89%;
  height: 55px;
  background: linear-gradient(
    98.61deg,
    #1e1e1e -29.86%,
    #383838 123.74%,
    rgba(56, 56, 56, 0.72) 123.74%
  );
  box-shadow: 0px 0px 40px rgba(13, 13, 13, 0.2);
  border-radius: 5px;
  margin-top: 15px;
  margin-bottom: 5px;
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const NameAndAmount = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
`;

export const CoinName = styled.p`
  height: 14px;
  width: 100%;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.01em;
  color: #ffffff;
  margin-top: 0px;
  margin-bottom: 3px;
  text-align: start;
`;

export const CoinAmount = styled.p`
  font-size: 12px;
  line-height: 14px;
  height: 14px;
  color: ${primaryText};
  margin-top: 0px;
  margin-bottom: 0px;
  text-align: start;
  min-width: 40px;
`;

export const HorizontalContentDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: ${(props) => (props.height ? props.height : 'auto')};
  width: ${(props) => (props.width ? props.width : 'auto')};
  background-color: ${(props) => (props.backgroundColor && props.backgroundColor)};
  border-radius: ${(props) => (props.borderRadius && props.borderRadius)};
`;

export const EquivalentInUSDT = styled.p`
  font-size: 12px;
  color: rgba(250, 250, 250, 0.8);
  margin-left: 8px;
`;

// xxxxxxxxxx Asset cards styled components xxxxxxxxxx //

// ------------ Auth wrapper styled components ------- //

export const Wrapper = styled.div`
  padding: 18px 20px 8px;
`;

// xxxxxxxxxx Auth wrapper styled components xxxxxxxxxx //

// ------------ CommonComponents styled components ------- //

export const MainHeading = styled.p`
  font-style: normal;
  font-size: ${mainHeadingFontSize};
  line-height: 18.75px;
  text-align: start;
  font-size: 16px;
  font-weight: ${(props) => (props.fw ? props.fw : '500')};
  color: ${(props) => (props.color ? props.color : primaryText)};
  margin-bottom: ${(props) => props.marginBottom && props.marginBottom};
`;

export const SubHeading = styled.p`
  font-style: normal;
  font-size: ${subHeadingFontSize};
  color: ${secondaryText};
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
`;

export const TextInputWrapper = styled.div`
  width: ${(props) => (props.inputWrapperWidth ? props.inputWrapperWidth : '100%')};
  border: ${(props) => (props.isCorrect
    ? '0px'
    : props.isCorrect === false
      ? '1px solid red'
      : '0px')};
  border-radius: 8px;
  background-color: ${darkBackground1};
  margin-bottom:${(props) => props.marginBottom && props.marginBottom};
  display: flex;
    align-items: center;
    justify-content: start;
`;

// xxxxxxxxxx CommonComponents styled components xxxxxxxxxx //

// ------------ Header styled components ------- //

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const HeaderHeading = styled.h3`
  color: ${primaryText};
  font-size: ${headerHeadingFontSize};
  margin: 0 auto;
  padding: 10px;
  font-size: 18px;
  font-weight: 700;
`;

// xxxxxxxxxx Header styled components xxxxxxxxxx //

// ------------ Tx Card styled components ------- //

export const TxCardWrapper = styled.div`
  width: 94%;
  height: 55px;
  background: linear-gradient(
    98.61deg,
    #1e1e1e -29.86%,
    #383838 123.74%,
    rgba(56, 56, 56, 0.72) 123.74%
  );
  box-shadow: 0px 0px 40px rgba(13, 13, 13, 0.2);
  border-radius: 5px;
  margin-top: 15px;
  margin-bottom: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const VerticalContentDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MainText = styled.p`
  height: 14px;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.01em;
  color: ${(props) => (props.color ? props.color : '#ffffff')};
  margin-top: 0px;
  margin-bottom: 3px;
  text-align: start;

  ${(props) => props.balOverFlow
    && css`
      white-space: nowrap; 
      overflow: hidden; 
      text-overflow: ellipsis; 
      width: 45px;
    
    `}

  
`;

export const TxStatus = styled.p`
  font-size: 12px;
  line-height: 14px;
  height: 14px;
  color: ${primaryText};
  margin-top: 0px;
  margin-bottom: 0px;
  text-align: start;
`;

export const TxHorizontalContentDiv = styled.div`
  display: flex;
  align-items: center;
  height: 17px;
`;

export const TxEquivalentInUSDT = styled.p`
  font-size: 12px;
  width: 100%;
  color: rgba(250, 250, 250, 0.8);
  text-align: start;
`;

// xxxxxxxxxx Tx Card styled components xxxxxxxxxx //

export const WarningText = styled.p`
  font-size: ${subHeadingFontSize};
  font-size: 12.5px;
  color: ${warningText} !important;
  width: 100%;
  font-weight: 400;
  text-align: start;
  margin-left: 2px;
  margin-bottom: 0px;
  visibility: ${(props) => props.visibility || 'visible'};
  margin-left: ${(props) => props.ml && props.ml};
  margin-bottom: ${(props) => props.mb && props.mb};
`;
