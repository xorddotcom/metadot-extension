import React from 'react';
import styled from 'styled-components';
import { colors } from '../../../../utils';
import { OptionRowPropsInterface, PlainIconPropsInterface } from './types';

const { primaryText, primaryBackground } = colors;

export const TitleDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-top: 10px;
    margin-bottom: 10px;
    color: ${primaryText};
    position: relative;
`;

export const Title = styled.p`
    height: 21px;
    font-size: 16px;
    line-height: 21px;
    color: ${primaryText};
    text-align: center;
`;

export const BackButton = styled.div`
    position: absolute;
    left: 34px;
    top: 12px;
    cursor: pointer;
`;

export const CloseIconDiv = styled.div`
    position: absolute;
    width: 25px;
    height: 25px;
    right: 3%;
    top: 5px;
    float: right;
    color: ${primaryText};
    cursor: pointer;
`;

export const NetworkModalContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const OptionRow = styled.div<OptionRowPropsInterface>`
    width: 95%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-right: -5px;
    opacity: ${(props) => (props.disabled ? 0.4 : 1)};
    cursor: pointer;
    border-radius: 8px;

    &:hover {
        background: rgba(46, 155, 155, 0.26);
        /* width: 110%; */
    }
`;

export const HorizontalContentDiv = styled.div`
    display: flex;
    align-items: center;
    padding-left: 20px;

    img {
        width: 28px;
        height: 28px;
        border-radius: 50%;
    }
`;

export const PlainIcon = styled.div<PlainIconPropsInterface>`
    width: 25px;
    height: 25px;
    border-radius: 25px;

    background: ${(props) =>
        props.bgColor ? props.bgColor : primaryBackground};
`;

export const OptionText = styled.div`
    margin-left: 20px;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.32px;
    color: ${primaryText};
    opacity: 0.8;
`;

export const NextIcon = styled.div`
    color: ${primaryText};
    padding-right: 10px;
    display: flex;
    align-items: center;
`;
