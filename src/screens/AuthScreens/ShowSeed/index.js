/* eslint-disable no-unused-vars */
/* eslint import/no-cycle: [2, { maxDepth: 1 }] */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { toast } from 'react-toastify';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import ContentCopyIcon from '../../../assets/images/icons/copyIcon.svg';
import {
  CopyIcon, CopyText, IndexText, SeedText, SeedWrapper,
} from './StyledComponents';
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
import { decrypt, encrypt, GenerateSeedPhrase } from '../../../utils/accounts';
import { resetAccountSlice, setSeed } from '../../../redux/slices/account';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

function ShowSeed() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { seed } = useSelector((state) => state.account);

  const decryptedSeed = seed ? decrypt(seed, '123') : null;

  const dispatch = useDispatch();

  // generate new seed for parent account
  useEffect(() => {
    try {
      if (!seed) {
      // checking whether seed needs to be created or not
        const newSeed = GenerateSeedPhrase();
        const tmpPassword = '123';
        const encryptedSeed = encrypt(newSeed, tmpPassword);
        dispatch(setSeed(encryptedSeed)); // store newSeed in redux
      }
    } catch (error) {
      console.log('ERROR while generating new seed for parent account', error);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const SinglePhrase = ({ index, phrase }) => (
    <SeedWrapper>
      <IndexText className={mainHeadingfontFamilyClass}>
        {index + 1}
      </IndexText>
      <SeedText className={mainHeadingfontFamilyClass}>{phrase}</SeedText>
    </SeedWrapper>
  );

  const copySeedText = () => {
    navigator.clipboard.writeText(decryptedSeed);
    const obj = {
      position: toast.POSITION.BOTTOM_CENTER,
      className: 'toast-success',
      progressClassName: 'success-progress-bar',
      autoClose: 2000,
      toastId: 1,
    };
    toast.success('Copied!', obj);
  };

  const span = {
    width: '100px',
    style: { width: '200px', visibility: 'hidden' },
  };

  const contentCopyIcon = {
    onClick: copySeedText,
  };

  const btn = {
    width: '300px',
    text: 'Continue',
    handleClick: () => setIsModalOpen(true),
  };

  const warningModal = {
    open: isModalOpen,
    handleClose: () => setIsModalOpen(false),
    style: {
      width: '290px',
      background: '#141414',
      position: 'relative',
      bottom: 30,
      p: 2,
      px: 2,
      pb: 3,
    },
  };

  return (
    <AuthWrapper>
      <Header
        centerText="Seed Phrase"
        backHandler={() => dispatch(resetAccountSlice())}
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
        <div className="tooltip">
          <CopyIcon src={ContentCopyIcon} alt="copyIcon" {...contentCopyIcon} />
          <span className="tooltiptext">Copy to clipboard</span>
        </div>
      </CopyText>
      <SubMainWrapperForAuthScreens mb="3rem">
        {decryptedSeed
          && decryptedSeed
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
