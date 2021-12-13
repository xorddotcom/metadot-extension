import styled from 'styled-components';
import { fonts, colors } from '../../../../utils';

const { primaryText, secondaryText } = colors;

const { subHeadingFontSize, welcomeScreenMainHeadingFontSize } = fonts;

export const MainHeading = styled.p`
  color: ${primaryText};
  font-size: ${welcomeScreenMainHeadingFontSize};
  text-align: center;
  letter-spacing: 0.05em;
  text-transform: capitalize;
`;

export const SubHeading = styled.p`
  color: ${secondaryText};
  font-size: ${subHeadingFontSize};
  line-height: 30px;
  text-align: center;
  text-align-last: center;
  text-transform: capitalize;
  margin: 0 auto;
  letter-spacing: 0.7px;
  width: 254px;
  font-size: 18px;
  font-weight: bold;
  /* margin-left: -1.2rem !important; */
  margin-top: -2rem;
`;
