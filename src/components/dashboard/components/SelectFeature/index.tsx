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
    SendFeatureIcon,
    SwapFeatureIcon,
    GovernanceFeatureIcon,
    StakeFeatureIcon,
} = images;

const SelectFeature: React.FunctionComponent = () => {
    const navigate = useNavigate();

    const featureClickHandler = (path: string): void => {
        navigate(path);
    };

    return (
        <HorizontalContentDiv justifyContent="space-around" marginTop="24px">
            <FeatureBox onClick={() => featureClickHandler(DASHBOARD)}>
                <FeatureImage src={SendFeatureIcon} alt="send" />
                <FeatureText>Send</FeatureText>
            </FeatureBox>
            <FeatureBox onClick={() => featureClickHandler(SWAP)}>
                <FeatureImage src={SwapFeatureIcon} alt="swap" />
                <FeatureText>Swap</FeatureText>
            </FeatureBox>
            <FeatureBox>
                <FeatureImage src={GovernanceFeatureIcon} alt="governance" />
                <FeatureText>Governance</FeatureText>
            </FeatureBox>
            <FeatureBox>
                <FeatureImage src={StakeFeatureIcon} alt="stake" />
                <FeatureText>Stake</FeatureText>
            </FeatureBox>
        </HorizontalContentDiv>
    );
};

export default SelectFeature;
