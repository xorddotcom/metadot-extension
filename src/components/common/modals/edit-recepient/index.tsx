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
    const {
        open,
        handleClose,
        addressChangeHandler,
        amountChangeHandler,
        activeRecepient,
    } = props;

    console.log(props, 'dikha do bhai');

    const [amount, setAmount] = React.useState('');
    const [address, setAddress] = React.useState('');

    React.useEffect(() => {
        if (activeRecepient.address && activeRecepient.amount) {
            setAmount(activeRecepient.amount);
            setAddress(activeRecepient.address);
        }
    }, [activeRecepient.address, activeRecepient.amount]);

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

    const styledToInput = {
        id: 'InputField',
        placeholder: address,
        type: 'String',
        value: address,
        className: subHeadingfontFamilyClass,
        onChange: (value: string) => setAddress(value),
        blockInvalidChar: true,
    };

    const styledAmountInput = {
        id: 'InputField',
        placeholder: 'Enter Amount',
        type: 'Number',
        value: amount,
        className: subHeadingfontFamilyClass,
        onChange: (value: string) => setAmount(value),
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

    const handleConfirm = (): void => {
        // validation lagani hai yahan
        addressChangeHandler(address, activeRecepient.index);
        amountChangeHandler(amount, activeRecepient.index);
        handleClose();
    };

    const btnConfirm = {
        text: 'Confirm',
        style: {
            width: '115px',
            height: '35px',
            borderRadius: 40,
            fontSize: '14px',
        },
        handleClick: handleConfirm,
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
