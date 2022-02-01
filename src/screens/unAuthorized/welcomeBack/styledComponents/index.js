import styled from 'styled-components';
import { fonts, colors } from '../../../../utils';

const { primaryText, secondaryText } = colors;

const { welcomeScreenMainHeadingFontSize } = fonts;

export const MainHeading = styled.p`
  color: ${primaryText};
  font-size: ${welcomeScreenMainHeadingFontSize};
  text-align: center;
  letter-spacing: 0.05em;
  text-transform: capitalize;
`;

export const SubHeading = styled.p`
  color: ${secondaryText};
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
