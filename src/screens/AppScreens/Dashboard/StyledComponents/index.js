import styled from 'styled-components';
import { colors } from '../../../../utils';

const {
  incrementColor,
  inActiveTextColor,
  secondaryTextColor,
  primaryTextColor,
  primaryBgColor,
  darkBgColor,
  darkBgColor1,
} = colors;

export const Wrapper = styled.div`
  padding: 25px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const DashboardHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const LogoContainer = styled.div`
  width: 15%;
  height: 35px;
  display: flex;
  align-items: flex-end;
`;

export const NetworkContainer = styled.div`
  width: 219px;
`;

export const SelectChain = styled.div`
  width: 100%;
  height: 34px;
  cursor: pointer;
  padding-left: 10px;
  padding-right: 5px;
  background: ${darkBgColor};
  border: 0.5px solid ${primaryBgColor};
  box-sizing: border-box;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${primaryTextColor};
`;

export const SelectedChain = styled.p`
  font-size: 14px;
  line-height: 16px;
  /* identical to box height, or 133% */
  letter-spacing: 0.02em;
  /* Text and Icons */
  color: #fafafa;
  opacity: 0.8;
`;

export const SwitchToTestnet = styled(SelectedChain)`
  color: ${primaryBgColor};
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
  cursor: pointer;
  background: ${primaryBgColor};
`;

export const AccountText = styled.p`
  font-size: 20px;
  line-height: 23px;
  color: #fafafa;
  margin-top: 5px;
  margin-bottom: 0px;
  font-weight: 500;
`;

export const MainPanel = styled.div`
  height: 50%;
  position: relative;
  background: linear-gradient(102.54deg, rgba(38, 131, 131, 0.8) -82.51%, rgba(38, 131, 131, 0.8) 21.64%, rgba(20, 20, 20, 0.52) 199.89%);
  backdrop-filter: blur(130px);

  /* Note: backdrop-filter has minimal browser support */
  border-radius: 15px;
  margin-top: 50px;
  padding-left: 25px;
  margin-bottom: 40px;
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
  /* identical to box height */
  text-align: center;
  margin-top: 4px;
  color: ${(props) => (props.inActive ? inActiveTextColor : primaryTextColor)};
`;

export const MoreOptions = styled.div`
  position: absolute;
  right: 12px;
  top: 12px;
  display: flex;
  align-items: center;
`;

export const VerticalContentDiv = styled.div`
  display: flex;
  align-items: center;
`;

export const ConnectionStatus = styled.p`
  font-size: 10px;
  color: ${secondaryTextColor};
  margin-left: 6px;
`;

export const Balance = styled.p`
  font-weight: 500;
  font-size: 30px;
  line-height: 35px;
  color: ${primaryTextColor};
  text-align: start;
  margin-bottom: 0px;
  margin-top: 0px;
`;

export const AccountName = styled.p`
  font-size: 14px;
  color: ${primaryTextColor};
  line-height: 16px;
  font-weight: 500;
  text-align: start;
  margin-bottom: 0px;
  margin-top: 25px;
  text-transform: capitalize;
`;

export const PublicAddress = styled.p`
  font-weight: 500;
  margin-top: 12px;
  font-size: 12px;
  font-weight: 500;
  color: ${secondaryTextColor};
  text-align: start;
  padding-bottom: 2px;
`;

export const PerUnitPrice = styled.p`
  font-size: 12px;
  line-height: 14px;
  font-weight: bold;
  /* identical to box height */
  color: rgba(250, 250, 250, 0.8);
  text-align: start;
  margin-right: 15px;
  margin-top: 10px;
  margin-bottom: 20px;
`;

export const VariationAmount = styled.p`
  font-size: 14px;
  /* identical to box height */
  color: ${incrementColor};
  text-align: start;
  padding-bottom: 2px;
`;

export const CopyIconImg = styled.img`
  margin-left: 11px;
  height: 12.5px;
`;

export const AssetsAndTransactionsWrapper = styled.div`
  width: 100%;
  background: ${darkBgColor1};
  box-shadow: 0px 0px 10px rgba(230, 0, 122, 0.03);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  padding-top: 10px;
  padding-bottom: 10px;
`;

export const Tabs = styled.div`
  width: 90%;
  height: 44px;
  background: #292929;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px;
`;

export const TabSection = styled.p`
  width: 48%;
  height: 34px;
  cursor: pointer;
  font-size: 12px;
  line-height: 33px;
  /* identical to box height */
  /* Text and Icons */
  background-color: ${(props) => (props.isActive === true ? primaryBgColor : '#292929')};
  color: ${primaryTextColor};
  border-radius: 4px;
  margin: 0px;
  font-weight: 500;
`;
