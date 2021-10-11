import React, { useState } from 'react';

import { Input } from '@mui/material';
import { styled } from '@mui/system';

import { Option, OptionDiv } from './StyledComponents';
import { fonts } from '../../../utils';
import { Link, Redirect } from "react-router-dom";
import { setLoggedIn, setPublicKey } from '../../../redux/slices/account'

import {
  AuthWrapper,
  Header,
  Button,
  MainHeading,
  SubHeading,
  SubMainWrapperForAuthScreens,
} from '../../../components';
import { useHistory } from 'react-router-dom'
import TextField from "@material-ui/core/TextField";
import { useDispatch } from 'react-redux'

import { AccountCreation } from '../../../ToolBox/accounts';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

function ImportWallet(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [selectedType, setSelectedType] = useState('');
  const [seedPhrase, setSeedPhrase] = useState()
  
  const handleChange = (input) => {
    console.log('Import wallet from seed working', input)
    setSeedPhrase(input)
  }

  const TextArea = styled(Input)`
    width: 89%;
    border-radius: 8px;
    padding-left: 25px;
    padding-right: 25px;
    padding-top: 13px;
    padding-bottom: 13px;
    color: #fafafa;
    font-size: 16px;
  `;

  const handleSubmit = async () => {
    try{

      console.log('Handle click', seedPhrase)

      let data = {name:"hello world", password: "password", seed: seedPhrase}  ; 
      const res = await AccountCreation(data)
      // dispatch(setLoggedIn(true));
      dispatch(setPublicKey(res.address))
      // dispatch(setWalletPassword(hashedPassword))
      // console.log('Push to dashboard')
      // currentUser.account.isLoggedIn &&
      //         currentUser.account.publicKey
      
      history.push('/dashboard')
      // <Redirect to= '/dashboard' >
    }catch(err){
      console.log('Error', err)
      throw err
    }
  }

  const TypeSeedPhrase = () => {
    return (
    <div>
      <MainHeading className={mainHeadingfontFamilyClass}>
        Place your seed here :
      </MainHeading>
      <TextArea
        rows={7}
        multiline={true}
        disableUnderline={true}
        style={{ background: '#212121' }}
      />
    </div>
    )
    };

  return (
    <AuthWrapper>
      <Header centerText="Import Wallet" />
      <div>
        <MainHeading className={mainHeadingfontFamilyClass}>
          Restore your wallet{' '}
        </MainHeading>
        <SubHeading className={subHeadingfontFamilyClass}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat
          cursus sit diam Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Volutpat cursus sit diam{' '}
        </SubHeading>
      </div>
      <SubMainWrapperForAuthScreens flexDirection={'column'}>
        <MainHeading className={mainHeadingfontFamilyClass}>
          Select Type :{' '}
        </MainHeading>
        <OptionDiv>
          <Option
            onClick={() => setSelectedType('seed')}
            selected={selectedType === 'seed'}
            className={mainHeadingfontFamilyClass}>
            Seed Phrase
          </Option>
          <Option
            onClick={() => setSelectedType('json')}
            className={mainHeadingfontFamilyClass}
            selected={selectedType === 'json'}>
            Json File
          </Option>
        </OptionDiv>
        {selectedType === 'seed' &&  <div>
      <MainHeading className={mainHeadingfontFamilyClass}>
        Place your seed here :
      </MainHeading>
      <TextField onChange={(e) => handleChange(e.target.value)}   rows={7} multiline={true} style={{ background: '#212121' }} />
    </div>  }
      </SubMainWrapperForAuthScreens>
      <div className="btn-wrapper">
        <Button text="Import" handleClick={handleSubmit} />
      </div>
    </AuthWrapper>
  );
}

export default ImportWallet;
