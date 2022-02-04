import React, { useEffect } from 'react';

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

import { fonts } from '../../../../utils';
import logo from '../../../../assets/images/logo.svg';

import './StyledComponent/style.css';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

const About: React.FunctionComponent<AboutModalProps> = ({
    open,
    handleClose,
    style,
}) => {
    const [jsonData, setJsonData] = React.useState({});
    useEffect(() => {
        const fetchJSON = async (): Promise<void> => {
            const response = await fetch('mainfest.json', {
                headers: { 'Content-Type': 'application/json' },
            });
            const json = await response.json();
            setJsonData(json.version);
        };

        fetchJSON();
    }, []);

    return (
        <Modal open={open} onClose={handleClose} id="modal">
            <Box id="box" sx={style} className="txDetails-modal-style">
                <CloseIconDiv
                    id="close-icon"
                    onClick={() => {
                        handleClose();
                    }}
                >
                    <CloseIcon />
                </CloseIconDiv>
                <VerticalContentDiv marginTop="30px">
                    <MainText1
                        textAlign="center"
                        className={mainHeadingfontFamilyClass}
                    >
                        About Metadot Wallet
                    </MainText1>
                    <div>
                        <img src={logo} alt="logo" height="50" />
                    </div>
                    <MainText2
                        textAlign="start"
                        marginTop="25px"
                        className={mainHeadingfontFamilyClass}
                    >
                        Version: {jsonData}
                    </MainText2>
                    <SubText2
                        textAlign="start"
                        marginTop="15px"
                        className={subHeadingfontFamilyClass}
                        style={{ textAlign: 'justify' }}
                    >
                        Metadot wallet is your one-stop easy-to-use gateway to
                        Polkadot and its parachains.
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

export default About;
