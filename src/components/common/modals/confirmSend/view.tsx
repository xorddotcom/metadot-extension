import React from 'react';
import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import { useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import Button from '../../button';
import {
    CloseIconDiv,
    HorizontalContentDiv,
    ModalText2,
    SubText2,
    VerticalContentDiv,
    MainText1,
} from './styledComponents';
import { ModalText } from '../../text';
import { fonts, images, helpers } from '../../../../utils';
import services from '../../../../utils/services';
import { RootState } from '../../../../redux/store';
import {
    AMOUNT,
    CONFIRM_BUTTON,
    FROM,
    NETWORK_FEE,
    TO,
    TOTAL_AMOUNT,
    TRANSACTIONS,
} from '../../../../utils/app-content';
import { ConfirmSendModalViewProps } from './types';

const { addressMapper } = services;
const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;
const { arrowRight } = images;
const { trimBalance } = helpers;

const ConfirmSendView: React.FunctionComponent<ConfirmSendModalViewProps> = ({
    handleClose,
    accountTo,
    amount,
    transactionFee,
    loading2,
    transactionAmount,
    btnConfirm,
    locationTokenName,
    isNative,
}) => {
    const { publicKey, tokenName, prefix } = useSelector(
        (state: RootState) => state.activeAccount
    );
    const { confirmSendModal } = useSelector(
        (state: RootState) => state.modalHandling
    );

    const fromAddressMapper = (): string => {
        const res = addressMapper(publicKey, prefix);
        return `${res.slice(0, 5)} ... ${res.slice(-5)}`;
    };
    const totalAmount = (valueOne: number, valueTwo: number): string => {
        if (isNative) {
            const value = valueOne + valueTwo;
            const val = value.toString();
            const trimmedValue = val.slice(0, val.indexOf('.') + 6);
            return `${trimmedValue} ${locationTokenName}`;
        }
        return `${trimBalance(amount)} ${locationTokenName} + ${trimBalance(
            transactionFee
        )} ${tokenName}`;
    };

    return (
        <Modal
            open={confirmSendModal}
            onClose={
                loading2 ? () => console.log('tx is going on...') : handleClose
            }
            id="modal"
        >
            <Box
                id="box"
                sx={{
                    width: '300px',
                    background: '#141414',
                    position: 'relative',
                    p: 2,
                    px: 2,
                    pb: 3,
                    mt: 10,
                }}
                className="txDetails-modal-style"
            >
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
                        {CONFIRM_BUTTON}
                    </ModalText>

                    <HorizontalContentDiv marginTop="10px">
                        <VerticalContentDiv>
                            <ModalText2
                                textAlign="start"
                                className={mainHeadingfontFamilyClass}
                            >
                                {FROM}
                            </ModalText2>
                            <SubText2
                                id="account-from"
                                textAlign="start"
                                className={subHeadingfontFamilyClass}
                            >
                                {fromAddressMapper()}
                            </SubText2>
                        </VerticalContentDiv>

                        <img
                            style={{ marginTop: '-6%' }}
                            src={arrowRight}
                            alt="arrow right"
                        />

                        <VerticalContentDiv>
                            <ModalText2
                                textAlign="end"
                                className={mainHeadingfontFamilyClass}
                            >
                                {TO}
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
                        {TRANSACTIONS}
                    </ModalText>

                    {/* <VerticalContentDiv
                        specialPadding
                        border
                        paddingBottom
                        marginTop="2px"
                        style={{ border: '1px solid red' }}
                    >
                        <HorizontalContentDiv paddingTop borderBottom>
                            <VerticalContentDiv marginTop="10px">
                                <ModalText2
                                    textAlign="start"
                                    className={subHeadingfontFamilyClass}
                                >
                                    {AMOUNT}
                                </ModalText2>
                                <ModalText2
                                    marginTop="10px"
                                    marginBottom="10px"
                                    textAlign="start"
                                    className={subHeadingfontFamilyClass}
                                >
                                    {NETWORK_FEE}
                                </ModalText2>
                            </VerticalContentDiv>

                            <VerticalContentDiv marginTop="10px">
                                <ModalText2
                                    id="amount"
                                    textAlign="end"
                                    className={mainHeadingfontFamilyClass}
                                >{`${amount} ${locationTokenName}`}</ModalText2>
                                <ModalText2
                                    id="transaction-fee"
                                    marginTop="10px"
                                    marginBottom="10px"
                                    textAlign="end"
                                    className={mainHeadingfontFamilyClass}
                                >{`${transactionFee.toFixed(
                                    4
                                )} ${tokenName}`}</ModalText2>
                            </VerticalContentDiv>
                        </HorizontalContentDiv>

                        <HorizontalContentDiv paddingTop marginBottom>
                            <VerticalContentDiv marginTop="10px">
                                <ModalText2
                                    textAlign="start"
                                    className={subHeadingfontFamilyClass}
                                >
                                    {TOTAL_AMOUNT}
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
                                >
                                    {/* {`${transactionAmount(
                                    amount,
                                    transactionFee
                                )} ${tokenName}`} */}
                    {/* {totalAmount(
                                        Number(amount),
                                        Number(transactionFee)
                                    )}
                                </ModalText2>
                                <ModalText2
                                    textAlign="end"
                                    hide
                                    className={mainHeadingfontFamilyClass}
                                >
                                    {tokenName[0] === 'WND' ? '' : '$ 594.304'}
                                </ModalText2>
                            </VerticalContentDiv>
                        </HorizontalContentDiv>
                    </VerticalContentDiv>  */}

                    <VerticalContentDiv specialPadding border paddingBottom>
                        <MainText1
                            textAlign="start"
                            className={mainHeadingfontFamilyClass}
                            margin="13px 0px 0px 0px"
                            fontSize="14px"
                            color="rgba(255, 255, 255, 0.84)"
                            fontWeight="500"
                        >
                            Details
                        </MainText1>

                        <HorizontalContentDiv marginTop="10px">
                            <VerticalContentDiv>
                                <MainText1
                                    textAlign="start"
                                    className={subHeadingfontFamilyClass}
                                    fontSize="12px"
                                    color="#FFFFFF"
                                    fontWeight="400"
                                    opacity="0.8"
                                >
                                    Amount
                                </MainText1>
                            </VerticalContentDiv>

                            <VerticalContentDiv>
                                <MainText1
                                    textAlign="end"
                                    className={mainHeadingfontFamilyClass}
                                    fontSize="12px"
                                    color="#FFFFFF"
                                >{`${amount
                                    .toString()
                                    .slice(
                                        0,
                                        6
                                    )} ${locationTokenName}`}</MainText1>
                            </VerticalContentDiv>
                        </HorizontalContentDiv>

                        <HorizontalContentDiv borderBottom>
                            <VerticalContentDiv>
                                <MainText1
                                    textAlign="start"
                                    className={subHeadingfontFamilyClass}
                                    fontSize="12px"
                                    color="#FFFFFF"
                                    fontWeight="400"
                                    opacity="0.8"
                                >
                                    {NETWORK_FEE}
                                </MainText1>
                            </VerticalContentDiv>

                            <VerticalContentDiv>
                                <MainText1
                                    textAlign="end"
                                    className={mainHeadingfontFamilyClass}
                                    fontSize="12px"
                                    color="#FFFFFF"
                                >
                                    {`${transactionFee.toFixed(
                                        4
                                    )} ${tokenName}`}
                                </MainText1>
                            </VerticalContentDiv>
                        </HorizontalContentDiv>

                        <HorizontalContentDiv paddingTop marginBottom>
                            <VerticalContentDiv
                                marginTop="10px"
                                marginBottom="10px"
                            >
                                <MainText1
                                    textAlign="start"
                                    className={subHeadingfontFamilyClass}
                                    margin="0px"
                                    fontSize="12px"
                                    color="#FFFFFF"
                                    fontWeight="400"
                                    opacity="0.8"
                                >
                                    {TOTAL_AMOUNT}
                                </MainText1>
                                {/* <SubText1
                                    textAlign="start"
                                    hide
                                    className={subHeadingfontFamilyClass}
                                >
                                    .
                                </SubText1> */}
                            </VerticalContentDiv>

                            <VerticalContentDiv
                                marginTop="10px"
                                marginBottom="10px"
                            >
                                <MainText1
                                    textAlign="end"
                                    className={mainHeadingfontFamilyClass}
                                    margin="0px"
                                    fontSize="19px"
                                    fontWeight="600"
                                    color="#2E9B9B"
                                >
                                    {/* {`${transactionAmount(
                                        amount,
                                        transactionFee
                                    )} ${tokenName}`} */}
                                    {totalAmount(
                                        Number(amount),
                                        Number(transactionFee)
                                    )}
                                </MainText1>
                            </VerticalContentDiv>
                        </HorizontalContentDiv>
                    </VerticalContentDiv>
                </VerticalContentDiv>

                <div className="btn-row" style={{ marginTop: '28px' }}>
                    <Button id="confirm" {...btnConfirm} />
                </div>
            </Box>
        </Modal>
    );
};

export default ConfirmSendView;
