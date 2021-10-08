import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  AuthWrapper,
  Button,
  ConfirmSend,
  Header,
  StyledInput,
} from '../../../components';
import { fonts } from '../../../utils';
import {
  Balance,
  FromAccount,
  HorizontalContentDiv,
  MainText,
  PlainIcon,
  VerticalContentDiv,
  MainContent,
  EquivalentInUSDT,
  CalculatedAmount,
  CenterContent,
} from './StyledComponents';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

const Send = () => {
  // fill this state  from redux
  // eslint-disable-next-line no-unused-vars
  const [accountFrom, setAccountFrom] = useState('');

  const [accountTo, setAccountTo] = useState('');
  const [amount, setAmount] = useState('');

  const [isSendModalOpen, setIsSendModalOpen] = useState(false);

  console.log('STATE of SEND COMPONENT', { accountFrom, accountTo, amount });

  return (
    <AuthWrapper>
      <Header centerText="Send" backHandler={() => console.log('object')} />

      <MainContent>
        <MainText m="8px" className={mainHeadingfontFamilyClass}>
          From
        </MainText>
        <FromAccount>
          <HorizontalContentDiv>
            <PlainIcon />
            <VerticalContentDiv>
              <MainText className={mainHeadingfontFamilyClass}>
                Account 0
              </MainText>
              <Balance className={subHeadingfontFamilyClass}>
                0.949494 ETH
              </Balance>
            </VerticalContentDiv>
          </HorizontalContentDiv>
          <KeyboardArrowDownIcon />
        </FromAccount>

        <VerticalContentDiv mb="25px">
          <MainText m="8px" className={mainHeadingfontFamilyClass}>
            To
          </MainText>
          <StyledInput
            placeholder="Search Address"
            value={accountTo}
            className={subHeadingfontFamilyClass}
            // prettier-ignore
            onChange={(t) => setAccountTo(t)}
            fontSize="14px"
            height="20px"
          />
        </VerticalContentDiv>

        <VerticalContentDiv mb="150px">
          <MainText m="8px" className={mainHeadingfontFamilyClass}>
            Amount
          </MainText>
          <StyledInput
            placeholder="Amount"
            type="number"
            value={amount}
            className={subHeadingfontFamilyClass}
            // prettier-ignore
            onChange={(t) => {
              console.log(t);
              if (t) {
                setAmount(t);
              }
            }}
            fontSize="14px"
            height="20px"
          />
          <CalculatedAmount>
            <EquivalentInUSDT className={subHeadingfontFamilyClass}>
              $23.212
            </EquivalentInUSDT>
            <Balance textAlign="end" className={subHeadingfontFamilyClass}>
              712.949 DOT
            </Balance>
          </CalculatedAmount>
        </VerticalContentDiv>
      </MainContent>
      <CenterContent>
        <Button text="Next" handleClick={() => setIsSendModalOpen(true)} />
      </CenterContent>
      <ConfirmSend
        open={isSendModalOpen}
        handleClose={() => setIsSendModalOpen(false)}
        handleConfirm={() => console.log('invoke send tx function here !!!')}
        style={{
          width: '78%',
          background: '#141414',
          position: 'relative',
          p: 2,
          px: 2,
          pb: 3,
          mt: 15,
        }}
      />
    </AuthWrapper>
  );
};

export default Send;
