import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isSignLocked } from '../../messaging';
import {
    HorizontalContentDiv,
    VerticalContentDiv,
    Wrapper,
} from '../common/wrapper';

import {
    MainHeading,
    SubHeading,
    WarningText,
    CancelText,
} from '../common/text';
import { Button, Header, Input } from '../common';
import { fonts, images } from '../../utils';
import '../../index.css';
import { CopyIcon, CopyText, CopyToolTip } from './styles';
import { DASHBOARD } from '../../constants';

const { ContentCopyIcon, CheckboxDisabled, CheckboxEnabled } = images;

const { subHeadingfontFamilyClass } = fonts;

const MultisigSign: React.FunctionComponent = () => {
    const navigate = useNavigate();
    const [copy, setCopy] = useState('Copy');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [savePass, setSavePass] = useState(false);
    const [isLock, setIsLock] = useState(false);

    const copySeedText = (text: string): void => {
        navigator.clipboard.writeText(text);
        setCopy('Copied');
    };

    const styledInputPassword = {
        hideHandler: () => setShowPassword(!showPassword),
        hideState: showPassword,
    };

    function trimString(s: any): string {
        return `${s.substring(0, 7)}...${s.substring(s.length - 7)}`;
    }

    const tooltipText = {
        onMouseOver: () => setCopy('Copy'),
        style: { cursor: 'pointer' },
    };

    const Signaturedata = [
        {
            property: 'From',
            data: 'https://metadot.js.org/apps/#/accounts',
            copy: false,
        },
        {
            property: 'Genesis',
            data: trimString('9000jshdufdxxxxxxxxxxxxxxxxxxxxjshdufdnf88df'),
            copy: true,
            dataToCopy: '9000jshdufdxxxxxxxxxxxxxxxxxxxxjshdufdnf88df',
        },
        {
            property: 'Version',
            data: '9152',
            copy: false,
        },
        {
            property: 'Nonce',
            data: '0',
            copy: false,
        },
        {
            property: 'Method Data',
            data: trimString('9000jshdufdxxxxxxxxxxxxxxxxxxxxjshdufdnf88df'),
            copy: true,
            dataToCopy: '9000jshdufdxxxxxxxxxxxxxxxxxxxxjshdufdnf88df',
        },
    ];

    const handleSubmit = (): void => {
        console.log('sign transaction');
    };

    const handlePassword = (e: string): void => {
        setPasswordError(false);
        setPassword(e);
    };

    const contentCopyIconDivProps = {
        id: 'copy-seed',
        onMouseOver: () => setCopy('Copy'),
        style: { cursor: 'pointer' },
    };

    return (
        <Wrapper
            width="90%"
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}
        >
            {/* <VerticalContentDiv>
                <MainHeading textAlign="center" style={{ marginTop: '0px' }}>
                    Transaction{' '}
                </MainHeading>
            </VerticalContentDiv> */}
            <Header
                centerText="Transaction"
                overWriteBackHandler={() => navigate(DASHBOARD)}
            />

            <VerticalContentDiv
                transactionTitleDiv
                style={{ justifyContent: 'center', marginTop: '30px' }}
            >
                <HorizontalContentDiv>
                    <div
                        style={{
                            width: '15%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <div
                            style={{
                                height: '25px',
                                width: '25px',
                                backgroundColor: '#880041',
                                borderRadius: '50%',
                            }}
                        />
                    </div>
                    <VerticalContentDiv style={{ width: '70%' }}>
                        <SubHeading ml="5px" marginTop="0px" mb="0px">
                            Account
                        </SubHeading>
                        <SubHeading ml="5px" marginTop="0px" mb="0px">
                            {trimString('EVdNacaccaccacaccaacaWGU')}
                        </SubHeading>
                    </VerticalContentDiv>
                    <CopyText
                        {...contentCopyIconDivProps}
                        onClick={() => copySeedText('EVdNacaccaccacaccaacaWGU')}
                        aria-hidden
                    >
                        <CopyIcon src={ContentCopyIcon} alt="copyIcon" />
                        <CopyToolTip>{copy}</CopyToolTip>
                    </CopyText>
                </HorizontalContentDiv>
            </VerticalContentDiv>

            <VerticalContentDiv
                transactionDetailDiv
                style={{
                    justifyContent: 'center',
                    marginTop: '30px',
                }}
            >
                {Signaturedata.map((el) => {
                    console.log('el', el);
                    if (el.copy) {
                        return (
                            <HorizontalContentDiv height="20%">
                                <div style={{ width: '30%' }}>
                                    <SubHeading lineHeight="14px" opacity="0.6">
                                        {el.property}
                                    </SubHeading>
                                </div>
                                <div style={{ width: '60%' }}>
                                    <SubHeading lineHeight="14px" overFlow>
                                        {el.data}
                                    </SubHeading>
                                </div>

                                <CopyText
                                    {...contentCopyIconDivProps}
                                    onClick={() =>
                                        copySeedText(el.dataToCopy || '')
                                    }
                                    aria-hidden
                                >
                                    <CopyIcon
                                        src={ContentCopyIcon}
                                        alt="copyIcon"
                                    />
                                    <CopyToolTip>{copy}</CopyToolTip>
                                </CopyText>
                            </HorizontalContentDiv>
                        );
                    }

                    return (
                        <HorizontalContentDiv height="20%">
                            <div style={{ width: '30%' }}>
                                <SubHeading lineHeight="14px" opacity="0.6">
                                    {el.property}
                                </SubHeading>
                            </div>
                            <div style={{ width: '70%' }}>
                                <SubHeading lineHeight="14px" overFlow>
                                    {el.data}
                                </SubHeading>
                            </div>
                        </HorizontalContentDiv>
                    );
                })}
            </VerticalContentDiv>

            <VerticalContentDiv
                transactionPasswordDiv
                style={{ marginTop: '30px' }}
            >
                <SubHeading ml="5px" marginTop="0px" mb="0px">
                    Password
                </SubHeading>

                <Input
                    id="TransactionPassword"
                    value={password}
                    onChange={(e) => handlePassword(e)}
                    placeholder="Password For This Account"
                    typePassword
                    rightIcon
                    isCorrect
                    rightPosition="18px"
                    topPosition="27px"
                    {...styledInputPassword}
                    fullWidth="83%"
                />
                {passwordError && (
                    <WarningText
                        id="warning-text"
                        mb="5px"
                        mt="0px"
                        className={subHeadingfontFamilyClass}
                        visibility={passwordError}
                    >
                        Invalid Password.
                    </WarningText>
                )}
            </VerticalContentDiv>

            <HorizontalContentDiv
                onClick={() => setSavePass(!savePass)}
                style={{ cursor: 'pointer' }}
            >
                <img
                    src={savePass ? CheckboxEnabled : CheckboxDisabled}
                    alt="checkbox"
                    style={{ height: '15px', width: '15px' }}
                />
                <SubHeading
                    fontSize="12px"
                    color="#FAFAFA"
                    lineHeight="0px"
                    ml="12px"
                >
                    Remember my password for next 15 minutes
                </SubHeading>
            </HorizontalContentDiv>

            <VerticalContentDiv
                style={{ alignItems: 'center', marginTop: '30px' }}
            >
                <Button
                    disabled={password.length === 0 && !(isLock === false)}
                    handleClick={handleSubmit}
                    text="Sign The Transaction"
                    id="Authorization-Popup"
                    style={{
                        width: '100%',
                        height: 50,
                        borderRadius: 40,
                    }}
                />
                <CancelText onClick={() => console.log('cancel')}>
                    Cancel
                </CancelText>
            </VerticalContentDiv>
        </Wrapper>
    );
};

export default MultisigSign;
