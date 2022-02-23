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

const Metadata = [
    { property: 'From', data: 'https://metadot.js.org/apps/#/accounts' },
    { property: 'From', data: 'https://metadot.js.org/apps/#/accounts' },
    { property: 'From', data: 'https://metadot.js.org/apps/#/accounts' },
    { property: 'From', data: 'https://metadot.js.org/apps/#/accounts' },
    { property: 'From', data: 'https://metadot.js.org/apps/#/accounts' },
    { property: 'From', data: 'https://metadot.js.org/apps/#/accounts' },
];

const PopupMeta: React.FunctionComponent<any> = ({ requests }) => {
    console.log('meta requests ==>>', requests);
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
                <MainHeading textAlign="center">Metadata</MainHeading>

                <VerticalContentDiv style={{ height: '160px' }}>
                    {Metadata.map((el) => (
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
                    ))}
                </VerticalContentDiv>

                <VerticalContentDiv warningDiv marginTop="40px">
                    <img
                        src={WarningTriangleIcon}
                        alt="warning"
                        className="warning-icons"
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
                width="100%"
                handleClick={() => console.log('clicked')}
            />
        </Wrapper>
    );
};

export default PopupMeta;
