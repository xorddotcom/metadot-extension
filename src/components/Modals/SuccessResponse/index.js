import React from 'react';
import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import { fonts } from '../../../utils';
import { MainHeading, SubHeading } from '../../index';
import SuccessCheckIcon from '../../../assets/images/success.png';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

function SuccessResponse({
  open, handleClose, style, mainText, subText,
}) {
  return (
    <div>
      <Modal
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
        open={open}
        onClose={handleClose}
      >
        <Box sx={style} className="warning-modal-style">
          <img src={SuccessCheckIcon} alt="success check" />
          <MainHeading className={mainHeadingfontFamilyClass} marginBottom="8px">
            {mainText}
          </MainHeading>
          {
          subText
        && (
        <SubHeading
          className={subHeadingfontFamilyClass}
          textAlignLast="center"
          textAlign="center"
          marginTop="0px"
        >
          {subText}
        </SubHeading>
        )
        }
        </Box>
      </Modal>
    </div>
  );
}

export default SuccessResponse;
