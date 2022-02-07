import React from 'react';
import { Header } from '../common';
import { Wrapper, MainDiv } from '../common/wrapper';
import { MainHeading, SubHeading } from '../common/text';
import { fonts } from '../../utils';
import { SocialDiv } from './style';
import facebook from '../../assets/images/Facebook.svg';
import telegram from '../../assets/images/Telegram.svg';
import instagram from '../../assets/images/Instagram.svg';
import twitter from '../../assets/images/Twitter.svg';
import discord from '../../assets/images/Discord.svg';
import element from '../../assets/images/Element.svg';

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
                    Lorem ipsum dolor sit amet, consectetur adipiscin cursus sit
                    diam Lorem ipsum dolor sit lorem loremLorem ipsum dolor sit
                    amet, consectetur adipiscin cursus sit diam Lorem ipsum
                    dolor sit lorem ipsum dolor
                </SubHeading>
            </MainDiv>

            <MainDiv mt="60px">
                <MainHeading className={mainHeadingfontFamilyClass}>
                    Contact Us
                </MainHeading>
                <SubHeading className={subHeadingfontFamilyClass}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
                    culpa magnam.
                </SubHeading>
                <SocialDiv>
                    <div
                        onClick={() =>
                            window.open('https://discord.gg/5Jq78EdfN6')
                        }
                        role="tab"
                        aria-hidden="true"
                    >
                        <img src={discord} alt="discord" />
                    </div>

                    <div
                        onClick={() =>
                            window.open(
                                'https://matrix.to/#/#metadot-wallet:matrix.org'
                            )
                        }
                        aria-hidden="true"
                        role="tab"
                    >
                        <img src={element} alt="element" height="20px" />
                    </div>
                    <div
                        onClick={() =>
                            window.open('https://t.me/metadotwallet')
                        }
                        aria-hidden="true"
                        role="tab"
                    >
                        <img src={telegram} alt="telegram" />
                    </div>
                    <div
                        onClick={() =>
                            window.open(
                                'https://www.facebook.com/Metadotwallet'
                            )
                        }
                        aria-hidden="true"
                        role="tab"
                    >
                        <img src={facebook} alt="facebook" />
                    </div>
                    <div
                        onClick={() =>
                            window.open('https://twitter.com/MetadotWallet')
                        }
                        aria-hidden="true"
                        role="tab"
                    >
                        <img src={twitter} alt="twitter" />
                    </div>

                    <div
                        onClick={() =>
                            window.open(
                                'https://www.instagram.com/metadotwallet/'
                            )
                        }
                        aria-hidden="true"
                        role="tab"
                    >
                        <img src={instagram} alt="instagram" />
                    </div>
                </SocialDiv>
            </MainDiv>
        </Wrapper>
    );
};

export default Support;
