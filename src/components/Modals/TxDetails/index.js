/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
/* eslint import/no-cycle: [2, { maxDepth: 1 }] */
import React from 'react';
import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import ContentCopyIcon from '../../../assets/images/icons/copyIcon.svg';
import {
  CloseIconDiv,
  HorizontalContentDiv,
  MainText1,
  MainText2,
  SubText1,
  SubText2,
  VerticalContentDiv,
} from './StyledComponents';
import { fonts, helpers } from '../../../utils';

const { addressModifier } = helpers;
const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

function TxDetails({
  open, handleClose, style, txDetailsModalData,
}) {
  const {
    hash, amount, operation, accountFrom, accountTo, transactionFee, tokenName,
  } = txDetailsModalData;

  const getTotalBalance = (value1, value2) => {
    const val = parseFloat(value1) + parseFloat(value2);
    return val.toFixed(4);
  };

  const copyText = () => {
    navigator.clipboard.writeText(hash);
    toast.success('Copied!', {
      position: toast.POSITION.BOTTOM_CENTER,
      className: 'toast-success',
      progressClassName: 'success-progress-bar',
      autoClose: 1500,
      toastId: 1,
    });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Box sx={style} className="txDetails-modal-style">
        <CloseIconDiv
          onClick={() => {
            handleClose();
          }}
        >
          <CloseIcon />
        </CloseIconDiv>
        <VerticalContentDiv marginTop="30px">
          <MainText1 textAlign="center" className={mainHeadingfontFamilyClass}>Details</MainText1>

          <HorizontalContentDiv marginTop="20px" paddingTop marginBottom>

            <VerticalContentDiv>
              <MainText2 textAlign="start" className={mainHeadingfontFamilyClass}>Status</MainText2>
              <MainText2 successText textAlign="start" className={mainHeadingfontFamilyClass}>{operation}</MainText2>
            </VerticalContentDiv>

            <VerticalContentDiv>
              <MainText2 textAlign="end" className={mainHeadingfontFamilyClass}>Tx Hash</MainText2>
              <HorizontalContentDiv>
                <div className={`tooltip ${subHeadingfontFamilyClass}`}>
                  <div onClick={copyText}>
                    <img src={ContentCopyIcon} alt="copy-icon" />
                    <span className="tooltiptext" style={{ fontSize: '0.7rem' }}>Copy Tx Hash</span>
                  </div>
                </div>
                <SubText2 pl10 textAlign="end" className={mainHeadingfontFamilyClass}>
                  {hash ? `${hash.slice(0, 5)}...${hash.slice(hash.length - 5, hash.length)}` : ''}
                </SubText2>
              </HorizontalContentDiv>
            </VerticalContentDiv>
          </HorizontalContentDiv>

          <HorizontalContentDiv marginTop="20px">

            <VerticalContentDiv>
              <MainText2 textAlign="start" className={mainHeadingfontFamilyClass}>From</MainText2>
              <SubText2 textAlign="start" className={subHeadingfontFamilyClass}>
                {addressModifier(accountFrom)}
              </SubText2>
            </VerticalContentDiv>

            <VerticalContentDiv>
              <MainText2 textAlign="end" className={mainHeadingfontFamilyClass}>To</MainText2>
              <SubText2
                textAlign="end"
                className={subHeadingfontFamilyClass}
              >
                {addressModifier(accountTo)}
              </SubText2>
            </VerticalContentDiv>

          </HorizontalContentDiv>

          <MainText1 marginTop="40px" textAlign="start" className={mainHeadingfontFamilyClass}>Transaction</MainText1>

          <VerticalContentDiv specialPadding border paddingBottom>

            <HorizontalContentDiv paddingTop borderBottom>

              <VerticalContentDiv marginBottom="15px">
                <MainText2 marginTop="15px" textAlign="start" className={subHeadingfontFamilyClass}>Amount</MainText2>
                <MainText2 marginTop="10px" textAlign="start" className={subHeadingfontFamilyClass}>Network Fee</MainText2>
              </VerticalContentDiv>

              <VerticalContentDiv marginBottom="15px">
                <MainText2 marginTop="15px" textAlign="end" className={mainHeadingfontFamilyClass}>{`${amount} ${tokenName}`}</MainText2>
                <MainText2 marginTop="10px" textAlign="end" className={mainHeadingfontFamilyClass}>
                  {`${transactionFee} ${tokenName}`}
                </MainText2>
              </VerticalContentDiv>
            </HorizontalContentDiv>

            <HorizontalContentDiv paddingTop marginBottom>

              <VerticalContentDiv marginTop="15px" marginBottom="15px">
                <SubText1 textAlign="start" className={subHeadingfontFamilyClass}>Total Amount</SubText1>
                <SubText1 textAlign="start" hide className={subHeadingfontFamilyClass}>.</SubText1>
              </VerticalContentDiv>

              <VerticalContentDiv marginTop="15px" marginBottom="15px">
                <MainText2 textAlign="end" className={mainHeadingfontFamilyClass}>
                  {`${getTotalBalance(amount, transactionFee)}
                  ${tokenName}`}
                </MainText2>
                <MainText2 textAlign="end" className={mainHeadingfontFamilyClass}>$0</MainText2>
              </VerticalContentDiv>
            </HorizontalContentDiv>

          </VerticalContentDiv>

        </VerticalContentDiv>
      </Box>
    </Modal>
  );
}

export default TxDetails;
