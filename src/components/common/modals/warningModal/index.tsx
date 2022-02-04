import React from 'react';
import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import { MainHeading, SubHeading } from '../../text';
import Button from '../../button';
import { fonts, colors } from '../../../../utils';
import { WarningModalProps } from './types';

const { warningText } = colors;
const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

const WarningModal: React.FunctionComponent<WarningModalProps> = ({
    open,
    handleClose,
    style,
    image,
    mainText,
    subText,
    onConfirm,
}) => {
    const mainHeading = {
        className: mainHeadingfontFamilyClass,
        color: warningText,
        fw: '600',
    };

    // console.log('warning modal ', location.state.seedToPass);

    const btnF = {
        text: 'Cancel',
        width: '115px',
        height: '35px',
        fontSize: '14px',
        handleClick: () => handleClose(),
    };
    const btnS = {
        text: 'Confirm',
        width: '115px',
        height: '35px',
        fontSize: '14px',
        handleClick: () => onConfirm(),
    };

    const flexCenter = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };
    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style} className="warning-modal-style">
                {image && (
                    <div style={flexCenter}>
                        <img src={image} alt="warning" />
                    </div>
                )}
                <MainHeading {...mainHeading}>{mainText}</MainHeading>
                <SubHeading
                    className={subHeadingfontFamilyClass}
                    textAlignLast="start"
                    lineHeight="20px"
                >
                    {subText}
                </SubHeading>
                <div style={{ marginTop: '1.5rem' }} className="btn-row">
                    <Button id="cancel" cancel {...btnF} />
                    <Button id="confirm" {...btnS} />
                </div>
            </Box>
        </Modal>
    );
};

export default WarningModal;
