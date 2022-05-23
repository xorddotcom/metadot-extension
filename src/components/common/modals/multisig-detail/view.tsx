import React, { useState } from 'react';
import { Modal } from '@mui/material';
import { Box, fontSize } from '@mui/system';
import { useSelector } from 'react-redux';
import { MainHeading, SubHeading } from '../../text';
import Button from '../../button';
import { fonts, colors, images, helpers } from '../../../../utils';
import services from '../../../../utils/services';
import { WarningModalProps } from './types';
import { HorizontalContentDiv } from '../../wrapper';
import { RootState } from '../../../../redux/store';

const { primaryText, white } = colors;
const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;
const { ContentCopyIconWhite } = images;
const { addressModifier } = helpers;
const { addressMapper } = services;

const MultisiglDetailsView: React.FunctionComponent<WarningModalProps> = (
    props
) => {
    const { open, handleClose, address, name, singatories, threshold } = props;
    const { prefix } = useSelector((state: RootState) => state.activeAccount);
    const mainHeading = {
        className: mainHeadingfontFamilyClass,
        color: primaryText,
        fw: '500',
    };
    const subHeading1 = {
        className: subHeadingfontFamilyClass,
        color: white,
        opacity: '0.6',
        fontSize: '12px',
        lineHeight: '0px',
    };

    const subHeading2 = {
        className: subHeadingfontFamilyClass,
        color: white,
        fontSize: '12px',
        lineHeight: '0px',
    };

    const style = {
        width: '340px',
        minHeight: '300px',
        background: '#141414',
        bottom: 30,
        p: 2,
        px: 2,
        pb: 3,
    };

    const [copy, setCopy] = useState('Copy');

    const copyText = (stringNeedToBeCopied?: string): void => {
        navigator.clipboard.writeText(stringNeedToBeCopied || 'abc');
        setCopy('Copied');
    };

    const copyIconTooltipText = {
        className: 'multisig-details-text',
        style: {
            maxWidth: '70px',
            left: '113px',
            bottom: '19px',
            fontSize: '11px',
            fontWeight: 300,
            transition: 'all 0.1s ease-in',
            marginLeft: '0px !important',
        },
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box style={style} className="multisig-modal-style">
                <MainHeading {...mainHeading}>Account Details</MainHeading>
                <div
                    style={{
                        border: '1px solid #212121',
                        filter: 'drop-shadow(0px 0px 40px rgba(13, 13, 13, 0.2))',
                        borderRadius: '8px',
                        width: '82%',
                        minHeight: '150px',
                        padding: '18px 15px',
                    }}
                >
                    <HorizontalContentDiv>
                        <HorizontalContentDiv width="30%">
                            <SubHeading {...subHeading1}>name</SubHeading>
                        </HorizontalContentDiv>
                        <HorizontalContentDiv width="40%">
                            <SubHeading {...subHeading2}>{name}</SubHeading>
                        </HorizontalContentDiv>
                    </HorizontalContentDiv>

                    <HorizontalContentDiv>
                        <HorizontalContentDiv width="30%">
                            <SubHeading {...subHeading1}>Address</SubHeading>
                        </HorizontalContentDiv>
                        <HorizontalContentDiv width="40%">
                            <SubHeading {...subHeading2}>
                                {addressModifier(
                                    addressMapper(address, prefix)
                                )}
                            </SubHeading>
                        </HorizontalContentDiv>
                        <HorizontalContentDiv
                            width="30%"
                            justifyContent="flex-end"
                            className="multisig-details"
                            onClick={() => copyText(address)}
                            onMouseOver={() => setCopy('Copy')}
                        >
                            <img src={ContentCopyIconWhite} alt="copy" />
                            <span {...copyIconTooltipText}>{copy}</span>
                        </HorizontalContentDiv>
                    </HorizontalContentDiv>

                    <HorizontalContentDiv>
                        <HorizontalContentDiv width="30%">
                            <SubHeading {...subHeading1}>threshold</SubHeading>
                        </HorizontalContentDiv>
                        <HorizontalContentDiv width="40%">
                            <SubHeading {...subHeading2}>
                                {threshold}/{singatories.length}
                            </SubHeading>
                        </HorizontalContentDiv>
                    </HorizontalContentDiv>

                    {singatories.map((singature) => (
                        <HorizontalContentDiv>
                            <HorizontalContentDiv width="30%">
                                <SubHeading {...subHeading1}>
                                    Address
                                </SubHeading>
                            </HorizontalContentDiv>
                            <HorizontalContentDiv width="40%">
                                <SubHeading {...subHeading2}>
                                    {addressModifier(
                                        addressMapper(singature, prefix)
                                    )}
                                </SubHeading>
                            </HorizontalContentDiv>
                            <HorizontalContentDiv
                                width="30%"
                                justifyContent="flex-end"
                                className="multisig-details"
                                onClick={() => copyText(singature)}
                                onMouseOver={() => setCopy('Copy')}
                            >
                                <img src={ContentCopyIconWhite} alt="copy" />
                                <span {...copyIconTooltipText}>{copy}</span>
                            </HorizontalContentDiv>
                        </HorizontalContentDiv>
                    ))}
                </div>
            </Box>
        </Modal>
    );
};

export default MultisiglDetailsView;
