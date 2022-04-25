import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { fonts, exponentConversion } from '../../../utils';
import { Input } from '../../common';
import { MainText } from '../../common/text';
import { HorizontalContentDiv, VerticalContentDiv } from '../../common/wrapper';

import { ExistensialDepositInterface } from '../types';

import ToggleOn from '../../../assets/images/icons/transferToggleOn.svg';
import ToggleOff from '../../../assets/images/icons/transferToggleOff.svg';
import help from '../../../assets/images/icons/ED_help.svg';

const AmountInput: React.FunctionComponent<ExistensialDepositInterface> = ({
    onChange,
    setInsufficientBal,
    setTransferAll,
    setAmountOnToggle,
    disableToggleButtons,
    existentialDeposit,
    transferAll,
    tokenName,
    balance,
    insufficientTxFee,
    switchChecked,
    switchCheckedSecond,
    setSwitchChecked,
    setSwitchCheckedSecond,
}) => {
    // const { tokenName } = useSelector(
    //     (state: RootState) => state.activeAccount
    // );

    const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

    // const [switchChecked, setSwitchChecked] = useState(false);
    // const [switchCheckedSecond, setSwitchCheckedSecond] = useState(false);

    const handleChangeFirst = (e: any): boolean => {
        setInsufficientBal(false);
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
        setInsufficientBal(false);
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

    const copyIconTooltip = {
        id: 'copy-icon',
        className: `ed-tooltip ${mainHeadingfontFamilyClass}`,
        style: { cursor: 'pointer' },
    };

    const copyIconTooltipText = {
        className: 'ed-tooltiptext',
        style: {
            left: '20%',
            bottom: '120%',
            fontSize: '11px',
            fontWeight: 300,
            transition: 'all 0.1s ease-in',
            width: '150px',
            padding: '10px',
        },
    };

    const ED =
        "Existential deposit (ED) is an amount that needs to be maintained in an account. Having the account's balance go below the ED causes the account to get reaped. ";

    return (
        <VerticalContentDiv marginBottom="25px">
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
                            Learn more.
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
                    }}
                    alt="img"
                />
            </HorizontalContentDiv>
        </VerticalContentDiv>
    );
};

export default AmountInput;
