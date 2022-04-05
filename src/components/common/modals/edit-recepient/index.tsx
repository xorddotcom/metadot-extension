import React from 'react';
import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import { fonts, images } from '../../../../utils';
import { MainText, SubHeading } from '../../text';
import { ResponseModalProps } from './types';
import { HorizontalContentDiv } from '../../wrapper';
import ToInput from '../../to-input';
import Input from '../../input';
import Button from '../../button';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;
const { crossIcon } = images;

const EditRecepientModal: React.FunctionComponent<ResponseModalProps> = (
    props
) => {
    const { open, handleClose } = props;

    const style = {
        background: '#141414',
        border: '0.8px solid #2E9B9B',
        padding: '22px 15px 22px 15px',
    };
    const errorMessages = {
        invalidAddress: 'Invalid address',
        enterAddress: 'Enter address',
        enterAmount: 'Enter amount',
    };
    const onChange = (value: string): void => {
        console.log(value);
    };

    const styledToInput = {
        id: 'InputField',
        placeholder: 'Enter Wallet Address',
        type: 'Number',
        value: '0xc',
        className: subHeadingfontFamilyClass,
        onChange: (value: string) => console.log('abc'),
        blockInvalidChar: true,
    };

    const styledAmountInput = {
        id: 'InputField',
        placeholder: 'Enter Amount',
        type: 'Number',
        value: '0.00',
        className: subHeadingfontFamilyClass,
        onChange: (value: string) => console.log('abc'),
        blockInvalidChar: true,
    };

    const btnCancel = {
        text: 'Cancel',
        style: {
            width: '115px',
            height: '35px',
            borderRadius: 40,
            fontSize: '14px',
        },
        handleClick: () => handleClose(),
        lightBtn: true,
    };
    const btnConfirm = {
        text: 'Confirm',
        style: {
            width: '115px',
            height: '35px',
            borderRadius: 40,
            fontSize: '14px',
        },
        handleClick: () => console.log('confirm'),
        isLoading: false,
    };

    return (
        <div>
            <Modal
                style={{ backgroundColor: 'rgba(33, 33, 33, 0.2)' }}
                open={open}
                onClose={handleClose}
            >
                <Box sx={style} className="warning-modal-style">
                    <HorizontalContentDiv justifyContent="flex-end">
                        {' '}
                        <img
                            src={crossIcon}
                            alt="cross"
                            aria-hidden
                            onClick={handleClose}
                        />
                    </HorizontalContentDiv>
                    <SubHeading
                        className={mainHeadingfontFamilyClass}
                        textAlignLast="center"
                        textAlign="center"
                        marginTop="0px"
                    >
                        Edit
                    </SubHeading>

                    <SubHeading
                        className={mainHeadingfontFamilyClass}
                        marginTop="25px"
                        lineHeight="0px"
                    >
                        To
                    </SubHeading>
                    <Input {...styledToInput} />

                    <SubHeading
                        className={mainHeadingfontFamilyClass}
                        marginTop="25px"
                        lineHeight="0px"
                    >
                        Amount
                    </SubHeading>
                    <Input {...styledAmountInput} />

                    <HorizontalContentDiv justifyContent="space-between">
                        <SubHeading
                            className={mainHeadingfontFamilyClass}
                            lineHeight="0px"
                            color="#FAFAFA"
                            opacity="0.6"
                            fontSize="12px"
                        >
                            $0.00
                        </SubHeading>

                        <SubHeading
                            className={mainHeadingfontFamilyClass}
                            lineHeight="0px"
                            color="#FAFAFA"
                            opacity="0.7"
                            fontSize="12px"
                        >
                            Balance 712.983 DOT
                        </SubHeading>
                    </HorizontalContentDiv>

                    <HorizontalContentDiv
                        justifyContent="space-between"
                        marginTop="35px"
                    >
                        <Button id="cancel" {...btnCancel} />
                        <Button id="confirm" {...btnConfirm} />
                    </HorizontalContentDiv>
                </Box>
            </Modal>
        </div>
    );
};

export default EditRecepientModal;
