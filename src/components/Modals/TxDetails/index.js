import React from 'react';
import { Modal } from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import { toast } from 'react-toastify';
import {
  CloseIconDiv,
  HorizontalContentDiv,
  MainText1,
  MainText2,
  SubText1,
  SubText2,
  VerticalContentDiv,
  // eslint-disable-next-line no-unused-vars
  ViewOnPolkaScanText,
} from './StyledComponents';
import { fonts, helpers } from '../../../utils';

// eslint-disable-next-line no-unused-vars
const { addressModifier } = helpers;
const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

const LightTooltip = styled(({ className, ...props }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
    zIndex: -2,
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.white,
  },
}));

function TxDetails({
  open, handleClose, style, transactions, txDetailsModalData,
}) {
  // eslint-disable-next-line quotes
  console.log("hello tx details modal", txDetailsModalData);
  console.log('Hello transactions', transactions);
  // eslint-disable-next-line max-len

  const getTotalBalance = (value1, value2) => {
    const val = parseFloat(value1) + parseFloat(value2);
    return val.toFixed(4);
    // return val;
  };

  const copyText = () => {
    console.log('copied hash', txDetailsModalData.hash);
    navigator.clipboard.writeText(txDetailsModalData.hash);
    console.log('-------------emitter start');
    // toast emitter
    // toast('Copied!', {
    //   position: toast.POSITION.BOTTOM_CENTER,
    //   className: 'toast-success',
    //   progressClassName: 'success-progress-bar',
    //   autoClose: 2000,
    //   toastId: 1,
    // });
    toast.success('Copied!', {
      position: toast.POSITION.BOTTOM_CENTER,
      className: 'toast-success',
      progressClassName: 'success-progress-bar',
      autoClose: 1500,
      toastId: 1,
    });
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
        {/* {console.log('Data in tx details modal', data)} */}
        {/* {txdetailsModalData.length > 0 ?} */}
        <VerticalContentDiv>
          <MainText1 textAlign="center" className={mainHeadingfontFamilyClass}>Details</MainText1>

          <HorizontalContentDiv paddingTop marginBottom>

            <VerticalContentDiv>
              <MainText2 textAlign="start" className={mainHeadingfontFamilyClass}>Status</MainText2>
              <MainText2 successText textAlign="start" className={mainHeadingfontFamilyClass}>{txDetailsModalData.operation}</MainText2>
            </VerticalContentDiv>

            <VerticalContentDiv>
              <MainText2 textAlign="end" className={mainHeadingfontFamilyClass}>Tx Hash</MainText2>
              <HorizontalContentDiv>
                <LightTooltip title="Copy Tx Hash" arrow placement="right">
                  <ContentCopyIcon
                    style={{
                      color: '#cccccc',
                      fontSize: 12,
                      marginLeft: 10,
                    }}
                    onClick={copyText}
                  />
                </LightTooltip>
                <SubText2 pl10 textAlign="end" className={mainHeadingfontFamilyClass}>
                  {txDetailsModalData.hash ? `${txDetailsModalData.hash.slice(0, 5)}...${txDetailsModalData.hash.slice(txDetailsModalData.hash.length - 5, txDetailsModalData.hash.length)}` : ''}
                </SubText2>
              </HorizontalContentDiv>
            </VerticalContentDiv>
          </HorizontalContentDiv>

          <HorizontalContentDiv>

            <VerticalContentDiv>
              <MainText2 textAlign="start" className={mainHeadingfontFamilyClass}>From</MainText2>
              {/* <SubText1 textAlign="start" className={mainHeadingfontFamilyClass}>
                { addressModifier(txDetailsModalData.accountFrom)}
                {' '}
              </SubText1> */}
              <SubText2 textAlign="start" className={subHeadingfontFamilyClass}>
                {addressModifier(txDetailsModalData.accountFrom)}
              </SubText2>
            </VerticalContentDiv>

            <VerticalContentDiv>
              <MainText2 textAlign="end" className={mainHeadingfontFamilyClass}>To</MainText2>
              {/* <SubText1 textAlign="end"
              className={mainHeadingfontFamilyClass}>{txDetailsModalData.accountTo}</SubText1> */}
              <SubText2
                textAlign="end"
                className={subHeadingfontFamilyClass}
              >
                {addressModifier(txDetailsModalData.accountTo)}
              </SubText2>
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
                <MainText2 textAlign="end" className={mainHeadingfontFamilyClass}>{`${txDetailsModalData.amount} ${txDetailsModalData.tokenName}`}</MainText2>
                <MainText2 textAlign="end" className={mainHeadingfontFamilyClass}>
                  {`${txDetailsModalData.transactionFee} ${txDetailsModalData.tokenName}`}
                </MainText2>
              </VerticalContentDiv>
            </HorizontalContentDiv>

            <HorizontalContentDiv paddingTop marginBottom>

              <VerticalContentDiv>
                <SubText1 textAlign="start" className={subHeadingfontFamilyClass}>Total Amount</SubText1>
                <SubText1 textAlign="start" hide className={subHeadingfontFamilyClass}>.</SubText1>
              </VerticalContentDiv>

              <VerticalContentDiv>
                <MainText2 textAlign="end" className={mainHeadingfontFamilyClass}>
                  {/* {`${parseFloat(txDetailsModalData.amount)
                    .toFixed(3) + parseFloat(txDetailsModalData.transactionFee).toFixed(3)}
                    ${txDetailsModalData.tokenName[0]}`} */}
                  {`${getTotalBalance(txDetailsModalData.amount, txDetailsModalData.transactionFee)}
                  ${txDetailsModalData.tokenName}`}
                </MainText2>
                <MainText2 textAlign="end" className={mainHeadingfontFamilyClass}>$0</MainText2>
              </VerticalContentDiv>
            </HorizontalContentDiv>

          </VerticalContentDiv>

        </VerticalContentDiv>

        {/* <div className="btn-row" style={{ marginTop: 20 }}>
          {/* <p style={{ color: '#fafafa' }}>View on Etherscan</p>
          <ViewOnPolkaScanText
            className={mainHeadingfontFamilyClass}
          >
            View on PolkaScan
          </ViewOnPolkaScanText>
        </div> */}
      </Box>
    </Modal>
  );
}

export default TxDetails;
