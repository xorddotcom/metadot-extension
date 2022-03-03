/* eslint-disable no-param-reassign */
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { fonts, helpers } from '../../../utils';
import { Button, Input } from '../../common';
import { WarningText, MainText } from '../../common/text';
import { VerticalContentDiv } from '../../common/wrapper';
import {
    FlexBetween,
    EquivalentInUSDT,
    CalculatedAmount,
    Balance,
} from '../style';
import { AmountInputInterface } from '../types';

const { trimContent } = helpers;

const AmountInput: React.FunctionComponent<AmountInputInterface> = ({
    onChange,
    maxInputHandler,
    insufficientBal,
    errorMessages,
    transactionFee,
    amount,
}) => {
    const { balance, balanceInUsd, tokenName } = useSelector(
        (state: RootState) => state.activeAccount
    );
    const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

    const btn = {
        id: 'SendBtn',
        text: 'Max',
        style: {
            width: '38.75px',
            height: '25.12px',
            borderRadius: '6px',
            fontSize: '12px',
        },
        handleClick: maxInputHandler,
        disabled: balance === 0,
    };

    const styledInput = {
        id: 'InputField',
        placeholder: 'Amount',
        type: 'Number',
        value: amount,
        className: subHeadingfontFamilyClass,
        onChange,
        amount,
        // isCorrect: amountState.isValid || insufficientBal,
    };

    const balanceProps = {
        textAlign: 'end',
        className: subHeadingfontFamilyClass,
        style: { marginTop: '-1rem' },
    };

    const txFeeProps = {
        textAlign: 'end',
        className: subHeadingfontFamilyClass,
        style: { marginTop: '0.2rem' },
    };

    return (
        <VerticalContentDiv marginBottom="25px">
            <FlexBetween>
                <MainText className={mainHeadingfontFamilyClass}>
                    Amount
                </MainText>

                <Button {...btn} />
            </FlexBetween>
            <Input blockInvalidChar {...styledInput} />
            {/* <AmountInputField {...amountInputProps} /> */}
            {insufficientBal && (
                <WarningText
                    id="warning-text-1"
                    className={subHeadingfontFamilyClass}
                    style={{ marginBottom: '1rem' }}
                >
                    balance is too low to pay network fees!
                </WarningText>
            )}

            <CalculatedAmount marginTop="13px">
                <EquivalentInUSDT
                    id="equivalent-in-usd"
                    className={subHeadingfontFamilyClass}
                >
                    ${balanceInUsd}
                </EquivalentInUSDT>
                <Balance {...balanceProps}>
                    Balance: {`${trimContent(balance, 6)} ${tokenName}`}
                </Balance>
            </CalculatedAmount>

            <CalculatedAmount marginTop="5px">
                <Balance {...txFeeProps}>
                    Estimated Tx Fee: {`${trimContent(transactionFee, 6)}`}
                </Balance>
            </CalculatedAmount>
        </VerticalContentDiv>
    );
};

export default AmountInput;
