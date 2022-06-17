import React from 'react';

import { fonts } from '../../../../utils';

import {
    HorizontalContentDiv,
    OptionRow,
    OptionText,
} from '../../../common/modals/selectNetwork/styledComponents';

import { RenderMethodProps } from '../../types';

const { mainHeadingfontFamilyClass } = fonts;

const RenderContentForKusamaMainNetwork = ({
    data,
    handleClick,
}: RenderMethodProps): JSX.Element => {
    const { name, logo, disabled } = data;
    const allMainnetsName = [
        'Polkadot',
        'Kusama',
        'Karura',
        'Shiden',
        'Acala',
        'Astar',
        'Bifrost',
    ];
    const chainNameAltered = allMainnetsName.includes(name)
        ? `${name} Main Network`
        : `${name} Test Network`;
    const optionRow = {
        className: disabled ? 'tooltip' : 'abc',
        key: name,
        onClick: () => {
            handleClick(data);
        },
        disabled,
    };
    return (
        <OptionRow {...optionRow}>
            {disabled && <span className="tooltiptext">Coming Soon!</span>}
            <HorizontalContentDiv>
                <img src={logo} alt="icon" />
                <OptionText className={mainHeadingfontFamilyClass}>
                    {chainNameAltered}
                </OptionText>
            </HorizontalContentDiv>
        </OptionRow>
    );
};

export default RenderContentForKusamaMainNetwork;
