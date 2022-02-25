import styled, { css } from 'styled-components';

import {
    HorizontalContentInterface,
    VerticalContentDivPropsInterface,
    UnAuthScreensContentInterface,
    AuthorizationPopupWrapperInterface,
} from './type';

import { colors } from '../../../utils';

const { darkBackground1 } = colors;

export const Wrapper = styled.div<AuthorizationPopupWrapperInterface>`
    padding: 18px 20px 8px;
    height: ${(props) => props.height && props.height};
    width: ${(props) => props.width && props.width};
    border-radius: ${(props) => props.borderRadius && props.borderRadius};
    border-color: ${(props) => props.borderRadius && props.borderRadius};
`;

export const MainDiv = styled.div`
    margin-top: ${(props: { mt?: string; mb?: string }) =>
        props.mt ? props.mt : '34px'};
    margin-bottom: ${(props: { mt?: string; mb?: string }) =>
        props.mb ? props.mb : '34px'};
`;

export const HorizontalContentDiv = styled.div<HorizontalContentInterface>`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: ${(props) => (props.height ? props.height : 'auto')};
    width: ${(props) => (props.width ? props.width : 'auto')};
    background-color: ${(props) =>
        props.backgroundColor && props.backgroundColor};
    border-radius: ${(props) => props.borderRadius && props.borderRadius};
`;

export const VerticalContentDiv = styled.div<VerticalContentDivPropsInterface>`
    display: flex;
    flex-direction: column;
    margin-top: ${(props) => props.marginTop && props.marginTop};
    margin-bottom: ${(props) => props.marginBottom && props.marginBottom};
    ${(props) =>
        props.border &&
        css`
            border: 1px solid ${darkBackground1};
            box-sizing: border-box;
            filter: drop-shadow(0px 0px 40px rgba(13, 13, 13, 0.2));
            border-radius: 8px;
        `}
    ${(props) =>
        props.specialPadding &&
        css`
            padding-left: 10px;
            padding-right: 10px;
        `}
    ${(props) =>
        props.warningDiv &&
        css`
            background: linear-gradient(
                100deg,
                rgba(27, 26, 26, 0.217) -55.79%,
                rgba(56, 56, 56, 0.7) 216.81%,
                rgba(22, 22, 22, 0.161) 216.81%
            );
            box-shadow: 0px 0px 40px rgba(13, 13, 13, 0.2);
            border-radius: 5px;
            height: 115px;
            padding: 15px;
        `}
    ${(props) =>
        props.transactionTitleDiv &&
        css`
            height: 85px;
            background: linear-gradient(
                99.81deg,
                #1e1e1e -3.09%,
                rgba(67, 67, 67, 0.72) 108.08%
            );
            box-shadow: 0px 0px 40px rgba(13, 13, 13, 0.2);
            border-radius: 8px;
        `}
    ${(props) =>
        props.transactionDetailDiv &&
        css`
            height: 185px;
            border: 1px solid #212121;
            box-sizing: border-box;
            filter: drop-shadow(0px 0px 40px rgba(13, 13, 13, 0.2));
            border-radius: 8px;
            padding: 5px;
        `}
    
    ${(props) =>
        props.transactionPasswordDiv &&
        css`
            height: 85px;
            display: flex;
            justify-content: space-around;
        `}
`;

type NewType = UnAuthScreensContentInterface;

export const UnAuthScreensContentWrapper = styled.div<NewType>`
    display: ${(props) => (props.flexDirection ? 'block' : 'flex')};
    flex-direction: ${(props) =>
        props.flexDirection ? props.flexDirection : 'row'};
    align-items: center;
    justify-content: ${(props) =>
        props.flexDirection ? 'flex-start' : 'space-between'};
    flex-wrap: wrap;
    width: 100%;
    height: auto;
    height: auto;
    margin: 17px auto 25px;
    margin-bottom: ${(props) => (props.mb ? props.mb : '50px')};
`;

export const LabelAndTextWrapper = styled.div`
    width: 100%;
    min-height: ${(props: { minHeight?: string; marginTop?: string }) =>
        props.minHeight ? props.minHeight : '103px'};
    margin-top: ${(props: { minHeight?: string; marginTop?: string }) =>
        props.marginTop && props.marginTop};
    position: relative;
`;
