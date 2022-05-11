import React from 'react';
import { Modal } from '@mui/material';
import { Box, fontSize } from '@mui/system';
import { MainHeading, SubHeading } from '../../text';
import Button from '../../button';
import { fonts, colors, images } from '../../../../utils';
import { WarningModalProps } from './types';
import { HorizontalContentDiv } from '../../wrapper';

const { primaryText, white } = colors;
const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;
const { ContentCopyIconWhite } = images;

const MultisiglDetailsView: React.FunctionComponent<WarningModalProps> = (
    props
) => {
    const { open, handleClose, address, name, singatories, threshold } = props;
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
                            <SubHeading {...subHeading2}>{address}</SubHeading>
                        </HorizontalContentDiv>
                        <HorizontalContentDiv
                            width="30%"
                            justifyContent="flex-end"
                        >
                            <img src={ContentCopyIconWhite} alt="copy" />
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
                                    {address}
                                </SubHeading>
                            </HorizontalContentDiv>
                            <HorizontalContentDiv
                                width="30%"
                                justifyContent="flex-end"
                            >
                                <img src={ContentCopyIconWhite} alt="copy" />
                            </HorizontalContentDiv>
                        </HorizontalContentDiv>
                    ))}
                </div>
            </Box>
        </Modal>
    );
};

export default MultisiglDetailsView;
