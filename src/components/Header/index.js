import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useHistory } from 'react-router-dom';
import { HeaderWrapper, HeaderHeading } from './StyledComponents';
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
      <IconButton
        className="primary-bg-color"
        onClick={() => onBackClick()}
        style={{ position: 'absolute', padding: '0.3rem' }}
      >
        <ArrowBackIcon style={{ color: 'white', fontSize: '1.1rem' }} />
      </IconButton>
      <HeaderHeading className={mainHeadingfontFamilyClass}>
        {centerText}
      </HeaderHeading>
    </HeaderWrapper>
  );
}

export default Header;
