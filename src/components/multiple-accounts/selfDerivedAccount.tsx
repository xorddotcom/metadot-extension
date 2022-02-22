import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteAccount } from '../../redux/slices/accounts';
import { setAccountName, setPublicKey } from '../../redux/slices/activeAccount';
import {
    Account,
    AccountCircle,
    AccountFlex,
    AccountMainText,
    AccountSubText,
    AccountText,
    DrivedAccountMain,
    DropDownContainer,
    DropDownIcon,
    DropDownList,
    ListItem,
    DropDownListContainer,
} from './styles';
import { fonts, helpers } from '../../utils';
import RemoveIcon from '../../assets/images/icons/Remove.svg';
import exportIcon from '../../assets/images/icons/export.svg';
import dropDownIcon from '../../assets/images/icons/3Dots.svg';
import { SelfDrivedAccountListInterface } from './types';
import { RootState } from '../../redux/store';

const { subHeadingfontFamilyClass, mainHeadingfontFamilyClass } = fonts;
const { addressModifier } = helpers;

const SelfDrivedAccountList: React.FunctionComponent<
    SelfDrivedAccountListInterface
> = ({ childAccount, childAccountActive }) => {
    const { publicKey } = childAccount;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const activeAccount = useSelector(
        (state: RootState) => state.activeAccount
    );
    const accounts = useSelector((state: RootState) => state.accounts);

    const [isOpen, setIsOpen] = useState(false);

    const toggling = (): void => setIsOpen(!isOpen);

    const onOptionClicked = (): void => {
        if (publicKey === activeAccount.publicKey) {
            dispatch(deleteAccount(publicKey));
            dispatch(setPublicKey(''));
            dispatch(setAccountName(''));
            dispatch(setPublicKey('')); // Object.values(accounts)[0].publicKey
            dispatch(setAccountName('')); // Object.values(accounts)[0].publicKey
            navigate('/');
        }
        dispatch(deleteAccount(publicKey));
        navigate('/');
        setIsOpen(false);
    };

    return (
        <DrivedAccountMain>
            <Account margin="1rem 0">
                <AccountFlex>
                    <AccountCircle />
                    <AccountText>
                        <AccountMainText
                            onClick={childAccountActive}
                            className={mainHeadingfontFamilyClass}
                        >
                            {`${childAccount.accountName}//0`}
                        </AccountMainText>
                        <AccountSubText className={subHeadingfontFamilyClass}>
                            {addressModifier(childAccount.publicKey)}
                        </AccountSubText>
                    </AccountText>
                </AccountFlex>

                <DropDownContainer className={mainHeadingfontFamilyClass}>
                    <DropDownIcon onClick={toggling}>
                        <img src={dropDownIcon} alt="3-dots" />
                    </DropDownIcon>

                    {isOpen && (
                        <DropDownListContainer>
                            <DropDownList>
                                <ListItem
                                    onClick={() => console.log('clicked')}
                                    key={Math.random()}
                                >
                                    <img
                                        src={exportIcon}
                                        alt="remove-account"
                                        width="16"
                                        height="17"
                                        style={{ marginLeft: '1.2rem' }}
                                    />
                                    &nbsp; &nbsp;
                                    <span style={{ fontSize: '0.85rem' }}>
                                        Export Account
                                    </span>
                                </ListItem>
                                <ListItem
                                    onClick={() => onOptionClicked()}
                                    key={Math.random()}
                                >
                                    <img
                                        src={RemoveIcon}
                                        alt="remove-account"
                                        width="16"
                                        height="17"
                                        style={{ marginLeft: '1.2rem' }}
                                    />
                                    &nbsp; &nbsp;
                                    <span style={{ fontSize: '0.85rem' }}>
                                        Remove Account
                                    </span>
                                </ListItem>
                            </DropDownList>
                        </DropDownListContainer>
                    )}
                </DropDownContainer>
            </Account>
        </DrivedAccountMain>
    );
};

export default SelfDrivedAccountList;
