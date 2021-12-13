import styled from 'styled-components';
import { colors } from '../../../../utils';

const { primaryText, primaryBackground } = colors;

export const TitleDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 10px;
  color: ${primaryText};
  position: relative;
`;

export const Title = styled.p`
  height: 21px;
  font-size: 16px;
  line-height: 21px;
  color: ${primaryText};
`;

export const BackButton = styled.div`
  position: absolute;
  left: 20px;
  cursor: pointer;
`;

export const CloseIconDiv = styled.div`
  position: relative;
  width: 30px;
  left: 91%;
  top: 15px;
  color: ${primaryText};
  cursor: pointer;
  /* border: 1px solid white; */
`;

export const OptionRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  opacity: ${(props) => (props.disabled ? 0.4 : 1)};
  cursor: pointer;

  &:hover {
    background: rgba(46, 155, 155, 0.26);
  }
`;

export const HorizontalContentDiv = styled.div`
  display: flex;
  align-items: center;
  padding-left: 20px;

  img {
    width: 1.8rem;
    height: 1.8rem;
    border-radius: 50%;   
  }
`;

export const PlainIcon = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 25px;

  background: ${(props) => (props.bgColor ? props.bgColor : primaryBackground)};
`;

export const OptionText = styled.div`
  margin-left: 20px;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.02em;
  color: ${primaryText};
  opacity: 0.8;
`;

export const NextIcon = styled.div`
  color: ${primaryText};
  padding-right: 10px;
  display: flex;
  align-items: center;
`;
