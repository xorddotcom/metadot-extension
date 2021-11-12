/* eslint-disable no-unused-vars */
/* eslint import/no-cycle: [2, { maxDepth: 1 }] */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { toast } from 'react-toastify';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import {
  CopyText, IndexText, SeedText, SeedWrapper,
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

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    // backgroundColor: theme.palette.common.white,
    backgroundColor: '#860040',
    color: '#fff',
    boxShadow: theme.shadows[1],
    fontSize: 11,
    zIndex: -2,
  },
  [`& .${tooltipClasses.arrow}`]: {
    // color: theme.palette.common.white,
    color: '#860040',
  },
}));

function ShowSeed() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { seed } = useSelector((state) => state.account);

  const decryptedSeed = seed ? decrypt(seed, '123') : null;

  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

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
    style: {
      fontSize: '0.7rem', marginRight: 10, marginTop: 2,
    },
    onClick: copySeedText,
  };

  const btn = {
    width: '60%',
    height: '40px',
    text: 'Continue',
    handleClick: () => setIsModalOpen(true),
  };

  const warningModal = {
    open: isModalOpen,
    handleClose: () => setIsModalOpen(false),
    style: {
      width: '78%',
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
      <div>
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
        Copy Seed Phrase
        <span {...span}>A</span>
        <LightTooltip title="Copy Seed" arrow placement="right">
          <ContentCopyIcon {...contentCopyIcon} />
        </LightTooltip>
      </CopyText>
      <SubMainWrapperForAuthScreens>
        {decryptedSeed
          && decryptedSeed
            .split(' ')
            .map((phrase, i) => (
              <SinglePhrase index={i} key={phrase} phrase={phrase} />
            ))}
      </SubMainWrapperForAuthScreens>
      <div className="btn-wrapper">
        <Button {...btn} />
      </div>
      <WarningModal {...warningModal} />
    </AuthWrapper>
  );
}

export default ShowSeed;
