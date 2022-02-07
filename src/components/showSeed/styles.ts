/* eslint-disable no-unused-vars */
import styled from 'styled-components';
import { colors } from '../../utils';

const { primaryText } = colors;

export const SeedWrapper = styled.div`
    background-color: #212121;
    width: 33%;
    height: 15px;
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding-left: 25px;
    padding-right: 20px;
    padding-top: 14px;
    padding-bottom: 13px;
    margin-top: 18px;

    &:first-child {
        margin-top: 0;
    }

    &:nth-child(2) {
        margin-top: 0;
    }
`;

export const IndexText = styled.span`
    font-size: 14px;
    opacity: 0.6;
    color: ${primaryText};
    position: absolute;
`;

export const SeedText = styled.p`
    font-size: 14px;
    color: ${primaryText};
    opacity: 0.7;
    width: 100%;
`;

export const CopyText = styled.p`
    font-size: 14px;
    line-height: 18.75px;
    height: 25px;
    text-align: start;
    color: rgba(250, 250, 250, 0.8);
    font-weight: 400;
    margin-top: 22px;
    /* position: relative; */
`;

export const CopyIcon = styled.img`
    /* position: absolute; */
    /* top: 1px; */
    /* left: 123px; */
    text-decoration: none !important;
`;

export const HorizontalContentDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;
