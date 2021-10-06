import React from 'react';
import { useHistory } from 'react-router-dom';
import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import { MainHeading, SubHeading } from '../../CommonStyledComponents';
import Button from '../../Button';

import { fonts } from '../../../utils';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

function ConfirmSend({ open, handleClose, handleConfirm, style }) {
  const history = useHistory();
  // history.push('/ConfirmSeed');
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style} className="warning-modal-style">
        {/* this div is just for now temporarily here */}
        <div style={{ height: 220, width: '100%' }}></div>

        <div className="btn-row">
          <Button
            text="Cancel"
            cancel={true}
            width={'78%'}
            handleClick={() => handleClose()}
          />
          <Button
            text="Confirm"
            width={'78%'}
            handleClick={() => handleConfirm()}
          />
        </div>
      </Box>
    </Modal>
  );
}

export default ConfirmSend;
