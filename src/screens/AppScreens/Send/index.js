import React, { useState } from 'react';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
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
import { WarningText } from '../../AuthScreens/CreateWallet/StyledComponents';

const { decodeAddress, encodeAddress } = require('@polkadot/keyring');
const { hexToU8a, isHex } = require('@polkadot/util');

const {
  // eslint-disable-next-line no-unused-vars
  Keyring,
} = require('@polkadot/api');

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

const errorMessages = {
  invalidAddress: 'Invalid address',
  enterAddress: 'Enter address',
  enterAmount: 'Enter amount',

};

const Send = () => {
  // fill this state  from redux
  // eslint-disable-next-line no-unused-vars
  const [accountFrom, setAccountFrom] = useState('');
  const [isCorrect, setIsCorrect] = useState(true);
  const [transactionFee, setTransactionFee] = useState(0);
  const [accountTo, setAccountTo] = useState('');
  const [amount, setAmount] = useState();
  const [error, setError] = useState({
    amountError: false,
    address: false,
  });

  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const currentUser = useSelector((state) => state);
  const { api } = currentUser.api;

  const sendTransaction = async () => {
    console.log('Send transaction working', accountFrom, accountTo, amount);
    console.log('Api [[]]', api);

    const keyring = new Keyring({ type: 'sr25519' });

    const sender = keyring.addFromUri(currentUser.account.seed);
    console.log('Sender [][]', sender.address);

    const hash = await api.tx.balances
      .transfer(
        accountTo,
        amount * 1000000000000,
      )
      .signAndSend(
        sender, (res) => {
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

  const validateInputValues = (address) => {
    console.log('Amount', amount);
    if (currentUser.account.balance < amount) {
      alert('Insufficient funds');
      throw new Error('Insufficient funds');
    }
    if (!accountTo) {
      setError((prevState) => ({
        ...prevState,
        address: true,
      }));
      throw new Error('Please enter address');
    }
    setError((prevState) => ({
      ...prevState,
      address: false,
    }));
    if (!isValidAddressPolkadotAddress(address)) return false;
    if (!amount) {
      console.log('Amount not present');
      setError((prevState) => ({
        ...prevState,
        amountError: true,
      }));
      throw new Error('Please enter amount');
    }
    setError((prevState) => ({
      ...prevState,
      amountError: false,
    }));
    return true;
  };

  const isValidAddressPolkadotAddress = (address) => {
    console.log('Validate this address', error);
    try {
      encodeAddress(
        isHex(address)
          ? hexToU8a(address)
          : decodeAddress(address),
      );
      setIsCorrect(true);
      return true;
    } catch (err) {
      console.log('Wrong address', err);
      setIsCorrect(false);
      return false;
    }
  };

  const convertTransactionFee = (fee) => {
    console.log('Token name', currentUser.account.tokenName);
    const splitFee = fee.split(' ');
    console.log('SPlit', splitFee);
    if (currentUser.account.tokenName[0] === 'WND') {
      return splitFee[0] * 10 ** -3;
      // return splitFee[0] * 0.001;
    }
    if (currentUser.account.tokenName[0] === 'KSM') {
      return splitFee[0] * 10 ** -6;
    }
    return true;
  };

  const handleSubmit = async () => {
    console.log('isCorrect', isCorrect);
    try {
      if (!validateInputValues(accountTo)) throw new Error('An error occurred');
      const info = await api.tx.balances.transfer(currentUser.account.publicKey,
        amount * 1000000000000).paymentInfo(accountTo);
      console.log('info', info);
      console.log(`
    class=${info.class.toString()},
    weight=${info.weight.toString()},
    partialFee=${info.partialFee.toHuman()}
    `);

      const txFee = await convertTransactionFee(info.partialFee.toHuman());

      setTransactionFee(txFee);
      setIsSendModalOpen(true);
    } catch (err) {
      console.log('In catch state', error);
      console.log('Error in Submit [][]', err);
    }
  };

  const trimBalance = (value) => {
    const val = value.toString();
    const trimmedValue = val.slice(0, (val.indexOf('.')) + 6);
    return trimmedValue;
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
                {`${trimBalance(currentUser.account.balance)} ${currentUser.account.tokenName}`}
              </Balance>
            </VerticalContentDiv>
          </HorizontalContentDiv>
          {/* not in use temporarily */}
          {/* <KeyboardArrowDownIcon /> */}
        </FromAccount>

        <VerticalContentDiv mb="25px">
          <MainText m="8px" className={mainHeadingfontFamilyClass}>
            To
          </MainText>
          <StyledInput
            placeholder="Search Address"
            value={accountTo}
            isCorrect={isCorrect}
            className={subHeadingfontFamilyClass}
            // prettier-ignore
            onChange={(t) => setAccountTo(t)}
            fontSize="14px"
            height="20px"
          />
          <div style={{ height: '1.5rem' }}>
            { !isCorrect
              ? (
                <WarningText>
                  { errorMessages
                    .invalidAddress}
                </WarningText>
              ) : error.address ? (
                <WarningText>
                  { errorMessages
                    .enterAddress}
                </WarningText>
              ) : null }
          </div>

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
              // if (t) {
              setAmount(t);
              // }
            }}
            fontSize="14px"
            height="20px"

          />
          <CalculatedAmount>
            <EquivalentInUSDT className={subHeadingfontFamilyClass}>
              $23.212
            </EquivalentInUSDT>
            <Balance textAlign="end" className={subHeadingfontFamilyClass}>
              {`${trimBalance(currentUser.account.balance)} ${currentUser.account.tokenName}`}
            </Balance>
          </CalculatedAmount>
          <div style={{ height: '1.5rem' }}>
            { error.amountError
              ? (
                <WarningText>
                  { errorMessages
                    .enterAmount}
                </WarningText>
              ) : null }
          </div>
        </VerticalContentDiv>

      </MainContent>
      <CenterContent>
        <Button text="Next" handleClick={handleSubmit} />
      </CenterContent>
      <ConfirmSend
        accountFrom={currentUser.account.publicKey}
        accountTo={accountTo}
        amount={amount}
        open={isSendModalOpen}
        transactionFee={transactionFee}
        tokenName={currentUser.account.tokenName}
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
