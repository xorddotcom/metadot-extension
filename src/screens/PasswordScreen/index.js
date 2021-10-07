import React, { useState } from 'react'
// import TextField from "@material-ui/core/TextField";
import TextField from '@mui/material/TextField'
import { useSelector, useDispatch } from 'react-redux';
import web3 from 'web3'
import { useHistory } from 'react-router-dom';
import { setLoggedIn, 
  emptyReduxState 
} from '../../redux/slices/account'
import AppLogo from '../../assets/images/Group.svg'
import {
  StyledInput,
  Button
} from '../../components';
import { fonts } from '../../utils'

export const PasswordScreen = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

  const [password, setPassword] = useState('')

  const [showPassword, setShowPassword] = useState(false);

  const currentUser = useSelector(state => state.account);
  console.log('Current user', currentUser)

  const handleChange = (e) => {
    setPassword(e)
  }

  const handleSubmit = () => {
    console.log("password", password)
    if(!password) {
      alert('Please enter password') 
      return false
    }
    console.log('current user', currentUser.walletPassword)
    // console.log('Password', password)
    const hashedPassword = web3.utils.sha3(password)
    console.log('Hashed password', hashedPassword)
    if(hashedPassword == currentUser.walletPassword) {
      dispatch(setLoggedIn(true))
      alert('Password matched');
      history.push('/dashboard')
    }
    else alert('Password does not match')
  }
  
    return (
        <div>
          <div>
          <img src={AppLogo} style={{margin: '50px auto'}} alt="Logo" />
          </div>
          <div>
           <StyledInput
          placeholder="password"
          // className={subHeadingfontFamilyClass}
          value={password}
          onChange={t => setPassword(t)}
          // onChange={(t) => console.log(t)}
          type="password"
          typePassword={true}
          hideHandler={() => setShowPassword(!showPassword)}
          hideState={showPassword}
          rightIcon={true}
        />
          </div>
        <div 
        style={{margin: '40px'}}
        // style={{
        //     // position: 'absolute',
        //     // top: '50%',
        //     // left: '50%',
        //     // margin: '-25px 0 0 -25px',
        // }} 
        >

        <Button handleClick={handleSubmit} text="Continue" />
        </div>

      <button onClick={() => {dispatch(emptyReduxState());  dispatch(setLoggedIn(false))}} >Clear Redux</button>
      
        </div>
    )
}