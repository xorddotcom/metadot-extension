import React from 'react';
import Button from '@mui/material/Button';
import './index.css';
import { styled } from '@mui/system';
import { CircularProgress } from '@mui/material';
import { dimension, fonts, colors } from '../../utils';

const { _width, _height } = dimension.button;
const { buttonFontSize } = fonts;

function index({
  StartIcon,
  handleClick,
  text,
  width,
  height,
  br,
  fontSize,
  cancel,
  disabled,
  isLoading,
  border,
  id,
}) {
  const { primaryBackground, primaryText } = colors;
  const secondaryBgColor = 'transparent';

  const StyledButton = styled(Button)`
    width: ${width || '288px'};
    height: ${height || _height};
    filter: drop-shadow(0px 10px 10px rgba(46, 155, 155, 0.07));
    box-sizing: border-box;
    border-radius: ${br || '40px'};
    background: ${!cancel ? primaryBackground : secondaryBgColor};
    font-size: ${buttonFontSize};
    text-transform: capitalize;
    font-weight: 500;
    border: ${border || `1px solid ${primaryBackground}`};
    &:hover {
      background-color: ${!cancel ? primaryBackground : secondaryBgColor};
    }
    &:disabled {
      color: rgba(250, 250, 250, 0.8);
      background: rgba(46, 155, 155, 0.5);
      box-shadow: 0px 10px 10px rgba(46, 155, 155, 0.02);
      border: none;
    }
  `;

  const styledButtonF = {
    variant: 'contained',
    // startIcon: <StartIcon />,
    startIcon: <img src={StartIcon} alt="icon" style={{ marginTop: '-0.2px' }} />,
    onClick: () => handleClick(),
    disabled: !!disabled,
    id,
  };

  const styledButtonS = {
    variant: 'contained',
    onClick: () => handleClick(),
    disabled: !!disabled,
    id,
  };

  return (
    <div
      style={{
        width: width || _width,
        marginBottom: 10,
      }}
    >
      {StartIcon ? (
        <StyledButton
          {...styledButtonF}
          style={{ fontSize: buttonFontSize }}
        >
          {!isLoading ? text : <CircularProgress size={24} style={{ color: primaryText }} />}
        </StyledButton>
      ) : (
        <StyledButton
          {...styledButtonS}
          style={{ fontSize: fontSize || buttonFontSize }}
        >
          {!isLoading ? text : <CircularProgress size={24} style={{ color: primaryText }} />}
        </StyledButton>
      )}
    </div>
  );
}

export default index;
