import React, { useState, useEffect } from 'react';
import { TypeRegistry } from '@polkadot/types';
import { formatNumber, bnToBn } from '@polkadot/util';
import type { ExtrinsicEra } from '@polkadot/types/interfaces';
import { approveSignPassword } from '../../messaging';
import {
    HorizontalContentDiv,
    VerticalContentDiv,
    Wrapper,
} from '../common/wrapper';

import { MainHeading, SubHeading, WarningText } from '../common/text';
import { Button, Input } from '../common';
import { fonts, helpers, images } from '../../utils';

const { CheckboxDisabled, CheckboxEnabled, ContentCopyIcon } = images;
const registry = new TypeRegistry();
console.log('registry in sign popup', registry);

const { subHeadingfontFamilyClass } = fonts;

const PopupSign: React.FunctionComponent<any> = ({ requests }) => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const styledInputPassword = {
        hideHandler: () => setShowPassword(!showPassword),
        hideState: showPassword,
    };

    function trimString(s: any): string {
        return `${s.substring(0, 7)}...${s.substring(s.length - 7)}`;
    }

    function mortalityAsString(
        era: ExtrinsicEra,
        hexBlockNumber: string
    ): string {
        if (era.isImmortalEra) {
            return 'immortal';
        }
        const blockNumber = bnToBn(hexBlockNumber);
        const mortal = era.asMortalEra;
        return `mortal, valid from ${formatNumber(
            mortal.birth(blockNumber)
        )} to ${formatNumber(mortal.death(blockNumber))}`;
    }

    const Signaturedata = [
        {
            property: 'From',
            data: requests[0].url,
            copy: false,
        },
        {
            property: 'Genesis',
            data: trimString(requests[0].request.payload.genesisHash),
            copy: true,
            dataToCopy: requests[0].request.payload.genesisHash,
        },
        {
            property: 'Version',
            data: requests[0].request.payload.version,
            copy: false,
        },
        {
            property: 'Nonce',
            data: requests[0].request.payload.nonce,
            copy: false,
        },
        {
            property: 'Method Data',
            data: trimString(requests[0].request.payload.method),
            copy: true,
            dataToCopy: requests[0].request.payload.version.method,
        },
    ];

    // useEffect((): void => {
    //     if (requests[0]) {
    //         const { payload } = requests[0].request;
    //         registry.setSignedExtensions(payload.signedExtensions);
    //     }
    // }, [requests]);
    console.log('sign requests ==>>', requests);

    const handleSubmit = (): void => {
        try {
            setPasswordError(true);
            approveSignPassword(requests[0].id, false, password);
        } catch (e) {
            console.log(e);
            setPasswordError(true);
        }
    };
    return (
        <Wrapper
            height="570px"
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}
        >
            <VerticalContentDiv>
                <MainHeading textAlign="center">Authorize</MainHeading>
            </VerticalContentDiv>

            <VerticalContentDiv
                transactionTitleDiv
                style={{ justifyContent: 'center' }}
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
                            {requests[0].account.name}
                        </SubHeading>
                        <SubHeading ml="5px" marginTop="0px" mb="0px">
                            {trimString(requests[0].account.address)}
                        </SubHeading>
                    </VerticalContentDiv>
                    <div
                        style={{
                            width: '15%',
                        }}
                    >
                        <img
                            src={ContentCopyIcon}
                            alt="copy"
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                                navigator.clipboard.writeText(
                                    requests[0].account.address
                                );
                            }}
                            aria-hidden
                        />
                    </div>
                </HorizontalContentDiv>
            </VerticalContentDiv>

            <VerticalContentDiv
                transactionDetailDiv
                style={{
                    justifyContent: 'center',
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
                                    <SubHeading lineHeight="14px">
                                        {el.data}
                                    </SubHeading>
                                </div>
                                <div style={{ width: '10%' }}>
                                    <img
                                        src={ContentCopyIcon}
                                        alt="copy"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                            navigator.clipboard.writeText(
                                                el.dataToCopy
                                            );
                                        }}
                                        aria-hidden
                                    />
                                </div>
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
                                <SubHeading lineHeight="14px">
                                    {el.data}
                                </SubHeading>
                            </div>
                        </HorizontalContentDiv>
                    );
                })}
            </VerticalContentDiv>

            <VerticalContentDiv transactionPasswordDiv>
                <SubHeading ml="5px" marginTop="0px" mb="0px">
                    Password
                </SubHeading>

                <Input
                    id="TransactionPassword"
                    value={password}
                    onChange={setPassword}
                    placeholder="Password For This Account"
                    typePassword
                    rightIcon
                    isCorrect
                    leftPosition="-5px"
                    topPosition="1px"
                    {...styledInputPassword}
                />
                {passwordError && (
                    <WarningText
                        id="warning-text"
                        mb="5px"
                        className={subHeadingfontFamilyClass}
                        visibility={passwordError}
                    >
                        Account can not be validated.
                    </WarningText>
                )}
            </VerticalContentDiv>

            <Button
                handleClick={handleSubmit}
                text="Sign The Transaction"
                id="Authorization-Popup"
                style={{
                    width: '100%',
                    height: 50,
                    borderRadius: 40,
                }}
                disabled={password.length === 0}
            />
        </Wrapper>
    );
};

export default PopupSign;
