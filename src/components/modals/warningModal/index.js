import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import { MainHeading, SubHeading } from '../../index';
import Button from '../../button';
import { fonts, colors } from '../../../utils';
// import warningImg from '../../../assets/images/warning.svg';

const { warningText } = colors;
const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

function WarningModal({
  open,
  handleClose,
  style,
  image,
  mainText,
  subText,
}) {
  const history = useHistory();
  const location = useLocation();

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
    handleClick: () => history.push({
      pathname: '/ConfirmSeed',
      state: { seedToPass: location.state.seedToPass },
    }),
  };

  const flexCenter = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style} className="warning-modal-style">
        {
          image
        && (
        <div style={flexCenter}>
          <img src={image} alt="warning" />
        </div>
        )
        }
        <MainHeading {...mainHeading}>
          {mainText}
        </MainHeading>
        <SubHeading
          className={subHeadingfontFamilyClass}
          textAlignLast="start"
          lineHeight="20px"
        >
          {subText}
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
