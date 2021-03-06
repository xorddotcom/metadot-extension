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
    const allMainnetsName = ['Polkadot', 'Kusama'];

    const ifTestNetworks =
        name === 'Test Networks' ? 'Test Networks' : `${name} Test Network`;

    const chainNameAltered = allMainnetsName.includes(name)
        ? `${name} Main Network`
        : ifTestNetworks;
    return (
        <OptionRow
            className={disabled ? 'tooltip' : 'abc'}
            key={name}
            onClick={() => handleClick(data)}
            disabled={disabled}
        >
            <HorizontalContentDiv>
                <img src={logo} alt="token" />
                <OptionText className={mainHeadingfontFamilyClass}>
                    {chainNameAltered}
                </OptionText>
            </HorizontalContentDiv>
            {relayChain &&
                (name === 'Kusama' ||
                    name === 'Test Networks' ||
                    name === 'Polkadot') && (
                    <NextIcon>
                        <ArrowRightIcon />
                    </NextIcon>
                )}
        </OptionRow>
    );
};

export default RenderContentForAvailableNetwroks;
