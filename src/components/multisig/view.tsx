import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AccountBoxProps, InputBoxProps, MultisigViewProps } from './types';

import { Button, Header, Input } from '../common';
import { SubHeading, MainText } from '../common/text';

import { colors, fonts, images, helpers } from '../../utils';

import {
    Wrapper,
    HorizontalContentDiv,
    VerticalContentDiv,
} from '../common/wrapper';
import { DASHBOARD } from '../../constants';
import { AddCircle, AddAccountInput } from './styles';
import { Balance, FromAccount, PlainIcon } from '../common/from-input/style';

const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;
const { PlusIcon, dropdownIcon, crossIcon } = images;
const { addressModifier } = helpers;

const AccountBox: React.FunctionComponent<AccountBoxProps> = ({
    name,
    address,
}) => {
    const mainText2 = {
        className: mainHeadingfontFamilyClass,
        lh: '0px',
        mt: '0px',
        mb: '0px',
    };
    return (
        <FromAccount
            id="from-account"
            aria-hidden
            onClick={() => console.log('ye')}
        >
            <HorizontalContentDiv>
                <PlainIcon />
                <VerticalContentDiv>
                    <MainText id="account-name" {...mainText2}>
                        {name}
                    </MainText>
                    <Balance
                        id="public-key"
                        className={subHeadingfontFamilyClass}
                    >
                        {addressModifier(address)}
                    </Balance>
                </VerticalContentDiv>
            </HorizontalContentDiv>

            <img
                src={dropdownIcon}
                alt="dropdown"
                style={{ marginRight: 10 }}
            />
        </FromAccount>
    );
};
const InputBox: React.FunctionComponent<InputBoxProps> = ({
    index,
    onChangeAddress,
    onRemoveAccount,
    handleOpenModal,
    address,
}) => {
    if (index !== 0) {
        return (
            <Input
                onChange={(e) => onChangeAddress(index, e)}
                value={address}
                id="name"
                placeholder="Add Address Or Copy Address"
                rightIconDropDown
                topPosition="30px"
                rightPosition="20px"
                rightIconDropDownHandler={() => handleOpenModal(index)}
            />
        );
    }

    return (
        <AddAccountInput onClick={() => handleOpenModal(index)}>
            <SubHeading lineHeight="0px" ml="17px" fontSize="16px">
                Add From Your Account
            </SubHeading>
            <img
                src={dropdownIcon}
                alt="dropdown"
                style={{ marginRight: 19, height: '7px', width: '12px' }}
            />
        </AddAccountInput>
    );
};

const MultisigView: React.FunctionComponent<MultisigViewProps> = ({
    accountList,
    onChangeAddress,
    addAccount,
    handleOpenModal,
    onRemoveAccount,
    onSubmit,
}) => {
    const navigate = useNavigate();
    const [name, setName] = React.useState('');
    const [threshold, setThreshold] = React.useState(0);
    const mainText = {
        className: mainHeadingfontFamilyClass,
        ls: '3.2px',
        lh: '16px',
        fs: '15px',
        mt: '30px',
    };

    return (
        <Wrapper width="89%">
            <Header
                centerText="Send"
                overWriteBackHandler={() => navigate(DASHBOARD)}
            />
            <SubHeading color="#FAFAFA" opacity="0.7" marginTop="30px">
                Please write down your wallets mnemonic seed and keep it in a
                safe place. It cannot be viewed again.Taking screenshots is not
                encouraged.
            </SubHeading>
            <MainText id="account-name" {...mainText}>
                Name
            </MainText>
            <Input
                onChange={(e) => setName(e)}
                value={name}
                id="name"
                placeholder="Enter Multsig Name"
            />
            <MainText id="account-name" {...mainText}>
                Threshold
            </MainText>
            <Input
                onChange={(e) => setThreshold(Number(e))}
                value={String(threshold)}
                id="name"
                placeholder="Enter Number"
                type="Number"
            />
            {accountList.map((account, index) => (
                <>
                    <HorizontalContentDiv justifyContent="space-between">
                        <MainText id="account-name" {...mainText}>
                            Add Account {index + 1}
                        </MainText>

                        {index > 1 && (
                            <img
                                src={crossIcon}
                                alt="close-btn"
                                onClick={() => onRemoveAccount(index)}
                                aria-hidden="true"
                                style={{
                                    marginTop: '30px',
                                    cursor: 'pointer',
                                    paddingRight: '10px',
                                }}
                            />
                        )}
                    </HorizontalContentDiv>

                    {account.accountFromMetadot ? (
                        <AccountBox
                            name={account.name ? account.name : ''}
                            address={account.address}
                        />
                    ) : (
                        // <Input
                        //     onChange={(e) => onChangeAddress(index, e)}
                        //     value={account.address}
                        //     id="name"
                        //     placeholder="Add Address Or Copy Address"
                        //     rightIconDropDown
                        //     topPosition="30px"
                        //     rightPosition="20px"
                        //     rightIconDropDownHandler={() =>
                        //         handleOpenModal(index)
                        //     }
                        // />
                        <InputBox
                            index={index}
                            address={account.address}
                            handleOpenModal={handleOpenModal}
                            onChangeAddress={onChangeAddress}
                            onRemoveAccount={onRemoveAccount}
                        />
                    )}

                    <SubHeading
                        color="#F63A3A"
                        fontSize="12px"
                        opacity={account.err ? '0.7' : '0'}
                        lineHeight="0px"
                        marginTop="4px"
                    >
                        {account.errMessage}
                    </SubHeading>
                </>
            ))}
            <HorizontalContentDiv
                justifyContent="space-between"
                marginTop="50px"
            >
                <HorizontalContentDiv onClick={addAccount}>
                    <AddCircle>
                        <img src={PlusIcon} alt="plus" />
                    </AddCircle>
                    <SubHeading color="#2E9B9B" fontSize="14px" ml="12px">
                        Add Account
                    </SubHeading>
                </HorizontalContentDiv>
            </HorizontalContentDiv>

            <HorizontalContentDiv
                justifyContent="space-between"
                marginTop="30px"
            >
                <Button
                    id="create-button"
                    text="Create"
                    handleClick={() => {
                        onSubmit();
                    }}
                    style={{
                        width: '100%',
                        height: 50,
                        borderRadius: 40,
                    }}
                />
            </HorizontalContentDiv>
        </Wrapper>
    );
};

export default MultisigView;
