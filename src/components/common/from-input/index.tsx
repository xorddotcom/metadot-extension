import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Balance, FromAccount, PlainIcon } from './style';
import { MainText } from '../text';
import { VerticalContentDiv, HorizontalContentDiv } from '../wrapper/index';
import { fonts, helpers, images } from '../../../utils';
import services from '../../../utils/services';
import { RootState } from '../../../redux/store';
import { MyAccounts } from '../modals';
import useDispatcher from '../../../hooks/useDispatcher';
import {
    setAccountName,
    setPublicKey,
} from '../../../redux/slices/activeAccount';
import { Account, FromInputProps } from './types';

const { addressModifier } = helpers;
const { addressMapper } = services;

const { dropdownIcon } = images;

const FromInput: React.FunctionComponent<FromInputProps> = (props) => {
    const { resetToggles } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const generalDispatcher = useDispatcher();
    const { accountName, publicKey, prefix } = useSelector(
        (state: RootState) => state.activeAccount
    );
    const accounts = useSelector((state: RootState) => state.accounts);

    const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

    const onAccountSelection = (data: Account): void => {
        if (resetToggles) {
            resetToggles(true);
        }
        setIsModalOpen(false);
        generalDispatcher(() => setPublicKey(data.publicKey));
        generalDispatcher(() => setAccountName(data.accountName));
    };

    const mainText = {
        className: mainHeadingfontFamilyClass,
        ls: '3.2px',
        lh: '16px',
        fs: '15px',
        mt: '-4px',
    };

    const myAccounts = {
        open: isModalOpen,
        handleClose: () => setIsModalOpen(false),
        onSelection: onAccountSelection,
        style: {
            position: 'relative',
            width: '300px',
            background: '#141414',
            pb: 3,
            overflowY: 'scroll',
            overflowX: 'hidden',
            marginTop: '144px',
        },
    };

    return (
        <VerticalContentDiv>
            <MainText className={mainHeadingfontFamilyClass}>From</MainText>
            <FromAccount
                id="from-account"
                aria-hidden
                onClick={() => {
                    return Object.keys(accounts).length > 1
                        ? setIsModalOpen(true)
                        : setIsModalOpen(false);
                }}
            >
                <HorizontalContentDiv>
                    <PlainIcon />
                    <VerticalContentDiv>
                        <MainText id="account-name" {...mainText}>
                            {accountName}
                        </MainText>
                        <Balance
                            id="public-key"
                            className={subHeadingfontFamilyClass}
                        >
                            {addressModifier(addressMapper(publicKey, prefix))}
                        </Balance>
                    </VerticalContentDiv>
                </HorizontalContentDiv>
                {Object.keys(accounts).length > 1 ? (
                    <img
                        src={dropdownIcon}
                        alt="dropdown"
                        style={{ marginRight: 10 }}
                    />
                ) : (
                    ''
                )}
            </FromAccount>
            <MyAccounts {...myAccounts} />
        </VerticalContentDiv>
    );
};

export default FromInput;
