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

const { DeleteIcon } = images;

const SelectFeature: React.FunctionComponent = () => {
    const navigate = useNavigate();

    const featureClickHandler = (path: string): void => {
        navigate(path);
    };

    return (
        <HorizontalContentDiv justifyContent="space-around" marginTop="24px">
            <FeatureBox onClick={() => featureClickHandler(DASHBOARD)}>
                <FeatureImage src={DeleteIcon} alt="send" />
                <FeatureText>Send</FeatureText>
            </FeatureBox>
            <FeatureBox onClick={() => featureClickHandler(SWAP)}>
                <FeatureImage src={DeleteIcon} alt="swap" />
                <FeatureText>Swap</FeatureText>
            </FeatureBox>
            <FeatureBox>
                <FeatureImage src={DeleteIcon} alt="governance" />
                <FeatureText>Governance</FeatureText>
            </FeatureBox>
            <FeatureBox>
                <FeatureImage src={DeleteIcon} alt="stake" />
                <FeatureText>Stake</FeatureText>
            </FeatureBox>
        </HorizontalContentDiv>
    );
};

export default SelectFeature;
