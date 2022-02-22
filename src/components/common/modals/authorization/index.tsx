import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Modal } from '@mui/material';
import { Box } from '@mui/system';

import { AuthtModalProps } from './types';

import Button from '../../button';
import { fonts } from '../../../../utils';
import StyledInput from '../../input';
import { MainDiv, MainText, VerticalContentDiv } from './styledComponent';
import { ModalText, WarningText } from '../../text';

import {
    setAuthScreenModal,
    setConfirmSendModal,
} from '../../../../redux/slices/modalHandling';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

const AuthModal: React.FunctionComponent<AuthtModalProps> = ({
    open,
    handleClose,
    style,
    onConfirm,
    publicKey,
}) => {
    const dispatch = useDispatch();

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (): boolean => {
        if (!password) {
            return false;
        }
        try {
            dispatch(setAuthScreenModal(false));
            dispatch(setConfirmSendModal(true));
            onConfirm(publicKey, password);
            return true;
        } catch (err) {
            setPasswordError('Invalid password!');
        }
        return false;
    };

    const styledInput = {
        placeholder: 'Enter Password',
        value: password,
        className: subHeadingfontFamilyClass,
        fontSize: '12px',
        height: '20px',
        onChange: (t: string) => {
            setPassword(t);
            setPasswordError('');
        },
        hideHandler: () => setShowPassword(!showPassword),
        hideState: showPassword,
        mt: '0.03rem',
    };

    const btnF = {
        text: 'Cancel',
        width: '110px',
        height: '40px',
        fontSize: '0.8rem',
        handleClick: () => {
            handleClose(setPassword);
        },
    };

    const btnS = {
        text: 'Confirm',
        width: '110px',
        height: '40px',
        fontSize: '0.8rem',
        handleClick: () => handleSubmit(),
    };

    return (
        <Modal
            open={open}
            onClose={() => handleClose(setPassword)}
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
                        Authorization
                    </ModalText>

                    <VerticalContentDiv marginTop="15px" mb="20px">
                        <MainText
                            fontSize="14px"
                            marginBottom="15px"
                            className={mainHeadingfontFamilyClass}
                        >
                            Password
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
                        <Button id="cancel" cancel {...btnF} />
                        <Button id="confirm" {...btnS} />
                    </div>
                </MainDiv>
            </Box>
        </Modal>
    );
};

export default AuthModal;
