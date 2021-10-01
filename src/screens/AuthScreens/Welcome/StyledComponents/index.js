import styled from 'styled-components';
import { fonts, colors } from '../../../../utils';

const { primaryTextColor, secondaryTextColor } = colors;

const { subHeadingFontSize, welcomeScreenMainHeadingFontSize } = fonts;

export const MainHeading = styled.p`
  color: ${primaryTextColor};
  font-size: ${welcomeScreenMainHeadingFontSize};
  text-align: center;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

export const SubHeading = styled.p`
  color: ${secondaryTextColor};
  font-size: ${subHeadingFontSize};
  line-height: 30px;
  text-align: center;
  text-align-last: center;
  text-transform: capitalize;
  width: 98%;
  margin: 0 auto;
`;
