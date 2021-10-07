import React from 'react';
import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import Button from '../../Button';

function ConfirmSend({
  open, handleClose, handleConfirm, style,
}) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style} className="warning-modal-style">
        {/* this div is just for now temporarily here */}
        <div style={{ height: 220, width: '100%' }} />

        <div className="btn-row">
          <Button
            text="Cancel"
            cancel
            width="78%"
            handleClick={() => handleClose()}
          />
          <Button
            text="Confirm"
            width="78%"
            handleClick={() => handleConfirm()}
          />
        </div>
      </Box>
    </Modal>
  );
}

export default ConfirmSend;
