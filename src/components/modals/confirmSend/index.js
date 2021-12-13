/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import Button from '../../button';
import {
  CloseIconDiv,
  HorizontalContentDiv,
  MainText1,
  MainText2,
  SubText2,
  VerticalContentDiv,
} from './styledComponents';
import { fonts } from '../../../utils';
import { setAuthScreenModal, setConfirmSendModal } from '../../../redux/slices/modalHandling';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

function ConfirmSend({
  open, handleClose, handleConfirm, style, accountTo, amount, accountFrom,
  transactionFee, tokenName, loading2,
}) {
  const transactionAmount = (valueOne, valueTwo) => {
    const value = parseFloat(valueOne) + parseFloat(valueTwo);
    const val = value.toString();
    const trimmedValue = val.slice(0, (val.indexOf('.')) + 6);
    return trimmedValue;
  };

  const dispatch = useDispatch();
  const { isAuthorizedForSigning } = useSelector((state) => state.modalHandling);

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
      onClose={loading2 ? () => console.log('tx is going on...') : handleClose}
      id="modal"
      // onClose={handleClose}
    >
      <Box id="box" sx={style} className="txDetails-modal-style">
        <CloseIconDiv
          id="close-icon"
          onClick={() => {
            // eslint-disable-next-line no-unused-expressions
            loading2 ? console.log('tx is going on...')
              : handleClose();
          }}
        >
          <CloseIcon />
        </CloseIconDiv>
        <VerticalContentDiv>
          <MainText1 textAlign="center" className={mainHeadingfontFamilyClass}>Confirm</MainText1>

          <HorizontalContentDiv marginTop="10px">

            <VerticalContentDiv>
              <MainText2 textAlign="start" className={mainHeadingfontFamilyClass}>From</MainText2>
              <SubText2 id="account-from" textAlign="start" className={subHeadingfontFamilyClass}>{`${accountFrom.slice(0, 5)} ... ${accountFrom.slice(-5)}`}</SubText2>
            </VerticalContentDiv>

            <VerticalContentDiv>
              <MainText2 textAlign="end" className={mainHeadingfontFamilyClass}>To</MainText2>
              <SubText2 id="account-to" textAlign="end" className={subHeadingfontFamilyClass}>{`${accountTo.slice(0, 5)} ... ${accountTo.slice(-5)}`}</SubText2>
            </VerticalContentDiv>

          </HorizontalContentDiv>

          <MainText1 textAlign="start" className={mainHeadingfontFamilyClass} marginTop="20px">Transaction</MainText1>

          <VerticalContentDiv specialPadding border paddingBottom marginTop="2px">

            <HorizontalContentDiv paddingTop borderBottom>

              <VerticalContentDiv marginTop="10px">
                <MainText2 textAlign="start" className={subHeadingfontFamilyClass}>Amount</MainText2>
                <MainText2 marginTop="10px" marginBottom="10px" textAlign="start" className={subHeadingfontFamilyClass}>Network Fee</MainText2>
              </VerticalContentDiv>

              <VerticalContentDiv marginTop="10px">
                <MainText2 id="amount" textAlign="end" className={mainHeadingfontFamilyClass}>{`${amount} ${tokenName}`}</MainText2>
                <MainText2 id="transaction-fee" marginTop="10px" marginBottom="10px" textAlign="end" className={mainHeadingfontFamilyClass}>{`${transactionFee} ${tokenName}`}</MainText2>
              </VerticalContentDiv>
            </HorizontalContentDiv>

            <HorizontalContentDiv paddingTop marginBottom>

              <VerticalContentDiv marginTop="10px">
                <MainText2 textAlign="start" className={subHeadingfontFamilyClass}>Total Amount</MainText2>
                <MainText2 textAlign="start" hide className={subHeadingfontFamilyClass}>.</MainText2>
              </VerticalContentDiv>

              <VerticalContentDiv marginTop="10px">
                <MainText2 id="transaction-amount" textAlign="end" className={mainHeadingfontFamilyClass}>{`${transactionAmount(amount, transactionFee)} ${tokenName}`}</MainText2>
                <MainText2 textAlign="end" hide className={mainHeadingfontFamilyClass}>
                  {tokenName[0] === 'WND' ? '' : '$ 594.304' }
                </MainText2>
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
}

export default ConfirmSend;
