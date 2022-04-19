import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { fonts, helpers } from '../../../utils';
import { Input } from '..';
import { WarningText, MainText } from '../text';
import { VerticalContentDiv } from '../wrapper';
import {
    FlexBetween,
    EquivalentInUSDT,
    CalculatedAmount,
    Balance,
} from './style';
import { AmountInputInterface } from './types';

const { trimContent } = helpers;

const AmountInput: React.FunctionComponent<AmountInputInterface> = ({
    onChange,
    insufficientBal,
    transactionFee,
    amount,
}) => {
    const { balance, balanceInUsd, tokenName, tokenImage } = useSelector(
        (state: RootState) => state.activeAccount
    );
    const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

    const styledInput = {
        id: 'InputField',
        placeholder: 'Amount',
        type: 'Number',
        value: amount,
        className: subHeadingfontFamilyClass,
        onChange,
        amount,
        tokenLogo: true,
        tokenName,
        tokenImage,
        // isCorrect: amountState.isValid || insufficientBal,
    };

    const balanceProps = {
        textAlign: 'end',
        className: subHeadingfontFamilyClass,
        style: { marginTop: '-16px' },
    };

    const txFeeProps = {
        className: subHeadingfontFamilyClass,
        style: { marginTop: '3.2px' },
    };

    return (
        <VerticalContentDiv marginBottom="25px">
            <FlexBetween>
                <MainText className={mainHeadingfontFamilyClass}>
                    Amount
                </MainText>
                {/* <Button {...btn} /> */}
            </FlexBetween>
            <Input blockInvalidChar {...styledInput} />
            {insufficientBal && (
                <WarningText
                    id="warning-text-1"
                    className={subHeadingfontFamilyClass}
                    style={{ marginBottom: '16px' }}
                >
                    balance is too low to pay network fees!
                </WarningText>
            )}

            <CalculatedAmount marginTop="13px">
                <EquivalentInUSDT
                    id="equivalent-in-usd"
                    className={subHeadingfontFamilyClass}
                >
                    ${balanceInUsd === 0 ? 0 : balanceInUsd.toFixed(5)}
                </EquivalentInUSDT>
                <Balance {...balanceProps}>
                    Balance: {`${trimContent(balance, 6)} ${tokenName}`}
                </Balance>
            </CalculatedAmount>

            <CalculatedAmount marginTop="5px">
                <Balance {...txFeeProps}>
                    Estimated Gas Fee:{' '}
                    {`${trimContent(transactionFee, 6)} ${tokenName}`}
                </Balance>
            </CalculatedAmount>
        </VerticalContentDiv>
    );
};

export default AmountInput;
