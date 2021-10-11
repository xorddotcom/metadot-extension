import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import { MainHeading, SubHeading } from '../../CommonStyledComponents';
import Button from '../../Button';

import { fonts } from '../../../utils';
import { useSelector } from 'react-redux'

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

function ConfirmSend({ open, handleClose, handleConfirm, style, accountTo, amount }) {
  const currentUser = useSelector(state => state.account)
  console.log('Rpc url', currentUser.rpcUrl)


  console.log('Props', accountTo, amount);
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
            handleClick={handleConfirm}
          />
        </div>
      </Box>
    </Modal>
  );
}

export default ConfirmSend;
