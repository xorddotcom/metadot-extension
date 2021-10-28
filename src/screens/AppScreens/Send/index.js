import React, { useEffect, useReducer, useState } from 'react';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addTransaction } from '../../../redux/slices/transactions';
import { fonts, helpers } from '../../../utils';
// eslint-disable-next-line no-unused-vars
import { getBalanceWithMultipleTokens, getBalance } from '../../../ToolBox/services';
import { setBalance } from '../../../redux/slices/account';
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
import { setIsSuccessModalOpen, setMainTextForSuccessModal, setSubTextForSuccessModal } from '../../../redux/slices/successModalHandling';

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

const { addressModifier } = helpers;

const Send = () => {
  const [loading1, setLoading1] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [loading2, setLoading2] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
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
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);

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

  const data = {
    accountFrom: currentUser.account.publicKey,
    accountTo: accountToSate.value,
    amount: amountState.value,
    hash: '',
    operation: '',
    status: '',
    chainName: currentUser.account.chainName,
    tokenName: currentUser.account.tokenName,
    transactionFee,
  };

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
    console.log('Sending transaction');
    const decimalPlaces = await api.registry.chainDecimals;
    console.log('Decimal places', decimalPlaces);
    console.log('Api [[]]', api);
    console.log('Send tranasction tx details', data);
    setLoading2(true);
    const keyring = new Keyring({ type: 'sr25519' });

    const sender = keyring.addFromUri(currentUser.account.seed);
    console.log('Sender [][]', sender.address);
    data.operation = 'Send';
    const decimals = currentUser.account.chainName === 'AcalaMandala'
      ? decimalPlaces[0] : decimalPlaces;
    // const newBalance = currentUser.account.chainName === 'AcalaMandala'
    //  ? change / 10 ** decimalPlaces[0] : change / 10 ** decimalPlaces;
    console.log('Decimals of the chain', decimals);
    const result = await api.tx.balances
      .transfer(
        accountToSate.value, amountState.value * 10 ** decimals,
      )
      .signAndSend(
        sender, async (res) => {
          console.log('Status', res.status.isInBlock);
          if (res.status.isInBlock) {
            console.log(`Completed at block hash #${res.status.asInBlock.toString()}`);
            console.log('Current status of IF', res.status.type);
            data.hash = res.status.asInBlock.toString();
            // } else {
            data.status = 'Successful';
            console.log(`Current status: ${res.status.type}`);
            console.log('Before finalized', data);
            console.log('In finalized', data);
            console.log('Res here', res);
            if (data.rpcUrl === 'wss://acala-mandala.api.onfinality.io/public-ws') {
              const bal = await getBalanceWithMultipleTokens(api, currentUser.account.publicKey);
              console.log('Balance setting in redux', bal);
              dispatch(setBalance(bal));
            } else {
              const bal = await getBalance(api, currentUser.account.publicKey);
              dispatch(setBalance(bal));
            }
            // const newBalance = await getBalance(api, sender.address);
            // console.log('New balance', newBalance);
            // dispatch(setBalance(newBalance));
            dispatch(addTransaction(data));
            setLoading2(false);
            setIsSendModalOpen(false);
            dispatch(setMainTextForSuccessModal('Transaction successfull'));
            dispatch(
              setSubTextForSuccessModal('Your transaction was successfully submitted'),
            );
            dispatch(setIsSuccessModalOpen(true));

            setTimeout(() => {
              dispatch(setIsSuccessModalOpen(false));
            }, 3500);

            // navigate to dashboard on success
            history.push('/');
          }
        },
      ).catch((err) => {
        console.error('Error [][][]', err);
      });
    console.log('Tx details after transaction', data);

    // console.log('Hash ===>>>', result.toHex());
    console.log('Hash ===>>>', result);
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
    console.log('convert tx fee', currentUser.account.tokenName);
    const splitFee = fee.split(' ');
    console.log('SPlit', splitFee);
    if (currentUser.account.tokenName[0] === 'WND') {
      return (splitFee[0] * 10 ** -3).toFixed(4);
      // return splitFee[0] * 0.001;
    }
    if (currentUser.account.tokenName[0] === 'KSM') {
      return (splitFee[0] * 10 ** -6).toFixed(4);
    }
    if (currentUser.account.tokenName === 'PLD') {
      return splitFee[0];
    }
    if (currentUser.account.tokenName === 'ACA') {
      console.log('In mACA');
      return (splitFee[0] * 10 ** -3).toFixed(4);
    }
    return true;
  };

  // eslint-disable-next-line no-unused-vars
  const handleSubmit = async () => {
    const decimalPlaces = await api.registry.chainDecimals;
    console.log('isCorrect', isCorrect);
    console.log('Handle submit running');
    try {
      if (!validateInputValues(accountToSate.value)) throw new Error('An error occurred');
      setLoading1(true);
      const info = await api.tx.balances
        .transfer(currentUser.account.publicKey, amountState.value * 10 ** decimalPlaces)
        .paymentInfo(accountToSate.value);
      console.log('info', info);
      console.log(`
    class=${info.class.toString()},
    weight=${info.weight.toString()},
    partialFee=${info.partialFee.toHuman()}
    `);

      const txFee = await
      convertTransactionFee(info.partialFee.toHuman());
      data.txFee = txFee;
      console.log('Tx fee here [][]', txFee);
      data.chainName = currentUser.account.chainName;
      setTransactionFee(txFee);
      // eslint-disable-next-line radix
      console.log('check', parseInt(amountState.value), txFee, currentUser.account.balance, (Number(amountState.value) + Number(txFee)));
      // eslint-disable-next-line radix
      console.log('check', currentUser.account.balance < (Number(amountState.value) + Number(txFee)));
      setLoading1(false);
      // checking if balance is enough to send the amount with network fee
      if (currentUser.account.balance < (Number(amountState.value) + Number(txFee))) {
        alert('balance is too low to pay network fees!');
      } else {
        setIsSendModalOpen(true);
      }
    } catch (err) {
      console.log('In catch state', error);
      setLoading1(false);
      console.log('Error in Submit [][]', err);
    }
  };

  const trimBalance = (value) => {
    const val = value.toString();
    const trimmedValue = val.slice(0, val.indexOf('.') + 6);
    return trimmedValue;
  };

  // eslint-disable-next-line no-unused-vars
  const getDetailsFromBlock = async () => {
    const signedBlock = await api.rpc.chain.getBlock('0xe4f1433292a5560ad8e699f8e28281a2266b1e2f9523c7dd0527086ffa25b876');

    // the information for each of the contained extrinsics
    signedBlock.block.extrinsics.forEach((ex, index) => {
      // the extrinsics are decoded by the API, human-like view
      console.log(index, ex.toHuman());

      const { isSigned, meta, method: { args, method, section } } = ex;

      // explicit display of name, args & documentation
      console.log(`${section}.${method}(${args.map((a) => a.toString()).join(', ')})`);
      console.log(meta.documentation.map((d) => d.toString()).join('\n'));

      // signer/nonce info
      if (isSigned) {
        console.log(`signer=${ex.signer.toString()}, nonce=${ex.nonce.toString()}`);
      }
    });
  };
  // const currentUser = useSelector((state) => state.account);

  // {addressModifier(address)}
  // address={currentUser.account.publicKey}

  return (
    <AuthWrapper>
      <Header centerText="Send" backHandler={() => console.log('object')} />

      <MainContent>
        <VerticalContentDiv mb="2px">
          <MainText m="6px" className={mainHeadingfontFamilyClass} style={{ marginBottom: '1rem' }}>
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
                  {addressModifier(currentUser.account.publicKey)}
                  {/* {`${trimBalance(currentUser.account.balance)}
                  ${currentUser.account.tokenName}`} */}
                </Balance>
              </VerticalContentDiv>
            </HorizontalContentDiv>
            {/* not in use temporarily */}
            {/* <KeyboardArrowDownIcon /> */}
          </FromAccount>
        </VerticalContentDiv>

        <VerticalContentDiv mb="2px">
          <MainText m="6px" className={mainHeadingfontFamilyClass} style={{ marginBottom: '1rem' }}>
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
          <WarningText>
            {helpers.validateAddress(accountToSate.value, currentUser.account.publicKey)}
          </WarningText>
          <div style={{ height: '1.5rem' }}>
            {!isCorrect ? (
              <WarningText>{errorMessages.invalidAddress}</WarningText>
            ) : error.address ? (
              <WarningText>{errorMessages.enterAddress}</WarningText>
            ) : null}
          </div>
        </VerticalContentDiv>
        {/* <form onSubmit={submitHandler}> */}
        <VerticalContentDiv mb="25px">
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
          <WarningText style={{ color: 'red' }}>
            {helpers.validateAmount(currentUser.account.balance, amountState.value)}
          </WarningText>
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
        {/* <button type="submit">Submit</button> */}
        {/* </form> */}
      </MainContent>
      <CenterContent>
        <Button
          text="Next"
          handleClick={handleSubmit}
          disabled={!formIsValid}
          isLoading={loading1}
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
        loading2={loading2}
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
      {/* <button
        type="button"
        onClick={() => {
          dispatch(addTransaction({ name: 'hi' }));
        }}
      >
        Set dummy data

      </button>
      <button type="button" onClick={() => console.log('Data', data)}>DATA</button>
      <button type="button" onClick={getDetailsFromBlock}>Get details from hash</button> */}
    </AuthWrapper>
  );
};

export default Send;
