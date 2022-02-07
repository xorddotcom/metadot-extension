import React from 'react';
import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import { useDispatch } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import Button from '../../button';
import {
    CloseIconDiv,
    HorizontalContentDiv,
    ModalText2,
    SubText2,
    VerticalContentDiv,
} from './styledComponents';
import { ModalText } from '../../text';
import { fonts } from '../../../../utils';
import {
    setAuthScreenModal,
    setConfirmSendModal,
} from '../../../../redux/slices/modalHandling';
import { ConfirmSendModalProps } from './types';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

const ConfirmSend: React.FunctionComponent<ConfirmSendModalProps> = ({
    open,
    handleClose,
    handleConfirm,
    style,
    accountTo,
    amount,
    accountFrom,
    transactionFee,
    tokenName,
    loading2,
}) => {
    const transactionAmount = (valueOne: string, valueTwo: string): string => {
        const value = parseFloat(valueOne) + parseFloat(valueTwo);
        const val = value.toString();
        const trimmedValue = val.slice(0, val.indexOf('.') + 6);
        return trimmedValue;
    };

    const dispatch = useDispatch();

    const btnS = {
        text: 'Confirm',
        width: '100%',
        handleClick: () => {
            console.log('in else');
            dispatch(setConfirmSendModal(false));
            dispatch(setAuthScreenModal(true));
        },
        isLoading: loading2,
        disabled: loading2,
    };

    return (
        <Modal
            open={open}
            onClose={
                loading2 ? () => console.log('tx is going on...') : handleClose
            }
            id="modal"
        >
            <Box id="box" sx={style} className="txDetails-modal-style">
                <CloseIconDiv
                    id="close-icon"
                    onClick={() => {
                        if (loading2) console.log('tx is going on...');
                        else {
                            handleClose();
                        }
                    }}
                >
                    <CloseIcon />
                </CloseIconDiv>
                <VerticalContentDiv>
                    <ModalText
                        textAlign="center"
                        className={mainHeadingfontFamilyClass}
                    >
                        Confirm
                    </ModalText>

                    <HorizontalContentDiv marginTop="10px">
                        <VerticalContentDiv>
                            <ModalText2
                                textAlign="start"
                                className={mainHeadingfontFamilyClass}
                            >
                                From
                            </ModalText2>
                            <SubText2
                                id="account-from"
                                textAlign="start"
                                className={subHeadingfontFamilyClass}
                            >{`${accountFrom.slice(
                                0,
                                5
                            )} ... ${accountFrom.slice(-5)}`}</SubText2>
                        </VerticalContentDiv>

                        <VerticalContentDiv>
                            <ModalText2
                                textAlign="end"
                                className={mainHeadingfontFamilyClass}
                            >
                                To
                            </ModalText2>
                            <SubText2
                                id="account-to"
                                textAlign="end"
                                className={subHeadingfontFamilyClass}
                            >{`${accountTo.slice(0, 5)} ... ${accountTo.slice(
                                -5
                            )}`}</SubText2>
                        </VerticalContentDiv>
                    </HorizontalContentDiv>

                    <ModalText
                        textAlign="start"
                        className={mainHeadingfontFamilyClass}
                        marginTop="20px"
                    >
                        Transaction
                    </ModalText>

                    <VerticalContentDiv
                        specialPadding
                        border
                        paddingBottom
                        marginTop="2px"
                    >
                        <HorizontalContentDiv paddingTop borderBottom>
                            <VerticalContentDiv marginTop="10px">
                                <ModalText2
                                    textAlign="start"
                                    className={subHeadingfontFamilyClass}
                                >
                                    Amount
                                </ModalText2>
                                <ModalText2
                                    marginTop="10px"
                                    marginBottom="10px"
                                    textAlign="start"
                                    className={subHeadingfontFamilyClass}
                                >
                                    Network Fee
                                </ModalText2>
                            </VerticalContentDiv>

                            <VerticalContentDiv marginTop="10px">
                                <ModalText2
                                    id="amount"
                                    textAlign="end"
                                    className={mainHeadingfontFamilyClass}
                                >{`${amount} ${tokenName}`}</ModalText2>
                                <ModalText2
                                    id="transaction-fee"
                                    marginTop="10px"
                                    marginBottom="10px"
                                    textAlign="end"
                                    className={mainHeadingfontFamilyClass}
                                >{`${transactionFee} ${tokenName}`}</ModalText2>
                            </VerticalContentDiv>
                        </HorizontalContentDiv>

                        <HorizontalContentDiv paddingTop marginBottom>
                            <VerticalContentDiv marginTop="10px">
                                <ModalText2
                                    textAlign="start"
                                    className={subHeadingfontFamilyClass}
                                >
                                    Total Amount
                                </ModalText2>
                                <ModalText2
                                    textAlign="start"
                                    hide
                                    className={subHeadingfontFamilyClass}
                                >
                                    .
                                </ModalText2>
                            </VerticalContentDiv>

                            <VerticalContentDiv marginTop="10px">
                                <ModalText2
                                    id="transaction-amount"
                                    textAlign="end"
                                    className={mainHeadingfontFamilyClass}
                                >{`${transactionAmount(
                                    amount,
                                    transactionFee
                                )} ${tokenName}`}</ModalText2>
                                <ModalText2
                                    textAlign="end"
                                    hide
                                    className={mainHeadingfontFamilyClass}
                                >
                                    {tokenName[0] === 'WND' ? '' : '$ 594.304'}
                                </ModalText2>
                            </VerticalContentDiv>
                        </HorizontalContentDiv>
                    </VerticalContentDiv>
                </VerticalContentDiv>

                <div className="btn-row" style={{ marginTop: '28px' }}>
                    <Button id="confirm" {...btnS} />
                </div>
            </Box>
        </Modal>
    );
};

export default ConfirmSend;
