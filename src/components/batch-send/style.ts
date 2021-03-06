import styled from 'styled-components';

export const RecepientDetailDiv = styled.div`
    height: 133px;
    width: 100%;
    border: 0.8px solid rgba(250, 250, 250, 0.1);
    box-sizing: border-box;
    filter: drop-shadow(0px 0px 16px rgba(46, 155, 155, 0.08));
    border-radius: 6px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-left: 15px;
    padding-right: 15px;
`;

export const TransactionDetailDiv = styled.div`
    min-height: 143px;
    border: 1px solid rgba(250, 250, 250, 0.05);
    box-sizing: border-box;
    filter: drop-shadow(0px 0px 40px rgba(13, 13, 13, 0.2));
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-left: 15px;
    padding-right: 15px;
`;

export const Divider = styled.div`
    width: 100%;
    height: 0px;
    border: 1px solid rgba(250, 250, 250, 0.07);
`;

export const FileInputDiv = styled.div`
    width: 100%;
    height: 45px;
    left: 25px;
    top: 289px;
    background: rgba(20, 20, 20, 0.6);
    border-radius: 8px;
    display: flex;
    align-items: center;
    cursor: pointer;
`;

export const RecpientInputDiv = styled.div`
    width: 100%;
    border: 0.8px solid rgba(250, 250, 250, 0.1);
    box-sizing: border-box;
    filter: drop-shadow(0px 0px 16px rgba(46, 155, 155, 0.08));
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    padding: 15px 18px 20px 20px;
`;

export const AddCircle = styled.div`
    height: 44px;
    width: 44px;
    border-radius: 22px;
    background: #2e9b9b;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const GoUpCircle = styled.div`
    height: 44px;
    width: 44px;
    border-radius: 22px;
    border: 1px solid #2e9b9b;
    cursor: pointer;
    box-sizing: border-box;
    filter: drop-shadow(0px 0px 10px rgba(46, 155, 155, 0.2));
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ImageButtons = styled.img`
    cursor: pointer;
`;
