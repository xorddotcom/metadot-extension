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
import SearchBar from '../../search-bar';

const { crossIcon } = images;
const { mainHeadingfontFamilyClass } = fonts;

const SelectToken: React.FunctionComponent<SelectTokenProps> = (props) => {
    const { open, handleClose, tokenList, style, handleSelect } = props;
    const [search, setSearch] = React.useState('');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSearch(e.target.value);
    };

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
                    <div style={{ width: '90%', margin: 'auto' }}>
                        <SearchBar
                            id="search-bar"
                            placeHolder="Search Tokens"
                            onChange={handleChange}
                            value={search}
                            style={{ marginTop: 0, marginBottom: 25 }}
                        />
                    </div>

                    <TokenModalContent>
                        {tokenList
                            .filter((token: Token) =>
                                token.name.includes(search)
                            )
                            .map((token: Token) => {
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
