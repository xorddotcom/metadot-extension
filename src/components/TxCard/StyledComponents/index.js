import styled from 'styled-components';
import { colors } from '../../../utils';

const { primaryTextColor } = colors;

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

export const HorizontalContentDiv = styled.div`
  display: flex;
  align-items: center;
  height: 17px;
`;

export const EquivalentInUSDT = styled.p`
  font-size: 12px;
  width: 100%;
  color: rgba(250, 250, 250, 0.8);
  text-align: start;
`;
