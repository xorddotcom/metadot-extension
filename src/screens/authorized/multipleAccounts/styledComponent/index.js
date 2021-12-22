import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 18px 20px 8px;
  overflow-y: scroll;
  min-height: 100%;
  max-height: 100%;
  height: 556px;
  position: relative;
`;

export const WrapperScroll = styled.div`
  height: 450px;
  overflow-y: scroll;
`;

export const Div = styled.div`
  margin-top: ${(props) => props.mt && props.mt};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-flow: column;
  margin-left: -4px;
`;

export const MarginSet = styled.div`
  margin: ${(props) => props.margin && props.margin};
`;

export const Account = styled.div`
  box-sizing: border-box;
  height: auto;
  width: 326px;
  min-height: 83px;
  background: linear-gradient(
    99.81deg,
    #1e1e1e -3.09%,
    rgba(67, 67, 67, 0.72) 108.08%
  );
  box-shadow: 0px 0px 40px rgba(13, 13, 13, 0.2);
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 28px;
  margin: ${(props) => props.margin && props.margin};
`;

export const AccountFlex = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const AccountCircle = styled.div`
  background-color: #880041;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  margin-right: 1rem;
`;

export const AccountText = styled.div`
  margin-left: "1rem";
`;

export const AccountMainText = styled.p`
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0.02em;
  color: #fafafa;
  opacity: 0.8;
  text-align: left;
  margin-bottom: -5px;
`;

export const AccountSubText = styled.p`
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.02em;
  color: rgba(250, 250, 250, 0.69);
  opacity: 0.8;
  text-align: left;
`;

export const DropDownIcon = styled.div`
  cursor: pointer;
`;

export const DrivedAccountMain = styled.div`
  width: 326px;
  margin-top: -1.1rem;
`;

export const DrivedAccount = styled.div`
  background: linear-gradient(99.81deg, #1e1e1e -3.09%, #303030);
  box-shadow: 0px 0px 40px rgba(13, 13, 13, 0.2);
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 27px;
  margin-top: -0.65rem;
  margin-bottom: 0.2rem;
`;

export const Border = styled.div`
  /* border: 0.4px solid rgba(255, 255, 255, 0.2); */
  background: rgba(255,255,255,0.1);
  width: 278px;
  height: 1px;
  margin: 12px auto;
  margin-left: 29px;
`;

export const DrivedAccountText = styled.p`
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.02em;
  color: #ffffff;
  opacity: 0.8;
  text-align: left;
  margin-left: 2.6rem;
`;

export const ButtonDiv = styled.div`
  position: absolute;
  bottom: 20px;
  left: 18px;
`;
