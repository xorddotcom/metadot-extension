/* eslint-disable no-unused-vars */
/* eslint-disable no-lone-blocks */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { useHistory } from 'react-router';
import { useEffect } from 'react';
import { Header, Button } from '../../../components';
import {
  resetAccountSlice,
  setAccountName,
  setPublicKey,
} from '../../../redux/slices/activeAccount';
import { setDerivedAccountModal } from '../../../redux/slices/modalHandling';
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
import { DerivedAccountModal } from '../../../components/modals/index';

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

  const dispatch = useDispatch();

  const history = useHistory();
  // const { publicKey } = useSelector((state) => state.activeAccount);

  const allAccounts = useSelector((state) => state.accounts);
  const currentUser = useSelector((state) => state);
  const curr = useSelector((state) => state.activeAccount);
  // const [state, setState] = useState();
  // console.log('All Accounts -------', allAccounts);

  //  Account Drop Down
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //  Drop Down End

  const btn = {
    text: 'Create New Account',
    width: '326px',
    height: '50px',
    fontSize: '18px',
    handleClick: () => history.push('/ImportWallet'),
    // disabled: ,
  };

  // const childAccounts = [];
  // const parentAccounts = [];

  const [userAccounts, setUserAccounts] = useState({
    parentAccounts: [],
    childAccounts: [],
  });

  useEffect(() => {
    const parentChildR = () => {
      Object.values(allAccounts).map((account) => {
        if (!account.parentKey) {
          setUserAccounts((prevState) => ({
            ...prevState,
            parentAccounts: [account, ...prevState.parentAccounts],
          }));
        } else {
          setUserAccounts((prevState) => ({
            ...prevState,
            childAccounts: [account, ...prevState.childAccounts],
          }));
        }
        return null;
      });
    };

    parentChildR();
  }, [allAccounts]);

  const checkUser = () => {
    if (userAccounts.parentAccounts || userAccounts.childAccounts) {
      console.log('asdasdad===', userAccounts);
      userAccounts.parentAccounts.map((parent, index) => {
        console.log('map parent --------', parent);
        userAccounts.childAccounts.map((child) => {
          console.log('map child ------', child);
          if (parent.publicKey === child.parentKey) {
            console.log('--------------------------------');
            console.log(
              `${index} times ${parent.publicKey}===${child.parentKey}`,
            );
            console.log(parent, index);

            // const items = userAccounts.parentAccounts;
            // const item = {
            //   ...items[index],
            //   cildAcc: 'hello world',
            // };
            // items[index] = item;

            // setUserAccounts((prevState) => ({
            //   ...prevState,
            //   parentAccounts: [...items],
            // }));

            console.log('--------------------------------');
            console.log('--------------------------------');
            console.log('after========', parent, index);
            console.log('--------------------------------');
          }
          return child;
        });
        return parent;
      });
    }
  };

  // checkUser();

  return (
    <Wrapper>
      <WrapperScroll>
        <Header
          centerText="Accounts"
          backHandler={() => console.log('goBack')}
        />
        {userAccounts.parentAccounts
          && userAccounts.parentAccounts.map((account) => {
            const accountActive = () => {
              console.log('Testing something==>>', account);
              // dispatch(setSeed(account.seed));
              dispatch(setPublicKey(account.publicKey));
              dispatch(setAccountName(account.accountName));
              history.push('/');
            };

            const derivedChildAccount = () => {
              {
                /* dispatch(setAuthScreenModal(true)); */
              }
              {
                /* if (account.seed) {
                    history.push(`/ImportWallet/${account.seed}`);
                  } */
              }
              dispatch(setDerivedAccountModal(true));
            };

            const accountList = {
              publicKey: addressModifier(account.publicKey),
              publicKeyy: account.publicKey,
              accountName: account.accountName,
              accountSeed: account.seed,
              accountActive,
              derivedChildAccount,
              account,

            };

            const abc = () => {
              // eslint-disable-next-line no-plusplus
              for (let i = 0; i < userAccounts.childAccounts.length; i++) {
                if (
                  userAccounts.childAccounts[i].parentKey === account.publicKey
                ) {
                  console.log('abc change_______', userAccounts.childAccounts[i]);
                  const childAccountActive = () => {
                    console.log('Testing something child==>>', userAccounts.childAccounts[i]);
                    // dispatch(setSeed(userAccounts.childAccounts[i].seed));
                    dispatch(setPublicKey(userAccounts.childAccounts[i].publicKey));
                    dispatch(setAccountName(userAccounts.childAccounts[i].accountName));
                    history.push('/');
                  };

                  const drivedAccountList = {
                    childAccount: userAccounts.childAccounts[i],
                    childAccountActive,
                  };
                  return (
                    <div>
                      <DrivedAccountList {...drivedAccountList} />
                    </div>
                  );
                }
              }
              return null;
            };

            {
              /* const accountCheck = () => {
                  console.log('abc123123', account.publicKey);
                }; */
            }

            return (
              <>
                <Div key={account.publicKey} mt="28px">
                  {/* Account List 01 */}
                  <MarginSet>
                    <AccountList {...accountList} />
                    {/* If there is Drived Account */}
                    {abc()}

                    {/* {account.publicKey === userAccounts.childAccounts[0].parentKey
                          && (
                          <div>
                            <DrivedAccountList {...drivedAccountList} />
                          </div>
                          )} */}
                  </MarginSet>

                  {/* <AccountDropDown
                    anchorEl={anchorEl}
                    open={open}
                    key={account.publicKey}
                    handleClose={handleClose}
                    classes={classes}
                    accountPublicKey={addressModifier(account.publicKey)}
                    derivedAccount={derivedChildAccount}
                  /> */}

                  {/* <DerivedAccountModal
                    open={currentUser.modalHandling.derivedAccountModal}
                    handleClose={() => dispatch(setDerivedAccountModal(false))}
                    accountSeed={account.seed}
                    publicKey={account.publicKey}
                    style={{
                      width: '300px',
                      background: '#141414',
                      position: 'relative',
                      bottom: 30,
                      p: 2,
                      px: 2,
                      pb: 3,
                      marginTop: '10rem',
                    }}
                  /> */}
                </Div>
              </>
            );
          })}
      </WrapperScroll>

      <ButtonDiv>
        <Button {...btn} />
      </ButtonDiv>

      {/* <DerivedAccountModal
        open={currentUser.modalHandling.derivedAccountModal}
        handleClose={() => dispatch(setDerivedAccountModal(false))}
        accountSeed={curr.seed}
        publicKey={curr.publicKey}
        style={{
          width: '300px',
          background: '#141414',
          position: 'relative',
          bottom: 30,
          p: 2,
          px: 2,
          pb: 3,
          marginTop: '10rem',
        }}
      /> */}

      {/*
      <button
        type="button"
        onClick={() => {
          console.log('clicked!');
          if (Object.values(allAccounts).length === 0) {
            console.log('jesad');
            console.log(allAccounts);
            dispatch(resetAccountSlice());
          }
        }}
      >
        hello

      </button> */}
    </Wrapper>
  );
}

export default MultipleAccounts;
