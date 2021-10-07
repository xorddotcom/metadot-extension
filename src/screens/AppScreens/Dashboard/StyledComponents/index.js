import styled from 'styled-components';
import { colors } from '../../../../utils';

const {
  incrementColor,
  inActiveTextColor,
  secondaryTextColor,
  primaryTextColor,
} = colors;

export const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const DashboardHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

export const LogoContainer = styled.div`
  width: 20%;
  height: 35px;
  display: flex;
  align-items: flex-end;
`;

export const NetworkContainer = styled.div`
  width: 60%;
`;

export const SelectChain = styled.div`
  width: 100%;
  height: 34px;

  cursor: pointer;

  padding-left: 10px;
  padding-right: 5px;

  background: #212121;
  border: 0.2px solid #880041;
  box-sizing: border-box;
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${primaryTextColor};
`;

export const SelectedChain = styled.p`
  font-size: 12px;
  line-height: 16px;

  /* identical to box height, or 133% */
  letter-spacing: 0.02em;

  /* Text and Icons */
  color: #fafafa;

  opacity: 0.8;
`;

export const SwitchToTestnet = styled(SelectedChain)`
  color: #e6007a;
`;

export const AccountContainer = styled.div`
  width: 20%;
  height: 35px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`;

export const AccountSetting = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 35px;

  background: #880041;
`;

export const AccountText = styled.p`
  font-size: 20px;
  line-height: 23px;

  color: #fafafa;
  margin-top: 5px;
  margin-bottom: 0px;
  /* margin: auto; */
`;

export const MainPanel = styled.div`
  /* width: 100%; */
  height: 50%;
  position: relative;
  background: linear-gradient(
    103.97deg,
    rgba(230, 0, 122, 0.5) -171.04%,
    rgba(33, 33, 33, 0.5) 100.34%,
    rgba(230, 0, 122, 0.5) 101.04%,
    rgba(20, 20, 20, 0.325) 106.41%
  );
  backdrop-filter: blur(130px);

  /* Note: backdrop-filter has minimal browser support */
  border-radius: 15px;

  margin-bottom: 25px;
  margin-top: 25px;
  padding-left: 25px;
`;

export const OptionRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

export const Option = styled.div`
  width: 70px;
  height: 70px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background: #232323;
  border-radius: 15px;
`;

export const OptionsName = styled.p`
  font-size: 10px;
  /* line-height: 12px; */

  /* identical to box height */
  text-align: center;
  margin-top: 4px;
  color: ${(props) => (props.inActive ? inActiveTextColor : primaryTextColor)};
`;

export const MoreOptions = styled.div`
  position: absolute;
  right: 10px;
  top: 5px;
  display: flex;
  align-items: center;
`;

export const VerticalContentDiv = styled.div`
  display: flex;
  align-items: center;
`;

export const ConnectionStatus = styled.p`
  font-size: 10px;
  /* line-height: 12px; */
  color: ${secondaryTextColor};
  margin-left: 6px;
`;

export const Balance = styled.p`
  font-style: normal;
  font-size: 24px;
  /* line-height: 35px; */
  color: ${primaryTextColor};
  text-align: start;
  margin-bottom: 0px;
  margin-top: 0px;
`;

export const AccountName = styled.p`
  font-size: 14px;
  /* line-height: 16px; */

  color: ${primaryTextColor};
  text-align: start;
  margin-bottom: 0px;
`;

export const PublicAddress = styled.p`
  font-style: normal;
  font-size: 12px;
  /* line-height: 14px; */
  color: ${secondaryTextColor};
  text-align: start;
  padding-bottom: 2px;
`;

export const PerUnitPrice = styled.p`
  font-size: 12px;
  /* line-height: 14px; */

  /* identical to box height */

  color: rgba(250, 250, 250, 0.8);
  text-align: start;
  margin-right: 15px;
`;

export const VariationAmount = styled.p`
  font-size: 12px;
  /* line-height: 14px; */

  /* identical to box height */

  color: ${incrementColor};
  text-align: start;
  padding-bottom: 2px;
`;

export const AssetsAndTransactionsWrapper = styled.div`
  width: 100%;

  background: #1e1e1e;
  box-shadow: 0px 0px 10px rgba(230, 0, 122, 0.03);
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
`;

export const Tabs = styled.div`
  width: 90%;
  height: 51px;

  background: #292929;
  border-radius: 8px;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px;
`;

export const TabSection = styled.p`
  width: 48%;
  height: 33px;

  cursor: pointer;

  font-size: 12px;
  line-height: 33px;

  /* identical to box height */

  /* Text and Icons */
  background-color: ${(props) => (props.isActive === true ? '#880041' : '#292929')};

  color: ${primaryTextColor};
  border-radius: 4px;
  margin: 0px;
`;
