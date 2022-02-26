import React from 'react';
import {
    Wrapper,
    LabelAndTextWrapper,
    UnAuthScreensContentWrapper,
} from '../common/wrapper';
import { WarningText, SubHeading } from '../common/text';
import { Button, Input, Header } from '../common';
import { fonts } from '../../utils';

import { CreateWalletViewProps } from './types';
import {
    CONFIRM_PASSWORD_LABEL,
    CREATE_WALLET_DESCRIPTION,
    CREATE_WALLET_HEADER,
    NAME_WARNING,
    PASSWORD_LABEL,
    WALLET_NAME_LABEL,
} from '../../utils/app-content';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

const passwordErrorMessages = {
    minimumCharacterWarning: 'Password should not be less than 8 characters',
    didnotMatchWarning: 'Password did not match!',
    passwordValidation: `Password must contain at least one lower case,
         one upper case, one number and a special character`,
};

const { minimumCharacterWarning, didnotMatchWarning, passwordValidation } =
    passwordErrorMessages;

const CreateWalletView: React.FunctionComponent<CreateWalletViewProps> = (
    props
) => {
    const {
        backHandler,
        isValidWalletName,
        passwordError,
        walletNameText,
        styledInputName,
        styledInputPassword,
        styledInputConfirmPass,
        continueBtn,
    } = props;

    return (
        <Wrapper>
            <Header
                centerText={CREATE_WALLET_HEADER}
                backHandler={() => backHandler()}
            />
            <UnAuthScreensContentWrapper>
                <LabelAndTextWrapper>
                    <SubHeading {...walletNameText}>
                        {WALLET_NAME_LABEL}
                    </SubHeading>
                    <Input id="wallet-name" isCorrect {...styledInputName} />
                    {isValidWalletName && (
                        <WarningText
                            id="warning-text"
                            className={subHeadingfontFamilyClass}
                            visibility={isValidWalletName}
                        >
                            {NAME_WARNING}
                        </WarningText>
                    )}
                </LabelAndTextWrapper>

                <LabelAndTextWrapper marginTop="10px">
                    <SubHeading
                        className={mainHeadingfontFamilyClass}
                        marginTop="0px"
                        mb="10px"
                    >
                        {PASSWORD_LABEL}
                    </SubHeading>
                    <Input
                        id="password"
                        fullWidth="76%"
                        {...styledInputPassword}
                        typePassword
                        isCorrect
                        rightIcon
                        leftPosition="15px"
                        topPosition="1px"
                    />
                    {passwordError === minimumCharacterWarning && (
                        <WarningText
                            id="warning-text-1"
                            mb="10px"
                            className={subHeadingfontFamilyClass}
                            visibility={
                                passwordError === minimumCharacterWarning
                            }
                        >
                            {minimumCharacterWarning}
                        </WarningText>
                    )}
                    {passwordError === passwordValidation && (
                        <WarningText
                            id="warning-text-2"
                            mb="10px"
                            className={subHeadingfontFamilyClass}
                            visibility={passwordError === passwordValidation}
                        >
                            {passwordValidation}
                        </WarningText>
                    )}
                    {passwordError === didnotMatchWarning && (
                        <WarningText
                            id="warning-text-3"
                            mb="10px"
                            className={subHeadingfontFamilyClass}
                            visibility={passwordError === didnotMatchWarning}
                        >
                            {didnotMatchWarning}
                        </WarningText>
                    )}
                </LabelAndTextWrapper>

                <LabelAndTextWrapper marginTop="0">
                    <SubHeading
                        className={mainHeadingfontFamilyClass}
                        marginTop="0"
                        mb="10px"
                    >
                        {CONFIRM_PASSWORD_LABEL}
                    </SubHeading>
                    <Input
                        id="confirm-password"
                        fullWidth="76%"
                        {...styledInputConfirmPass}
                        typePassword
                        rightIcon
                        isCorrect
                        leftPosition="15px"
                        topPosition="1px"
                    />

                    {passwordError === didnotMatchWarning && (
                        <WarningText
                            id="warning-text"
                            mb="5px"
                            className={subHeadingfontFamilyClass}
                            visibility={passwordError === didnotMatchWarning}
                        >
                            {didnotMatchWarning}
                        </WarningText>
                    )}
                </LabelAndTextWrapper>

                <SubHeading
                    mb="0"
                    textLightColor
                    marginTop="5px"
                    className={subHeadingfontFamilyClass}
                >
                    {CREATE_WALLET_DESCRIPTION}
                </SubHeading>
            </UnAuthScreensContentWrapper>
            <div
                className="btn-wrapper"
                style={{ marginLeft: '0', marginBottom: '10px' }}
            >
                <Button id="auth-continue" {...continueBtn} />
            </div>
        </Wrapper>
    );
};

export default CreateWalletView;
