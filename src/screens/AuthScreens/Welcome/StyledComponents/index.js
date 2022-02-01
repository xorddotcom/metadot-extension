import styled from 'styled-components';
import { fonts, colors } from '../../../../utils';

const { primaryTextColor, secondaryTextColor } = colors;

const { subHeadingFontSize, welcomeScreenMainHeadingFontSize } = fonts;

export const MainHeading = styled.p`
  color: ${primaryTextColor};
  font-size: ${welcomeScreenMainHeadingFontSize};
  text-align: center;
  letter-spacing: 0.05em;
  text-transform: capitalize;
`;

export const SubHeading = styled.p`
  color: ${secondaryTextColor};
  font-size: ${subHeadingFontSize};
  line-height: 30px;
  text-align: center;
  text-align-last: center;
  text-transform: capitalize;
  margin: 0 auto;
  letter-spacing: 5%;
  width: 110%;
  font-size: 0.85rem;
  font-weight: bolder;
  margin-left: -1.2rem !important;
  margin-top: -2rem;
`;
