/* eslint-disable no-unused-vars */
import React from 'react';
import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import LoadingScreen from 'react-loading-screen';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { colors, fonts } from '../../../utils';
import {
  BackButton,
  CloseIconDiv,
  Title,
  TitleDiv,
} from './StyledComponents';

const { mainHeadingfontFamilyClass } = fonts;
const { primaryBgColor, primaryTextColor, darkBgColor } = colors;

function SelectNetwork(props) {
  const {
    open,
    handleClose,
    modalState,
    resetState,
    style,
    handleClickForKusama,
    handleClickForOthers,
    isLoading,
  } = props;
  const { firstStep, renderMethod, currentData } = modalState;

  const loadingScreen = {
    loading: isLoading,
    bgColor: darkBgColor,
    spinnerColor: primaryBgColor,
    textColor: primaryTextColor,
    text: 'Api Initialization',
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style} className="select-network-modal-style">
        <LoadingScreen {...loadingScreen}>
          <div>
            <CloseIconDiv
              onClick={() => {
                resetState();
                handleClose();
              }}
            >
              <CloseIcon />
            </CloseIconDiv>

            <TitleDiv>
              {!firstStep && (
              <BackButton
                onClick={() => {
                  resetState();
                }}
              >
                <KeyboardArrowLeftIcon />
              </BackButton>
              )}

              <Title className={mainHeadingfontFamilyClass}>
                Available Networks
              </Title>
            </TitleDiv>

            {currentData.map((data) => {
              const Content = data.name !== 'Polkadot Network' ? renderMethod(data, handleClickForOthers) : renderMethod(data, handleClickForKusama);
              return Content;
            })}
          </div>
        </LoadingScreen>
      </Box>
    </Modal>
  );
}

export default SelectNetwork;
