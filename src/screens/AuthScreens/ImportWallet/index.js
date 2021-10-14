import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { useDispatch } from 'react-redux';

import { Option, OptionDiv } from './StyledComponents';
import { fonts } from '../../../utils';
import {
  setPublicKey, setLoggedIn, setBalance, setSeed,
} from '../../../redux/slices/account';
import { setApi } from '../../../redux/slices/api';

import {
  AuthWrapper,
  Header,
  Button,
  MainHeading,
  SubHeading,
  SubMainWrapperForAuthScreens,
} from '../../../components';

// eslint-disable-next-line import/namespace
import { AccountCreation } from '../../../ToolBox/accounts';
import constants from '../../../constants/onchain';
import { getBalance } from '../../../ToolBox/services';

const {
  WsProvider, ApiPromise,
} = require('@polkadot/api');

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

function ImportWallet() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [selectedType, setSelectedType] = useState('');
  const [seedPhrase, setSeedPhrase] = useState();

  const handleChange = (input) => {
    console.log('Import wallet from seed working', input);
    setSeedPhrase(input);
  };

  // const TextArea = styled(Input)`
  //   width: 89%;
  //   border-radius: 8px;
  //   padding-left: 25px;
  //   padding-right: 25px;
  //   padding-top: 13px;
  //   padding-bottom: 13px;
  //   color: #fafafa;
  //   font-size: 16px;
  // `;

  const handleSubmit = async () => {
    try {
      console.log('Handle click', seedPhrase);

      const data = { name: 'hello world', password: 'password', seed: seedPhrase };
      const res = await AccountCreation(data);
      console.log('Res', res);
      // dispatch(setWalletPassword(hashedPassword))
      // console.log('Push to dashboard')
      // currentUser.account.isLoggedIn &&
      //         currentUser.account.publicKey

      const wsProvider = new WsProvider(constants.Polkadot_Rpc_Url);
      const api = await ApiPromise.create({ provider: wsProvider });
      await api.isReady;

      dispatch(setLoggedIn(true));
      dispatch(setPublicKey(res.address));
      dispatch(setSeed(seedPhrase));

      const balance = await getBalance(api, res.address);
      dispatch(setBalance(balance));

      dispatch(setApi(api));
      history.push('/');
      // <Redirect to= '/dashboard' >
    } catch (err) {
      console.log('Error', err);
      throw err;
    }
  };

  // const TypeSeedPhrase = () => (
  //   <div>
  //     <MainHeading className={mainHeadingfontFamilyClass}>
  //       Place your seed here :
  //     </MainHeading>
  //     <TextArea
  //       rows={7}
  //       multiline
  //       disableUnderline
  //       style={{ background: '#212121' }}
  //     />
  //   </div>
  // );

  return (
    <AuthWrapper>
      <Header centerText="Import Wallet" />
      <div>
        <MainHeading className={mainHeadingfontFamilyClass}>
          Restore your wallet
          {' '}
        </MainHeading>
        <SubHeading className={subHeadingfontFamilyClass}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat
          cursus sit diam Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Volutpat cursus sit diam
          {' '}
        </SubHeading>
      </div>
      <SubMainWrapperForAuthScreens flexDirection="column">
        <MainHeading className={mainHeadingfontFamilyClass}>
          Select Type :
          {' '}
        </MainHeading>
        <OptionDiv>
          <Option
            onClick={() => setSelectedType('seed')}
            selected={selectedType === 'seed'}
            className={mainHeadingfontFamilyClass}
          >
            Seed Phrase
          </Option>
          <Option
            onClick={() => setSelectedType('json')}
            className={mainHeadingfontFamilyClass}
            selected={selectedType === 'json'}
          >
            Json File
          </Option>
        </OptionDiv>
        {selectedType === 'seed' && (
        <div>
          <MainHeading className={mainHeadingfontFamilyClass}>
            Place your seed here :
          </MainHeading>
          <TextField onChange={(e) => handleChange(e.target.value)} rows={7} multiline style={{ background: '#212121' }} />
        </div>
        ) }
      </SubMainWrapperForAuthScreens>
      <div className="btn-wrapper">
        <Button text="Import" handleClick={handleSubmit} />
      </div>
    </AuthWrapper>
  );
}

export default ImportWallet;
