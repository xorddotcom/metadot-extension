import React from 'react';
import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import { fonts } from '../../../utils';
import { MainHeading, SubHeading } from '../../index';
import UnsuccessCheckIcon from '../../../assets/images/TransactionFailed.svg';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

function UnsuccessResponse({
  open, handleClose, style, unsuccessMainText, unsuccessSubText,
}) {
  return (
    <div>
      <Modal
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
        open={open}
        onClose={handleClose}
      >
        <Box sx={style} className="warning-modal-style">
          <img src={UnsuccessCheckIcon} alt="unsuccess check" />
          <MainHeading className={mainHeadingfontFamilyClass} marginBottom="8px">
            {unsuccessMainText}
          </MainHeading>
          {
          unsuccessSubText
        && (
        <SubHeading
          className={subHeadingfontFamilyClass}
          textAlignLast="center"
          textAlign="center"
          marginTop="0px"
        >
          {unsuccessSubText}
        </SubHeading>
        )
        }
        </Box>
      </Modal>
    </div>
  );
}

export default UnsuccessResponse;
