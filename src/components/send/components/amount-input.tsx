import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@material-ui/core';
import { fontWeight } from '@mui/system';
import { RootState } from '../../../redux/store';
import { fonts, helpers, exponentConversion } from '../../../utils';
import { Button, Input } from '../../common';
import { WarningText, MainText } from '../../common/text';
import { HorizontalContentDiv, VerticalContentDiv } from '../../common/wrapper';
import {
    FlexBetween,
    EquivalentInUSDT,
    CalculatedAmount,
    Balance,
} from '../style';
import { AmountInputInterface } from '../types';

import ToggleOn from '../../../assets/images/icons/transferToggleOn.svg';
import ToggleOff from '../../../assets/images/icons/transferToggleOff.svg';
import help from '../../../assets/images/icons/ED_help.svg';

const { trimContent } = helpers;

const AmountInput: React.FunctionComponent<AmountInputInterface> = ({
    onChange,
    maxInputHandler,
    insufficientBal,
    transactionFee,
    setTransferAll,
    setAmountOnToggle,
    disableToggleButtons,
    existentialDeposit,
    amount,
    transferAll,
}) => {
    const { balance, balanceInUsd, tokenName, tokenImage } = useSelector(
        (state: RootState) => state.activeAccount
    );
    const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

    const [switchChecked, setSwitchChecked] = useState(false);
    const [switchCheckedSecond, setSwitchCheckedSecond] = useState(false);

    const handleChangeFirst = (e: any): boolean => {
        if (disableToggleButtons.firstToggle) return false;
        setAmountOnToggle(!switchChecked, true);
        setSwitchCheckedSecond(false);
        setSwitchChecked(!switchChecked);
        setTransferAll({
            keepAlive: !transferAll.keepAlive,
            transferAll: !transferAll.transferAll,
        });
        return true;
    };

    const handleChangeSecond = (): boolean => {
        if (disableToggleButtons.secondToggle) return true;
        setAmountOnToggle(!switchCheckedSecond, false);
        setSwitchChecked(false);
        setSwitchCheckedSecond(!switchCheckedSecond);
        setTransferAll({
            keepAlive: false,
            transferAll: !transferAll.transferAll,
        });
        return false;
    };

    const btn = {
        id: 'SendBtn',
        text: 'Max',
        style: {
            width: '44px',
            minWidth: '24px',
            height: '26px',
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
        setSwitchChecked,
        setSwitchCheckedSecond,
        amount,
        tokenLogo: true,
        tokenName,
        tokenImage,
        bgColor: '#141414',
        // isCorrect: amountState.isValid || insufficientBal,
    };

    const styledInputED = {
        id: 'InputField',
        placeholder: 'Amount',
        type: 'Number',
        // value: '0.01 DOT',
        value: `${exponentConversion(existentialDeposit)} ${tokenName}`,
        className: subHeadingfontFamilyClass,
        disabled: true,
        onChange,
        bgColor: 'inherit',
        border: '1px solid rgba(255, 255, 255, 0.3)',
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

    const copyIconTooltip = {
        id: 'copy-icon',
        className: `main-card-tooltip ${mainHeadingfontFamilyClass}`,
        style: { cursor: 'pointer' },
    };

    const copyIconTooltipText = {
        className: 'main-card-tooltiptext',
        style: {
            left: '20%',
            bottom: '120%',
            fontSize: '11px',
            fontWeight: 300,
            transition: 'all 0.1s ease-in',
            width: '160px',
            padding: '8px',
        },
    };

    const ED =
        'Existential deposit or ED is an amount that needs to be maintained in an account. Having the accounts balance go below the ED causes the account to be deleted or reaped. ';

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
                    Estimated Tx Fee:{' '}
                    {`${trimContent(transactionFee, 6)} ${tokenName}`}
                </Balance>
            </CalculatedAmount>

            <MainText
                style={{ marginTop: '32px', display: 'flex' }}
                className={mainHeadingfontFamilyClass}
            >
                Existential Deposit
                <div {...copyIconTooltip}>
                    <img
                        aria-hidden
                        src={help}
                        alt="img"
                        height="max-content"
                        style={{ margin: '0px 8px' }}
                    />
                    <span {...copyIconTooltipText}>
                        {ED}
                        <a
                            style={{ fontSize: '11px' }}
                            target="_blank"
                            href="https://wiki.polkadot.network/docs/learn-accounts#existential-deposit-and-reaping"
                            rel="noreferrer"
                        >
                            Learn more here.
                        </a>
                    </span>
                </div>
            </MainText>

            <Input {...styledInputED} />

            <HorizontalContentDiv justifyContent="space-between">
                <MainText
                    style={{
                        margin: '16px 0px',
                        fontSize: '13px',
                        color: 'rgba(250, 250, 250, 0.8)',
                    }}
                    className={mainHeadingfontFamilyClass}
                >
                    Transfer all excluding existential deposit.
                </MainText>

                <img
                    aria-hidden
                    onClick={handleChangeFirst}
                    src={
                        // eslint-disable-next-line no-nested-ternary
                        disableToggleButtons.firstToggle
                            ? ToggleOff
                            : switchChecked
                            ? ToggleOn
                            : ToggleOff
                    }
                    style={{
                        height: '25px',
                        width: '40px',
                        // position: 'absolute',
                        // left: '300px',
                        // right: '37%',
                    }}
                    alt="img"
                />
            </HorizontalContentDiv>

            <HorizontalContentDiv justifyContent="space-between">
                <MainText
                    // onClick={toggleClickedHandler}
                    style={{
                        margin: '16px 0px',
                        fontSize: '13px',
                        color: 'rgba(250, 250, 250, 0.8)',
                    }}
                    className={mainHeadingfontFamilyClass}
                >
                    Transfer all including existential deposit.
                </MainText>

                <img
                    aria-hidden
                    onClick={handleChangeSecond}
                    src={
                        // eslint-disable-next-line no-nested-ternary
                        disableToggleButtons.secondToggle
                            ? ToggleOff
                            : switchCheckedSecond
                            ? ToggleOn
                            : ToggleOff
                    }
                    style={{
                        height: '25px',
                        width: '40px',
                        // position: 'absolute',
                        // left: '300px',
                        // right: '61%',
                    }}
                    alt="img"
                />
            </HorizontalContentDiv>
        </VerticalContentDiv>
    );
};

export default AmountInput;
