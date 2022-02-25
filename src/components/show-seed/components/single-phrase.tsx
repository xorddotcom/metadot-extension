import React from 'react';
import { fonts } from '../../../utils';
import { IndexText, SeedText, SeedWrapper } from '../styles';

const { mainHeadingfontFamilyClass } = fonts;

const SinglePhrase: React.FunctionComponent<{
    index: number;
    phrase: string;
}> = ({ index, phrase }) => (
    <SeedWrapper>
        <IndexText className={mainHeadingfontFamilyClass}>
            {index + 1}
        </IndexText>
        <SeedText className={mainHeadingfontFamilyClass}>{phrase}</SeedText>
    </SeedWrapper>
);

export default SinglePhrase;
