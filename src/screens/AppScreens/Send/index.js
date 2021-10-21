import React, { useEffect, useReducer, useState } from 'react';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction } from '../../../redux/slices/tansactions';
import { fonts } from '../../../utils';

import {
  AuthWrapper, Button, ConfirmSend, Header, StyledInput,
} from '../../../components';
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
const accountReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val !== action.valid };
  }
  if (action.type === 'IS_BLUR') {
    return { value: state.value, isValid: action.val !== action.valid };
  }
  return { value: '', isValid: false };
};

const amountReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    console.log('Helloooooooo', action.amountIsValid);
    return {
      value: action.val,
      isValid: action.amountIsValid >= action.val,
    };
  }

  if (action.type === 'IS_BLUR') {
    return {
      value: state.value,
      isValid: action.amountIsValid >= state.value,
    };
  }
  return { value: '', isValid: false };
};

const Send = () => {
  const dispatch = useDispatch();
  // fill this state  from redux
  // eslint-disable-next-line no-unused-vars
  const [accountFrom, setAccountFrom] = useState('');
  const [isCorrect, setIsCorrect] = useState(true);
  const [transactionFee, setTransactionFee] = useState(0);
  // const [accountTo, setAccountTo] = useState('');
  // const [amount, setAmount] = useState();
  const [error, setError] = useState({
    amountError: false,
    address: false,
  });

  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(false);

  // const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const currentUser = useSelector((state) => state);
  const { api } = currentUser.api;

  // const [accountTo, setAccountTo] = useState('');
  const [accountToSate, accountDispatch] = useReducer(accountReducer, {
    value: '',
    isValid: null,
  });
  // const [amount, setAmount] = useState('');
  const [amountState, amountDispatch] = useReducer(amountReducer, {
    value: '',
    isValid: null,
  });
  const [formIsValid, setFormIsValid] = useState(false);
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);

  const { isValid } = accountToSate;
  const { isValid: amountIsValid } = amountState;
  // eslint-disable-next-line no-unused-vars

  useEffect(() => {
    setTimeout(() => {
      setFormIsValid(isValid && amountState.isValid);
    }, 600);

    return () => {
      clearTimeout();
    };
  }, [isValid, amountIsValid, amountState.isValid]);

  // const currentUser = useSelector((state) => state);
  // const { api } = currentUser.api;
  // setAccountFrom(currentUser.account.publicKey)
  console.log('currentUser in send', currentUser);
  console.log('STATE of SEND COMPONENT', { accountFrom, accountToSate, amountState });

  const accountToChangeHandler = (e) => {
    accountDispatch({ type: 'USER_INPUT', val: e, valid: currentUser.account.publicKey });
  };

  const accountToIsValid = () => {
    accountDispatch({ type: 'IS_BLUR' });
  };

  const amountHandler = (e) => {
    amountDispatch({ type: 'USER_INPUT', val: e, amountIsValid: currentUser.account.balance });
  };

  const amountIsValidHandler = () => {
    amountDispatch({ type: 'IS_BLUR' });
  };

  const sendTransaction = async () => {
    console.log('Send transaction working', accountFrom, accountToSate, amountState);
    console.log('Api [[]]', api);

    const keyring = new Keyring({ type: 'sr25519' });

    const sender = keyring.addFromUri(currentUser.account.seed);
    console.log('Sender [][]', sender.address);

    const hash = await api.tx.balances
      .transfer(
        accountToSate.value,
        amountState.value * 1000000000000,
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
    console.log('Amount', amountState.value);
    if (currentUser.account.balance < amountState.value) {
      alert('Insufficient funds');
      throw new Error('Insufficient funds');
    }
    if (!accountToSate.value) {
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
    if (!amountState.value) {
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
      encodeAddress(isHex(address) ? hexToU8a(address) : decodeAddress(address));
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

  // eslint-disable-next-line no-unused-vars
  const handleSubmit = async () => {
    console.log('isCorrect', isCorrect);
    try {
      if (!validateInputValues(accountToSate.value)) throw new Error('An error occurred');
      const info = await api.tx.balances
        .transfer(currentUser.account.publicKey, amountState.value * 1000000000000)
        .paymentInfo(accountToSate.value);
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
    const trimmedValue = val.slice(0, val.indexOf('.') + 6);
    return trimmedValue;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      accountFrom: currentUser.account.publicKey,
      accountTo: accountToSate.value,
      amount: amountState.value,
      transactionHash: Math.round(Math.random(1 * 100)),
      amountInUSD: 109,
      operation: 'Received',
      status: 'Confirmed',
      coin: 'DOT',
      networkFee: '10',
    };
    dispatch(addTransaction(data));
    console.log('===============', data);
  };
  // console.log('Length', currentUser.account.publicKey.length);
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
            value={accountToSate.value}
            className={subHeadingfontFamilyClass}
            // prettier-ignore
            onChange={accountToChangeHandler}
            onBlur={accountToIsValid}
            fontSize="14px"
            height="20px"
            isCorrect={accountToSate.isValid}
          />
          <div style={{ height: '1.5rem' }}>
            {!isCorrect ? (
              <WarningText>{errorMessages.invalidAddress}</WarningText>
            ) : error.address ? (
              <WarningText>{errorMessages.enterAddress}</WarningText>
            ) : null}
          </div>
        </VerticalContentDiv>
        <form onSubmit={submitHandler}>
          <VerticalContentDiv mb="150px">
            <MainText m="8px" className={mainHeadingfontFamilyClass}>
              Amount
            </MainText>
            <StyledInput
              placeholder="Amount"
              type="number"
              value={amountState.value}
              className={subHeadingfontFamilyClass}
            // prettier-ignore
              // onChange={(t) => {
              //   console.log(t);
              //   if (t) {
              //     setAmount(t);
              //   }
              // }}
              onChange={amountHandler}
              fontSize="14px"
              height="20px"
              onBlur={amountIsValidHandler}
              isCorrect={amountState.isValid}
            />
            <CalculatedAmount>
              <EquivalentInUSDT className={subHeadingfontFamilyClass}>$23.212</EquivalentInUSDT>
              <Balance textAlign="end" className={subHeadingfontFamilyClass}>
                {`${trimBalance(currentUser.account.balance)} ${currentUser.account.tokenName}`}
              </Balance>
            </CalculatedAmount>
            <div style={{ height: '1.5rem' }}>
              {error.amountError ? <WarningText>{errorMessages.enterAmount}</WarningText> : null}
            </div>
          </VerticalContentDiv>
          <button type="submit">Submit</button>
        </form>
      </MainContent>
      <CenterContent>
        <Button
          text="Next"
          handleClick={() => setIsSendModalOpen(true)}
          disabled={!formIsValid}
        />
      </CenterContent>
      <ConfirmSend
        accountFrom={currentUser.account.publicKey}
        accountTo={accountToSate.value}
        amount={amountState.value}
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
