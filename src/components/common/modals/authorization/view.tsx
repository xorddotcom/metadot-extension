import React from 'react';

import { Modal } from '@mui/material';
import { Box } from '@mui/system';

import { AuthtModalViewProps } from './types';

import Button from '../../button';
import { fonts } from '../../../../utils';
import StyledInput from '../../input';
import { MainDiv, MainText, VerticalContentDiv } from './styledComponent';
import { ModalText, WarningText } from '../../text';
import {
    AUTHORIZATION,
    PASSWORD,
    RENAME_ACCOUNT,
    EXPORT_ACCOUNT,
    ACCOUNT_NAME,
} from '../../../../utils/app-content';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

const AuthModalView: React.FunctionComponent<AuthtModalViewProps> = ({
    open,
    style,
    onClose,
    styledInput,
    passwordError,
    btnCancel,
    btnConfirm,
    functionType,
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
                        className={mainHeadingfontFamilyClass}
                    >
                        {HEADING}
                    </ModalText>

                    <VerticalContentDiv marginTop="15px" mb="20px">
                        <MainText
                            fontSize="14px"
                            marginBottom="15px"
                            className={mainHeadingfontFamilyClass}
                        >
                            {LABEL}
                        </MainText>

                        <StyledInput
                            id="auth-password"
                            fullWidth="75%"
                            inputWrapperWidth="100%"
                            mr="1.2rem"
                            typePassword
                            rightIcon
                            leftPosition="9px"
                            topPosition="0px"
                            {...styledInput}
                            style={{ paddingLeft: '10px !important' }}
                        />
                        <WarningText
                            className={subHeadingfontFamilyClass}
                            visibility={!!passwordError}
                        >
                            {passwordError}
                        </WarningText>
                    </VerticalContentDiv>

                    <div className="btn-row">
                        <Button id="cancel" {...btnCancel} />
                        <Button id="confirm" {...btnConfirm} />
                    </div>
                </MainDiv>
            </Box>
        </Modal>
    );
};

export default AuthModalView;
