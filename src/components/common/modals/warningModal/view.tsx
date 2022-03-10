import React from 'react';
import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import { MainHeading, SubHeading } from '../../text';
import Button from '../../button';
import { fonts, colors } from '../../../../utils';
import { WarningModalProps } from './types';
import { CANCEL_BUTTON, CONFIRM_BUTTON } from '../../../../utils/app-content';

const { warningText } = colors;
const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

const WarningModalView: React.FunctionComponent<WarningModalProps> = (
    props
) => {
    const {
        open,
        handleClose,
        style,
        image,
        mainText,
        subText,
        onConfirm,
        isLoading,
    } = props;
    const mainHeading = {
        className: mainHeadingfontFamilyClass,
        color: warningText,
        fw: '600',
    };

    const btnCancel = {
        text: CANCEL_BUTTON,
        style: {
            width: '115px',
            height: '35px',
            borderRadius: 40,
        },
        handleClick: () => handleClose(),
    };
    const btnConfirm = {
        text: CONFIRM_BUTTON,
        style: {
            width: '115px',
            height: '35px',
            borderRadius: 40,
        },
        handleClick: () => onConfirm(),
        isLoading,
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
                    <Button id="cancel" {...btnCancel} />
                    <Button id="confirm" {...btnConfirm} />
                </div>
            </Box>
        </Modal>
    );
};

export default WarningModalView;
