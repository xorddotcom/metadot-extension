import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../../redux/store';
import { MainCardPropsInterface } from '../../types';
import { fonts, helpers, images } from '../../../../utils';
import { setApiInitializationStarts } from '../../../../redux/slices/api';

import {
    AccountName,
    Balance,
    MainPanel,
    Refresh,
    PerUnitPrice,
    PublicAddress,
    VerticalContentDiv,
    CopyIconImg,
} from '../../styledComponents';

const { refreshIcon, ContentCopyIcon } = images;
const { addressModifier, trimBalance } = helpers;
const { mainHeadingfontFamilyClass } = fonts;

const MainCard: React.FunctionComponent<MainCardPropsInterface> = (
    props
): JSX.Element => {
    const { balance, address, tokenName, balanceInUsd, accountName } = props;

    const [open, setOpen] = useState(false);
    const [copy, setCopy] = useState('Copy');

    const dispatch = useDispatch();
    const { apiInitializationStarts } = useSelector(
        (state: RootState) => state.api
    );

    const copyText = (): void => {
        setOpen(true);
        setTimeout(() => {
            setOpen(false);
        }, 800);
        navigator.clipboard.writeText(address);

        setCopy('Copied');
    };

    const copyIconTooltip = {
        id: 'copy-icon',
        className: `main-card-tooltip ${mainHeadingfontFamilyClass}`,
        onClick: copyText,
        onMouseOver: () => setCopy('Copy'),
        style: { cursor: 'pointer' },
    };

    const copyIconTooltipText = {
        className: 'main-card-tooltiptext',
        style: {
            maxWidth: '70px',
            left: '20%',
            bottom: '120%',
            fontSize: '0.7rem',
            fontWeight: 300,
            transition: 'all 0.1s ease-in',
        },
    };

    const addTooltipText = {
        className: 'topTooltiptext',
    };

    return (
        <MainPanel>
            <div>
                <Refresh
                    id="refresh"
                    onClick={() => {
                        dispatch(setApiInitializationStarts(true));
                        setTimeout(
                            () => dispatch(setApiInitializationStarts(false)),
                            1000
                        );
                    }}
                >
                    <img src={refreshIcon} alt="refresh-icon" />
                </Refresh>

                <AccountName
                    id="account-name"
                    className={mainHeadingfontFamilyClass}
                >
                    {accountName}
                </AccountName>
            </div>
            <VerticalContentDiv>
                <PublicAddress
                    id="public-address"
                    className={mainHeadingfontFamilyClass}
                >
                    ({addressModifier(address)})
                </PublicAddress>
                <div {...copyIconTooltip}>
                    <CopyIconImg src={ContentCopyIcon} alt="copy-icon" />
                    <span {...copyIconTooltipText}>{copy}</span>
                </div>
            </VerticalContentDiv>

            {!apiInitializationStarts ? (
                <Balance id="balance" className={mainHeadingfontFamilyClass}>
                    <div className={`topTooltip ${mainHeadingfontFamilyClass}`}>
                        <span id="trim-balance">{trimBalance(balance)}</span>
                        <span id="token-name" style={{ marginLeft: 7 }}>
                            {tokenName}
                        </span>
                        <span id="complete-balance" {...addTooltipText}>
                            {balance}
                        </span>
                    </div>
                </Balance>
            ) : (
                <div
                    style={{
                        height: 35,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                >
                    <Balance
                        id="balance"
                        className="wave"
                        height="10px"
                        width="188px"
                        borderRadius="4px"
                    />
                </div>
            )}

            <VerticalContentDiv>
                <PerUnitPrice
                    id="balance-in-usd"
                    className={mainHeadingfontFamilyClass}
                >
                    ${balanceInUsd} USD
                </PerUnitPrice>
            </VerticalContentDiv>
        </MainPanel>
    );
};

export default MainCard;
