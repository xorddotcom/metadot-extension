import React from 'react';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '../../../assets/images/icons/backArrow.svg';
import { HeaderWrapper, HeaderHeading } from './style';
import { fonts } from '../../../utils';
import { Props } from './type';

const Header: React.FunctionComponent<Props> = ({
    centerText,
    backHandler,
}) => {
    const navigate = useNavigate();
    const { mainHeadingfontFamilyClass } = fonts;

    const onBackClick = async (): Promise<void> => {
        if (backHandler) {
            backHandler();
            navigate(-1);
        } else {
            navigate(-1);
        }
    };

    return (
        <HeaderWrapper>
            {backHandler && (
                <IconButton
                    id="back-btn"
                    className="primary-bg-color"
                    onClick={() => onBackClick()}
                    style={{ padding: '0.5rem' }}
                >
                    <img src={ArrowBackIcon} alt="icon" />
                </IconButton>
            )}
            <HeaderHeading className={mainHeadingfontFamilyClass}>
                {centerText}
            </HeaderHeading>
        </HeaderWrapper>
    );
};

export default Header;
