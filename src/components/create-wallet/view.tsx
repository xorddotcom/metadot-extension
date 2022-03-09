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

    const onSubmitForm = (): void | Promise<void> =>
        continueBtn.disabled
            ? console.log('all fields required!')
            : continueBtn.handleClick();

    return (
        <Wrapper
            height="570px"
            // style={{
            //     display: 'flex',
            //     flexDirection: 'column',
            //     justifyContent: 'space-between',
            // }}
        >
            <Header
                centerText={CREATE_WALLET_HEADER}
                backHandler={() => backHandler()}
            />
            <UnAuthScreensContentWrapper mb="25px">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        console.log('abc');
                        onSubmitForm();
                    }}
                >
                    <LabelAndTextWrapper>
                        <SubHeading {...walletNameText}>
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
                            mb="10px"
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
                            className={subHeadingfontFamilyClass}
                            style={{ color: '#FFFFFF', opacity: 0.56 }}
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
                            mb="10px"
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
                                {didnotMatchWarning}
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
