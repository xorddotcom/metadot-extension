import React, { useState, useEffect } from 'react';
import { TypeRegistry } from '@polkadot/types';
import { approveSignPassword } from '../../messaging';
import {
    HorizontalContentDiv,
    VerticalContentDiv,
    Wrapper,
} from '../common/wrapper';
import { MainHeading, SubHeading } from '../common/text';
import { Button, Input } from '../common';
import { images } from '../../utils';

const { CheckboxDisabled, CheckboxEnabled, ContentCopyIcon } = images;
const registry = new TypeRegistry();
console.log('registry in sign popup', registry);

const PopupSign: React.FunctionComponent<any> = ({ requests }) => {
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState(false);

    function trimString(s: any): string {
        return `${s.substring(0, 4)}...${s.substring(s.length - 4)}`;
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
        {
            property: 'Lifetime',
            data: 'mortal ,valid from 9,835,186 to 9,836,250',
            copy: false,
        },
    ];

    // useEffect((): void => {
    //     if (requests[0]) {
    //         const { payload } = requests[0].request;
    //         registry.setSignedExtensions(payload.signedExtensions);
    //     }
    // }, [requests]);
    console.log('sign requests ==>>', requests);
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
                            <HorizontalContentDiv height="16%">
                                <div style={{ width: '25%' }}>
                                    <SubHeading lineHeight="14px" opacity="0.6">
                                        {el.property}
                                    </SubHeading>
                                </div>
                                <div style={{ width: '60%' }}>
                                    <SubHeading lineHeight="14px">
                                        {el.data}
                                    </SubHeading>
                                </div>
                                <div style={{ width: '15%' }}>
                                    <img
                                        src={ContentCopyIcon}
                                        alt="copy"
                                        style={{ cursor: 'pointer' }}
                                    />
                                </div>
                            </HorizontalContentDiv>
                        );
                    }

                    return (
                        <HorizontalContentDiv height="16%">
                            <div style={{ width: '25%' }}>
                                <SubHeading lineHeight="14px" opacity="0.6">
                                    {el.property}
                                </SubHeading>
                            </div>
                            <div style={{ width: '75%' }}>
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
                />

                {/* <HorizontalContentDiv>
                    <img
                        src={passwordCheck ? CheckboxEnabled : CheckboxDisabled}
                        alt="checkbox"
                        style={{
                            height: '15px',
                            width: '15px',
                            cursor: 'pointer',
                        }}
                        onClick={() => setPasswordCheck(!passwordCheck)}
                        aria-hidden
                    />

                    <SubHeading ml="15px" marginTop="0px" mb="0px">
                        Remember my password for next 15 minutes
                    </SubHeading>
                </HorizontalContentDiv> */}
            </VerticalContentDiv>

            <Button
                handleClick={() =>
                    approveSignPassword(requests[0].id, false, password)
                }
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
