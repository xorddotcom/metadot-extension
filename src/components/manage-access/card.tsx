import React, { ChangeEventHandler, useEffect, useState } from 'react';
import { MainHeading, SubHeading } from '../common/text';

import ToggleOn from '../../assets/images/icons/toggle_on.svg';
import ToggleOff from '../../assets/images/icons/toggle_off.svg';

import { fonts } from '../../utils';

import {
    Wrapper,
    HorizontalContentDiv,
    VerticalContentDiv,
} from '../common/wrapper';
import { CardProps } from './type';

const { mainHeadingfontFamilyClass } = fonts;

function ManageAccessCard({ title, access, onClick }: CardProps): JSX.Element {
    const divStyle = {
        background:
            'linear-gradient(99.81deg, #1E1E1E -3.09%, rgba(67, 67, 67, 0.72) 108.08%)',
        boxShadow: '0px 0px 40px rgba(13, 13, 13, 0.2)',
        borderRadius: '8px',
        marginBottom: '18px',
    };

    return (
        <HorizontalContentDiv
            style={{
                background:
                    'linear-gradient(99.81deg, #1E1E1E -3.09%, rgba(67, 67, 67, 0.72) 108.08%)',
                boxShadow: '0px 0px 40px rgba(13, 13, 13, 0.2)',
                borderRadius: '8px',
                marginBottom: '18px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingLeft: '18px',
                paddingRight: '18px',
            }}
        >
            <div>
                <MainHeading className={mainHeadingfontFamilyClass}>
                    {title}
                </MainHeading>
            </div>

            <div onClick={onClick} role="link" aria-hidden>
                <img
                    src={access ? ToggleOn : ToggleOff}
                    style={{ height: '25px', width: '40px' }}
                    alt="img"
                />
            </div>
        </HorizontalContentDiv>
    );
}

export default ManageAccessCard;
