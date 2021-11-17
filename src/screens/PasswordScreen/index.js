import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import web3 from 'web3';
import { useHistory } from 'react-router-dom';
import {
  setLoggedIn,
} from '../../redux/slices/account';
// import AppLogo from '../../assets/images/Group.svg';
import {
  StyledInput,
  Button,
} from '../../components';

const PasswordScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const currentUser = useSelector((state) => state.account);

  const handleSubmit = () => {
    if (!password) {
      return false;
    }
    const hashedPassword = web3.utils.sha3(password);

    if (hashedPassword === currentUser.walletPassword) {
      dispatch(setLoggedIn(true));
      history.push('/dashboard');
    } else alert('Password does not match');
    return null;
  };

  const styledInputPassword = {
    placeholder: 'password',
    value: password,
    onChange: (t) => setPassword(t),
    type: 'password',
    hideHandler: () => setShowPassword(!showPassword),
    hideState: showPassword,
  };

  const btn = {
    handleClick: handleSubmit,
    text: 'Continue',
  };

  return (
    <div>
      {/* <div>
        <img src={AppLogo} style={{ margin: '50px auto' }} alt="Logo" />
      </div> */}
      <div>
        <StyledInput
          {...styledInputPassword}
          typePassword
          rightIcon
        />
      </div>
      <div
        style={{ margin: '40px' }}
      >
        <Button {...btn} />
      </div>
    </div>
  );
};

export default PasswordScreen;
