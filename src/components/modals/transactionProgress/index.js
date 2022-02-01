import React from 'react';
import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import { fonts } from '../../../utils';
import { MainHeading, SubHeading } from '../../index';
import transactionProgress from '../../../assets/images/modalIcons/reloading.svg';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

function TransactionProgress({
  open, handleClose, style, transactionProgressMainText, transactionProgressSubText,
}) {
  return (
    <div>
      <Modal
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
        open={open}
        onClose={handleClose}
      >
        <Box sx={style} className="warning-modal-style">
          <img src={transactionProgress} alt="unsuccess check" />
          <MainHeading className={mainHeadingfontFamilyClass} marginBottom="8px">
            {transactionProgressMainText}
          </MainHeading>
          {
          transactionProgressSubText
        && (
        <SubHeading
          className={subHeadingfontFamilyClass}
          textAlignLast="center"
          textAlign="center"
          marginTop="0px"
        >
          {transactionProgressSubText}
        </SubHeading>
        )
        }
        </Box>
      </Modal>
    </div>
  );
}

export default TransactionProgress;
