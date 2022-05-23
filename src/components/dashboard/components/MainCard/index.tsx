import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { ApiPromise as ApiPromiseType } from '@polkadot/api';
import { RootState } from '../../../../redux/store';
import { MainCardPropsInterface } from '../../types';
import { fonts, helpers, images, exponentConversion } from '../../../../utils';

import { setApiInitializationStarts } from '../../../../redux/slices/api';

import {
    setBalance,
    setBalanceInUsd,
} from '../../../../redux/slices/activeAccount';
import { SubHeading } from '../../../common/text';

import {
    AccountName,
    Balance,
    MainPanel,
    Refresh,
    PerUnitPrice,
    PublicAddress,
    VerticalContentDiv,
    CopyIconImg,
    MoreOptions,
    ConnectionStatus,
    MultisigFlag,
} from '../../styledComponents';
import services from '../../../../utils/services';
import accounts from '../../../../utils/accounts';
import MultisigDetail from '../../../common/modals/multisig-detail';

const {
    refreshIcon,
    ContentCopyIconWhite,
    notConnected,
    connected,
    dropdownIcon,
} = images;
const { addressModifier, trimBalance, convertIntoUsd } = helpers;
const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;
const { addressMapper, getBalance } = services;
const { getMultisigDetails } = accounts;

const MainCard: React.FunctionComponent<MainCardPropsInterface> = (
    props
): JSX.Element => {
    const { balance, address, prefix, tokenName, balanceInUsd, accountName } =
        props;

    const [open, setOpen] = useState(false);
    const [copy, setCopy] = useState('Copy');

    const dispatch = useDispatch();
    const { apiInitializationStarts } = useSelector(
        (state: RootState) => state.api
    );

    const thisAccount = useSelector(
        (state: RootState) => state.accounts[address]
    );

    const api = useSelector(
        (state: RootState) => state.api.api as unknown as ApiPromiseType
    );
    const { activeAccount } = useSelector((state: RootState) => state);

    const { isWalletConnected, queryEndpoint } = activeAccount;
    const { multisigDetails } = thisAccount;

    const copyText = (): void => {
        setOpen(true);
        setTimeout(() => {
            setOpen(false);
        }, 800);
        navigator.clipboard.writeText(addressMapper(address, prefix));

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
            fontSize: '11px',
            fontWeight: 300,
            transition: 'all 0.1s ease-in',
        },
    };

    const addTooltipText = {
        className: 'topTooltiptext',
    };

    const [openModal, setOpenModal] = React.useState(false);

    return (
        <MainPanel>
            {thisAccount?.multisig && (
                <MultisigFlag>
                    <SubHeading
                        fontSize="10px"
                        color="#FAFAFA"
                        lineHeight="0px"
                        opacity="0.7"
                    >
                        Multisig
                    </SubHeading>
                </MultisigFlag>
            )}
            <div>
                <MoreOptions>
                    <img
                        src={isWalletConnected ? connected : notConnected}
                        alt="not connected signal"
                    />
                    <ConnectionStatus className={subHeadingfontFamilyClass}>
                        {isWalletConnected ? 'Connected' : 'Not Connected'}
                    </ConnectionStatus>
                </MoreOptions>
                <Refresh
                    id="refresh"
                    onClick={async () => {
                        dispatch(setApiInitializationStarts(true));
                        const balanceOfSelectedNetwork = await getBalance(
                            api,
                            address
                        );
                        const dollarAmount = await convertIntoUsd(
                            api.runtimeChain.toString(),
                            balanceOfSelectedNetwork
                        );

                        dispatch(setBalanceInUsd(dollarAmount));

                        dispatch(
                            setBalance(
                                exponentConversion(balanceOfSelectedNetwork)
                            )
                        );
                        dispatch(setApiInitializationStarts(false));
                    }}
                >
                    <img src={refreshIcon} alt="refresh-icon" />
                </Refresh>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                    }}
                >
                    <AccountName
                        id="account-name"
                        className={mainHeadingfontFamilyClass}
                    >
                        {accountName}
                    </AccountName>
                    {thisAccount?.multisig && (
                        <img
                            src={dropdownIcon}
                            alt="dropdown"
                            style={{
                                height: '5px',
                                width: '8px',
                                marginTop: '30px',
                                marginLeft: '10px',
                            }}
                            onClick={() => setOpenModal(true)}
                            aria-hidden="true"
                        />
                    )}
                </div>
            </div>
            <VerticalContentDiv>
                <PublicAddress
                    id="public-address"
                    className={mainHeadingfontFamilyClass}
                >
                    ({addressModifier(addressMapper(address, prefix))})
                </PublicAddress>
                <div {...copyIconTooltip}>
                    <CopyIconImg src={ContentCopyIconWhite} alt="copy-icon" />
                    <span {...copyIconTooltipText}>{copy}</span>
                </div>
            </VerticalContentDiv>

            {!apiInitializationStarts ? (
                <Balance id="balance" className={mainHeadingfontFamilyClass}>
                    <div className={`topTooltip ${mainHeadingfontFamilyClass}`}>
                        <span id="trim-balance">
                            {String(exponentConversion(balance)).slice(0, 6)}
                        </span>
                        <span id="token-name" style={{ marginLeft: 7 }}>
                            {tokenName}
                        </span>
                        <span id="complete-balance" {...addTooltipText}>
                            {exponentConversion(balance)}
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
                    ${balanceInUsd === 0 ? 0 : balanceInUsd.toFixed(5)}
                </PerUnitPrice>
            </VerticalContentDiv>
            {thisAccount?.multisig && (
                <MultisigDetail
                    open={openModal}
                    handleClose={() => setOpenModal(false)}
                    address={address}
                    name={accountName}
                    threshold={multisigDetails?.threshold || 2}
                    singatories={multisigDetails?.members || []}
                />
            )}
        </MainPanel>
    );
};

export default MainCard;
