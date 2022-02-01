import styled, { css } from 'styled-components';
import { colors, fonts } from '../../../../utils';

const { primaryTextColor, incrementColor } = colors;
const { subHeadingFontSize, buttonFontSize } = fonts;

export const CloseIconDiv = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  color: ${primaryTextColor};
`;

export const HorizontalContentDiv = styled.div`
display: flex;
flex-direction: row;
align-items: center;justify-content: space-between;
padding-bottom: ${(props) => props.paddingBottom && '10px'};
padding-top: ${(props) => props.paddingTop && '10px'};
margin-bottom: ${(props) => props.marginBottom && '10px'};
border-bottom: ${(props) => props.borderBottom && '1px solid rgba(250, 250, 250, 0.15)'};
`;

export const VerticalContentDiv = styled.div`
display: flex;
flex-direction: column;

  ${(props) => props.border && css`
    border: 1px solid #212129;
    box-sizing: border-box;
    filter: drop-shadow(0px 0px 40px rgba(13, 13, 13, 0.2));
    border-radius: 8px;
  `}

  ${(props) => props.specialPadding && css`
    padding-left:10px;
    padding-right:10px;
  `}
`;

export const MainText1 = styled.p`
font-size: ${subHeadingFontSize};
line-height: 19px;
height: 19px;
color: rgba(250, 250, 250, 0.85);
text-align: ${(props) => props.textAlign};
`;

export const MainText2 = styled.p`
font-size: ${buttonFontSize};
line-height: 20px;
height: 20px;
color: ${(props) => (props.successText ? incrementColor : primaryTextColor)};
text-align: ${(props) => props.textAlign};
margin: 0px 0px 5px 0px;
`;

export const SubText1 = styled.p`
font-size: 0.803rem;
line-height: 16px;
height: 16px;
visibility: ${(props) => (props.hide ? 'hidden' : 'normal')};;
/* identical to box height, or 114% */
letter-spacing: 0.02em;
/* Text and Icons */
color: #FAFAFA;
opacity: 0.8;
text-align: ${(props) => props.textAlign};
margin: 0px 0px 3px 0px;
`;

export const SubText2 = styled.p`
font-size: 0.803rem;
line-height: 16px;
height: 16px;
/* identical to box height, or 114% */
letter-spacing: 0.02em;
color: rgba(250, 250, 250, 0.7);
opacity: 0.8;
text-align: ${(props) => props.textAlign};
margin:0px;
margin-left:${(props) => props.pl10 && '10px'};
`;

export const ViewOnPolkaScanText = styled.p`
height: 19px;
font-size: 16px;
line-height: 19px;
color: #880041;
width: 100%;
text-align : center;
opacity: 0.8;
`;
