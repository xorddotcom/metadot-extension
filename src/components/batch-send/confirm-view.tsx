import React from 'react';

import { Button } from '../common';
import { VerticalContentDiv, HorizontalContentDiv } from '../common/wrapper';
import { SubHeading } from '../common/text';
import { RecepientDetailDiv, TransactionDetailDiv, Divider } from './style';

import { fonts, images, colors } from '../../utils';

import { ConfirmBatchViewProps } from './types';

const { mainHeadingFontSize } = fonts;
const { DeleteIcon, EditIcon } = images;
const { primaryBackground, white } = colors;

const BatchSendView: React.FunctionComponent<ConfirmBatchViewProps> = ({
    recepientList,
    addressChangeHandler,
    amountChangeHandler,
    deleteRecepient,
    sendTransaction,
}) => {
    const [activeRecepient, setActiveRecepient] = React.useState(0);

    return (
        <>
            {recepientList.map((recepient, index) => (
                <RecepientDetailDiv>
                    <HorizontalContentDiv justifyContent="space-between">
                        <SubHeading
                            lineHeight="0px"
                            fontSize={mainHeadingFontSize}
                            color="#FAFAFA"
                            opacity="0.85"
                        >
                            Recepient
                        </SubHeading>
                        <HorizontalContentDiv>
                            <img
                                src={EditIcon}
                                alt="edit"
                                style={{ marginRight: '12px' }}
                                aria-hidden
                                onClick={() => setActiveRecepient(index)}
                            />
                            <img
                                src={DeleteIcon}
                                alt="edit"
                                aria-hidden
                                onClick={() => deleteRecepient(index)}
                            />
                        </HorizontalContentDiv>
                    </HorizontalContentDiv>
                    <VerticalContentDiv>
                        <HorizontalContentDiv justifyContent="space-between">
                            <SubHeading
                                lineHeight="0px"
                                fontSize={mainHeadingFontSize}
                                color="#FAFAFA"
                                opacity="0.85"
                            >
                                To
                            </SubHeading>
                            <SubHeading
                                lineHeight="0px"
                                fontSize={mainHeadingFontSize}
                                color="#FAFAFA"
                                opacity="0.85"
                            >
                                Amount
                            </SubHeading>
                        </HorizontalContentDiv>

                        <HorizontalContentDiv justifyContent="space-between">
                            <SubHeading lineHeight="0px">
                                (bnb13...txjd5)
                            </SubHeading>
                            <SubHeading lineHeight="0px">
                                0.000001 DOT
                            </SubHeading>
                        </HorizontalContentDiv>
                    </VerticalContentDiv>
                </RecepientDetailDiv>
            ))}
            <SubHeading color={white} fontSize="17px" marginTop="30px">
                Transaction
            </SubHeading>
            <TransactionDetailDiv>
                <SubHeading
                    lineHeight="0px"
                    color={white}
                    fontSize="14px"
                    opacity="0.84"
                >
                    Details
                </SubHeading>
                <VerticalContentDiv>
                    <HorizontalContentDiv justifyContent="space-between">
                        <SubHeading
                            lineHeight="0px"
                            color={white}
                            fontSize="12px"
                            opacity="0.8"
                        >
                            Total Amount
                        </SubHeading>
                        <SubHeading
                            lineHeight="0px"
                            color={white}
                            fontSize="12px"
                        >
                            0.2345 DOT
                        </SubHeading>
                    </HorizontalContentDiv>

                    <HorizontalContentDiv justifyContent="space-between">
                        <SubHeading
                            lineHeight="0px"
                            color={white}
                            fontSize="12px"
                            opacity="0.8"
                        >
                            Estimated Gas Fee
                        </SubHeading>
                        <SubHeading
                            lineHeight="0px"
                            color={white}
                            fontSize="12px"
                        >
                            0.2345 DOT
                        </SubHeading>
                    </HorizontalContentDiv>
                </VerticalContentDiv>
                <Divider />

                <HorizontalContentDiv justifyContent="space-between">
                    <SubHeading lineHeight="0px" color={white} fontSize="12px">
                        Total Amount
                    </SubHeading>
                    <SubHeading
                        lineHeight="0px"
                        fontSize="19px"
                        color={primaryBackground}
                    >
                        0.2345 DOT
                    </SubHeading>
                </HorizontalContentDiv>
            </TransactionDetailDiv>

            <VerticalContentDiv marginTop="50px">
                <Button
                    id="Send-btn"
                    handleClick={() => sendTransaction()}
                    text="Send"
                    style={{
                        width: '100%',
                        height: 50,
                        borderRadius: 40,
                    }}
                />
            </VerticalContentDiv>
        </>
    );
};

export default BatchSendView;
