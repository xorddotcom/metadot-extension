import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@material-ui/core';
import { fontWeight } from '@mui/system';
import type { ApiPromise as ApiPromiseType } from '@polkadot/api';
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
    setTransferAll,
    setAmountOnToggle,
    disableToggleButtons,
    existentialDeposit,
    amount,
    balance,
    tokenName,
    insufficientTxFee,
    transferAll,
}) => {
    const { balanceInUsd, tokenImage } = useSelector(
        (state: RootState) => state.activeAccount
    );
    const currReduxState = useSelector((state: RootState) => state);

    const api = currReduxState.api.api as unknown as ApiPromiseType;

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
            width: '150px',
            padding: '10px',
        },
    };

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
                        The ED exists so that accounts with very small balances,
                        or completely empty, do not bloat the state of the
                        blockchain. Learn more about ED here
                    </span>
                </div>
            </MainText>

            <Input {...styledInputED} />

            <HorizontalContentDiv justifyContent="space-between">
                <MainText
                    style={{
                        margin: '16px 0px',
                        fontSize: '14px',
                        color: 'rgba(250, 250, 250, 0.8)',
                    }}
                    className={mainHeadingfontFamilyClass}
                >
                    Leave existential deposit.
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
                        fontSize: '14px',
                        color: 'rgba(250, 250, 250, 0.8)',
                    }}
                    className={mainHeadingfontFamilyClass}
                >
                    Empty account.
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
