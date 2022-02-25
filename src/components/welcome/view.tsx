import React from 'react';
import { fonts, images } from '../../utils';
import { MainHeading, SubHeading } from '../common/text';
import Button from '../common/button';

import { WELCOME_TAG_LINE } from '../../utils/app-content';
import { WelcomeViewProps } from './types';

import './index.css';

const { logo, FileDownloadOutlinedIcon, AddSharpIcon, metaDot } = images;
const { subHeadingfontFamilyClass } = fonts;

const WelcomeView: React.FunctionComponent<WelcomeViewProps> = (
    props
): JSX.Element => {
    const { importHandler, createHandler } = props;
    return (
        <>
            <div className="app-logo1">
                <img src={logo} alt="logo" />
            </div>

            <div className="main-content">
                <MainHeading textAlign="center">
                    <img src={metaDot} alt="metadot" />
                </MainHeading>
                <SubHeading
                    className={subHeadingfontFamilyClass}
                    textAlign="center"
                >
                    {WELCOME_TAG_LINE}
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
                        width: '100%',
                        height: 50,
                        borderRadius: 40,
                    }}
                />
                <div style={{ margin: '0.5rem' }} />
                <Button
                    id="btn-import"
                    lightBtn
                    text="Import"
                    StartIcon={FileDownloadOutlinedIcon}
                    handleClick={importHandler}
                    style={{
                        width: '100%',
                        height: 50,
                        borderRadius: 40,
                    }}
                />
            </div>
        </>
    );
};

export default WelcomeView;
