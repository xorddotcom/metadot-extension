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
                    {`${name}`}
                </OptionText>
            </HorizontalContentDiv>
        </OptionRow>
    );
};

export default RenderContentForKusamaMainNetwork;
