import React from 'react';
import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';

import {
  CloseIconDiv,
  HorizontalContentDiv,
  MainText1,
  MainText2,
  SubText1,
  SubText2,
  VerticalContentDiv,
  ViewOnPolkaScanText,
} from './StyledComponents';
import { fonts, helpers } from '../../../utils';

// eslint-disable-next-line no-unused-vars
const { addressModifier } = helpers;
const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

function TxDetails({
  open, handleClose, style, transactions, txDetailsModalData,
}) {
  // eslint-disable-next-line quotes
  console.log("hello tx details modal", txDetailsModalData);
  console.log('Hello transactions', transactions);
  // eslint-disable-next-line max-len

  const getTotalBalance = (value1, value2) => {
    const val = parseFloat(value1) + parseFloat(value2);
    return val.toFixed(4);
    // return val;
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
        {/* {console.log('Data in tx details modal', data)} */}
        {/* {txdetailsModalData.length > 0 ?} */}
        <VerticalContentDiv>
          <MainText1 textAlign="center" className={mainHeadingfontFamilyClass}>Details</MainText1>

          <HorizontalContentDiv paddingTop marginBottom>

            <VerticalContentDiv>
              <MainText2 textAlign="start" className={mainHeadingfontFamilyClass}>Status</MainText2>
              <MainText2 successText textAlign="start" className={mainHeadingfontFamilyClass}>{txDetailsModalData.operation}</MainText2>
            </VerticalContentDiv>

            <VerticalContentDiv>
              <MainText2 textAlign="end" className={mainHeadingfontFamilyClass}>Date</MainText2>
              <SubText2 textAlign="end" className={mainHeadingfontFamilyClass}>Sep 16 at 10:40 am</SubText2>
            </VerticalContentDiv>
          </HorizontalContentDiv>

          <HorizontalContentDiv>

            <VerticalContentDiv>
              <MainText2 textAlign="start" className={mainHeadingfontFamilyClass}>From</MainText2>
              {/* <SubText1 textAlign="start" className={mainHeadingfontFamilyClass}>
                { addressModifier(txDetailsModalData.accountFrom)}
                {' '}
              </SubText1> */}
              <SubText2 textAlign="start" className={subHeadingfontFamilyClass}>
                {addressModifier(txDetailsModalData.accountFrom)}
              </SubText2>
            </VerticalContentDiv>

            <VerticalContentDiv>
              <MainText2 textAlign="end" className={mainHeadingfontFamilyClass}>To</MainText2>
              {/* <SubText1 textAlign="end"
              className={mainHeadingfontFamilyClass}>{txDetailsModalData.accountTo}</SubText1> */}
              <SubText2
                textAlign="end"
                className={subHeadingfontFamilyClass}
              >
                {addressModifier(txDetailsModalData.accountTo)}
              </SubText2>
            </VerticalContentDiv>

          </HorizontalContentDiv>

          <MainText1 textAlign="start" className={mainHeadingfontFamilyClass}>Transaction</MainText1>

          <VerticalContentDiv border paddingBottom>

            <HorizontalContentDiv paddingTop borderBottom>

              <VerticalContentDiv>
                <SubText1 textAlign="start" className={subHeadingfontFamilyClass}>Amount</SubText1>
                <SubText1 textAlign="start" className={subHeadingfontFamilyClass}>Network Fee</SubText1>
              </VerticalContentDiv>

              <VerticalContentDiv>
                <MainText2 textAlign="start" className={mainHeadingfontFamilyClass}>{`${txDetailsModalData.amount} ${txDetailsModalData.tokenName}`}</MainText2>
                <MainText2 textAlign="start" className={mainHeadingfontFamilyClass}>
                  {`${txDetailsModalData.transactionFee} ${txDetailsModalData.tokenName}`}
                </MainText2>
              </VerticalContentDiv>
            </HorizontalContentDiv>

            <HorizontalContentDiv paddingTop marginBottom>

              <VerticalContentDiv>
                <SubText1 textAlign="start" className={subHeadingfontFamilyClass}>Total Amount</SubText1>
                <SubText1 textAlign="start" hide className={subHeadingfontFamilyClass}>.</SubText1>
              </VerticalContentDiv>

              <VerticalContentDiv>
                <MainText2 textAlign="end" className={mainHeadingfontFamilyClass}>
                  {/* {`${parseFloat(txDetailsModalData.amount)
                    .toFixed(3) + parseFloat(txDetailsModalData.transactionFee).toFixed(3)}
                    ${txDetailsModalData.tokenName[0]}`} */}
                  {`${getTotalBalance(txDetailsModalData.amount, txDetailsModalData.transactionFee)}
                  ${txDetailsModalData.tokenName}`}
                </MainText2>
                <MainText2 textAlign="end" className={mainHeadingfontFamilyClass}>0$</MainText2>
              </VerticalContentDiv>
            </HorizontalContentDiv>

          </VerticalContentDiv>

        </VerticalContentDiv>

        <div className="btn-row" style={{ marginTop: 20 }}>
          {/* <p style={{ color: '#fafafa' }}>View on Etherscan</p> */}
          <ViewOnPolkaScanText
            className={mainHeadingfontFamilyClass}
          >
            View on PolkaScan
          </ViewOnPolkaScanText>
        </div>
      </Box>
    </Modal>
  );
}

export default TxDetails;
