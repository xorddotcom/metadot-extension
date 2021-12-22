import React from 'react';
import { useHistory } from 'react-router-dom';
import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import { MainHeading, SubHeading } from '../../index';
import Button from '../../button';
import { fonts, colors } from '../../../utils';
import warningImg from '../../../assets/images/warning.svg';

const { warningText } = colors;
const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

function WarningModal({ open, handleClose, style }) {
  const history = useHistory();

  const mainHeading = {
    className: mainHeadingfontFamilyClass,
    color: warningText,
    fw: '600',
  };

  const btnF = {
    text: 'Cancel',
    width: '115px',
    height: '35px',
    fontSize: '14px',
    handleClick: () => handleClose(),
  };
  const btnS = {
    text: 'Confirm',
    width: '115px',
    height: '35px',
    fontSize: '14px',
    handleClick: () => history.push('/ConfirmSeed'),
  };

  const flexCenter = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style} className="warning-modal-style">
        <div style={flexCenter}>
          <img src={warningImg} alt="warning" />
        </div>
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
        <div style={{ marginTop: '1.5rem' }} className="btn-row">
          <Button id="cancel" cancel {...btnF} />
          <Button id="confirm" {...btnS} />
        </div>
      </Box>
    </Modal>
  );
}

export default WarningModal;
