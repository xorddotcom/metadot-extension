import React from 'react';
import { IconButton } from '@mui/material';
import { HeaderWrapper, HeaderHeading } from './style';
import { fonts, images } from '../../../utils';
import { HeadieViewProps } from './type';

const { ArrowBackIcon } = images;

const HeaderView: React.FunctionComponent<HeadieViewProps> = (props) => {
    const { centerText, onBackClick } = props;
    const { mainHeadingfontFamilyClass } = fonts;
    return (
        <HeaderWrapper>
            <IconButton
                id="back-btn"
                className="primary-bg-color"
                onClick={() => onBackClick()}
                style={{ padding: '8px', position: 'absolute' }}
            >
                <img src={ArrowBackIcon} alt="icon" />
            </IconButton>
            <HeaderHeading className={mainHeadingfontFamilyClass}>
                {centerText}
            </HeaderHeading>
        </HeaderWrapper>
    );
};

export default HeaderView;
