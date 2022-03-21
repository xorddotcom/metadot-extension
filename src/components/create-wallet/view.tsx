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
        isValidWalletName,
        passwordError,
        walletNameText,
        styledInputName,
        styledInputPassword,
        styledInputConfirmPass,
        continueBtn,
        headingText,
    } = props;

    const onSubmitForm = (): void | Promise<void> =>
        continueBtn.disabled
            ? console.log('all fields required!')
            : continueBtn.handleClick();

    return (
        <Wrapper height="570px" style={{ paddingBottom: '0px !important' }}>
            <Header centerText={headingText} />
            <UnAuthScreensContentWrapper mb="20px">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        onSubmitForm();
                    }}
                >
                    <LabelAndTextWrapper>
                        <SubHeading {...walletNameText} mb="0px" weight="700">
                            {WALLET_NAME_LABEL}
                        </SubHeading>
                        <Input
                            id="wallet-name"
                            isCorrect
                            {...styledInputName}
                        />
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
                            mb="0px"
                            weight="700"
                        >
                            {PASSWORD_LABEL}
                        </SubHeading>
                        <Input
                            id="password"
                            fullWidth="80%"
                            {...styledInputPassword}
                            typePassword
                            isCorrect
                            rightIcon
                            rightPosition="17px"
                            topPosition="26px"
                        />

                        <SubHeading
                            mb="0"
                            textLightColor
                            marginTop="5px"
                            lineHeight="15px"
                            className={subHeadingfontFamilyClass}
                            style={
                                passwordError === passwordValidation
                                    ? { color: '#F63A3A', opacity: 0.7 }
                                    : { color: '#FFFFFF', opacity: 0.56 }
                            }
                            fontSize="11px"
                        >
                            Password must contain at least one lower case, one
                            upper case, one number and a special character
                        </SubHeading>
                    </LabelAndTextWrapper>

                    <LabelAndTextWrapper marginTop="55px" minHeight="135px">
                        <SubHeading
                            className={mainHeadingfontFamilyClass}
                            marginTop="25px"
                            mb="0px"
                            weight="700"
                        >
                            {CONFIRM_PASSWORD_LABEL}
                        </SubHeading>
                        <Input
                            id="confirm-password"
                            fullWidth="80%"
                            {...styledInputConfirmPass}
                            typePassword
                            rightIcon
                            isCorrect
                            rightPosition="17px"
                            topPosition="26px"
                        />

                        {passwordError === didnotMatchWarning && (
                            <WarningText
                                id="warning-text"
                                mb="10px"
                                className={subHeadingfontFamilyClass}
                                visibility={
                                    passwordError === didnotMatchWarning
                                }
                            >
                                {didnotMatchWarning}
                            </WarningText>
                        )}
                        {passwordError === minimumCharacterWarning && (
                            <WarningText
                                id="warning-text-1"
                                className={subHeadingfontFamilyClass}
                                mb="10px"
                                visibility={
                                    passwordError === minimumCharacterWarning
                                }
                            >
                                {minimumCharacterWarning}
                            </WarningText>
                        )}
                    </LabelAndTextWrapper>

                    <input type="submit" style={{ display: 'none' }} />
                </form>
            </UnAuthScreensContentWrapper>

            <Button id="auth-continue" {...continueBtn} />
        </Wrapper>
    );
};

export default CreateWalletView;
