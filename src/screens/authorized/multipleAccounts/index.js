import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Header, Button } from '../../../components';
import {
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
import AccountList from './account';
import DrivedAccountList from './drivedAccount';
import { helpers } from '../../../utils';
import accounts from '../../../utils/accounts';

const { GenerateSeedPhrase } = accounts;

const { addressModifier } = helpers;

function MultipleAccounts() {
  const dispatch = useDispatch();
  const history = useHistory();
  const allAccounts = useSelector((state) => state.accounts);

  const [seedToPass, setSeedToPass] = useState('');
  const [derivedDropDown, setDerivedDropDown] = useState(true);

  // generate new seed for parent account
  useEffect(() => {
    try {
      const newSeed = GenerateSeedPhrase();
      setSeedToPass(newSeed);
    } catch (error) {
      console.log('ERROR while generating new seed for parent account', error);
    }
  }, [dispatch]);

  const checkDrivedDropdownOpen = (data) => {
    setDerivedDropDown(data);
    console.log('checkDrivedDropdownOpen ---->', derivedDropDown);
    return data;
  };

  const [userAccounts, setUserAccounts] = useState({
    parentAccounts: [],
    childAccounts: [],
  });

  //  Account Drop Down
  // const [anchorEl, setAnchorEl] = useState(null);
  // const open = Boolean(anchorEl);
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  //  Drop Down End

  const btn = {
    text: 'Create New Account',
    width: '326px',
    height: '50px',
    fontSize: '18px',
    handleClick: () => history.push({
      pathname: '/ShowSeed',
      state: { seedToPass },
    }),
    // disabled: ,
  };

  useEffect(() => {
    const parentChildR = () => {
      Object.values(allAccounts).map((account) => {
        if (!account.parentAddress) {
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
              derivedDropDown,
            };

            const derivedChild = () => {
              // eslint-disable-next-line no-plusplus
              for (let i = 0; i < userAccounts.childAccounts.length; i++) {
                const childAccountActive = () => {
                  console.log('Testing something child==>>', userAccounts.childAccounts[i]);
                  // dispatch(setSeed(userAccounts.childAccounts[i].seed));
                  dispatch(setPublicKey(userAccounts.childAccounts[i].publicKey));
                  dispatch(setAccountName(userAccounts.childAccounts[i].accountName));
                  history.push('/');
                };

                if (
                  userAccounts.childAccounts[i].parentAddress === account.publicKey
                ) {
                  const drivedAccountList = {
                    childAccount: userAccounts.childAccounts[i],
                    childAccountActive,
                    checkDrivedDropdownOpen,
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

            return (
              <>
                <Div key={account.publicKey} mt="28px">
                  {/* Account List 01 */}
                  <MarginSet>
                    <AccountList {...accountList} />
                    {/* If there is Drived Account */}
                    {derivedChild()}

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
                </Div>
              </>
            );
          })}
      </WrapperScroll>

      <ButtonDiv>
        <Button {...btn} />
      </ButtonDiv>

    </Wrapper>
  );
}

export default MultipleAccounts;
