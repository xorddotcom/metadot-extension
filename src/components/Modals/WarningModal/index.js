import React from 'react';
import { useHistory } from 'react-router-dom';
import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import { MainHeading, SubHeading } from '../../index';
import Button from '../../Button';
import { fonts, colors } from '../../../utils';

const { warningTextColor } = colors;
const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

function WarningModal({ open, handleClose, style }) {
  const history = useHistory();

  const mainHeading = {
    className: mainHeadingfontFamilyClass,
    color: warningTextColor,
    fw: '600',
  };

  const btnF = {
    text: 'Cancel',
    width: '115px',
    height: '35px',
    fontSize: '14px',
    border: 'none',
    handleClick: () => handleClose(),
  };
  const btnS = {
    text: 'Confirm',
    width: '115px',
    height: '35px',
    fontSize: '14px',
    handleClick: () => history.push('/ConfirmSeed'),
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style} className="warning-modal-style">
        <MainHeading {...mainHeading}>
          Warning
        </MainHeading>
        <SubHeading
          className={subHeadingfontFamilyClass}
          textAlignLast="start"
          lineHeight="20px"
        >
          Proceeding will not let you view your mnemonic again. Do you still wish to continue?
        </SubHeading>
        <div style={{ marginTop: '2rem' }} className="btn-row">
          <Button cancel {...btnF} />
          <Button {...btnS} />
        </div>
      </Box>
    </Modal>
  );
}

export default WarningModal;
