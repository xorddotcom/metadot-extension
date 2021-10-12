import styled from 'styled-components';
import { colors } from '../../../utils';

const { primaryTextColor } = colors;

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
  /* align-items: center; */
  justify-content: center;
  margin-left: 10px;
`;

export const CoinName = styled.p`
  height: 14px;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.01em;
  /* border: 1px solid white; */
  color: #ffffff;
  margin-top: 0px;
  margin-bottom: 3px;
  text-align: start;
`;

export const CoinAmount = styled.p`
  font-size: 12px;
  line-height: 14px;
  height: 14px;
  /* border: 1px solid white; */

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
  /* line-height: 14px; */

  /* identical to box height */

  color: rgba(250, 250, 250, 0.8);
  /* text-align: start; */
  margin-left: 8px;
`;
