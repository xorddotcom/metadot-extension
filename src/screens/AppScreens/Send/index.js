import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useSelector } from 'react-redux';
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

const {
  // eslint-disable-next-line no-unused-vars
  Keyring,
} = require('@polkadot/api');

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

const Send = () => {
  // fill this state  from redux
  // eslint-disable-next-line no-unused-vars
  const [accountFrom, setAccountFrom] = useState('');

  const [accountTo, setAccountTo] = useState('');
  const [amount, setAmount] = useState('');

  const [isSendModalOpen, setIsSendModalOpen] = useState(false);

  const currentUser = useSelector((state) => state);
  // eslint-disable-next-line no-unused-vars
  const { api } = currentUser.api;
  // setAccountFrom(currentUser.account.publicKey);
  console.log('currentUser in send', currentUser);
  console.log('STATE of SEND COMPONENT', { accountFrom, accountTo, amount });

  const sendTransaction = async () => {
    console.log('Send transaction working', accountFrom, accountTo, amount);
    console.log('Api [[]]', api);

    const keyring = new Keyring({ type: 'sr25519' });

    const me = keyring.addFromUri(currentUser.account.seed);
    console.log('Me [][]', me.address);

    const hash = await api.tx.balances
      .transfer(
        accountTo,
        amount * 1000000000000,
      )
      .signAndSend(
        me, (res) => {
          console.log('Success', res.status);
          if (res.status.isInBlock) {
            console.log(`Completed at block hash #${res.status.asInBlock.toString()}`);
          } else {
            console.log(`Current status: ${res.status.type}`);
          }
        },
      ).catch((err) => {
        console.error('Error [][][]', err);
      });

    console.log('Hash ===>>>', hash);
  };

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
                {currentUser.account.accountName}
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
        accountFrom={currentUser.account.publicKey}
        accountTo={accountTo}
        amount={amount}
        open={isSendModalOpen}
        handleClose={() => setIsSendModalOpen(false)}
        handleConfirm={sendTransaction}
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
