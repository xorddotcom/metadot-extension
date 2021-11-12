/* eslint-disable no-unused-vars */
import React from 'react';

import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CancelIcon from '@mui/icons-material/Cancel';

import styled from 'styled-components';
import { TextInputWrapper } from '../CommonStyledComponents';

import { colors, fonts } from '../../utils';

const { primaryTextColor } = colors;

const { mainHeadingFontSize, subHeadingFontSize } = fonts;

const StyledInputField = styled.input`
  /* padding-left: 25px; */
  padding: 12px 12.5px;
  color: ${primaryTextColor};
  background-color: #212121;
  font-size: 14px !important;
  border-radius: 8px;
  width: ${(props) => (props.fullWidth ? '100%' : '90%')};
  font-family: ${subHeadingFontSize};
    border: ${(props) => (props.isCorrectForInput
    ? '0px'
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
  const styledInputField = {
    maxlength,
    fontSize,
    height,
    value,
    fullWidth,
    placeholder,
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
            ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
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
