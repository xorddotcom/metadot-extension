import React from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

import { HorizontalContentDiv } from '../../../common/wrapper';
import {
    FeatureBox,
    FeatureImage,
    FeatureText,
} from '../../styledComponents/index';
import { DASHBOARD, SWAP, SEND } from '../../../../constants';

import { images } from '../../../../utils';

import { RootState } from '../../../../redux/store';

const {
    GovernanceDashboardIcon,
    SendDashboardIcon,
    StakeDashboardIcon,
    SwapDashboardIcon,
} = images;

const SelectFeature: React.FunctionComponent = () => {
    const navigate = useNavigate();

    const { balances } = useSelector((state: RootState) => state.activeAccount);

    const { name, decimal, isNative, balance } = balances[0];

    const featureClickHandler = (path: string): void => {
        if (
            path === SWAP &&
            !(balances[0].name === 'ACA' || balances[0].name === 'KAR')
        ) {
            return;
        }
        navigate(path, {
            state: {
                tokenName: name,
                balance,
                isNative,
                decimal,
                dollarAmount: '10',
            },
        });
    };

    return (
        <HorizontalContentDiv justifyContent="space-around" marginTop="24px">
            <FeatureBox onClick={() => featureClickHandler(SEND)}>
                <FeatureImage src={SendDashboardIcon} alt="send" />
                <FeatureText>Send</FeatureText>
            </FeatureBox>
            <FeatureBox onClick={() => featureClickHandler(SWAP)}>
                <FeatureImage src={SwapDashboardIcon} alt="swap" />
                <FeatureText>Swap</FeatureText>
            </FeatureBox>
            <FeatureBox>
                <FeatureImage src={GovernanceDashboardIcon} alt="governance" />
                <FeatureText>Governance</FeatureText>
            </FeatureBox>
            <FeatureBox>
                <FeatureImage src={StakeDashboardIcon} alt="stake" />
                <FeatureText>Stake</FeatureText>
            </FeatureBox>
        </HorizontalContentDiv>
    );
};

export default SelectFeature;
