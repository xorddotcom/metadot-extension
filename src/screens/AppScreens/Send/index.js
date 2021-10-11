import React, { useState } from 'react';
import {
  AuthWrapper,
  Button,
  ConfirmSend,
  Header,
  StyledInput,
} from '../../../components';
import { fonts } from '../../../utils';
import { useSelector } from "react-redux";
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

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import RpcClass from '../../../rpc'
const { cryptoWaitReady } = require('@polkadot/util-crypto')
const { ApiRx, WsProvider, ApiPromise, Keyring } = require('@polkadot/api')

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

const Send = () => {
  // fill this state  from redux
  const [accountFrom, setAccountFrom] = useState();

  const [accountTo, setAccountTo] = useState('');
  const [amount, setAmount] = useState('');

  const [isSendModalOpen, setIsSendModalOpen] = useState(false);

  const currentUser = useSelector((state) => state);
  // setAccountFrom(currentUser.account.publicKey)
  

  console.log('STATE of SEND COMPONENT', { accountFrom, accountTo, amount });

  const sendTransaction = async () => {
    console.log('Current user', currentUser.account.rpcUrl);
  
    const api = await RpcClass.init(currentUser.account.rpcUrl, false)
    console.log('Api', api)
    
    const keyring = new Keyring({ type: 'sr25519' })
   
    const me = keyring.addFromUri(currentUser.account.seed);
    console.log('Me [][]',me.address)
  
    const hash = await api.tx.balances
      .transfer(
        accountTo,
        amount * 1000000000000
      )
      .signAndSend(
        me,(res) => {console.log('Success', res.status);
        if(res.status.isInBlock){
          console.log(`Completed at block hash #${res.status.asInBlock.toString()}`)
        } else {
          console.log(`Current status: ${res.status.type}`)
        }}
      ).catch((err) => {
        console.error('Error [][][]', err)
      })
  
      console.log('Hash ===>>>', hash)
   
  }


  return (
    <AuthWrapper>
      <Header centerText="Send" backHandler={() => console.log('object')} />

      <MainContent>
        <MainText m={'8px'} className={mainHeadingfontFamilyClass}>
          From
        </MainText>
        <FromAccount>
          <HorizontalContentDiv>
            <PlainIcon></PlainIcon>
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

        <VerticalContentDiv mb={'25px'}>
          <MainText m={'8px'} className={mainHeadingfontFamilyClass}>
            To
          </MainText>
          <StyledInput
            placeholder="Search Address"
            value={accountTo}
            className={subHeadingfontFamilyClass}
            onChange={t => setAccountTo(t)}
            fontSize={'14px'}
            height={'20px'}
          />
        </VerticalContentDiv>

        <VerticalContentDiv mb="150px">
          <MainText m={'8px'} className={mainHeadingfontFamilyClass}>
            Amount
          </MainText>
          <StyledInput
            placeholder="Amount"
            type={'number'}
            value={amount}
            className={subHeadingfontFamilyClass}
            onChange={t => {
              console.log(t);
              if (t) {
                setAmount(t);
              }
            }}
            fontSize={'14px'}
            height={'20px'}
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
        <Button text={'Next'} handleClick={() => setIsSendModalOpen(true)} />
      </CenterContent>
      <ConfirmSend
        // accountFrom={accountFrom}
        accountTo={accountTo}
        amount={amount}
        open={isSendModalOpen}
        handleClose={() => setIsSendModalOpen(false)}
        handleConfirm={sendTransaction}
        style={{
          width: '78%',
          height: 300,
          background: '#141414',
          p: 2,
          px: 2,
          pb: 3,
        }}
      />
    </AuthWrapper>
  );
};

export default Send;
