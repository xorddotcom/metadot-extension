import React from 'react';
import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import Button from '../../Button';
import {
  CloseIconDiv,
  HorizontalContentDiv,
  MainText1,
  MainText2,
  SubText1,
  SubText2,
  VerticalContentDiv,
} from './StyledComponents';
import { fonts } from '../../../utils';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

function ConfirmSend({
  open, handleClose, handleConfirm, style, accountTo, amount,
}) {
  const currentUser = useSelector((state) => state.account);
  console.log('Rpc url', currentUser.rpcUrl);

  console.log('Props', accountTo, amount);

  // history.push('/ConfirmSeed');
  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Box sx={style} className="txDetails-modal-style">
        <CloseIconDiv
          onClick={() => {
            handleClose();
          }}
        >
          <CloseIcon />
        </CloseIconDiv>
        {/* this div is just for now temporarily here */}
        <VerticalContentDiv>
          <MainText1 textAlign="center" className={mainHeadingfontFamilyClass}>Confirm</MainText1>

          <HorizontalContentDiv>

            <VerticalContentDiv>
              <MainText2 textAlign="start" className={mainHeadingfontFamilyClass}>From</MainText2>
              <SubText1 textAlign="start" className={mainHeadingfontFamilyClass}>Account 1</SubText1>
              <SubText2 textAlign="start" className={subHeadingfontFamilyClass}>(bnb13...txjd5)</SubText2>
            </VerticalContentDiv>

            <VerticalContentDiv>
              <MainText2 textAlign="end" className={mainHeadingfontFamilyClass}>From</MainText2>
              <SubText1 textAlign="end" className={mainHeadingfontFamilyClass}>Account 1</SubText1>
              <SubText2 textAlign="end" className={subHeadingfontFamilyClass}>(bnb13...txjd5)</SubText2>
            </VerticalContentDiv>

          </HorizontalContentDiv>

          <MainText1 textAlign="start" className={mainHeadingfontFamilyClass}>Transaction</MainText1>

          <VerticalContentDiv border paddingBottom>

            <HorizontalContentDiv paddingTop borderBottom>

              <VerticalContentDiv>
                <SubText1 textAlign="start" className={subHeadingfontFamilyClass}>Amount</SubText1>
                <SubText1 textAlign="start" className={subHeadingfontFamilyClass}>Network Fee</SubText1>
              </VerticalContentDiv>

              <VerticalContentDiv>
                <MainText2 textAlign="start" className={mainHeadingfontFamilyClass}>2.35 DOT</MainText2>
                <MainText2 textAlign="start" className={mainHeadingfontFamilyClass}>0.21 BTC</MainText2>
              </VerticalContentDiv>
            </HorizontalContentDiv>

            <HorizontalContentDiv paddingTop marginBottom>

              <VerticalContentDiv>
                <SubText1 textAlign="start" className={subHeadingfontFamilyClass}>Total Amount</SubText1>
                <SubText1 textAlign="start" hide className={subHeadingfontFamilyClass}>.</SubText1>
              </VerticalContentDiv>

              <VerticalContentDiv>
                <MainText2 textAlign="end" className={mainHeadingfontFamilyClass}>2.56 DOT</MainText2>
                <MainText2 textAlign="end" className={mainHeadingfontFamilyClass}>$ 594.304</MainText2>
              </VerticalContentDiv>
            </HorizontalContentDiv>

          </VerticalContentDiv>

        </VerticalContentDiv>

        <div className="btn-row" style={{ marginTop: 20 }}>
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
