import React from 'react';
import { IconButton } from '@mui/material';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useHistory } from 'react-router-dom';
import ArrowBackIcon from '../../assets/images/icons/backArrow.svg';
import { HeaderWrapper, HeaderHeading } from '../StyledComponents';
import { fonts } from '../../utils';

const { mainHeadingfontFamilyClass } = fonts;

function Header({ centerText, backHandler }) {
  const history = useHistory();

  const onBackClick = async () => {
    if (backHandler) {
      await backHandler();
      history.goBack();
    } else {
      history.goBack();
    }
  };

  return (
    <HeaderWrapper>
      {
        backHandler
      && (
      <IconButton
        id="back-btn"
        className="primary-bg-color"
        onClick={() => onBackClick()}
        style={{ position: 'absolute', padding: '0.5rem' }}
      >
        <img src={ArrowBackIcon} alt="icon" />
      </IconButton>
      )
      }
      <HeaderHeading className={mainHeadingfontFamilyClass}>
        {centerText}
      </HeaderHeading>
    </HeaderWrapper>
  );
}

export default Header;
