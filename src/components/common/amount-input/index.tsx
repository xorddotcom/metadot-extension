import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { fonts, helpers, images } from '../../../utils';
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

const allTokenImages = images;

const { trimContent } = helpers;

const AmountInput: React.FunctionComponent<AmountInputInterface> = ({
    onChange,
    insufficientBal,
    transactionFee,
    amount,
    tokenName,
    balance,
}) => {
    const { balanceInUsd, balances, publicKey, tokenImage } = useSelector(
        (state: RootState) => state.activeAccount
    );
    const tokenToSend = balances.filter((bal) => bal.name === tokenName);
    const [blanaceAfterAccountSwitch, setBalanaceAfterAccountSwitch] =
        useState(balance);

    useEffect(() => {
        balances.forEach((bal) => {
            if (bal.name === tokenName) {
                setBalanaceAfterAccountSwitch(bal.balance);
            }
        });
    }, [publicKey, tokenToSend[0]?.balance]);

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
        tokenImage: allTokenImages[tokenName],
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
            </FlexBetween>
            <Input blockInvalidChar {...styledInput} />
            {insufficientBal && (
                <WarningText
                    id="warning-text-1"
                    className={subHeadingfontFamilyClass}
                    style={{ marginBottom: '16px' }}
                >
                    Insufficient balance !
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
                    Balance:{' '}
                    {`${trimContent(
                        blanaceAfterAccountSwitch,
                        6
                    )} ${tokenName}`}
                </Balance>
            </CalculatedAmount>

            <CalculatedAmount marginTop="5px">
                <Balance {...txFeeProps}>
                    Estimated Gas Fee:{' '}
                    {`${trimContent(transactionFee, 6)} ${balances[0].name}`}
                </Balance>
            </CalculatedAmount>
        </VerticalContentDiv>
    );
};

export default AmountInput;
