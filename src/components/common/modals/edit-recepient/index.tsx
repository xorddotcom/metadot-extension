import React from 'react';
import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import { useSelector } from 'react-redux';
import { fonts, images, helpers } from '../../../../utils';
import { MainText, SubHeading } from '../../text';
import { ResponseModalProps } from './types';
import { HorizontalContentDiv } from '../../wrapper';
import ToInput from '../../to-input';
import Input from '../../input';
import Button from '../../button';
import { RootState } from '../../../../redux/store';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;
const { crossIcon } = images;
const { isValidAddressPolkadotAddress, trimContent } = helpers;

const EditRecepientModal: React.FunctionComponent<ResponseModalProps> = (
    props
) => {
    const {
        open,
        handleClose,
        addressChangeHandler,
        amountChangeHandler,
        activeRecepient,
        getTotalAmount,
        getTransactionFees,
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

    const [addressError, setAddressError] = React.useState(false);
    const [amountError, setAmountError] = React.useState(false);
    const { activeAccount } = useSelector((state: RootState) => state);
    const { balance, tokenName } = activeAccount;

    console.log('🚀 85 ~ amountError', amountError);
    console.log('🚀 84 ~ addressError', addressError);
    const validateAddress = (): boolean => {
        if (isValidAddressPolkadotAddress(address)) {
            setAddressError(false);
            return true;
        }

        setAddressError(true);
        return false;
    };
    const validateTotalAmount = async (): Promise<boolean> => {
        const totalAmount = getTotalAmount(amount, activeRecepient.index);

        const transactionFee = await getTransactionFees();
        console.log(totalAmount, transactionFee, '---> amount and fee');
        if (Number(balance) < Number(totalAmount) + Number(transactionFee)) {
            setAmountError(true);
            return false;
        }
        setAmountError(false);
        return true;
    };

    const handleConfirm = async (): Promise<void> => {
        // validation lagani hai yahan
        const addressValidated = validateAddress();
        const amountValidated = await validateTotalAmount();
        if (addressValidated && amountValidated) {
            addressChangeHandler(address, activeRecepient.index);
            amountChangeHandler(amount, activeRecepient.index);
            handleClose();
        }
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
                style={{
                    backgroundColor: 'rgba(33, 33, 33, 0.2)',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                open={open}
                onClose={handleClose}
            >
                <Box sx={style} className="edit-recepient-modal-style">
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
                        color="#F63A3A"
                        fontSize="12px"
                        opacity={addressError ? '0.7' : '0'}
                        lineHeight="0px"
                        marginTop="8px"
                        mb="25px"
                    >
                        Account cannot be validated
                    </SubHeading>

                    <SubHeading
                        className={mainHeadingfontFamilyClass}
                        marginTop="25px"
                        lineHeight="0px"
                    >
                        Amount
                    </SubHeading>
                    <Input {...styledAmountInput} />

                    <SubHeading
                        color="#F63A3A"
                        fontSize="12px"
                        opacity={amountError ? '0.7' : '0'}
                        lineHeight="0px"
                        marginTop="8px"
                        mb="25px"
                    >
                        Insufficient Funds
                    </SubHeading>

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
                            Balance: {`${trimContent(balance, 6)} ${tokenName}`}
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
