import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

import { Button } from '../common';
import { VerticalContentDiv, HorizontalContentDiv } from '../common/wrapper';
import { SubHeading } from '../common/text';
import {
    RecepientDetailDiv,
    TransactionDetailDiv,
    Divider,
    ImageButtons,
} from './style';

import { fonts, images, colors, helpers } from '../../utils';

import { ConfirmBatchViewProps } from './types';
import EditRecepientModal from '../common/modals/edit-recepient';
import { WarningModal } from '../common/modals';

const { mainHeadingFontSize } = fonts;
const { DeleteIcon, EditIcon } = images;
const { primaryBackground, white } = colors;

const BatchSendView: React.FunctionComponent<ConfirmBatchViewProps> = ({
    recepientList,
    addressChangeHandler,
    amountChangeHandler,
    deleteRecepient,
    sendTransaction,
    isButtonLoading,
    getTotalAmount,
    getTransactionFees,
    existentialDeposit,
    allTokens,
}) => {
    const [transactionFee, setTransactionFee] = React.useState(0);

    const [activeRecepient, setActiveRecepient] = React.useState(0);
    const [recepientDelete, setRecepientDelete] = React.useState(0);
    const [showEditModal, setShowEditModal] = React.useState(false);
    const handleEditModalClose = (): void => {
        setShowEditModal(false);
    };
    const handleEditModalShow = (index: number): void => {
        setActiveRecepient(index);
        setShowEditModal(true);
    };

    const [showWarning, setShowWarning] = React.useState(false);

    const handleDelete = (index: number): void => {
        setRecepientDelete(index);
        setShowWarning(true);
    };

    const warningModal = {
        open: showWarning,
        handleClose: () => setShowWarning(false),
        onConfirm: () => {
            deleteRecepient(recepientDelete);
            setShowWarning(false);
        },
        style: {
            width: '290px',
            background: '#141414',
            position: 'relative',
            bottom: 30,
            p: 2,
            px: 2,
            pb: 3,
        },
        mainText: 'Remove Recipient',
        subText: 'Are you sure you want to delete this Recipient?',
    };

    const calculatedAmount = (): string => {
        const dummyArray = [...recepientList];

        if (allTokens.length === 1) {
            const val = dummyArray.reduce((a, b) => {
                return {
                    amount: String(Number(a.amount) + Number(b.amount)),
                    address: a.address,
                    token: a.token,
                };
            });
            return `${String(Number(val.amount).toFixed(4))}${
                allTokens[0].name
            }`;
        }

        let str = '';

        const res = dummyArray.map((el) => {
            str = `${String(str)}+${String(Number(el.amount).toFixed(4))}${
                el.token
            }`;
            return el.address;
        });
        return String(str).slice(1);
    };

    const calculatedAmountWithFees = (): string => {
        return `${calculatedAmount()}+${transactionFee}${allTokens[0].name}`;
    };

    const { activeAccount } = useSelector((state: RootState) => state);
    const { tokenName } = activeAccount;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    React.useEffect(() => {
        const getTxFees = async (): Promise<void> => {
            const txFee = await getTransactionFees();
            setTransactionFee(Math.round(txFee * 100000) / 100000);
        };

        getTxFees();
    }, [recepientList]);

    return (
        <>
            <WarningModal {...warningModal} />
            <EditRecepientModal
                open={showEditModal}
                handleClose={handleEditModalClose}
                addressChangeHandler={addressChangeHandler}
                amountChangeHandler={amountChangeHandler}
                activeRecepient={{
                    index: activeRecepient,
                    address: recepientList[activeRecepient].address,
                    amount: recepientList[activeRecepient].amount,
                    token: recepientList[activeRecepient].token,
                }}
                getTotalAmount={getTotalAmount}
                getTransactionFees={getTransactionFees}
                existentialDeposit={existentialDeposit}
            />
            {recepientList.map((recepient, index) => (
                <RecepientDetailDiv>
                    <HorizontalContentDiv justifyContent="space-between">
                        <SubHeading
                            lineHeight="0px"
                            fontSize={mainHeadingFontSize}
                            color="#FAFAFA"
                            opacity="0.85"
                        >
                            Recipient {index + 1}
                        </SubHeading>
                        <HorizontalContentDiv>
                            <ImageButtons
                                src={EditIcon}
                                alt="edit"
                                style={{ marginRight: '12px' }}
                                aria-hidden
                                onClick={() => {
                                    handleEditModalShow(index);
                                }}
                            />
                            <ImageButtons
                                src={DeleteIcon}
                                alt="edit"
                                aria-hidden
                                onClick={() => handleDelete(index)}
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
                                {helpers.addressModifier(recepient.address)}
                            </SubHeading>
                            <SubHeading lineHeight="0px">
                                {`${recepient.amount} ${recepient.token}`}
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
                            Total Transferable Amount
                        </SubHeading>
                        <SubHeading
                            lineHeight="14px"
                            color={white}
                            fontSize="12px"
                            style={{ overflowWrap: 'anywhere', width: '30%' }}
                        >
                            {calculatedAmount()}
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
                            {transactionFee} {tokenName}
                        </SubHeading>
                    </HorizontalContentDiv>
                </VerticalContentDiv>
                <Divider />

                <HorizontalContentDiv justifyContent="space-between">
                    <SubHeading lineHeight="0px" color={white} fontSize="12px">
                        Total Amount
                    </SubHeading>
                    <SubHeading
                        lineHeight="18px"
                        fontSize="12px"
                        color={primaryBackground}
                        style={{ overflowWrap: 'anywhere', width: '50%' }}
                    >
                        {calculatedAmountWithFees()}
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
                    isLoading={isButtonLoading}
                    disabled={isButtonLoading}
                />
            </VerticalContentDiv>
        </>
    );
};

export default BatchSendView;
