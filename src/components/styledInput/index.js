/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import React from 'react';

import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CancelIcon from '@mui/icons-material/Cancel';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import styled from 'styled-components';
import { TextInputWrapper } from '../index';

import { colors, fonts } from '../../utils';

const { primaryText, darkBackground1 } = colors;

const { mainHeadingFontSize, subHeadingFontSize } = fonts;

const StyledInputField = styled.input`
  /* padding-left: 25px; */
  padding: 10px 12px 10px 10px;
  color: ${primaryText};
  background-color: ${darkBackground1};
  border-bottom-color: rgb(33, 33, 33);
    border-right-color: rgb(33,33,33);
    border-left-color: rgb(33, 33, 33);
    border-top-color: rgb(33,33,33);
  font-size: 14px !important;
  line-height: 17px;
  border-radius: 8px;
  opacity: 0.8;
  letter-spacing: 0.02em;
  width: ${(props) => (props.fullWidth ? props.fullWidth : '90%')};
  font-family: ${subHeadingFontSize};
  font-size: ${(props) => (props.fontSize ? props.fontSize : '16px')};
  height: ${(props) => (props.height ? props.height : 'auto')};
`;

const Icon = styled.span`
  position: relative;
  left: ${(props) => (props.leftPosition ? props.leftPosition : '7px')};
  top: ${(props) => (props.topPosition ? props.topPosition : '4px')};
  color: rgba(250, 250, 250, 0.8);
  cursor: pointer;
`;

function StyledInput({
  placeholder,
  onChange,
  value,
  rightIconCross,
  rightIconCrossClickHandler,
  rightIconLock,
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
  rightPosition,
  leftPosition,
  topPosition,
  style,
  inputWrapperWidth,
}) {
  const blockChar = (ev) => {
    const arr = ['e', 'E', '+', '-'];
    if (arr.includes(ev.key) === true) {
      ev.preventDefault();
    }
  };
  const styledInputField = {
    ...style,
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
    <TextInputWrapper marginBottom={marginBottom || '0px'} isCorrect={isCorrect} inputWrapperWidth={inputWrapperWidth}>
      <StyledInputField id={id} disableUnderline {...styledInputField} />
      {rightIcon && (
        <Icon onClick={() => hideHandler()} topPosition={topPosition} leftPosition={leftPosition}>
          {!hideState
            ? <VisibilityOffIcon id="eye-off-icon" fontSize="small" style={{ marginTop: !mt ? '-0.1rem' : mt, marginRight: mr && mr }} /> : <VisibilityIcon id="eye-on-icon" fontSize="small" style={{ marginTop: !mt ? '-0.1rem' : mt, marginRight: mr && mr }} />}
        </Icon>
      )}
      {rightIconCross && (
      <Icon
        onClick={() => rightIconCrossClickHandler()}
        topPosition={topPosition}
        leftPosition={leftPosition}
      >
        <CancelIcon fontSize="small" style={{ marginTop: '-0.1rem', marginRight: '-0.3rem' }} />
      </Icon>
      )}

      {rightIconLock && (
      <Icon topPosition={topPosition} leftPosition={leftPosition}>
        <LockOutlinedIcon fontSize="small" style={{ marginTop: '-0.1rem', marginRight: '-0.15rem' }} />
      </Icon>
      )}
    </TextInputWrapper>
  );
}

export default StyledInput;
