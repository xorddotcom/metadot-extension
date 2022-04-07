import styled from 'styled-components';
import { colors, fonts } from '../../utils';
import { MainTextInterface } from './types';

const { darkBackground1, darkBackground, primaryText } = colors;
const { mainHeadingFontSize } = fonts;

export const Wrapper = styled.div`
    padding: 18px 20px 8px;
    position: relative;
    background: ${darkBackground};
`;

export const WrapperScroll = styled.div`
    width: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
`;

export const Div = styled.div`
    margin-top: ${(props: { mt: string }) => props.mt && props.mt};
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-flow: column;
    margin-left: -4px;
`;

export const MarginSet = styled.div`
    margin: ${(props: { margin?: string }) => props.margin && props.margin};
`;

export const Account = styled.div`
    box-sizing: border-box;
    height: auto;
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
    margin: ${(props: {
        margin?: string;
        marginTop?: string;
        marginBottom?: string;
    }) => props.margin && props.margin};
    margin-bottom: ${(props: {
        margin?: string;
        marginTop?: string;
        marginBottom?: string;
    }) => props.marginBottom && props.marginBottom};
    margin-top: ${(props: {
        margin?: string;
        marginTop?: string;
        marginBottom?: string;
    }) => props.marginTop && props.marginTop};
    width: 320px;
`;

export const AccountFlex = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

export const AccountCircle = styled.div`
    background-color: #880041;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    margin-right: 16px;
    display: flex;
    justify-content: flex-end;
`;

export const AccountText = styled.div`
    margin-left: 16px;
    cursor: pointer;
    text-align: left;
`;

export const AccountMainText = styled.p`
    font-weight: 500;
    font-size: 16px;
    letter-spacing: 0.32px;
    color: #fafafa;
    opacity: 0.8;
    text-align: left;
    margin-bottom: -5px;
    cursor: pointer;
    display: inline-block;
    margin: 3px 0px 3px 0px;
`;

export const AccountActiveText = styled.p`
    display: inline-block;
    margin: 3px 0px 3px 10px;
    font-size: 12px;
    color: #02cc53;
`;

export const AccountSubText = styled.p`
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.32px;
    color: rgba(250, 250, 250, 0.69);
    opacity: 0.8;
    text-align: left;
    margin: 3px 0px 3px 0px;
`;

export const DrivedAccountMain = styled.div`
    width: 100%;
    margin-top: -6px;
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
    cursor: pointer;
`;

export const Border = styled.div`
    margin: auto;
    background: rgba(255, 255, 255, 0.1);
    width: 278px;
    height: 1px;
`;

export const DrivedAccountText = styled.p`
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.32px;
    color: #ffffff;
    opacity: 0.8;
    text-align: left;
    margin-left: 41px;
`;

export const ButtonDiv = styled.div`
    position: absolute;
    bottom: 20px;
    left: 28px;
`;

export const DropDownContainer = styled.div`
    position: relative;
    width: 16px;
`;

export const DropDownIcon = styled.div`
    cursor: pointer;
`;

export const DropDownListContainer = styled.div`
    position: absolute;
    top: 14px;
    right: -26px;
    z-index: 1;
`;

export const DropDownList = styled.ul`
    width: 210px;
    background: ${darkBackground1};
    color: ${primaryText} !important;
    border: 0.9px solid #2e9b9b;
    box-sizing: border-box;
    box-shadow: 0px 0px 20px 5px rgba(46, 155, 155, 0.08);
    border-radius: 8px;
    padding-top: 1rem !important;
    padding-bottom: 1rem !important;
    padding-left: 22.1px !important;
    /* &:first-child {
    padding-top: 0.8em;
  } */
`;

export const ListItem = styled.li`
    list-style: none;
    /* margin-bottom: 1em; */
    margin-left: 24px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 12px 0;
    padding-bottom: 14px;
    cursor: pointer;
    &:hover {
        background: rgba(46, 155, 155, 0.26);
    }
`;

export const MainDiv = styled.div`
    border: 0.8px solid primaryBackground;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    padding: 16px 8px;
    box-sizing: border-box;
    border-radius: 6px;
`;

export const MainText1 = styled.p`
    font-size: ${mainHeadingFontSize};
    line-height: 21px;
    margin-top: ${(props: { marginTop: string; textAlign: string }) =>
        props.marginTop && props.marginTop};
    color: rgba(250, 250, 250, 0.85);
    text-align: ${(props: { marginTop: string; textAlign: string }) =>
        props.textAlign};
`;

export const MainText = styled.p<MainTextInterface>`
    height: 14px;
    font-size: ${(props) => (props.fs ? props.fs : '16px')};
    line-height: ${(props) => (props.lh ? props.lh : '19px')};
    font-weight: 500;
    letter-spacing: ${(props) => (props.ls ? props.ls : '0.16px')};
    color: ${(props) => (props.color ? props.color : primaryText)};
    width: 100%;
    text-align: start;
    margin: ${(props) => (props.m ? props.m : '0px')};
    margin-bottom: ${(props) => (props.mb ? props.mb : '12px')};
    margin-top: ${(props) => props.mt && props.mt};
`;

export const CloseIconDiv = styled.div`
    position: absolute;
    right: 10px;
    top: 10px;
    color: ${primaryText};
    cursor: pointer;
`;

export const FlexColumn = styled.div`
    display: flex;
    flexdirection: column;
`;

export const CopyIconDiv = styled.div`
    margin-left: 12px;
`;

export const KebabIcon = styled.img`
    height: 20;
    width: 5;
`;
