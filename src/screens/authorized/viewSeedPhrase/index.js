import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContentCopyIcon from '../../../assets/images/icons/copyIcon.svg';
import {
  CopyIcon,
  CopyText,
  IndexText,
  SeedText,
  SeedWrapper,
  HorizontalContentDiv,
  Blurdiv,
  BlurdivMainText,
  BlurdivSubText,
  BlurdivButton,
  Border,
  Wrapper,
} from './StyledComponent/index';
import {
  Header,
  Button,
  MainHeading,
  SubHeading,
  SubMainWrapperForAuthScreens,
} from '../../../components';
import AuthScreen from '../../../components/modals/authorization';
import { fonts } from '../../../utils';
import openEye from '../../../assets/images/icons/openEye.svg';
import { setAuthScreenModal } from '../../../redux/slices/modalHandling';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

function ViewSeedPhrase() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state);
  const [getSeed, setGetSeed] = useState('');
  const [copy, setCopy] = useState('Copy');

  const getSeedHandler = (data) => {
    setGetSeed(data);
  };

  const str = 'cabin sweet afford world hello element south blue dash clown bulb loud';

  const SinglePhrase = ({ index, phrase }) => (
    <SeedWrapper>
      <IndexText className={mainHeadingfontFamilyClass}>{index + 1}</IndexText>
      <SeedText className={mainHeadingfontFamilyClass}>{phrase}</SeedText>
    </SeedWrapper>
  );

  const copySeedText = () => {
    navigator.clipboard.writeText(getSeed);
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

  const viewSeedSubmitHandler = () => {
    dispatch(setAuthScreenModal(true));
  };

  const blurDivButton = {
    id: 'view-seed-btn',
    className: subHeadingfontFamilyClass,
    onClick: viewSeedSubmitHandler,
  };

  const downloadSeed = () => {
    const seed = getSeed;
    const data = new Blob([seed], { type: 'text/plain' });
    const csvURL = window.URL.createObjectURL(data);
    const tempLink = document.createElement('a');
    tempLink.href = csvURL;
    tempLink.setAttribute('download', 'seed.txt');
    tempLink.click();
  };

  const btn = {
    id: 'download-seed-btn',
    width: '300px',
    text: 'Download',
    handleClick: downloadSeed,
  };

  const authModal = {
    open: currentUser.modalHandling.authScreenModal,
    handleClose: () => {
      dispatch(setAuthScreenModal(false));
    },
    getSeedHandler,
    style: {
      width: '290px',
      background: '#141414',
      position: 'relative',
      bottom: 30,
      p: 2,
      px: 2,
      pb: 3,
      marginTop: '10rem',
    },
  };

  return (
    <Wrapper>
      <Header
        centerText="Seed Phrase"
        backHandler={() => console.log('goBack')}
      />
      <div style={{ marginTop: '29px' }}>
        <MainHeading className={mainHeadingfontFamilyClass}>
          Write down your seed phrase :
        </MainHeading>
        <SubHeading className={subHeadingfontFamilyClass}>
          To ensure backup a mnemonic is required. It would be used to access
          your wallet in future. Please write down this mnemonic and memorize
          it. Once your sentence has been set, it cannot be viewed again. Losing
          the mnemonic may cause permanent asset loss. Taking screenshots is not
          encouraged.
        </SubHeading>
      </div>
      <HorizontalContentDiv>
        <CopyText className={subHeadingfontFamilyClass}>
          Copy seed phrase
          <span {...span}>A</span>
          <div className="tooltip" {...contentCopyIcon}>
            <CopyIcon src={ContentCopyIcon} alt="copyIcon" />
            <span className="tooltiptext">{copy}</span>
          </div>
        </CopyText>
        <Border>
          <SubMainWrapperForAuthScreens mb="3rem">
            {!getSeed
              ? str
                .split(' ')
                .map((phrase, i) => (
                  <SinglePhrase index={i} key={phrase} phrase={phrase} />
                ))
              : getSeed
                .split(' ')
                .map((phrase, i) => (
                  <SinglePhrase index={i} key={phrase} phrase={phrase} />
                ))}
          </SubMainWrapperForAuthScreens>
        </Border>
        {!getSeed
          && (
          <Blurdiv>
            <BlurdivMainText mb="12" className={mainHeadingfontFamilyClass}>
              Tap to reveal your seed phrase
            </BlurdivMainText>
            <BlurdivSubText className={subHeadingfontFamilyClass}>
              Make sure no one is watching your screen.
            </BlurdivSubText>
            <BlurdivButton {...blurDivButton}>
              <img
                src={openEye}
                alt="view seed"
                style={{ marginRight: '10px' }}
              />
              {' '}
              View
            </BlurdivButton>
          </Blurdiv>
          )}
      </HorizontalContentDiv>
      <div style={{ marginLeft: '0' }} className="btn-wrapper">
        {getSeed
          && <Button {...btn} />}
      </div>

      <AuthScreen {...authModal} />
    </Wrapper>
  );
}

export default ViewSeedPhrase;
