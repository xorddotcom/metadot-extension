import React from 'react';
import { approveMetaRequest } from '../../messaging';
import { colors, images } from '../../utils';
import {
    HorizontalContentDiv,
    VerticalContentDiv,
    Wrapper,
} from '../common/wrapper';
import { MainHeading, SubHeading } from '../common/text';
import { Button } from '../common';

const { WarningTriangleIcon } = images;
const { green } = colors;

// const Metadata = [
//     { property: 'From', data: 'https://metadot.js.org/apps/#/accounts' },
//     { property: 'From', data: 'https://metadot.js.org/apps/#/accounts' },
//     { property: 'From', data: 'https://metadot.js.org/apps/#/accounts' },
//     { property: 'From', data: 'https://metadot.js.org/apps/#/accounts' },
//     { property: 'From', data: 'https://metadot.js.org/apps/#/accounts' },
//     { property: 'From', data: 'https://metadot.js.org/apps/#/accounts' },
// ];

const PopupMeta: React.FunctionComponent<any> = ({ requests }) => {
    console.log('meta requests ==>>', requests);

    const Metadata = [
        { property: 'From', data: requests[0].url },
        { property: 'Chain', data: requests[0].request.chain },
        { property: 'Icon', data: requests[0].request.icon },
        {
            property: 'Decimals',
            data: requests[0].request.tokenDecimals,
        },
        { property: 'Symbol', data: requests[0].request.tokenSymbol },
        { property: 'Upgrade', data: 'https://metadot.js.org/apps/#/accounts' },
    ];

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
                <MainHeading textAlign="center">
                    Metadata {`(1 out of ${requests.length})`}
                </MainHeading>

                <VerticalContentDiv style={{ height: '160px' }}>
                    {Metadata.map((el) => (
                        <HorizontalContentDiv height="16%">
                            <div style={{ width: '20%' }}>
                                <SubHeading lineHeight="14px" opacity="0.6">
                                    {el.property}
                                </SubHeading>
                            </div>
                            <div
                                style={{
                                    width: '80%',
                                    display: 'flex',
                                }}
                            >
                                <SubHeading lineHeight="14px" overFlow>
                                    {el.data}
                                </SubHeading>
                            </div>
                        </HorizontalContentDiv>
                    ))}
                </VerticalContentDiv>

                <VerticalContentDiv warningDiv marginTop="40px">
                    <img
                        src={WarningTriangleIcon}
                        alt="warning"
                        className="warning-icons"
                        style={{ height: '15px', width: '15px' }}
                    />
                    <SubHeading>
                        Only approve this request if you trust the application.
                        Approving gives the application access to the addresses
                        of your accounts.
                    </SubHeading>
                </VerticalContentDiv>
            </VerticalContentDiv>

            <Button
                text="Update Metadata"
                id="Authorization-Popup"
                style={{
                    width: '100%',
                    height: 50,
                    borderRadius: 40,
                }}
                handleClick={() => approveMetaRequest(requests[0].id)}
            />
        </Wrapper>
    );
};

export default PopupMeta;
