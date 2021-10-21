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
import { fonts } from '../../../utils';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

function TxDetails({
  open, handleClose, style, txDetailsModalData,
}) {
  // eslint-disable-next-line quotes
  console.log("=======", txDetailsModalData);
  // eslint-disable-next-line max-len
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
              <SubText1 textAlign="start" className={mainHeadingfontFamilyClass}>{txDetailsModalData.accountFrom}</SubText1>
              <SubText2 textAlign="start" className={subHeadingfontFamilyClass}>(bnb13...txjd5)</SubText2>
            </VerticalContentDiv>

            <VerticalContentDiv>
              <MainText2 textAlign="end" className={mainHeadingfontFamilyClass}>To</MainText2>
              <SubText1 textAlign="end" className={mainHeadingfontFamilyClass}>{txDetailsModalData.accountTo}</SubText1>
              <SubText2 textAlign="end" className={subHeadingfontFamilyClass}>(bnb13...txjd5)</SubText2>
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
                <MainText2 textAlign="start" className={mainHeadingfontFamilyClass}>{txDetailsModalData.amount}</MainText2>
                <MainText2 textAlign="start" className={mainHeadingfontFamilyClass}>
                  {`${txDetailsModalData.networkFee} BTC`}
                </MainText2>
              </VerticalContentDiv>
            </HorizontalContentDiv>

            <HorizontalContentDiv paddingTop marginBottom>

              <VerticalContentDiv>
                <SubText1 textAlign="start" className={subHeadingfontFamilyClass}>Total Amount</SubText1>
                <SubText1 textAlign="start" hide className={subHeadingfontFamilyClass}>.</SubText1>
              </VerticalContentDiv>

              <VerticalContentDiv>
                <MainText2 textAlign="end" className={mainHeadingfontFamilyClass}>2.56 DOT</MainText2>
                <MainText2 textAlign="end" className={mainHeadingfontFamilyClass}>$ 594.304</MainText2>
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
