/* eslint import/no-cycle: [2, { maxDepth: 1 }] */
import styled from 'styled-components';
import { colors, fonts } from '../../utils';

const { primaryTextColor, secondaryTextColor } = colors;
const { mainHeadingFontSize, subHeadingFontSize, headerHeadingFontSize } = fonts;

// ------------------ Asset cards styled components------------------ //

export const AssetCardWrapper = styled.div`
  width: 85%;
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
  color: ${primaryTextColor};
  margin-top: 0px;
  margin-bottom: 0px;
  text-align: start;
`;

export const HorizontalContentDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${(props) => (props.height ? props.height : 'auto')};
`;

export const EquivalentInUSDT = styled.p`
  font-size: 12px;
  color: rgba(250, 250, 250, 0.8);
  margin-left: 8px;
`;

// xxxxxxxxxx Asset cards styled components xxxxxxxxxx //

// ------------ Auth wrapper styled components ------- //

export const Wrapper = styled.div`
  padding: 48px 20px 8px;
`;

// xxxxxxxxxx Auth wrapper styled components xxxxxxxxxx //

// ------------ CommonComponents styled components ------- //

export const MainHeading = styled.p`
  font-style: normal;
  font-size: ${mainHeadingFontSize};
  line-height: 18.75px;
  text-align: start;
  font-size: 16px;
  font-weight: 500;
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
  margin-top: ${(props) => props.marginTop && props.marginTop};
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
  margin-bottom:${(props) => props.marginBottom && props.marginBottom};
`;

// xxxxxxxxxx CommonComponents styled components xxxxxxxxxx //

// ------------ Header styled components ------- //

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const HeaderHeading = styled.h3`
  color: ${primaryTextColor};
  font-size: ${headerHeadingFontSize};
  margin: 0 auto;
  padding: 10px;
  font-size: 18px;
  font-weight: 700;
`;

// xxxxxxxxxx Header styled components xxxxxxxxxx //

// ------------ Tx Card styled components ------- //

export const TxCardWrapper = styled.div`
  width: 90%;
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
  align-items: center;
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
`;

export const TxStatus = styled.p`
  font-size: 12px;
  line-height: 14px;
  height: 14px;
  color: ${primaryTextColor};
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
