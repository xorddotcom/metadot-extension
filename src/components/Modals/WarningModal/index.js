import React from 'react';
import { useHistory } from 'react-router-dom';
import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import { MainHeading, SubHeading } from '../../CommonStyledComponents';
import Button from '../../Button';

import { fonts } from '../../../utils';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

function WarningModal({ open, handleClose, style }) {
  const history = useHistory();
  // history.push('/ConfirmSeed');
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style} className="warning-modal-style">
        <div
          className="cross-close"
          onClick={() => {
            handleClose();
          }}
          aria-hidden="true"
        >
          x
        </div>
        <MainHeading className={mainHeadingfontFamilyClass} color="#C30707">
          Warning
        </MainHeading>
        <SubHeading
          className={subHeadingfontFamilyClass}
          textAlignLast="center"
          lineHeight="18px"
        >
          Proceeding will not let you view your mnemonic again. Do you still wish to continue?
        </SubHeading>
        <div style={{ marginTop: '2rem' }} className="btn-row">
          <Button
            text="Cancel"
            fontSize="16px"
            cancel
            width="78%"
            handleClick={() => handleClose()}
          />
          <Button
            text="Confirm"
            width="78%"
            fontSize="16px"
            handleClick={() => history.push('/ConfirmSeed')}
          />
        </div>
      </Box>
    </Modal>
  );
}

export default WarningModal;
