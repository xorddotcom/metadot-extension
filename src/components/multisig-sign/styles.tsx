import styled from 'styled-components';

export const CopyIcon = styled.img`
    position: absolute;
    top: -12px;
    left: 0px;
    text-decoration: none !important;
`;

export const CopyToolTip = styled.span`
    visibility: hidden;

    width: 60px;
    background-color: rgba(20, 20, 20, 0.8);
    color: #f8f8f8;
    text-align: center;
    box-shadow: 0px 18.5334px 37.0668px rgba(0, 0, 0, 0.2) !important;
    border-radius: 9.71px !important;
    padding: 7px 0;

    /* Position the tooltip text - see examples below! */
    position: absolute;
    z-index: 1;
    left: -20px;
    top: -45px;

    &:after {
        content: ' ';
        position: absolute;
        top: 100%; /* At the bottom of the tooltip */
        left: 45%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: rgba(20, 20, 20, 0.8) transparent transparent transparent;
    }
`;

export const CopyText = styled.p`
    display: inline-block;
    position: relative;
    &:hover ${CopyToolTip} {
        visibility: visible;
    }
`;
