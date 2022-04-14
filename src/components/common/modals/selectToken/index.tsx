import React from 'react';

import { Modal } from '@mui/material';
import { Box } from '@mui/system';

import { Token, SelectTokenProps } from './types';
import {
    CloseIconDiv,
    TokenModalContent,
    Title,
    TitleDiv,
} from './styledComponents';
import Option from './Option';
import { fonts, images } from '../../../../utils';

const { crossIcon } = images;
const { mainHeadingfontFamilyClass } = fonts;

const SelectToken: React.FunctionComponent<SelectTokenProps> = (props) => {
    const { open, handleClose, tokenList, style, handleSelect } = props;

    return (
        <Modal open={open} onClose={handleClose} className="Dark-bg-network">
            <Box
                sx={style}
                className="select-network-modal-style network-scrollbar"
            >
                <div>
                    <TitleDiv>
                        <Title className={mainHeadingfontFamilyClass}>
                            Select Token
                        </Title>
                        <CloseIconDiv
                            onClick={() => {
                                handleClose();
                            }}
                        >
                            <img src={crossIcon} alt="cross icon" />
                        </CloseIconDiv>
                    </TitleDiv>
                    <TokenModalContent>
                        {tokenList.map((token: Token) => {
                            return (
                                <Option
                                    token={token}
                                    handleSelect={handleSelect}
                                />
                            );
                        })}
                    </TokenModalContent>
                </div>
            </Box>
        </Modal>
    );
};

export default SelectToken;
