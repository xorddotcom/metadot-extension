import './index.css';
import React from 'react';
import { approveAuthRequest } from '../../messaging';
import { MainHeading, SubHeading } from '../common/text';
import { colors } from '../../utils';
import {
    HorizontalContentDiv,
    VerticalContentDiv,
    Wrapper,
} from '../common/wrapper';
import WarningIcon from '../../assets/images/icons/warning_cross_icon.png';
import WarningTriangleIcon from '../../assets/images/icons/warning_triangle.png';
import { Button } from '../common';

const { green } = colors;

const PopupAuth: React.FunctionComponent<any> = ({ requests }) => {
    console.log('auth requests ==>>', requests);
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

                <HorizontalContentDiv>
                    <img
                        src={WarningIcon}
                        alt="warning"
                        className="warning-icons"
                    />
                    <SubHeading textAlign="center" ml="25px">
                        Warning
                    </SubHeading>
                </HorizontalContentDiv>

                <SubHeading>
                    An application, self-identifying as{' '}
                    <span style={{ color: green }}>polkadot-js/apps</span> is
                    requesting access from{' '}
                    <span style={{ color: green }}>
                        https://polkadot.js.org/apps/
                    </span>
                </SubHeading>

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
                handleClick={() => approveAuthRequest(requests[0].id)}
                text="Allow Access"
                id="Authorization-Popup"
                width="100%"
            />
        </Wrapper>
    );
};

export default PopupAuth;
