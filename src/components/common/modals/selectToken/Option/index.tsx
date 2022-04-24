import React from 'react';

// Drop Down Icons
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import { fonts } from '../../../../../utils';

import {
    HorizontalContentDiv,
    OptionRow,
    OptionText,
} from '../styledComponents';

import { OptionProps } from '../types';

const { mainHeadingfontFamilyClass } = fonts;

const Option = ({ token, handleSelect }: OptionProps): JSX.Element => {
    const { name } = token;

    return (
        <OptionRow key={name} onClick={() => handleSelect(token)}>
            <HorizontalContentDiv>
                <OptionText className={mainHeadingfontFamilyClass}>
                    {name}
                </OptionText>
            </HorizontalContentDiv>
        </OptionRow>
    );
};

export default Option;
