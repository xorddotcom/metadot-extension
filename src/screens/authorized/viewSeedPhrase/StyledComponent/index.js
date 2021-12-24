import styled from 'styled-components';
import { colors } from '../../../../utils';

const { primaryText } = colors;

export const Wrapper = styled.div`
  padding: 18px 20px 8px;
  overflow-y: scroll;
  min-height: 100%;
  max-height: 100%;
  height: 556px;
  position: relative;
`;

export const SeedWrapper = styled.div`
  background-color: #212121;
  width: 110px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 25px;
  padding-right: 20px;
  padding-top: 14px;
  padding-bottom: 13px;
  margin-top: 18px;
  margin-left: 14px;
  margin-right: 14px;
  box-sizing: border-box;

  &:first-child {
    margin-top: 0;
  }

  &:nth-child(2) {
    margin-top: 0;
  }

  &:nth-child(11) {
    margin-bottom: -1.6rem;
  }

  &:last-child {
    margin-bottom: -1.6rem;
  }
`;

export const IndexText = styled.span`
  font-size: 14px;
  opacity: 0.6;
  color: ${primaryText};
  margin-left: -0.3rem;
`;

export const SeedText = styled.p`
  font-size: 14px;
  color: ${primaryText};
  opacity: 0.7;
  width: 100%;
  margin-left: 0.5rem;
`;

export const CopyText = styled.p`
  font-size: 14px;
  line-height: 18.75px;
  height: 25px;
  text-align: start;
  color: rgba(250, 250, 250, 0.8);
  font-weight: 400;
  margin-top: 22px;
  /* position: relative; */
`;

export const CopyIcon = styled.img`
  /* position: absolute; */
  /* top: 1px; */
  /* left: 123px; */
  text-decoration: none !important;
`;

export const HorizontalContentDiv = styled.div`
  position: relative;
  padding: 0.3rem 1rem;
`;

export const Border = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-sizing: border-box;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

export const Blurdiv = styled.div`
  position: absolute;
  width: 315px;
  height: 450px;
  left: 0;
  top: 0;
  background: rgba(33, 33, 33, 0.3);
  border: 0.5px solid rgba(250, 250, 250, 0.5);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  box-sizing: border-box;
  visibility: ${(props) => (props.hidden ? props.hidden : 'visible')};
  /* visibility: hidden; */
`;

export const BlurdivMainText = styled.div`
  font-weight: bold;
  font-size: 14px;
  line-height: 24px;
  color: #ffffff;
  margin-bottom: ${(props) => props.mb && props.mb};
`;

export const BlurdivSubText = styled.div`
  font-family: Roboto;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  text-align: center;
  color: #8fa2b7;
  margin-bottom: ${(props) => (props.mb ? props.mb : '40px')};
`;

export const BlurdivButton = styled.div`
  width: 111px;
  height: 40px;
  background: rgba(0, 0, 0, 0.39);
  border-radius: 168px;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${(props) => props.mt && props.mt};
  cursor: pointer;
`;
