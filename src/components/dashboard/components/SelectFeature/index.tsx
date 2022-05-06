import React from 'react';
import { useNavigate } from 'react-router';
import { HorizontalContentDiv } from '../../../common/wrapper';
import {
    FeatureBox,
    FeatureImage,
    FeatureText,
} from '../../styledComponents/index';
import { DASHBOARD, SWAP } from '../../../../constants';

import { images } from '../../../../utils';

const {
    GovernanceDashboardIcon,
    SendDashboardIcon,
    StakeDashboardIcon,
    SwapDashboardIcon,
} = images;

const SelectFeature: React.FunctionComponent = () => {
    const navigate = useNavigate();

    const featureClickHandler = (path: string): void => {
        navigate(path);
    };

    return (
        <HorizontalContentDiv justifyContent="space-around" marginTop="24px">
            <FeatureBox onClick={() => featureClickHandler(DASHBOARD)}>
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
