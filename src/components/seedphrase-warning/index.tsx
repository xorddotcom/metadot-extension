import './index.css';
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SubHeading } from '../common/text';
import { colors, images, fonts } from '../../utils';
import {
    HorizontalContentDiv,
    VerticalContentDiv,
    Wrapper,
} from '../common/wrapper';
import { Button, Header } from '../common';
import { CONFIRM_SEED } from '../../constants';

const { CheckboxDisabled, WarningTriangleIcon, CheckboxEnabled } = images;
const { green } = colors;
const { subHeadingfontFamilyClass } = fonts;

const PopupAuth: React.FunctionComponent = (): JSX.Element => {
    const navigate = useNavigate();
    const location = useLocation().state as {
        prevRoute: string;
        newPhrase: string;
    };

    const [check, setCheck] = useState(false);

    return (
        <Wrapper
            height="600px"
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}
        >
            <VerticalContentDiv>
                <Header centerText="Seed Phrase" />

                <SubHeading
                    marginTop="30px"
                    className={subHeadingfontFamilyClass}
                >
                    Your <span style={{ color: '#2e9b9b' }}>Seed Phrase</span>{' '}
                    is a 12-word phrase that is the
                    <span style={{ color: '#2e9b9b' }}> Master Key</span> to
                    your wallet and your funds.
                </SubHeading>

                <VerticalContentDiv warningDiv marginTop="30px">
                    <img
                        src={WarningTriangleIcon}
                        alt="warning"
                        className="warning-icons"
                        style={{ height: '16px', width: '16px' }}
                    />
                    <SubHeading
                        color="#FAFAFA"
                        opacity="0.7"
                        fontSize="14px"
                        className={subHeadingfontFamilyClass}
                    >
                        Never share your Seed Phrase, If someone is asking you
                        for your Seed Phrase, they are likely trying to steal
                        your funds.
                    </SubHeading>
                </VerticalContentDiv>
                <HorizontalContentDiv
                    onClick={() => setCheck(!check)}
                    style={{ cursor: 'pointer' }}
                >
                    <img
                        src={check ? CheckboxEnabled : CheckboxDisabled}
                        alt="Check"
                        aria-hidden
                        style={{ height: '16.5px', width: '16.5px' }}
                    />
                    <SubHeading
                        style={{ marginLeft: '15px' }}
                        className={subHeadingfontFamilyClass}
                    >
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
                    text="Continue"
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
