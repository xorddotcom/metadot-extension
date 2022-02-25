import React from 'react';
import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import { fonts } from '../../../../utils';
import { MainHeading, SubHeading } from '../../text';
import { ResponseModalProps } from './types';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

const ResponseModal: React.FunctionComponent<ResponseModalProps> = (props) => {
    const { open, handleClose, style, mainText, subText, responseImage } =
        props;
    return (
        <div>
            <Modal
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
                open={open}
                onClose={handleClose}
            >
                <Box sx={style} className="warning-modal-style">
                    <img
                        src={responseImage}
                        alt="success check"
                        style={{
                            paddingLeft:
                                mainText === 'Internet is down!' ? 20 : 0,
                        }}
                    />
                    <MainHeading
                        className={mainHeadingfontFamilyClass}
                        marginBottom="8px"
                    >
                        {mainText}
                    </MainHeading>
                    {subText && (
                        <SubHeading
                            className={subHeadingfontFamilyClass}
                            textAlignLast="center"
                            textAlign="center"
                            marginTop="0px"
                        >
                            {subText}
                        </SubHeading>
                    )}
                </Box>
            </Modal>
        </div>
    );
};

export default ResponseModal;
