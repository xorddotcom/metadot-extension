import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
    approveSignPassword,
    cancelSignRequest,
    isSignLocked,
} from '../../messaging';
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
import { Button, Input } from '../common';
import { fonts, images } from '../../utils';
import '../../index.css';
import { CopyIcon, CopyText, CopyToolTip } from './styles';

const { ContentCopyIcon, CheckboxDisabled, CheckboxEnabled } = images;

const { subHeadingfontFamilyClass } = fonts;

const PopupSign: React.FunctionComponent<any> = ({ requests }) => {
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

    useEffect(() => {
        setIsLock(true);
        let timeout: NodeJS.Timeout;

        isSignLocked(requests[requests.length - 1].id)
            .then(({ isLocked, remainingTime }) => {
                setIsLock(isLocked);
                timeout = setTimeout(() => {
                    setIsLock(true);
                }, remainingTime);
            })
            .catch((error: Error) => console.error(error));

        return () => {
            if (timeout) clearTimeout(timeout);
        };
    }, []);

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
            data: requests[requests.length - 1].url,
            copy: false,
        },
        {
            property: 'Genesis',
            data: trimString(
                requests[requests.length - 1].request.payload.genesisHash
            ),
            copy: true,
            dataToCopy:
                requests[requests.length - 1].request.payload.genesisHash,
        },
        {
            property: 'Version',
            data: requests[requests.length - 1].request.payload.version,
            copy: false,
        },
        {
            property: 'Nonce',
            data: requests[requests.length - 1].request.payload.nonce,
            copy: false,
        },
        {
            property: 'Method Data',
            data: trimString(
                requests[requests.length - 1].request.payload.method
            ),
            copy: true,
            dataToCopy: requests[requests.length - 1].request.payload.method,
        },
    ];

    // useEffect((): void => {
    //     if (requests[requests.length - 1]) {
    //         const { payload } = requests[requests.length - 1].request;
    //         registry.setSignedExtensions(payload.signedExtensions);
    //     }
    // }, [requests]);

    const handleSubmit = async (): Promise<void> => {
        try {
            await approveSignPassword(
                requests[requests.length - 1].id,
                savePass,
                password
            );
            setPasswordError(false);
        } catch (e) {
            console.log(e, 'check transaction error');
            setPasswordError(true);
        }
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
            <VerticalContentDiv>
                <MainHeading textAlign="center" style={{ marginTop: '0px' }}>
                    Transaction{' '}
                    {requests.length > 0 ? `(1 out of ${requests.length})` : ''}
                </MainHeading>
            </VerticalContentDiv>

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
                            {requests[requests.length - 1].account.name}
                        </SubHeading>
                        <SubHeading ml="5px" marginTop="0px" mb="0px">
                            {trimString(
                                requests[requests.length - 1].account.address
                            )}
                        </SubHeading>
                    </VerticalContentDiv>
                    <CopyText
                        {...contentCopyIconDivProps}
                        onClick={() =>
                            copySeedText(
                                requests[requests.length - 1].account.address
                            )
                        }
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
                                    onClick={() => copySeedText(el.dataToCopy)}
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

            {isLock && (
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
            )}

            {isLock && (
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
            )}

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
                <CancelText
                    onClick={() =>
                        cancelSignRequest(requests[requests.length - 1].id)
                    }
                >
                    Cancel
                </CancelText>
            </VerticalContentDiv>
        </Wrapper>
    );
};

export default PopupSign;
