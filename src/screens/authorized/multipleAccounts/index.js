/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Header, Button } from '../../../components';
import {
  setAccountCreationStep,
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
import { resetTransactions } from '../../../redux/slices/transactions';
import services from '../../../utils/services';

const { addressMapper } = services;

const { GenerateSeedPhrase } = accounts;

const { addressModifier } = helpers;

function MultipleAccounts(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const allAccounts = useSelector((state) => state.accounts);
  const { prefix } = useSelector((state) => state.activeAccount);

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

  console.log('userAccounts-------------', userAccounts);

  //  Account Drop Down
  // const [anchorEl, setAnchorEl] = useState(null);
  // const open = Boolean(anchorEl);
  // const handleClick = (event) => {
  //   Object.values(allAccounts).map((acc) => {
  //     if (acc.publicKey === ) {
  //       setAnchorEl(event.currentTarget);
  //     }
  //     return null;
  //   });
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  //  Drop Down End

  const btn = {
    text: 'Create New Account',
    width: '300px',
    fontSize: '18px',
    handleClick: () => {
      dispatch(setAccountCreationStep(1));
      history.push({
        pathname: '/ShowSeed',
        state: { seedToPass },
      });
    },
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

  const accountActive = (pk, name) => {
    const publicKeyOfRespectiveChain = addressMapper(pk, prefix);
    console.log('In multiple accounts publick key of respective chain [][][]', { pk }, publicKeyOfRespectiveChain);
    // dispatch(setSeed(account.seed));
    dispatch(setPublicKey(publicKeyOfRespectiveChain));
    dispatch(setAccountName(name));
    dispatch(resetTransactions());
    history.push('/');
  };

  const derivedChildAccount = () => {
    dispatch(setDerivedAccountModal(true));
  };

  const allParentAddresses = userAccounts.parentAccounts.map((pAcc) => pAcc.publicKey);

  const allChildsWithoutParents = userAccounts.childAccounts.filter((childAccount) => !allParentAddresses.includes(childAccount.parentAddress));

  console.log('allChildsWithoutParents', { allChildsWithoutParents, allParentAddresses });

  // eslint-disable-next-line no-unused-vars
  const derivedChildWithoutParents = () => allChildsWithoutParents.map((account) => {
    const accountList = {
      publicKey: addressModifier(account.publicKey),
      publicKeyy: account.publicKey,
      accountName: account.accountName,
      accountActive: () => accountActive(account.publicKey, account.accountName),
      derivedChildAccount,
      account,
      derivedDropDown,
      childAccounts: userAccounts.childAccounts,
      marginBottom: '10px',
      marginTop: '10px',
    };
    return <AccountList key={account.publicKey} {...accountList} />;
  });

  // // eslint-disable-next-line array-callback-return
  // userAccounts.childAccounts.map((childAccount, i) => {
  //   if (
  //   // childAccount.parentAddress !== account.publicKey
  //     childAccount.parentAddress
  //   ) {
  //     console.log('not found', childAccount.parentAddress);
  //     const childWithoutParents = {
  //       publicKey: addressModifier(childAccount.publicKey),
  //       publicKeyy: childAccount.publicKey,
  //       accountName: childAccount.accountName,
  //       // eslint-disable-next-line max-len
  //       accountActive: () => accountActive(childAccount.publicKey, childAccount.accountName),
  //       derivedChildAccount,
  //       account: childAccount,
  //       derivedDropDown: false,
  //     };
  //     console.log('childWithoutParents', childWithoutParents);

  //     // eslint-disable-next-line no-else-return
  //   } else {
  //     console.log('found', childAccount.publicKey);
  //     // return <AccountList {...childWithoutParents} />;
  //   }
  // });

  // return null;

  const childAccountActive = (pk, name) => {
    const publicKeyOfRespectiveChain = addressMapper(pk, prefix);
    console.log('In multiple accounts publick key of respective chain [][][]', { pk }, publicKeyOfRespectiveChain);
    dispatch(setPublicKey(publicKeyOfRespectiveChain));
    dispatch(setAccountName(name));
    dispatch(resetTransactions());
    history.push('/');
  };

  return (
    <Wrapper>
      <WrapperScroll>
        <Header
          centerText="Accounts"
          backHandler={() => console.log('goBack')}
        />
        {userAccounts.parentAccounts
          && userAccounts.parentAccounts.map((account) => {
            const accountList = {
              publicKey: addressModifier(account.publicKey),
              publicKeyy: account.publicKey,
              accountName: account.accountName,
              accountActive,
              derivedChildAccount,
              account,
              derivedDropDown,
              childAccounts: userAccounts.childAccounts,
            };

            const derivedChild = () => {
              // const publicKeyOfRespectiveChain = addressMapper(pk, prefix);
              // eslint-disable-next-line no-plusplus
              for (let i = 0; i < userAccounts.childAccounts.length; i++) {
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
                // eslint-disable-next-line no-else-return
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

                  {/* {derivedChildWithoutParents()} */}

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
        {derivedChildWithoutParents()}
      </WrapperScroll>

      <ButtonDiv>
        <Button {...btn} />
      </ButtonDiv>

    </Wrapper>
  );
}

export default MultipleAccounts;
