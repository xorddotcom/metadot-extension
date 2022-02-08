import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { deleteAccount } from '../../redux/slices/accounts';
import { setAccountName, setPublicKey } from '../../redux/slices/activeAccount';
import {
    Account,
    AccountCircle,
    AccountFlex,
    AccountMainText,
    AccountSubText,
    AccountText,
    Border,
    DrivedAccount,
    DrivedAccountMain,
    DrivedAccountText,
    DropDownContainer,
    DropDownIcon,
} from './styles';
import { fonts, helpers } from '../../utils';
import downIcon from '../../assets/images/icons/downArrow.svg';
import upArrowIcon from '../../assets/images/icons/upArrow.svg';
import dropDownIcon from '../../assets/images/icons/3Dots.svg';
import ChildAccountDropDown from './child-account-dropdown';
import { DerivedAccountInterface } from './types';
import { RootState } from '../../redux/store';

const { subHeadingfontFamilyClass, mainHeadingfontFamilyClass } = fonts;
const { addressModifier } = helpers;

const DrivedAccountList: React.FunctionComponent<DerivedAccountInterface> = ({
    childAccount,
    childAccountActive,
    checkDrivedDropdownOpen,
}) => {
    const { publicKey } = childAccount;
    const ref = useRef<Element>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const activeAccount = useSelector(
        (state: RootState) => state.activeAccount
    );
    const accounts = useSelector((state: RootState) => state.accounts);

    const [drivedDropDownOpen, setdrivedDropDownOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const checkIfClickedOutside = (e: Event): void => {
            if (
                isOpen &&
                ref.current &&
                !ref.current.contains(e.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', checkIfClickedOutside);

        return () => {
            document.removeEventListener('click', checkIfClickedOutside);
        };
    }, [isOpen]);

    const onOptionClicked = (): void => {
        if (publicKey === activeAccount.publicKey) {
            dispatch(deleteAccount(publicKey));
            dispatch(setPublicKey(''));
            dispatch(setAccountName(''));
            dispatch(setPublicKey('')); // Object.values(accounts)[0].publicKey
            dispatch(setAccountName('')); // Object.values(accounts)[0].accountName
            navigate('/');
        }
        dispatch(deleteAccount(publicKey));
        setIsOpen(false);
    };

    // account dropdown
    const [anchorEl, setAnchorEl] = useState<any>();
    const open = Boolean(anchorEl);

    const handleClick = (event: any): void => {
        Object.values(accounts).map((acc) => {
            if (acc && acc.publicKey === publicKey) {
                setAnchorEl(event.currentTarget);
            }
            return null;
        });
    };
    const handleClose = (): void => {
        setAnchorEl(null);
    };

    return (
        <DrivedAccountMain>
            <Border />
            <DrivedAccount
                onClick={() => {
                    setdrivedDropDownOpen(
                        (drivedDropDownOpens) => !drivedDropDownOpens
                    );
                    checkDrivedDropdownOpen(drivedDropDownOpen);
                }}
            >
                <DrivedAccountText className={subHeadingfontFamilyClass}>
                    1 Derived Account
                </DrivedAccountText>
                <DropDownIcon>
                    <div aria-hidden="true">
                        {!drivedDropDownOpen ? (
                            <img src={downIcon} alt="drop-down-icon" />
                        ) : (
                            <img src={upArrowIcon} alt="drop-down-icon" />
                        )}
                    </div>
                </DropDownIcon>
            </DrivedAccount>

            {/* Derived Account Drop Down */}

            {drivedDropDownOpen && (
                <Account margin="1rem 0">
                    <AccountFlex>
                        <AccountCircle />
                        <AccountText onClick={childAccountActive}>
                            <AccountMainText
                                className={mainHeadingfontFamilyClass}
                            >
                                {`${childAccount.accountName}//0`}
                            </AccountMainText>
                            <AccountSubText
                                className={subHeadingfontFamilyClass}
                            >
                                {addressModifier(childAccount.publicKey)}
                            </AccountSubText>
                        </AccountText>
                    </AccountFlex>

                    {/* Drop Down 3 dots */}

                    <DropDownContainer className={mainHeadingfontFamilyClass}>
                        <DropDownIcon onClick={handleClick}>
                            <img src={dropDownIcon} alt="3-dots" />
                        </DropDownIcon>
                    </DropDownContainer>
                    <ChildAccountDropDown
                        anchorEl={anchorEl}
                        open={open}
                        key={publicKey}
                        handleClose={handleClose}
                        publicKeyy={publicKey}
                        onOptionClicked={onOptionClicked}
                    />
                </Account>
            )}
        </DrivedAccountMain>
    );
};

export default DrivedAccountList;
