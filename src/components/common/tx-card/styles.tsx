import styled from 'styled-components';

export const TxCardWrapper = styled.div`
    width: 94%;
    height: 55px;
    background: linear-gradient(
        98.61deg,
        #1e1e1e -29.86%,
        #383838 123.74%,
        rgba(56, 56, 56, 0.72) 123.74%
    );
    box-shadow: 0px 0px 40px rgba(13, 13, 13, 0.2);
    border-radius: 5px;
    margin-top: 15px;
    margin-bottom: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const TxEquivalentInUSDT = styled.p`
    font-size: 12px;
    width: 100%;
    color: rgba(250, 250, 250, 0.8);
    text-align: start;
`;

export const TxHorizontalContentDiv = styled.div`
    display: flex;
    align-items: center;
    height: 17px;
`;
