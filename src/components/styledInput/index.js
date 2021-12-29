/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import React from 'react';

import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CancelIcon from '@mui/icons-material/Cancel';

import styled from 'styled-components';
import { TextInputWrapper } from '../index';

import { colors, fonts } from '../../utils';

const { primaryText, darkBackground1 } = colors;

const { mainHeadingFontSize, subHeadingFontSize } = fonts;

const StyledInputField = styled.input`
  /* padding-left: 25px; */
  padding: 10px 12.5px;
  color: ${primaryText};
  background-color: ${darkBackground1};
  font-size: 14px !important;
  line-height: 17px;
  border-radius: 8px;
  opacity: 0.8;
  letter-spacing: 0.02em;
  width: ${(props) => (props.fullWidth ? props.fullWidth : '90%')};
  font-family: ${subHeadingFontSize};
    border: ${(props) => (props.isCorrectForInput
    ? 'none'
    : props.isCorrectForInput === false
      ? '1px solid red'
      : '0px')};
  font-size: ${(props) => (props.fontSize ? props.fontSize : '16px')};
  height: ${(props) => (props.height ? props.height : 'auto')};
`;

const Icon = styled.span`
  position: absolute;
  right: 18px;
  top: 11px;
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
  blockInvalidChar,
  id,
  mt,
  mr,
}) {
  const blockChar = (ev) => {
    const arr = ['e', 'E', '+', '-'];
    if (arr.includes(ev.key) === true) {
      ev.preventDefault();
    }
  };
  const styledInputField = {
    maxlength,
    fontSize,
    height,
    value,
    fullWidth,
    placeholder,
    onKeyDown: (e) => (blockInvalidChar ? blockChar(e) : null),
    onChange: (e) => {
      console.log('abc');
      onChange(e.target.value);
    },
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
      <StyledInputField id={id} disableUnderline {...styledInputField} />
      {rightIcon && (
        <Icon onClick={() => hideHandler()}>
          {!hideState
            ? <VisibilityOffIcon id="eye-off-icon" fontSize="small" style={{ marginTop: !mt ? '-0.1rem' : mt, marginRight: mr && mr }} /> : <VisibilityIcon id="eye-on-icon" fontSize="small" style={{ marginTop: !mt ? '-0.1rem' : mt, marginRight: mr && mr }} />}
        </Icon>
      )}
      {rightIconCross && (
      <Icon onClick={() => rightIconCrossClickHandler()}>
        <CancelIcon fontSize="small" style={{ marginTop: '-0.1rem', marginRight: '-0.3rem' }} />
      </Icon>
      )}
    </TextInputWrapper>
  );
}

export default StyledInput;
