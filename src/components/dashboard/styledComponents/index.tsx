import styled from 'styled-components';
import { colors } from '../../../utils';
import {
    BalancePropsInterface,
    LabelAndTextInputPropsInterface,
    OptionsNameInterface,
    SelectChainInterface,
    TabSectionPropsInterface,
} from './types';

const {
    green,
    inActiveText,
    secondaryText,
    primaryText,
    primaryBackground,
    darkBackground1,
    darkBackground2,
} = colors;

export const Wrapper = styled.div`
    padding: 25px 20px;
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-bottom: ${(props: { pb: string | boolean }) => props.pb && '0'};
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
    background: ${darkBackground1};
    border: 0.5px solid ${primaryBackground};
    box-sizing: border-box;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${primaryText};
    opacity: ${(props: SelectChainInterface) => (props.disabled ? 0.3 : 1)};
`;

export const SelectedChain = styled.p`
    font-size: 13px;
    color: ${primaryText};
    opacity: 0.8;
    width: 148px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
    background: ${primaryBackground};
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const AccountText = styled.p`
    font-size: 20px;
    line-height: 23px;
    color: ${primaryText};
    font-weight: 500;
`;

export const MainPanel = styled.div`
    height: 161px;
    position: relative;
    background: linear-gradient(
        102.54deg,
        rgba(38, 131, 131, 0.8) -82.51%,
        rgba(38, 131, 131, 0.8) 21.64%,
        rgba(20, 20, 20, 0.52) 199.89%
    );
    backdrop-filter: blur(130px);

    /* Note: backdrop-filter has minimal browser support */
    border-radius: 15px;
    margin-top: 30px;
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
    /* identical to box height */
    text-align: center;
    margin-top: 4px;
    color: ${(props: OptionsNameInterface) =>
        props.inActive ? inActiveText : primaryText};
`;

export const MoreOptions = styled.div`
    position: absolute;
    right: 12px;
    top: 12px;
    display: flex;
    align-items: center;
`;

export const Refresh = styled.div`
    position: absolute;
    right: 28px;
    bottom: 23px;
    display: flex;
    align-items: center;
    cursor: pointer;
`;

export const VerticalContentDiv = styled.div`
    display: flex;
    align-items: center;
`;

export const ConnectionStatus = styled.p`
    font-size: 10px;
    font-weight: bold;
    color: ${secondaryText};
    margin-left: 5px;
`;

export const Balance = styled.p`
    font-weight: bold;
    font-size: 30px;
    line-height: 35px;
    color: ${primaryText};
    text-align: start;
    margin-bottom: 0px;
    margin-top: 0px;

    height: ${(props: BalancePropsInterface) => props.height && props.height};
    width: ${(props: BalancePropsInterface) => props.width && props.width};
    background-color: ${(props: BalancePropsInterface) =>
        props.backgroundColor && props.backgroundColor};
    border-radius: ${(props: BalancePropsInterface) =>
        props.borderRadius && props.borderRadius};
`;

export const AccountName = styled.p`
    font-size: 14px;
    color: ${primaryText};
    line-height: 16px;
    font-weight: bold;
    text-align: start;
    margin-bottom: 0px;
    margin-top: 25px;
    text-transform: capitalize;
`;

export const PublicAddress = styled.p`
    font-weight: bold;
    margin-top: 12px;
    font-size: 12px;
    color: ${secondaryText};
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
    color: ${green};
    text-align: start;
    padding-bottom: 2px;
`;

export const CopyIconImg = styled.img`
    margin-left: 11px;
    height: 12.5px;
`;

export const AssetsAndTransactionsWrapper = styled.div`
    width: 100%;
    height: 273px;
    background: ${darkBackground2};
    box-shadow: 0px 0px 10px rgba(230, 0, 122, 0.03);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
    padding-top: 10px;
    padding-bottom: 10px;
    overflow-y: hidden;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
`;

export const Tabs = styled.div`
    width: 90%;
    height: 44px;
    background: #292929;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 6px 0;
`;

export const TabSection = styled.p`
    width: 48%;
    height: 32px;
    cursor: pointer;
    font-size: 12px;
    line-height: 33px;
    background-color: ${(props: TabSectionPropsInterface) =>
        props.isActive === true ? primaryBackground : '#292929'};
    color: ${primaryText};
    border-radius: 4px;
    margin: 0px;
    font-weight: 500;
`;

export const DropDownMainText = styled.div`
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
    color: #fafafa;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 18px;
`;

export const LabelAndTextInput = styled.div`
    width: 100%;
    min-height: ${(props: LabelAndTextInputPropsInterface) =>
        props.minHeight ? props.minHeight : '103px'};
    margin-top: ${(props: LabelAndTextInputPropsInterface) =>
        props.marginTop && props.marginTop};
    position: relative;
`;
