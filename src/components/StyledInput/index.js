/* eslint-disable no-unused-vars */
import React from 'react';

import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CancelIcon from '@mui/icons-material/Cancel';

import styled from 'styled-components';
import { TextInputWrapper } from '../index';

import { colors, fonts } from '../../utils';

const { primaryTextColor, darkBgColor } = colors;

const { mainHeadingFontSize, subHeadingFontSize } = fonts;

const StyledInputField = styled.input`
  /* padding-left: 25px; */
  padding: 10px 12.5px;
  color: ${primaryTextColor};
  background-color: ${darkBgColor};
  font-size: 14px !important;
  line-height: 17px;
  border-radius: 8px;
  opacity: 0.8;
  letter-spacing: 0.02em;
  width: ${(props) => (props.fullWidth ? props.fullWidth : '90%')};
  font-family: ${subHeadingFontSize};
    border: ${(props) => (props.isCorrectForInput
    ? '0.5px solid rgba(250, 250, 250, 0.5)'
    : props.isCorrectForInput === false
      ? '1px solid red'
      : '0px')};
  font-size: ${(props) => (props.fontSize ? props.fontSize : '16px')};
  height: ${(props) => (props.height ? props.height : 'auto')};
`;

const Icon = styled.span`
  position: absolute;
  right: 20px;
  top: 9px;
  color: rgba(250, 250, 250, 0.8);
  cursor: pointer;
`;

function StyledInput({
  placeholder,
  onChange,
  value,
  rightIconCross,
  rightIconCrossClickHandler,
  isCorrect,
  type,
  fullWidth,
  fontSize,
  height,
  rightIcon,
  typePassword = false,
  hideHandler,
  hideState,
  marginBottom,
  maxlength,
  disabled,
}) {
  const blockInvalidChar = (e) => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault();
  const styledInputField = {
    maxlength,
    fontSize,
    height,
    value,
    fullWidth,
    placeholder,
    onKeyDown: blockInvalidChar,
    onChange: (e) => onChange(e.target.value),
    disabled,
    isCorrectForInput: isCorrect,
    type:
          // eslint-disable-next-line no-nested-ternary
          type || (typePassword
            ? !hideState
              ? 'password'
              : 'text'
            : 'text'),
  };
  return (
    <TextInputWrapper marginBottom={marginBottom || '0px'}>
      <StyledInputField disableUnderline {...styledInputField} />
      {rightIcon && (
        <Icon onClick={() => hideHandler()}>
          {!hideState
            ? <VisibilityOffIcon fontSize="small" style={{ marginTop: '-0.1rem' }} /> : <VisibilityIcon fontSize="small" style={{ marginTop: '-0.1rem' }} />}
        </Icon>
      )}
      {rightIconCross && (
      <Icon onClick={() => rightIconCrossClickHandler()}>
        <CancelIcon />
      </Icon>
      )}
    </TextInputWrapper>
  );
}

export default StyledInput;
