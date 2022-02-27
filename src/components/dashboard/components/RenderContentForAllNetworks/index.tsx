import React from 'react';

// Drop Down Icons
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import { fonts } from '../../../../utils';

import {
    HorizontalContentDiv,
    NextIcon,
    OptionRow,
    OptionText,
} from '../../../common/modals/selectNetwork/styledComponents';

import { RenderMethodProps } from '../../types';

const { mainHeadingfontFamilyClass } = fonts;

const RenderContentForAvailableNetwroks = ({
    data,
    handleClick,
}: RenderMethodProps): JSX.Element => {
    const { name, logo, relayChain, disabled } = data;
    return (
        <OptionRow
            className={disabled ? 'tooltip' : 'abc'}
            key={name}
            onClick={() => handleClick(data)}
            disabled={disabled}
        >
            <HorizontalContentDiv>
                <img src={logo} alt="token" />
                <OptionText
                    className={mainHeadingfontFamilyClass}
                >{`${name}`}</OptionText>
            </HorizontalContentDiv>
            {relayChain && (name === 'Kusama' || name === 'Test Networks') && (
                <NextIcon>
                    <ArrowRightIcon />
                </NextIcon>
            )}
        </OptionRow>
    );
};

export default RenderContentForAvailableNetwroks;
