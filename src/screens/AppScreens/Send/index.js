/* eslint-disable no-unused-vars */
/* eslint import/no-cycle: [2, { maxDepth: 1 }] */
import React, { useEffect, useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addTransaction } from '../../../redux/slices/transactions';
import { fonts, helpers } from '../../../utils';
// eslint-disable-next-line no-unused-vars
import { getBalanceWithMultipleTokens, getBalance } from '../../../utils/services';
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
import { decrypt } from '../../../utils/accounts';
import FromInput from './FromInput';
import ToInput from './ToInput';
import AmountInput from './AmountInput';

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
  // eslint-disable-next-line no-unused-vars
  const [insufficientBal, setInsufficientBal] = useState();
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

  const accountToChangeHandler = (e) => {
    accountDispatch({ type: 'USER_INPUT', val: e, valid: currentUser.account.publicKey });
  };

  const accountToIsValid = () => {
    accountDispatch({ type: 'IS_BLUR' });
  };

  const amountHandler = (e) => {
    setInsufficientBal();
    amountDispatch({ type: 'USER_INPUT', val: e, amountIsValid: currentUser.account.balance });
  };

  const amountIsValidHandler = () => {
    amountDispatch({ type: 'IS_BLUR' });
  };

  const sendTransaction = async () => {
    const decimalPlaces = await api.registry.chainDecimals;
    setLoading2(true);
    const keyring = new Keyring({ type: 'sr25519' });

    const decryptedSeed = decrypt(currentUser.account.seed, currentUser.account.walletPassword);
    const sender = keyring.addFromUri(decryptedSeed);
    data.operation = 'Send';
    const decimals = currentUser.account.chainName === 'AcalaMandala'
      ? decimalPlaces[0] : decimalPlaces;
    const result = await api.tx.balances
      .transfer(
        accountToSate.value, amountState.value * 10 ** decimals,
      )
      .signAndSend(
        sender, async (res) => {
          if (res.status.isInBlock) {
            data.hash = res.status.asInBlock.toString();
            data.status = 'Successful';
            if (data.rpcUrl === 'wss://acala-mandala.api.onfinality.io/public-ws') {
              const bal = await getBalanceWithMultipleTokens(api, currentUser.account.publicKey);
              dispatch(setBalance(bal));
            } else {
              const bal = await getBalance(api, currentUser.account.publicKey);
              dispatch(setBalance(bal));
            }
            dispatch(addTransaction(data));
            setLoading2(false);
            setIsSendModalOpen(false);
            dispatch(setMainTextForSuccessModal('Transaction Successful!'));
            dispatch(
              setSubTextForSuccessModal(''),
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
  };

  const validateInputValues = (address) => {
    if (currentUser.account.balance < amountState.value) {
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
    try {
      encodeAddress(isHex(address) ? hexToU8a(address) : decodeAddress(address));
      setIsCorrect(true);
      return true;
    } catch (err) {
      setIsCorrect(false);
      return false;
    }
  };

  const convertTransactionFee = (fee) => {
    const splitFee = fee.split(' ');
    if (currentUser.account.tokenName === 'WND') {
      return (splitFee[0] * 10 ** -3).toFixed(4);
    }
    if (currentUser.account.tokenName === 'KSM') {
      return (splitFee[0] * 10 ** -6).toFixed(4);
    }
    if (currentUser.account.tokenName === 'PLD') {
      return splitFee[0];
    }
    if (currentUser.account.tokenName === 'ACA') {
      return (splitFee[0] * 10 ** -3).toFixed(4);
    }
    if (currentUser.account.tokenName === 'ROC') {
      return (splitFee[0] * 10 ** -3).toFixed(4);
    }
    if (currentUser.account.tokenName === 'DOT') {
      return (splitFee[0] * 10 ** -3).toFixed(4);
    }
    return true;
  };

  // eslint-disable-next-line no-unused-vars
  const handleSubmit = async () => {
    const decimalPlaces = await api.registry.chainDecimals;
    try {
      if (!validateInputValues(accountToSate.value)) throw new Error('An error occurred');
      setLoading1(true);
      const info = await api.tx.balances
        .transfer(currentUser.account.publicKey, amountState.value * 10 ** decimalPlaces)
        .paymentInfo(accountToSate.value);

      const txFee = await convertTransactionFee(info.partialFee.toHuman());

      data.txFee = txFee;
      data.chainName = currentUser.account.chainName;
      setTransactionFee(txFee);
      setLoading1(false);
      // checking if balance is enough to send the amount with network fee
      if (currentUser.account.balance < (Number(amountState.value) + Number(txFee))) {
        setInsufficientBal(true);
        // alert('balance is too low to pay network fees!');
      } else {
        setIsSendModalOpen(true);
      }
    } catch (err) {
      setLoading1(false);
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
      const { isSigned, meta, method: { args, method, section } } = ex;

      // signer/nonce info
      if (isSigned) {
        console.log(`signer=${ex.signer.toString()}, nonce=${ex.nonce.toString()}`);
      }
    });
  };

  const fromInput = {
    addressModifier,
    currentUser,
  };

  const toInput = {
    accountToSate,
    currentUser,
    isCorrect,
    errorMessages,
    error,
    accountToChangeHandler,
    accountToIsValid,
  };

  const amountInput = {
    amountState,
    amountHandler,
    amountIsValidHandler,
    insufficientBal,
    currentUser,
    trimBalance,
    errorMessages,
    error,
  };

  const btn = {
    text: 'Next',
    handleClick: handleSubmit,
    disabled: !formIsValid || loading1,
    isLoading: loading1,
  };

  const confirmSend = {
    style: {
      width: '78%',
      background: '#141414',
      position: 'relative',
      p: 2,
      px: 2,
      pb: 3,
      mt: 15,
    },
    accountFrom: currentUser.account.publicKey,
    accountTo: accountToSate.value,
    amount: amountState.value,
    open: isSendModalOpen,
    transactionFee,
    tokenName: currentUser.account.tokenName,
    fromAccountName: currentUser.account.accountName,
    handleClose: () => setIsSendModalOpen(false),
    handleConfirm: sendTransaction,
    loading2,
  };

  return (
    <AuthWrapper>
      <Header centerText="Send" backHandler={() => console.log('object')} />

      <MainContent>
        <FromInput {...fromInput} />
        <ToInput {...toInput} />
        <AmountInput {...amountInput} />
      </MainContent>

      <CenterContent>
        <Button {...btn} />
      </CenterContent>
      <ConfirmSend
        {...confirmSend}
      />
    </AuthWrapper>
  );
};

export default Send;
