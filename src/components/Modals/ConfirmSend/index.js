/* eslint-disable no-unused-vars */
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
  SubText2,
  VerticalContentDiv,
} from './StyledComponents';
import { fonts } from '../../../utils';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

function ConfirmSend({
  open, handleClose, handleConfirm, style, accountTo, amount, accountFrom,
  transactionFee, tokenName, loading2, fromAccountName,
}) {
  const currentUser = useSelector((state) => state.account);

  const transactionAmount = (valueOne, valueTwo) => {
    const value = parseFloat(valueOne) + parseFloat(valueTwo);
    const val = value.toString();
    const trimmedValue = val.slice(0, (val.indexOf('.')) + 6);
    return trimmedValue;
  };

  return (
    <Modal
      open={open}
      onClose={loading2 ? () => console.log('tx is going on...') : handleClose}
      // onClose={handleClose}
    >
      <Box sx={style} className="txDetails-modal-style">
        <CloseIconDiv
          onClick={() => {
            // eslint-disable-next-line no-unused-expressions
            loading2 ? console.log('tx is going on...')
              : handleClose();
          }}
        >
          <CloseIcon />
        </CloseIconDiv>
        <VerticalContentDiv>
          <MainText1 textAlign="center" className={mainHeadingfontFamilyClass}>Confirm</MainText1>

          <HorizontalContentDiv>

            <VerticalContentDiv>
              <MainText2 textAlign="start" className={mainHeadingfontFamilyClass}>From</MainText2>
              <SubText2 textAlign="start" className={subHeadingfontFamilyClass}>{`${accountFrom.slice(0, 5)} ... ${accountFrom.slice(-5)}`}</SubText2>
            </VerticalContentDiv>

            <VerticalContentDiv>
              <MainText2 textAlign="end" className={mainHeadingfontFamilyClass}>To</MainText2>
              <SubText2 textAlign="end" className={subHeadingfontFamilyClass}>{`${accountTo.slice(0, 5)} ... ${accountTo.slice(-5)}`}</SubText2>
            </VerticalContentDiv>

          </HorizontalContentDiv>

          <MainText1 textAlign="start" className={mainHeadingfontFamilyClass}>Transaction</MainText1>

          <VerticalContentDiv specialPadding border paddingBottom>

            <HorizontalContentDiv paddingTop borderBottom>

              <VerticalContentDiv>
                <MainText2 textAlign="start" className={subHeadingfontFamilyClass}>Amount</MainText2>
                <MainText2 textAlign="start" className={subHeadingfontFamilyClass}>Network Fee</MainText2>
              </VerticalContentDiv>

              <VerticalContentDiv>
                <MainText2 textAlign="end" className={mainHeadingfontFamilyClass}>{`${amount} ${tokenName}`}</MainText2>
                <MainText2 textAlign="end" className={mainHeadingfontFamilyClass}>{`${transactionFee} ${tokenName}`}</MainText2>
              </VerticalContentDiv>
            </HorizontalContentDiv>

            <HorizontalContentDiv paddingTop marginBottom>

              <VerticalContentDiv>
                <MainText2 textAlign="start" className={subHeadingfontFamilyClass}>Total Amount</MainText2>
                <MainText2 textAlign="start" hide className={subHeadingfontFamilyClass}>.</MainText2>
              </VerticalContentDiv>

              <VerticalContentDiv>
                <MainText2 textAlign="end" className={mainHeadingfontFamilyClass}>{`${transactionAmount(amount, transactionFee)} ${tokenName}`}</MainText2>
                <MainText2 textAlign="end" hide className={mainHeadingfontFamilyClass}>
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
            disabled={loading2}
          />
          <Button
            text="Confirm"
            width="78%"
            handleClick={() => handleConfirm()}
            isLoading={loading2}
            disabled={loading2}
          />
        </div>
      </Box>
    </Modal>
  );
}

export default ConfirmSend;
