import './index.css';
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SubHeading } from '../common/text';
import { colors, images } from '../../utils';
import {
    HorizontalContentDiv,
    VerticalContentDiv,
    Wrapper,
} from '../common/wrapper';
import { Button, Header } from '../common';
import { CONFIRM_SEED } from '../../constants';

const { CheckboxDisabled, WarningTriangleIcon, CheckboxEnabled } = images;
const { green } = colors;

const PopupAuth: React.FunctionComponent = (): JSX.Element => {
    const navigate = useNavigate();
    const location = useLocation().state as {
        prevRoute: string;
        newPhrase: string;
    };

    const [check, setCheck] = useState(false);

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
                <Header
                    centerText="Seed Phrase"
                    backHandler={() => console.log('goback')}
                />

                <SubHeading marginTop="30px">
                    Your <span style={{ color: green }}>Seed Phrase</span> is a
                    12-word phrase that is the
                    <span style={{ color: green }}> Master Key</span> to your
                    wallet and your funds.
                </SubHeading>

                <VerticalContentDiv warningDiv marginTop="30px">
                    <img
                        src={WarningTriangleIcon}
                        alt="warning"
                        className="warning-icons"
                        style={{ height: '15px', width: '15px' }}
                    />
                    <SubHeading color="#FAFAFA" opacity="0.7" fontSize="14px">
                        Never share your Seed Phrase, If someone is asking you
                        for your Seed Phrase, they are likely trying to steal
                        your funds.
                    </SubHeading>
                </VerticalContentDiv>
                <HorizontalContentDiv>
                    <img
                        src={check ? CheckboxEnabled : CheckboxDisabled}
                        alt="Check"
                        onClick={() => setCheck(!check)}
                        aria-hidden
                        style={{ height: '15px', width: '15px' }}
                    />
                    <SubHeading style={{ marginLeft: '15px' }}>
                        Yes, I have stored my seed phrase.
                    </SubHeading>
                </HorizontalContentDiv>
                <VerticalContentDiv />
            </VerticalContentDiv>

            <VerticalContentDiv style={{ alignItems: 'center' }}>
                <Button
                    handleClick={() => {
                        navigate(CONFIRM_SEED, {
                            state: { newPhrase: location.newPhrase },
                        });
                    }}
                    text="Allow Access"
                    id="Authorization-Popup"
                    style={{
                        width: '100%',
                        height: 50,
                        borderRadius: 40,
                    }}
                    disabled={!check}
                />
            </VerticalContentDiv>
        </Wrapper>
    );
};

export default PopupAuth;