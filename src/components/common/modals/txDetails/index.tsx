import React, { useState } from 'react';
import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';

import {
    CloseIconDiv,
    HorizontalContentDiv,
    MainText1,
    MainText2,
    SubText1,
    SubText2,
} from './styledComponents';
import { VerticalContentDiv } from '../../wrapper';
import { fonts, helpers, colors, images } from '../../../../utils';
import { TxDetailsProps } from './types';

const { ContentCopyIcon } = images;
const { addressModifier } = helpers;
const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

const { green, red } = colors;

const TxDetails: React.FunctionComponent<TxDetailsProps> = (props) => {
    const { open, handleClose, style, txDetailsModalData } = props;

    const {
        hash,
        amount,
        accountFrom,
        accountTo,
        transactionFee,
        tokenName,
        status,
    } = txDetailsModalData;

    const [copy, setCopy] = useState('Copy');

    const getTotalBalance = (value1: string, value2: string): number => {
        const val = parseFloat(value1) + parseFloat(value2);
        return Number(val.toFixed(4));
    };

    const copyText = (): void => {
        navigator.clipboard.writeText(hash || 'abc');
        setCopy('Copied');
    };

    const tooltipText = {
        onClick: copyText,
        onMouseOver: () => setCopy('Copy'),
        style: { cursor: 'pointer' },
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style} className="txDetails-modal-style">
                <CloseIconDiv
                    id="close-icon"
                    onClick={() => {
                        handleClose();
                    }}
                >
                    <CloseIcon />
                </CloseIconDiv>
                <VerticalContentDiv marginTop="15px">
                    <MainText1
                        textAlign="center"
                        className={mainHeadingfontFamilyClass}
                    >
                        Details
                    </MainText1>

                    <HorizontalContentDiv
                        marginTop="10px"
                        paddingTop="10px"
                        marginBottom
                    >
                        <VerticalContentDiv>
                            <MainText2
                                textAlign="start"
                                className={mainHeadingfontFamilyClass}
                            >
                                Status
                            </MainText2>
                            <MainText2
                                successText
                                textAlign="start"
                                className={mainHeadingfontFamilyClass}
                                style={{
                                    color: status === 'Failed' ? red : green,
                                }}
                            >
                                {status}
                            </MainText2>
                        </VerticalContentDiv>

                        <VerticalContentDiv>
                            <MainText2
                                textAlign="end"
                                className={mainHeadingfontFamilyClass}
                            >
                                Tx Hash
                            </MainText2>
                            <HorizontalContentDiv>
                                <div
                                    className={`tooltip ${subHeadingfontFamilyClass}`}
                                >
                                    <div id="copy-icon" {...tooltipText}>
                                        <img
                                            src={ContentCopyIcon}
                                            alt="copy-icon"
                                        />
                                        <span
                                            className="tooltiptext"
                                            style={{ fontSize: '0.7rem' }}
                                        >
                                            {copy}
                                        </span>
                                    </div>
                                </div>
                                <SubText2
                                    pl10
                                    textAlign="end"
                                    className={mainHeadingfontFamilyClass}
                                >
                                    {hash
                                        ? `${hash.slice(0, 5)}...${hash.slice(
                                              hash.length - 5,
                                              hash.length
                                          )}`
                                        : ''}
                                </SubText2>
                            </HorizontalContentDiv>
                        </VerticalContentDiv>
                    </HorizontalContentDiv>

                    <HorizontalContentDiv marginTop="10px">
                        <VerticalContentDiv>
                            <MainText2
                                textAlign="start"
                                className={mainHeadingfontFamilyClass}
                            >
                                From
                            </MainText2>
                            <SubText2
                                textAlign="start"
                                className={subHeadingfontFamilyClass}
                            >
                                {addressModifier(accountFrom)}
                            </SubText2>
                        </VerticalContentDiv>

                        <VerticalContentDiv>
                            <MainText2
                                textAlign="end"
                                className={mainHeadingfontFamilyClass}
                            >
                                To
                            </MainText2>
                            <SubText2
                                textAlign="end"
                                className={subHeadingfontFamilyClass}
                            >
                                {addressModifier(accountTo)}
                            </SubText2>
                        </VerticalContentDiv>
                    </HorizontalContentDiv>

                    <MainText1
                        marginTop="30px"
                        textAlign="start"
                        className={mainHeadingfontFamilyClass}
                    >
                        Transaction
                    </MainText1>

                    <VerticalContentDiv specialPadding border paddingBottom>
                        <HorizontalContentDiv paddingTop borderBottom>
                            <VerticalContentDiv marginBottom="10px">
                                <MainText2
                                    marginTop="10px"
                                    textAlign="start"
                                    className={subHeadingfontFamilyClass}
                                >
                                    Amount
                                </MainText2>
                                {/* <MainText2
                                    marginTop="10px"
                                    textAlign="start"
                                    className={subHeadingfontFamilyClass}
                                >
                                    Network Fee
                                </MainText2> */}
                            </VerticalContentDiv>

                            <VerticalContentDiv marginBottom="10px">
                                <MainText2
                                    marginTop="10px"
                                    textAlign="end"
                                    className={mainHeadingfontFamilyClass}
                                >{`${amount} ${tokenName}`}</MainText2>
                                {/* <MainText2
                                    marginTop="10px"
                                    textAlign="end"
                                    className={mainHeadingfontFamilyClass}
                                >
                                    {`${transactionFee} ${tokenName}`}
                                </MainText2> */}
                            </VerticalContentDiv>
                        </HorizontalContentDiv>

                        <HorizontalContentDiv paddingTop marginBottom>
                            <VerticalContentDiv
                                marginTop="10px"
                                marginBottom="10px"
                            >
                                <SubText1
                                    textAlign="start"
                                    className={subHeadingfontFamilyClass}
                                >
                                    Total Amount
                                </SubText1>
                                <SubText1
                                    textAlign="start"
                                    hide
                                    className={subHeadingfontFamilyClass}
                                >
                                    .
                                </SubText1>
                            </VerticalContentDiv>

                            <VerticalContentDiv
                                marginTop="10px"
                                marginBottom="10px"
                            >
                                <MainText2
                                    textAlign="end"
                                    className={mainHeadingfontFamilyClass}
                                >
                                    {`${getTotalBalance(
                                        amount || '10',
                                        transactionFee || '10'
                                    )}
                  ${tokenName}`}
                                </MainText2>
                                <MainText2
                                    textAlign="end"
                                    className={mainHeadingfontFamilyClass}
                                >
                                    $0
                                </MainText2>
                            </VerticalContentDiv>
                        </HorizontalContentDiv>
                    </VerticalContentDiv>
                </VerticalContentDiv>
            </Box>
        </Modal>
    );
};

export default TxDetails;
