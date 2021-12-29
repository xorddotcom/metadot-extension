/* eslint-disable no-unused-vars */
/* eslint import/no-cycle: [2, { maxDepth: 1 }] */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import ContentCopyIcon from '../../../assets/images/icons/copyIcon.svg';
import {
  CopyIcon, CopyText, IndexText, SeedText, SeedWrapper,
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

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;
const { decrypt } = accounts;

function ShowSeed() {
  const history = useHistory();
  const location = useLocation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copy, setCopy] = useState('Copy');

  const { seed, isLoggedIn } = useSelector((state) => state.activeAccount);
  const currSeed = location.state.seedToPass;

  const dispatch = useDispatch();

  const SinglePhrase = ({ index, phrase }) => (
    <SeedWrapper>
      <IndexText className={mainHeadingfontFamilyClass}>
        {index + 1}
      </IndexText>
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
    onClick: copySeedText,
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
    subText: 'Proceeding will not let you view your mnemonic again. Do you still wish to continue?',
  };

  return (
    <AuthWrapper>
      <Header
        centerText="Seed Phrase"
        backHandler={() => console.log('goBack')}
      />
      <div style={{ marginTop: '29px' }}>
        <MainHeading className={mainHeadingfontFamilyClass}>
          Write down your seed phrase :
        </MainHeading>
        <SubHeading className={subHeadingfontFamilyClass}>
          To ensure backup a mnemonic is required. It would be used to
          access your wallet in future.
          Please write down this mnemonic and memorize it.
          Once your sentence has been set, it cannot be viewed again.
          Losing the mnemonic may cause permanent asset loss. Taking screenshots is not encouraged.
        </SubHeading>
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
