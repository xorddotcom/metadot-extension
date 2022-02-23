import React from 'react';
import { Header } from '../common';
import { Wrapper, MainDiv } from '../common/wrapper';
import { MainHeading, SubHeading } from '../common/text';
import { fonts, images } from '../../utils';
import { SocialDiv } from './style';

const { facebook, telegram, instagram, twitter, discord, element } = images;
const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

const Support: React.FunctionComponent = () => {
    const upperDiv = { marginTop: '34px', marginBottom: '30px' };
    return (
        <Wrapper>
            <Header
                centerText="Support"
                backHandler={() => console.log('object')}
            />
            <MainDiv style={upperDiv}>
                <MainHeading className={mainHeadingfontFamilyClass}>
                    How may we help you ?
                </MainHeading>
                <SubHeading className={subHeadingfontFamilyClass}>
                    Metadot support regarding any query is available in our
                    community channels. Remember, Metadot will not ask for your
                    seed phrase or your password, by any means!
                </SubHeading>
            </MainDiv>

            <MainDiv mt="60px">
                <MainHeading className={mainHeadingfontFamilyClass}>
                    Our Communities
                </MainHeading>
                <SubHeading className={subHeadingfontFamilyClass}>
                    Join the discussions in our communities to learn more. If
                    you have any application specific complaints, you can use
                    the “Metadot Support” channel on our discord community to
                    get direct official support from metadot.
                </SubHeading>
                <SocialDiv>
                    <div
                        onClick={() =>
                            window.open('https://discord.gg/5Jq78EdfN6')
                        }
                        role="tab"
                        aria-hidden="true"
                        style={{ cursor: 'pointer' }}
                    >
                        <img src={discord} alt="discord" />
                    </div>

                    <div
                        onClick={() =>
                            window.open(
                                'https://matrix.to/#/#metadot-wallet:matrix.org'
                            )
                        }
                        role="tab"
                        aria-hidden="true"
                        style={{ cursor: 'pointer' }}
                    >
                        <img src={element} alt="element" height="20px" />
                    </div>
                    <div
                        onClick={() =>
                            window.open('https://t.me/metadotwallet')
                        }
                        role="tab"
                        aria-hidden="true"
                        style={{ cursor: 'pointer' }}
                    >
                        <img src={telegram} alt="telegram" />
                    </div>
                    <div
                        onClick={() =>
                            window.open(
                                'https://www.facebook.com/Metadotwallet'
                            )
                        }
                        role="tab"
                        aria-hidden="true"
                        style={{ cursor: 'pointer' }}
                    >
                        <img src={facebook} alt="facebook" />
                    </div>
                    <div
                        onClick={() =>
                            window.open('https://twitter.com/MetadotWallet')
                        }
                        role="tab"
                        aria-hidden="true"
                        style={{ cursor: 'pointer' }}
                    >
                        <img src={twitter} alt="twitter" />
                    </div>

                    <div
                        onClick={() =>
                            window.open(
                                'https://www.instagram.com/metadotwallet/'
                            )
                        }
                        role="tab"
                        aria-hidden="true"
                        style={{ cursor: 'pointer' }}
                    >
                        <img src={instagram} alt="instagram" />
                    </div>
                </SocialDiv>
            </MainDiv>
        </Wrapper>
    );
};

export default Support;
