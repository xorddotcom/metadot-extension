import React from 'react';
import { useHistory } from 'react-router-dom';
import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import { MainHeading, SubHeading } from '../CommonStyledComponents';
import Button from '../Button';
import './index.css';
import { fonts } from '../../utils';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

function WarningModal({ open, handleClose, style }) {
  const history = useHistory();
  // history.push('/ConfirmSeed');
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style} className="modal-style">
        <MainHeading className={mainHeadingfontFamilyClass} color="#C30707">
          Warning
        </MainHeading>
        <SubHeading
          className={subHeadingfontFamilyClass}
          textAlignLast={'center'}>
          Please write the mnemonic down in order to ensure the backup is
          correct
        </SubHeading>
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
            handleClick={() => history.push('/ConfirmSeed')}
          />
        </div>
      </Box>
    </Modal>
  );
}

export default WarningModal;
