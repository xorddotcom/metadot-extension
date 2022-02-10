import React from 'react';

import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

import { NetworkConfigType, SelectNetworkProps } from './types';
import { BackButton, CloseIconDiv, Title, TitleDiv } from './styledComponents';
import { fonts } from '../../../../utils';

const { mainHeadingfontFamilyClass } = fonts;

const SelectNetwork: React.FunctionComponent<SelectNetworkProps> = (props) => {
    const {
        open,
        handleClose,
        modalState,
        resetState,
        style,
        handleClickForKusama,
        handleClickForOthers,
    } = props;
    const { firstStep, renderMethod, currentData } = modalState;

    return (
        <Modal open={open} onClose={handleClose} className="Dark-bg-network">
            <Box
                sx={style}
                className="select-network-modal-style network-scrollbar"
            >
                <div>
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
                        <CloseIconDiv
                            onClick={() => {
                                resetState();
                                handleClose();
                            }}
                        >
                            <CloseIcon fontSize="small" />
                        </CloseIconDiv>
                    </TitleDiv>

                    {currentData.map((data: NetworkConfigType) => {
                        const handleClick =
                            data.name !== 'Polkadot Network'
                                ? handleClickForOthers
                                : handleClickForKusama;
                        return renderMethod({ data, handleClick });
                    })}
                </div>
            </Box>
        </Modal>
    );
};

export default SelectNetwork;
