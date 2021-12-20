import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { Header, Button } from '../../../components';
import {
  Wrapper,
  Div,
  ButtonDiv,
  MarginSet,
  WrapperScroll,
} from './styledComponent';
import AccountDropDown from './accountDropDown';
import AccountList from './account';
import DrivedAccountList from './drivedAccount';
import { helpers } from '../../../utils';

const { addressModifier } = helpers;

const useStyles = makeStyles(() => ({
  customWidth: {
    '& div': {
      // this is just an example, you can use vw, etc.
      background: 'transparent',
      // border: '1px solid green',
    },
  },
}));

function MultipleAccounts() {
  const classes = useStyles();

  const { publicKey } = useSelector((state) => state.account);

  //  Account Drop Down
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //  Drop Down End

  const accountList = {
    publicKey: addressModifier(publicKey),
    accountName: 'Account 0',
    handleClick,
  };

  const drivedAccountList = {
    publicKey: addressModifier(publicKey),
    handleClick,
  };

  const btn = {
    text: 'Create New Account',
    width: '326px',
    height: '50px',
    fontSize: '18px',
    handleClick: () => console.log('clicked'),
    // disabled: ,
  };

  return (
    <Wrapper>
      <WrapperScroll>
        <Header
          centerText="Accounts"
          backHandler={() => console.log('goBack')}
        />
        <Div mt="28px">
          {/* Account List 01 */}
          <MarginSet>
            <AccountList {...accountList} />
            {/* If there is Drived Account */}
            <div>
              <DrivedAccountList {...drivedAccountList} />
            </div>
          </MarginSet>

          {/* Account List 02 */}
          <MarginSet margin="1rem 0">
            <AccountList {...accountList} />
            {/* If there is Drived Account */}
            <div>
              <DrivedAccountList {...drivedAccountList} />
            </div>
          </MarginSet>
        </Div>
      </WrapperScroll>

      <AccountDropDown
        anchorEl={anchorEl}
        open={open}
        handleClose={handleClose}
        classes={classes}
      />
      <ButtonDiv>
        <Button {...btn} />
      </ButtonDiv>
    </Wrapper>
  );
}

export default MultipleAccounts;
