import React from 'react';
import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';

import { useSelector } from 'react-redux';
import {
    CloseIconDiv,
    HorizontalContentDiv,
    MainText1,
    MainText2,
    SubText2,
} from './styledComponents';
import { VerticalContentDiv } from '../../wrapper';
import { fonts, helpers, colors, images } from '../../../../utils';
import { TxDetailsViewProps } from './types';
import { RootState } from '../../../../redux/store';

import constants from '../../../../constants/onchain';
import { Button } from '../..';

const {
    CONTEXTFREE_CONFIG,
    POLKADOT_CONFIG,
    KUSAMA_CONFIG,
    SHIDEN_CONFIG,
    KARURA_CONFIG,
    WESTEND_CONFIG,
    ASTAR_CONFIG,
    SHIBUYA_CONFIG,
    ACALA_CONFIG,
} = constants;
const { ContentCopyIconWhite, arrowRight } = images;
const { addressModifier } = helpers;
const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

const { green, red } = colors;

const TxDetailsView: React.FunctionComponent<TxDetailsViewProps> = (props) => {
    const {
        open,
        handleClose,
        style,
        txDetailsModalData,
        copy,
        tooltipText,
        getTotalBalance,
    } = props;

    const { onClick, onMouseOver } = tooltipText;

    const {
        hash,
        amount,
        accountFrom,
        accountTo,
        transactionFee,
        tokenName,
        status,
        operation,
    } = txDetailsModalData;

    const { chainName } = useSelector(
        (state: RootState) => state.activeAccount
    );
    const getURl = (txHash: string): string => {
        const chains = [
            CONTEXTFREE_CONFIG,
            POLKADOT_CONFIG,
            KUSAMA_CONFIG,
            SHIDEN_CONFIG,
            KARURA_CONFIG,
            WESTEND_CONFIG,
            ASTAR_CONFIG,
            SHIBUYA_CONFIG,
            ACALA_CONFIG,
        ];

        const currentChain = chains.filter((chain) => chain.name === chainName);

        return `${currentChain[0].explorer}extrinsic/${txHash}`;
    };
    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style} className="real-txDetails-modal-style">
                <CloseIconDiv
                    id="close-icon"
                    onClick={() => {
                        handleClose();
                    }}
                >
                    <CloseIcon />
                </CloseIconDiv>
                <VerticalContentDiv marginTop="5px">
                    <MainText1
                        textAlign="center"
                        className={mainHeadingfontFamilyClass}
                    >
                        {`${operation} Details`}
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
                                fontSize="14px"
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
                                    <div
                                        id="copy-icon"
                                        onClick={() => onClick(hash)}
                                        onMouseOver={() => onMouseOver()}
                                        aria-hidden="true"
                                        onFocus={() => console.log('onFocus')}
                                    >
                                        <img
                                            src={ContentCopyIconWhite}
                                            alt="copy-icon"
                                        />
                                        <span
                                            className="tooltiptext"
                                            style={{ fontSize: '11px' }}
                                        >
                                            {copy}
                                        </span>
                                    </div>
                                </div>
                                <SubText2
                                    pl10
                                    textAlign="end"
                                    className={mainHeadingfontFamilyClass}
                                    fontSize="12px"
                                    onClick={() =>
                                        window.open(getURl(hash || 'abc'))
                                    }
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
                                fontSize="12px"
                            >
                                {addressModifier(accountFrom)}
                                <div
                                    className={`tooltip ${subHeadingfontFamilyClass}`}
                                    style={{ marginLeft: 10 }}
                                >
                                    <div
                                        id="copy-icon"
                                        onClick={() => onClick(accountFrom)}
                                        onMouseOver={() => onMouseOver()}
                                        aria-hidden="true"
                                        onFocus={() => console.log('onFocus')}
                                    >
                                        <img
                                            src={ContentCopyIconWhite}
                                            alt="copy-icon"
                                        />
                                        <span
                                            className="tooltiptext"
                                            style={{ fontSize: '11px' }}
                                        >
                                            {copy}
                                        </span>
                                    </div>
                                </div>
                            </SubText2>
                        </VerticalContentDiv>

                        <img
                            style={{ marginTop: '-6%' }}
                            src={arrowRight}
                            alt="arrow right"
                        />

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
                                fontSize="12px"
                            >
                                <div
                                    className={`tooltip ${subHeadingfontFamilyClass}`}
                                    style={{ marginRight: 10 }}
                                >
                                    <div
                                        id="copy-icon"
                                        onClick={() => onClick(accountTo)}
                                        onMouseOver={() => onMouseOver()}
                                        aria-hidden="true"
                                        onFocus={() => console.log('onFocus')}
                                    >
                                        <img
                                            src={ContentCopyIconWhite}
                                            alt="copy-icon"
                                        />
                                        <span
                                            className="tooltiptext"
                                            style={{ fontSize: '11px' }}
                                        >
                                            {copy}
                                        </span>
                                    </div>
                                </div>

                                {addressModifier(accountTo[0])}
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
                        <MainText1
                            textAlign="start"
                            className={mainHeadingfontFamilyClass}
                            margin="13px 0px 0px 0px"
                            fontSize="14px"
                            color="rgba(255, 255, 255, 0.84)"
                            fontWeight="500"
                        >
                            Details
                        </MainText1>
                        <HorizontalContentDiv paddingTop borderBottom>
                            <VerticalContentDiv marginBottom="10px">
                                <MainText1
                                    marginTop="10px"
                                    textAlign="start"
                                    className={subHeadingfontFamilyClass}
                                    fontSize="12px"
                                    color="#FFFFFF"
                                    fontWeight="400"
                                    opacity="0.8"
                                >
                                    Amount
                                </MainText1>
                                <MainText1
                                    marginTop="10px"
                                    textAlign="start"
                                    className={subHeadingfontFamilyClass}
                                    fontSize="12px"
                                    color="#FFFFFF"
                                    fontWeight="400"
                                    opacity="0.8"
                                >
                                    Transaction Fee
                                </MainText1>
                            </VerticalContentDiv>

                            <VerticalContentDiv marginBottom="10px">
                                <MainText1
                                    marginTop="10px"
                                    textAlign="end"
                                    className={mainHeadingfontFamilyClass}
                                    fontSize="12px"
                                    color="#FFFFFF"
                                >{`${amount} ${tokenName}`}</MainText1>
                                <MainText1
                                    marginTop="10px"
                                    textAlign="end"
                                    className={mainHeadingfontFamilyClass}
                                    fontSize="12px"
                                    color="#FFFFFF"
                                >{`${
                                    transactionFee
                                        ? transactionFee.slice(0, 6)
                                        : '0'
                                } ${tokenName}`}</MainText1>
                            </VerticalContentDiv>
                        </HorizontalContentDiv>

                        <HorizontalContentDiv paddingTop marginBottom>
                            <VerticalContentDiv
                                marginTop="10px"
                                marginBottom="10px"
                            >
                                <MainText1
                                    textAlign="start"
                                    className={subHeadingfontFamilyClass}
                                    margin="0px"
                                    fontSize="12px"
                                    color="#FFFFFF"
                                    fontWeight="400"
                                    opacity="0.8"
                                >
                                    Total
                                </MainText1>
                                {/* <SubText1
                                    textAlign="start"
                                    hide
                                    className={subHeadingfontFamilyClass}
                                >
                                    .
                                </SubText1> */}
                            </VerticalContentDiv>

                            <VerticalContentDiv
                                marginTop="10px"
                                marginBottom="10px"
                            >
                                <MainText1
                                    textAlign="end"
                                    className={mainHeadingfontFamilyClass}
                                    margin="0px"
                                    fontSize="19px"
                                    fontWeight="600"
                                    color="#2E9B9B"
                                >
                                    {`${getTotalBalance(
                                        amount[0],
                                        transactionFee
                                    )}
                  ${tokenName}`}
                                </MainText1>
                            </VerticalContentDiv>
                        </HorizontalContentDiv>
                    </VerticalContentDiv>

                    <div className={`tooltip ${subHeadingfontFamilyClass}`}>
                        <VerticalContentDiv marginTop="30px">
                            <Button
                                id="subscan-button"
                                handleClick={() =>
                                    window.open(
                                        getURl(hash?.split('\\')[0] || 'abc')
                                    )
                                }
                                text="View on Subscan"
                                style={{
                                    width: '80%',
                                    height: 40,
                                    borderRadius: 40,
                                    alignSelf: 'center',
                                }}
                                disabled={chainName === 'ContextFree'}
                            />
                            {chainName === 'ContextFree' ? (
                                <span
                                    className="tooltiptext"
                                    style={{
                                        marginTop: '20px',
                                        fontSize: '12px',
                                        width: '140px',
                                        marginLeft: '100px',
                                        padding: '10px',
                                    }}
                                >
                                    Explorer for this network does not exist.
                                </span>
                            ) : null}
                        </VerticalContentDiv>
                    </div>
                </VerticalContentDiv>
            </Box>
        </Modal>
    );
};

export default TxDetailsView;
