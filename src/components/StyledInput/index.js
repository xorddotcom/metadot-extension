import React from 'react';

import {
  createStyles,
  createTheme,
  InputAdornment,
  makeStyles,
  TextField,
  ThemeProvider,
} from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

import styled from 'styled-components';
import { TextInputWrapper } from '../CommonStyledComponents';
import { colors } from '../../utils';

const { primaryTextColor } = colors;

const StyledInputField = styled.input`
  padding-left: 25px;
  padding-top: 13px;
  padding-bottom: 13px;
  color: ${primaryTextColor};
  background-color: #212121;
  font-size: 16px;
  border-radius: 8px;
  width: 90%;
  font-family: 'RobotoR';
  border-width: 0px;
`;

const Icon = styled.span`
  position: absolute;
  right: 20px;
  top: 12px;
  color: rgba(250, 250, 250, 0.8);
  cursor: pointer;
`;

function StyledInput({
  placeholder,
  onChange,
  isCorrect,
  typePassword = false,
  rightIcon,
  hideHandler,
  hideState,
}) {
  return (
    <TextInputWrapper isCorrect={isCorrect}>
      <StyledInputField
        placeholder={placeholder}
        disableUnderline={true}
        onChange={e => onChange(e.target.value)}
        type={typePassword ? (!hideState ? 'password' : 'text') : 'text'}
        // endAdornment={
        //   typePassword && (
        //     <InputAdornment
        //       position="start"
        //       style={{ color: 'rgba(250, 250, 250, 0.8)', cursor: 'pointer' }}
        //       onClick={() => hideHandler()}>
        //       {!hideState ? <VisibilityOffIcon /> : <VisibilityIcon />}
        //     </InputAdornment>
        //   )
        // }
      />
      {rightIcon && (
        <Icon onClick={() => hideHandler()}>
          {!hideState ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </Icon>
      )}
    </TextInputWrapper>
  );
}

export default StyledInput;
