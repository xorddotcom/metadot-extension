import React from 'react';

import { Modal } from '@mui/material';
import { Box } from '@mui/system';

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { AuthtModalViewProps } from './types';

import Button from '../../button';
import { colors, fonts, images } from '../../../../utils';
import StyledInput from '../../input';
import {
    MainDiv,
    MainText,
    VerticalContentDiv,
    HorizontalContentDiv,
} from './styledComponent';
import { ModalText, WarningText, SubHeading } from '../../text';
import {
    AUTHORIZATION,
    PASSWORD,
    RENAME_ACCOUNT,
    EXPORT_ACCOUNT,
    ACCOUNT_NAME,
} from '../../../../utils/app-content';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;
const { darkBackground1 } = colors;

const { CheckboxEnabled, CheckboxDisabled } = images;

const AuthModalView: React.FunctionComponent<AuthtModalViewProps> = ({
    open,
    style,
    onClose,
    styledInput,
    btnCancel,
    btnConfirm,
    functionType,
    inputErrorState,
    savePassword,
    setSavePassword,
}) => {
    const HEADING =
        // eslint-disable-next-line no-nested-ternary
        functionType === 'RenameAccount'
            ? RENAME_ACCOUNT
            : functionType === 'ExportAccount'
            ? EXPORT_ACCOUNT
            : AUTHORIZATION;
    const LABEL = functionType === 'RenameAccount' ? ACCOUNT_NAME : PASSWORD;

    return (
        <Modal
            open={open}
            onClose={onClose}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box sx={style} className="txDetails-modal-style auth-modal">
                <MainDiv>
                    <ModalText
                        textAlign="center"
                        marginTop="25px"
                        className={mainHeadingfontFamilyClass}
                    >
                        {HEADING}
                    </ModalText>

                    <VerticalContentDiv marginTop="15px" mb="20px">
                        <MainText
                            fontSize="14px"
                            marginBottom="0px"
                            className={mainHeadingfontFamilyClass}
                        >
                            {LABEL}
                        </MainText>

                        {functionType === 'PasswordSaved' ? (
                            <SubHeading
                                fontSize="12px"
                                color="#FAFAFA"
                                lineHeight="16px"
                            >
                                Your password is already saved
                            </SubHeading>
                        ) : (
                            <>
                                <StyledInput
                                    id="auth-password"
                                    fullWidth="80%"
                                    mr="1.2rem"
                                    typePassword={
                                        functionType !== 'RenameAccount'
                                    }
                                    rightIcon={functionType !== 'RenameAccount'}
                                    rightPosition="9px"
                                    topPosition="28px"
                                    {...styledInput}
                                    style={{
                                        paddingLeft: '10px !important',
                                    }}
                                    bgColor={darkBackground1}
                                />
                                <WarningText
                                    className={subHeadingfontFamilyClass}
                                    visibility={!!inputErrorState}
                                >
                                    {inputErrorState}
                                </WarningText>{' '}
                            </>
                        )}

                        {functionType === 'PasswordNotSaved' ? (
                            <HorizontalContentDiv>
                                <img
                                    src={
                                        savePassword
                                            ? CheckboxEnabled
                                            : CheckboxDisabled
                                    }
                                    alt="checkbox"
                                    style={{ height: '15px', width: '15px' }}
                                    aria-hidden
                                    onClick={() =>
                                        setSavePassword &&
                                        setSavePassword(!savePassword)
                                    }
                                />
                                <SubHeading
                                    fontSize="12px"
                                    color="#FAFAFA"
                                    ml="12px"
                                    lineHeight="16px"
                                >
                                    Remember my password for next 15 minutes
                                </SubHeading>
                            </HorizontalContentDiv>
                        ) : (
                            ''
                        )}
                    </VerticalContentDiv>

                    <div className="btn-row">
                        <Button id="cancel" {...btnCancel} lightBtn />
                        <Button id="confirm" {...btnConfirm} />
                    </div>
                </MainDiv>
            </Box>
        </Modal>
    );
};

export default AuthModalView;
