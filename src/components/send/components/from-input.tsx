import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Balance, FromAccount, PlainIcon } from '../style';
import { MainText } from '../../common/text';
import {
    VerticalContentDiv,
    HorizontalContentDiv,
} from '../../common/wrapper/index';
import { fonts, helpers, images } from '../../../utils';
import services from '../../../utils/services';
import { RootState } from '../../../redux/store';
import { MyAccounts } from '../../common/modals';
import useDispatcher from '../../../hooks/useDispatcher';
import {
    setAccountName,
    setPublicKey,
} from '../../../redux/slices/activeAccount';
import { Account } from '../types';

const { addressModifier } = helpers;
const { addressMapper } = services;

const { dropdownIcon } = images;

const FromInput: React.FunctionComponent = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const generalDispatcher = useDispatcher();
    const { accountName, publicKey, prefix } = useSelector(
        (state: RootState) => state.activeAccount
    );

    // const [accountToLogin, setAccountToLogin] = useState<Account>({
    //     publicKey,
    //     accountName,
    // });
    const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

    const onAccountSelection = (data: Account): void => {
        setIsModalOpen(false);
        generalDispatcher(() => setPublicKey(data.publicKey));
        generalDispatcher(() => setAccountName(data.accountName));
    };

    const mainText = {
        className: mainHeadingfontFamilyClass,
        ls: '0.02em',
        lh: '16px',
        fs: '15px',
        mt: '-4px',
    };
    return (
        <VerticalContentDiv mb="20px">
            <MainText className={mainHeadingfontFamilyClass}>From</MainText>
            <FromAccount
                id="from-account"
                aria-hidden
                onClick={() => setIsModalOpen(true)}
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
                <img
                    src={dropdownIcon}
                    alt="dropdown"
                    style={{ marginRight: 10 }}
                />
            </FromAccount>
            <MyAccounts
                open={isModalOpen}
                handleClose={() => setIsModalOpen(false)}
                onSelection={onAccountSelection}
                style={{
                    position: 'relative',
                    width: '300px',
                    background: '#141414',
                    pb: 3,
                    overflowY: 'scroll',
                    overflowX: 'hidden',
                    marginTop: '9rem',
                }}
            />
        </VerticalContentDiv>
    );
};

export default FromInput;
