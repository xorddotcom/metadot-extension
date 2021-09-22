import React from 'react';
import { useHistory } from 'react-router-dom';
import { Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { MainHeading, SubHeading } from '../CommonStyledComponents';
import Button from '../Button';
import './index.css';

function WarningModal({ open, handleClose, style }) {
  const history = useHistory();
  // history.push('/ConfirmSeed');
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style} className="modal-style">
        <MainHeading color="#C30707">Warning</MainHeading>
        <SubHeading>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. adipiscing
          elit. adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. adipiscing elit. adipiscing
        </SubHeading>
        <div className="btn-row">
          <Button
            text="Cancel"
            cancel={true}
            width={150}
            handleClick={() => handleClose()}
          />
          <Button
            text="Confirm"
            width={150}
            handleClick={() => history.push('/ConfirmSeed')}
          />
        </div>
      </Box>
    </Modal>
  );
}

export default WarningModal;
