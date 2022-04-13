import React from 'react';
import { fonts, images } from '../../utils';
import { MainHeading, SubHeading } from '../common/text';
import Button from '../common/button';

import { WelcomeViewProps } from './types';

import './index.css';

const { logo, FileDownloadOutlinedIcon, AddSharpIcon, metaDot } = images;
const { subHeadingfontFamilyClass, mainHeadingFontSize } = fonts;

const WelcomeView: React.FunctionComponent<WelcomeViewProps> = (
    props
): JSX.Element => {
    const { importHandler, createHandler } = props;
    return (
        <div className="wrapper">
            <div className="app-logo1">
                <img src={logo} alt="logo" />
            </div>

            <div className="main-content">
                <MainHeading textAlign="center">
                    <img src={metaDot} alt="metadot" style={{ width: '93%' }} />
                </MainHeading>
                <SubHeading
                    className={subHeadingfontFamilyClass}
                    textAlign="center"
                    fontSize={mainHeadingFontSize}
                    lineHeight="30px"
                >
                    Your Gateway To Polkadot And <br /> Its Parachains.
                </SubHeading>
            </div>

            <div
                className="btn-wrapper"
                style={{ marginLeft: '0', marginBottom: 0 }}
            >
                <Button
                    id="btn-create"
                    text="Create"
                    StartIcon={AddSharpIcon}
                    handleClick={createHandler}
                    style={{
                        width: '80%',
                        height: 50,
                        borderRadius: 40,
                    }}
                />
                <div style={{ margin: '8px' }} />
                <Button
                    id="btn-import"
                    lightBtn
                    text="Import"
                    StartIcon={FileDownloadOutlinedIcon}
                    handleClick={importHandler}
                    style={{
                        width: '80%',
                        height: 50,
                        borderRadius: 40,
                    }}
                />
            </div>
        </div>
    );
};

export default WelcomeView;
