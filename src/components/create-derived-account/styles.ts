import styled from 'styled-components';

export const Account = styled.div`
    box-sizing: border-box;
    height: auto;
    width: 318px;
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
    margin-right: 16px;
    display: flex;
    justify-content: flex-end;
`;

export const AccountText = styled.div`
    margin-left: '16px';
    cursor: pointer;
    text-align: left;
`;

export const AccountMainText = styled.p`
    font-weight: 500;
    font-size: 16px;
    line-height: 16px;
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
    margin: 0px 12px;
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

export const CopyIconImg = styled.img`
    margin-left: 11px;
    height: 12.5px;
`;
