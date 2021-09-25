import React from 'react';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useHistory } from 'react-router-dom';
import { HeaderWrapper, HeaderHeading } from './StyledComponents';
import { fonts } from '../../utils';

const { mainHeadingfontFamilyClass } = fonts;

function Header(props) {
  const { centerText } = props;
  const history = useHistory();
  return (
    <HeaderWrapper>
      <IconButton
        className="primary-bg-color"
        onClick={() => history.goBack()}
        style={{ position: 'absolute' }}>
        <ArrowBackIcon style={{ color: 'white' }} />
      </IconButton>
      <HeaderHeading className={mainHeadingfontFamilyClass}>
        {centerText}
      </HeaderHeading>
    </HeaderWrapper>
  );
}

export default Header;
