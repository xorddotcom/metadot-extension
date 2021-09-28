import React from 'react';
import Button from '@mui/material/Button';
import './index.css';
import { styled } from '@mui/system';

function index({ StartIcon, handleClick, text, width, cancel, disabled }) {
  const primaryBgColor = `radial-gradient(
      40.36% 71% at 18.57% 29%,
      rgba(255, 255, 255, 0.08) 0%,
      rgba(255, 255, 255, 0) 79.17%,
      rgba(255, 255, 255, 0) 96.87%
    ),
    radial-gradient(
      89.64% 128.83% at 22.5% 26%,
      rgba(255, 255, 255, 0.15) 0%,
      rgba(20, 20, 20, 0) 67.09%,
      rgba(20, 20, 20, 0) 100%
    ),
    #880041 !important`;
  const secondaryBgColor = '#171717';

  const StyledButton = styled(Button)`
    width: ${width ? width : 282}px;
    height: 53px;
    box-shadow: 0px 0px 28px 5px rgba(136, 0, 65, 0.12);
    border-radius: 8px;
    background: ${!cancel ? primaryBgColor : secondaryBgColor};
  `;

  return (
    <div style={{ marginBottom: 10 }}>
      {StartIcon ? (
        <StyledButton
          variant="contained"
          startIcon={<StartIcon />}
          onClick={() => handleClick()}
          disabled={disabled ? true : false}>
          {text ? text : ''}
        </StyledButton>
      ) : (
        <StyledButton
          variant="contained"
          onClick={() => handleClick()}
          disabled={disabled ? true : false}>
          {text ? text : ''}
        </StyledButton>
      )}
    </div>
  );
}

export default index;
