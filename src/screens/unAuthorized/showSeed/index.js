/* eslint-disable no-unused-vars */
/* eslint import/no-cycle: [2, { maxDepth: 1 }] */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import ContentCopyIcon from '../../../assets/images/icons/copyIcon.svg';
import {
  CopyIcon,
  CopyText,
  IndexText,
  SeedText,
  SeedWrapper,
} from './styledComponents';
import {
  AuthWrapper,
  Header,
  Button,
  MainHeading,
  SubHeading,
  SubMainWrapperForAuthScreens,
  WarningModal,
} from '../../../components';
import { fonts } from '../../../utils';
import accounts from '../../../utils/accounts';
import { setAccountCreationStep, setTempSeed } from '../../../redux/slices/activeAccount';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;
const { decrypt } = accounts;

function ShowSeed() {
  const history = useHistory();
  const location = useLocation();

  const { tempSeed } = useSelector((state) => state.activeAccount);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copy, setCopy] = useState('Copy');

  const currSeed = tempSeed;

  console.log(
    'show seed entotyasd',
    history.entries[history.entries.length - 2].pathname,
  );

  // if (history.entries[history.entries.length - 2].pathname === '/') {
  //   currSeed = location.state.seedToPass && location.state.seedToPass;
  // }

  // if (
  //   history.entries[history.entries.length - 2].pathname === '/accounts'
  //   || history.entries[history.entries.length - 2].pathname === '/ShowSeed'
  // ) {
  //   currSeed = location.state.seedToPass && location.state.seedToPass;
  // }

  const dispatch = useDispatch();

  const SinglePhrase = ({ index, phrase }) => (
    <SeedWrapper>
      <IndexText className={mainHeadingfontFamilyClass}>{index + 1}</IndexText>
      <SeedText className={mainHeadingfontFamilyClass}>{phrase}</SeedText>
    </SeedWrapper>
  );

  const copySeedText = () => {
    navigator.clipboard.writeText(currSeed);
    setCopy('Copied');
  };

  const span = {
    width: '100px',
    style: { width: '200px', visibility: 'hidden' },
  };

  const contentCopyIcon = {
    id: 'copy-seed',
    onClick: () => {
      copySeedText();
      // for maintaining extension state if user closes it for pasting the seed
      dispatch(setTempSeed(currSeed));
    },
    onMouseOver: () => setCopy('Copy'),
    style: { cursor: 'pointer' },
  };

  const btn = {
    id: 'seed-continue',
    width: '300px',
    text: 'Continue',
    handleClick: () => setIsModalOpen(true),
  };

  const warningModal = {
    open: isModalOpen,
    handleClose: () => setIsModalOpen(false),
    onConfirm: () => {
      // for maintaining extension state if user closes it for pasting the seed
      dispatch(setAccountCreationStep(2));

      history.push({
        pathname: '/ConfirmSeed',
        state: { seedToPass: location.state.seedToPass },
      });
    },
    style: {
      width: '290px',
      background: '#141414',
      position: 'relative',
      bottom: 30,
      p: 2,
      px: 2,
      pb: 3,
    },
    mainText: 'Warning',
    subText:
      'Proceeding will not let you view your mnemonic again. Do you still wish to continue?',
  };

  return (
    <AuthWrapper>
      <Header
        centerText="Seed Phrase"
        backHandler={() => {
          console.log('goBack');
          dispatch(setTempSeed(''));
          dispatch(setAccountCreationStep(0));
        }}
      />
      <div style={{ marginTop: '29px' }}>
        <MainHeading className={mainHeadingfontFamilyClass}>
          Write down your seed phrase :
        </MainHeading>
        <SubHeading className={subHeadingfontFamilyClass} fontSize="0.8rem">
          Please note down your mnemonic seed phrase. As of now, it is the only
          access point to your Metadot wallet in case of any mishap. Screenshots
          are not encouraged.
        </SubHeading>
        {/* <SubHeading className={mainHeadingfontFamilyClass}>
          Why the seed phrase?
        </SubHeading>
        <SubHeading className={mainHeadingfontFamilyClass}>
          To ensure the backup, a seed phrase is required. It will be your only
          access to the wallet in the future.
        </SubHeading> */}
      </div>
      {/* <HorizontalContentDiv> */}
      <CopyText className={subHeadingfontFamilyClass}>
        Copy seed phrase
        <span {...span}>A</span>
        <div className="tooltip" {...contentCopyIcon}>
          <CopyIcon src={ContentCopyIcon} alt="copyIcon" />
          <span className="tooltiptext">{copy}</span>
        </div>
      </CopyText>
      <SubMainWrapperForAuthScreens mb="3rem">
        {currSeed
          && currSeed
            .split(' ')
            .map((phrase, i) => (
              <SinglePhrase index={i} key={phrase} phrase={phrase} />
            ))}
      </SubMainWrapperForAuthScreens>
      <div style={{ marginLeft: '0' }} className="btn-wrapper">
        <Button {...btn} />
      </div>
      <WarningModal {...warningModal} />
    </AuthWrapper>
  );
}

export default ShowSeed;
