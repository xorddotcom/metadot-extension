import React from 'react';

import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';

import { AboutModalProps } from './types';

import {
    CloseIconDiv,
    MainText1,
    MainText2,
    SubText2,
    MainLinks,
} from './StyledComponent';
import { VerticalContentDiv } from '../../wrapper';

import { fonts, images } from '../../../../utils';

import './StyledComponent/style.css';
import {
    ABOUT_METADOT,
    ABOUT_METADOT_DESCRIPTION,
} from '../../../../utils/app-content';

const { logo, crossIcon } = images;
const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

const AboutView: React.FunctionComponent<AboutModalProps> = ({
    open,
    handleClose,
    style,
    jsonData,
}) => {
    return (
        <Modal open={open} onClose={handleClose} id="modal">
            <Box id="box" sx={style} className="txDetails-modal-style">
                <CloseIconDiv
                    id="close-icon"
                    onClick={() => {
                        handleClose();
                    }}
                >
                    <img src={crossIcon} alt="cros icon" />
                </CloseIconDiv>
                <VerticalContentDiv marginTop="30px">
                    <MainText1
                        textAlign="center"
                        className={mainHeadingfontFamilyClass}
                    >
                        {ABOUT_METADOT}
                    </MainText1>
                    <div>
                        <img src={logo} alt="logo" height="50" />
                    </div>
                    <MainText2
                        textAlign="start"
                        marginTop="25px"
                        className={mainHeadingfontFamilyClass}
                    >
                        Version: {`${jsonData}`}
                    </MainText2>
                    <SubText2
                        textAlign="start"
                        marginTop="15px"
                        className={subHeadingfontFamilyClass}
                        style={{ textAlign: 'justify' }}
                    >
                        {ABOUT_METADOT_DESCRIPTION}
                    </SubText2>
                    <MainLinks>
                        <div
                            className={subHeadingfontFamilyClass}
                            style={{
                                textDecoration: 'underline',
                                marginBottom: 5,
                                cursor: 'pointer',
                            }}
                            onClick={() => window.open('https://metadot.app/')}
                            role="link"
                            aria-hidden
                        >
                            Privacy Policy
                        </div>
                        <div
                            className={subHeadingfontFamilyClass}
                            style={{
                                textDecoration: 'underline',
                                marginBottom: 5,
                                cursor: 'pointer',
                            }}
                            onClick={() => window.open('https://metadot.app/')}
                            role="link"
                            aria-hidden
                        >
                            Terms of Use
                        </div>
                    </MainLinks>
                </VerticalContentDiv>
            </Box>
        </Modal>
    );
};

export default AboutView;
