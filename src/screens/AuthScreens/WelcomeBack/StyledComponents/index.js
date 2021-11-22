import styled from 'styled-components';
import { fonts, colors } from '../../../../utils';

const { primaryTextColor, secondaryTextColor } = colors;

const { welcomeScreenMainHeadingFontSize, subHeadingFontSize } = fonts;

// eslint-disable-next-line import/prefer-default-export
export const WarningText = styled.p`
  font-size: ${subHeadingFontSize};
  font-size: 12.5px;
  color: rgba(195, 7, 7, 1) !important;
  width: 100%;
  font-weight: 400;
  text-align: start;
  margin-left: 2px;
  margin-bottom: 0px;
  visibility: ${(props) => props.visibility || 'visible'};
  margin-bottom: 0;
`;

export const MainHeading = styled.p`
  color: ${primaryTextColor};
  font-size: ${welcomeScreenMainHeadingFontSize};
  text-align: center;
  letter-spacing: 0.05em;
  text-transform: capitalize;
`;

export const SubHeading = styled.p`
  color: ${secondaryTextColor};
  font-size: 14px !important;
  line-height: 20px;
  text-align: center;
  text-align-last: center;
  text-transform: capitalize;
  margin: 0 auto;
  width: 254px;
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 40px;
  /* margin-left: -1.2rem !important; */
`;
