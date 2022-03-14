import './index.css';
import React from 'react';
import { approveAuthRequest, rejectAuthRequest } from '../../messaging';
import { MainHeading, SubHeading, WarningText } from '../common/text';
import { colors, images } from '../../utils';
import {
    HorizontalContentDiv,
    VerticalContentDiv,
    Wrapper,
} from '../common/wrapper';
import { Button } from '../common';

const { WarningIcon, WarningTriangleIcon } = images;
const { green } = colors;

const PopupAuth: React.FunctionComponent<any> = ({ requests }) => {
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
                    Authorize {`(1 out of ${requests.length})`}
                </MainHeading>

                <HorizontalContentDiv>
                    <img
                        src={WarningIcon}
                        alt="warning"
                        className="warning-icons"
                        style={{ height: '15px', width: '15px' }}
                    />
                    <SubHeading textAlign="center" ml="25px">
                        Warning
                    </SubHeading>
                </HorizontalContentDiv>

                <SubHeading>
                    An application, self-identifying as{' '}
                    <span style={{ color: green }}>
                        {requests[requests.length - 1].request.origin}
                    </span>{' '}
                    is requesting access from{' '}
                    <span style={{ color: green }}>
                        {requests[requests.length - 1].url}
                    </span>
                </SubHeading>

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

            <VerticalContentDiv style={{ alignItems: 'center' }}>
                <Button
                    handleClick={() =>
                        approveAuthRequest(requests[requests.length - 1].id)
                    }
                    text="Allow Access"
                    id="Authorization-Popup"
                    style={{
                        width: '100%',
                        height: 50,
                        borderRadius: 40,
                    }}
                />

                <WarningText
                    visibility
                    style={{
                        alignSelf: 'center',
                        textAlign: 'center',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                    }}
                    onClick={() =>
                        rejectAuthRequest(requests[requests.length - 1].id)
                    }
                >
                    cancel
                </WarningText>
            </VerticalContentDiv>
        </Wrapper>
    );
};

export default PopupAuth;
