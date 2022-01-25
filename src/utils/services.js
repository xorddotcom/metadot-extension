/* eslint-disable no-unused-vars */
import { options as AcalaOptions } from '@acala-network/api';
import { formatBalance, BN_HUNDRED } from '@polkadot/util';
import { encodeAddress } from '@polkadot/util-crypto';
import constants from '../constants/onchain';
import accounts from './accounts';

const { WsProvider, ApiPromise, Keyring } = require('@polkadot/api');

const { ACALA_MANDALA_CONFIG } = constants;
const { decrypt } = accounts;

const getSender = async (seed) => {
  const keyring = new Keyring({ type: 'sr25519' });
  const sender = await keyring.addFromUri(seed);
  return sender;
};

// prettier-ignore
const providerInitialization = async (rpc) => {
  // eslint-disable-next-line no-underscore-dangle
  const _provider = new WsProvider(rpc);
  let apiR;

  if (rpc === ACALA_MANDALA_CONFIG.RPC_URL) {
    apiR = await ApiPromise.create(AcalaOptions({ provider: _provider }));
  } else {
    apiR = await ApiPromise.create({ provider: _provider });
  }
  return apiR;
};

const getBalance = async (api, account) => {
  const tokenLength = await api.registry.chainTokens.length;
  if (tokenLength > 1) {
    const balance = await getBalanceWithMultipleTokens(api, account);
    return balance;
  }
  const balance = await getBalanceWithSingleToken(api, account);
  return balance;
};

const getBalanceWithSingleToken = async (api, acc) => {
  const { data: balance } = await api.query.system.account(acc);
  const userBalance = formatBalance(balance.free, { decimals: api.registry.chainDecimals[0], forceUnit: '-', withUnit: false });
  return parseFloat(userBalance);
};

// Get balance of a chain with multiple tokens
const getBalanceWithMultipleTokens = async (api, account) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const [now, { nonce, data: balances }] = await Promise.all([
      api.query.timestamp.now(),
      api.query.system.account(account),
    ]);

    const userBalance = formatBalance(balances.free, { decimals: api.registry.chainDecimals[0], forceUnit: '-', withUnit: false });
    return parseFloat(userBalance);
  } catch (err) {
    throw err;
  }
};

const getTransactionFee = async (api, sender, recipient, decimalPlaces, amount) => {
  const info = await api.tx.balances
    .transfer(sender, amount * 10 ** decimalPlaces)
    .paymentInfo(recipient);

  return info;
};

async function main(currentUser, setLiveBalanceInRedux) {
  const { api } = currentUser.api;
  const { publicKey } = currentUser.activeAccount.publicKey;
  // Retrieve the initial balance. Since the call has no callback, it is simply a promise
  // that resolves to the current on-chain value
  let {
    data: { free: previousFree },
    // nonce: previousNonce,
  } = await api.query.system.account(publicKey);
    // const decimalPlaces = await api.registry.chainDecimals;
    // Here we subscribe to any balance changes and update the on-screen value
  api.query.system.account(
    publicKey,
    // eslint-disable-next-line consistent-return
    ({ data: { free: currentFree } }) => {
      // Calculate the delta
      const change = currentFree.sub(previousFree);

      // Only display positive value changes (Since we are pulling `previous` above already,
      // the initial balance change will also be zero)
      if (!change.isZero()) {
        const bal = getBalance(api, publicKey)
          .then((res) => {
            console.log('balance from main', res);
            setLiveBalanceInRedux(res);
          })
          .catch((err) => console.log('Err', err));
          // const newBalance = chainName === 'AcalaMandala' ? change / 10 ** decimalPlaces[0] :
          //  change / 10 ** decimalPlaces;
          // dispatch(setBalance(newBalance + balance));

        previousFree = currentFree;
        return bal;
      }
    },
  );
}

function getLiveBalance(currentUser) {
  console.log('MAIN STARTS');
  main(currentUser).catch(console.error);
  console.log('MAIN END');
}

// unused experimental functions

const getbalanceKarura = async (currentUser) => {
  console.log('Working here [][]');
  const provider = new WsProvider('wss://karura-rpc-0.aca-api.network');
  const apiK = await ApiPromise.create({ provider });
  console.log('Api initialized');
  // const bal2 = await getBalance(apiK, currentUser.activeAccount.publicKey);
  // console.log('Single token', bal2);
  const bal = await getBalance(apiK, currentUser.activeAccount.publicKey);
  console.log('Multiple tokens', bal);
};

const getExistentialDeposit = async (currentUser) => {
  const data = await currentUser.api.api.consts.balances.existentialDeposit;
  console.log('Data', data);

  // const base = new BN(10).pow(new BN(10));
  // console.log('To unit working 2', base);
  // const dm = new BN(data.words[1]).divmod(base);
  // console.log('In to unit', `${dm.div.toString()}.${dm.mod.toString()}`);
  const decimalPlaces = await currentUser.api.api.registry.chainDecimals[0];
  console.log('Decimals', decimalPlaces);
  // const res = await toUnit(data.words[1], decimalPlaces);

  /// /////////////////////////////////////////////////////////////////
  /// ////// This is for the existential deposit stuff ////////////////
  /// /////////////////////////////////////////////////////////////////

  // This is for Westend
  // const existentialDeposit = 10 * 10 ** -3;

  // This is for Polkadot
  const existentialDeposit = 1;

  // This is for Kusama
  // const existentialDeposit = 0.000033333333;

  // This is for Karura
  // const existentialDeposit = 0.1;

  // This is for Rococo
  // const existentialDeposit = 10 * 10 ** -3;

  // This is for Dusty
  // const existentialDeposit = 1 * 10 ** -3;

  const balance = existentialDeposit * 10 ** decimalPlaces;

  console.log('Balance', balance);
  console.log('Existential deposit', currentUser.api.api.consts.balances.existentialDeposit);
  // eslint-disable-next-line eqeqeq
  if (balance == currentUser.api.api.consts.balances.existentialDeposit) {
    console.log('Balance is equal to existenial deposit');
  } else if (balance > currentUser.api.api.consts.balances.existentialDeposit) {
    console.log('Balance is greater');
  } else if (balance < currentUser.api.api.consts.balances.existentialDeposit) {
    console.log('Balance is less');
  }
  // console.log('Existential deposit',
  // dot.gt(currentUser.api.api.consts.balances.existentialDeposit));
  // console.log('Res', res);
};

const doTransaction = async (currentUser) => {
  const keyring = new Keyring({ type: 'sr25519' });

  const res = await decrypt(currentUser.activeAccount.seed, 'helloworldA1');
  const sender = keyring.addFromUri(res);

  const hash = await currentUser.api.api.tx.balances
    .transfer(
      '5GjSQRFYEFBY1nmVuGHTyKkRHrodQmUKdA7kWzfmfLp262xG',
      1,
    )
    .signAndSend(
      sender,
    ).then((resp) => console.log('Res', resp.toHex()))
    .catch((err) => {
      console.error('Error [][][]', err);
    });

  console.log('Hash ===>>>', hash);
};

const sendTransaction = async (currentUser) => {
  console.log('Working');
  try {
    console.log('a');
    console.log('b');
    console.log('c');
    const keyring = new Keyring({ type: 'sr25519' });
    const res = await decrypt(currentUser.activeAccount.seed, 'helloworldA1');
    console.log('res []][]', res);
    console.log('Currencies here [][]', currentUser.api.api.tx.currencies);
    const sender = keyring.addFromUri(res);
    const hash = await currentUser.api.api.tx.currencies
      .transfer(
        '5Dz1i42ygyhi4BxPnvKtRY4TBShTMC9T2FvaMB8CWxoU3QgG',
        {
          Token: 'KSM',
        },
        '10000000000',
      )
      .signAndSend(sender, async ({ status, events }) => {
        if (status.isInBlock) {
          console.log('Status', status.isInBlock, status.isFinalized);
          console.log('EVents', events);
          const hash1 = status.asInBlock.toString();
          console.log('Hash before tx ', hash1);
        }
      });
    console.log('Hash after tx', hash);
    // // const decimals = currentUser.activeAccount.chainName === 'AcalaMandala'
    // //   ? decimalPlaces[0] : decimalPlaces;
    // // api.tx.balancs.transferAll
    // const result = await currentUser.api.api.tx.balances
    //   .transfer(
    //     '5Dz1i42ygyhi4BxPnvKtRY4TBShTMC9T2FvaMB8CWxoU3QgG', {
    //       Token: 'AUSD',
    //     }, 1 * 10 ** 11,
    //   )
    //   .signAndSend(
    //     sender, async ({ status, events }) => {
    //       console.log('Status', status.isInBlock, status.isFinalized);
    //       console.log('EVents', events);
    //       const hash = status.asInBlock.toString();
    //       console.log('Hash', hash);
    //       // }
    //     },
    //   ).catch((err) => {
    //     alert('Transaction failed');
    //     console.error('Error [][][]', err);
    //   });
  } catch (err) {
    // alert('An error occurred');
    console.log('Error', err);
  }
};

const formatNumber = (number, decimals) => {
  if (number.toString() === '0') return '0';
  return (Number(number.toString()) / 10 ** decimals).toFixed(5);
};

const getMultipleTokensBalance = async (currentUser) => {
  const { data: balance } = await currentUser.api.api.query.system.account(
    currentUser.activeAccount.publicKey,
  );
  console.log('In service balance', balance.reserved);

  const userBalanceSingleToken = formatBalance(balance.free, { decimals: 13, forceUnit: '-', withUnit: false });
  console.log('Shehryaer --==++', userBalanceSingleToken, typeof abc, parseFloat(userBalanceSingleToken));

  const tokenData = await currentUser.api.api.query.tokens.accounts('tFBV65Ts7wpQPxGM6PET9euNzp4pXdi9DVtgLZDJoFveR9F', {
    Token: 'AUSD',
  });
  console.log('Hello world', tokenData.toHuman());

  console.log('All tokens', await currentUser.api.api.registry.chainTokens);
  console.log('All decimals of tokens', await currentUser.api.api.registry.chainDecimals);
  const res = await currentUser.api.api.query.tokens.accounts('sy1cgqqAMSpho1j7ANf8ghyKMwdYY4dDBHHbkoXvGbSXGqt', { Token: 'KAR' }, (resp) => {
    console.log('balance in res', resp);
    const bal = formatNumber(resp.free, 12);
    // const bal = formatBalance(res.free, 12);
    console.log('BAL here', bal);
  });
  console.log('Result [][]', res);
  const userBalance = formatBalance(res.free, { decimals: 12, forceUnit: '-', withUnit: false });
  console.log('Free balance --==++', userBalance, parseFloat(userBalance));
  const userBalance2 = formatBalance(res.frozen, { decimals: 12, forceUnit: '-', withUnit: false });
  console.log('Frozen balance --==++', userBalance2, parseFloat(userBalance2));
};

const getTxFee = async (currentUser, balance, publicKey) => {
  console.log('Tx fee running', balance, publicKey);
  const info = await currentUser.api.api.tx.balances
    .transfer(publicKey, balance)
    .paymentInfo(publicKey);

  const adjFee = info.partialFee.muln(110).div(BN_HUNDRED);
  const maxTransfer = balance - adjFee;

  console.log('Adj fee', adjFee);

  console.log('Tx fee', info.partialFee.toHuman());
  console.log('Max Transfer', maxTransfer);
};

const getBloackDetails = async (currentUser) => {
  const sender = '5Dz1i42ygyhi4BxPnvKtRY4TBShTMC9T2FvaMB8CWxoU3QgG';
  console.log('Working');
  // const block = await currentUser.api.api.rpc.chain.getBlock(
  // '0xded7e4ae1d2011f1628ee9d7e34d417cdc64c77c13e02d2ae7549d6903d7c6fd');
  // block.block.extrinsics.map((ex) => console.log(ex.hash));

  const signedBlock = await currentUser.api.api.rpc.chain.getBlock('0x39fd0ba60910643719c10c33b72c1564855d9ade04b6df6d171862458672a070');

  // the information for each of the contained extrinsics
  signedBlock.block.extrinsics.forEach((ex, index) => {
    console.log('Tx hash here', ex.hash.toHuman());
    // the extrinsics are decoded by the API, human-like view
    console.log(index, ex.toHuman());

    const { isSigned, meta, method: { args, method, section } } = ex;

    // explicit display of name, args & documentation
    console.log(`${section}.${method}(${args.map((a) => a.toString()).join(', ')})`);
    // console.log(meta.documentation.map((d) => d.toString()).join('\n'));

    // signer/nonce info
    if (isSigned) {
      // eslint-disable-next-line eqeqeq
      if (ex.signer == sender) {
        console.log('The tx hash', ex.hash.toHuman());
        // alert('Signer matched', ex.hash.toHuman());
      }
      console.log(`signer=${ex.signer.toString()}, nonce=${ex.nonce.toString()}`);
    }
  });
};

const integratePhala = async () => {
  console.log('Phala working...');
  // eslint-disable-next-line operator-linebreak
  const phalaRpcUrl =
    // 'wss://karura-rpc-0.aca-api.network';
    'wss://para2-api.phala.network/ws/';
  const wsProvider = new WsProvider(phalaRpcUrl);
  const api = await ApiPromise.create({ provider: wsProvider });
  console.log('api [][]', api);
  // console.log('Token name: ', tokenName);
  // apiR.onerror = (eve) => {
  //   console.log('eve', eve);
  //   apiR.onclose = (e) => {
  //     console.log('error [][]', e);
  //   };
  // };
  // const tokenName = await apiR.registry.chainTokens[0];
  // console.log('APi', apiR);
};

const getNetworkFee = async (currentUser) => {
  const decimalPlaces = await currentUser.api.api.registry.chainDecimals[0];
  console.log('Decimal places', decimalPlaces);
  const info = await currentUser.api.api.tx.balances
    .transfer(currentUser.activeAccount.publicKey, 10 * 10 ** decimalPlaces[0])
    .paymentInfo('5EAaiH3QU9q4J5Wr3qYtyTuVzmQnqGpu7GbAfj5Z2pFXa3uo');
  console.log('TX Info', info);
  const splitFee = info.partialFee.toHuman().split(' ');
  const fee = (splitFee[0] * 10 ** -12).toFixed(15);
  console.log('Fee', fee);
  // if (currentUser.activeAccount.tokenName === 'WND') {
  //   return (splitFee[0] * 10 ** -3).toFixed(4);
  // }
  // const txFee = await convertTransactionFee(info.partialFee.toHuman());
};

const addressMapper = (address, prefix) => {
  console.log(prefix, '||||||', address);
  const res = encodeAddress(address, prefix);
  console.log('Result ====>>', res);
  return res;
};

export default {
  providerInitialization,
  getBalance,
  getSender,
  getTransactionFee,
  getLiveBalance,
  addressMapper,
};
