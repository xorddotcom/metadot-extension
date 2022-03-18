import styled from 'styled-components';
import { colors, fonts } from '../../utils';

const { primaryText, secondaryBlack } = colors;

export const OptionDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 0;
`;

export const Option = styled.p`
    width: 133px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props: { selected: boolean }) =>
        props.selected ? '#1F2B2B' : '#2f2f2f'};
    border: ${(props) =>
        props.selected ? '1px solid #219A9A' : '1px solid #BCBCBC'};
    margin-right: 20px;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.02em;
    color: ${(props) => (props.selected ? '#219A9A' : '#BCBCBC')};
    opacity: 0.8;
    border-radius: 20px;
    cursor: pointer;
`;

export const UploadFileDiv = styled.div`
    margin-top: 24px;
    width: 100%;
`;

export const UploadFile = styled.label`
    background-color: ${secondaryBlack};
    color: ${primaryText};
    padding: 11px 16px;
    width: 89%;
    /* height: 45px; */
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.02em;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
`;

export const AccountDetailsDiv = styled.div`
    background-color: ${secondaryBlack};
    color: ${primaryText};
    padding: 0px 13px;
    width: 289px;
    height: 60px;
    font-weight: 500;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    margin-bottom: 25px;
`;

export const Circle = styled.div`
    background-color: #10977d;
    height: 25px;
    width: 25px;
    border-radius: 12.5px;
`;
