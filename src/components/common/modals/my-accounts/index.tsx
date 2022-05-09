import React from 'react';

import { Modal } from '@mui/material';
import { Box } from '@mui/system';

import { useSelector } from 'react-redux';
import {
    CloseIconDiv,
    HorizontalContentDiv,
    NetworkModalContent,
    OptionRow,
    OptionText,
    PlainIcon,
    Title,
    TitleDiv,
} from './styles';
import { fonts, images } from '../../../../utils';
import { MyAccountsProps } from './types';
import { RootState } from '../../../../redux/store';

const { crossIcon } = images;
const { mainHeadingfontFamilyClass } = fonts;

const MyAccounts: React.FunctionComponent<MyAccountsProps> = (props) => {
    const { open, handleClose, style, onSelection, accountList } = props;

    const allAccounts = useSelector((state: RootState) =>
        Object.values(state.accounts)
    );

    return (
        <Modal open={open} onClose={handleClose} className="Dark-bg-network">
            <Box
                sx={style}
                className="my-accounts-modal-style network-scrollbar"
            >
                <div>
                    <TitleDiv>
                        <Title className={mainHeadingfontFamilyClass}>
                            My Accounts
                        </Title>
                        <CloseIconDiv onClick={() => handleClose()}>
                            <img src={crossIcon} alt="cross icon" />
                        </CloseIconDiv>
                    </TitleDiv>
                    <NetworkModalContent>
                        {accountList
                            ? accountList.map((account) => (
                                  <OptionRow
                                      className="abc"
                                      onClick={() => onSelection(account)}
                                  >
                                      <HorizontalContentDiv>
                                          <PlainIcon />
                                          <OptionText
                                              className={
                                                  mainHeadingfontFamilyClass
                                              }
                                          >
                                              {account.accountName}
                                          </OptionText>
                                      </HorizontalContentDiv>
                                  </OptionRow>
                              ))
                            : allAccounts.map((account) => (
                                  <OptionRow
                                      className="abc"
                                      onClick={() => onSelection(account)}
                                  >
                                      <HorizontalContentDiv>
                                          <PlainIcon />
                                          <OptionText
                                              className={
                                                  mainHeadingfontFamilyClass
                                              }
                                          >
                                              {account.accountName}
                                          </OptionText>
                                      </HorizontalContentDiv>
                                  </OptionRow>
                              ))}
                    </NetworkModalContent>
                </div>
            </Box>
        </Modal>
    );
};

export default MyAccounts;
