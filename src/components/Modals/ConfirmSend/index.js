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
  open, handleClose, handleConfirm, style, accountTo, amount, accountFrom,
  transactionFee, tokenName, loading2,
}) {
  const currentUser = useSelector((state) => state.account);
  console.log('Rpc url', currentUser.rpcUrl);

  console.log('Props', tokenName, transactionFee);
  // console.log('Total fee', transactionFee + amount);
  // history.push('/ConfirmSeed');

  const transactionAmount = (valueOne, valueTwo) => {
    const value = parseFloat(valueOne) + parseFloat(valueTwo);
    const val = value.toString();
    const trimmedValue = val.slice(0, (val.indexOf('.')) + 6);
    return trimmedValue;
  };

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
              <SubText2 textAlign="start" className={subHeadingfontFamilyClass}>{`${accountFrom.slice(0, 3)} ... ${accountFrom.slice(-3)}`}</SubText2>
            </VerticalContentDiv>

            <VerticalContentDiv>
              <MainText2 textAlign="end" className={mainHeadingfontFamilyClass}>To</MainText2>
              <SubText1 textAlign="end" className={mainHeadingfontFamilyClass}>Account 1</SubText1>
              <SubText2 textAlign="end" className={subHeadingfontFamilyClass}>{`${accountTo.slice(0, 3)} ... ${accountTo.slice(-3)}`}</SubText2>
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
                <MainText2 textAlign="end" className={mainHeadingfontFamilyClass}>{`${amount} ${tokenName}`}</MainText2>
                <MainText2 textAlign="end" className={mainHeadingfontFamilyClass}>{`${transactionFee} ${tokenName}`}</MainText2>
              </VerticalContentDiv>
            </HorizontalContentDiv>

            <HorizontalContentDiv paddingTop marginBottom>

              <VerticalContentDiv>
                <SubText1 textAlign="start" className={subHeadingfontFamilyClass}>Total Amount</SubText1>
                <SubText1 textAlign="start" hide className={subHeadingfontFamilyClass}>.</SubText1>
              </VerticalContentDiv>

              <VerticalContentDiv>
                <MainText2 textAlign="end" className={mainHeadingfontFamilyClass}>{`${transactionAmount(amount, transactionFee)} ${tokenName}`}</MainText2>
                <MainText2 textAlign="end" className={mainHeadingfontFamilyClass}>
                  {' '}
                  {console.log('Token Name WND here', tokenName)}
                  {tokenName[0] === 'WND' ? '' : '$ 594.304' }
                </MainText2>
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
            isLoading={loading2}
          />
        </div>
      </Box>
    </Modal>
  );
}

export default ConfirmSend;
