import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { encodeAddress } from '@polkadot/util-crypto';
import { fonts, images } from '../../utils';
import accountUtils from '../../utils/accounts';
import {
    Account,
    AccountCircle,
    AccountFlex,
    AccountMainText,
    AccountSubText,
    AccountText,
    DropDownContainer,
    DropDownIcon,
} from './styles';

import { deleteAccount as deleteAccountRdx } from '../../redux/slices/accounts';
import {
    resetAccountSlice,
    setAccountName,
    setPublicKey,
} from '../../redux/slices/activeAccount';
import { setAuthScreenModal } from '../../redux/slices/modalHandling';
import { AuthModal } from '../common/modals';
import DerivedAccountModal from './derive-modal';
import AccountDropDown from './account-dropdown';
import services from '../../utils/services';
import { AccountListInterface } from './types';
import { RootState } from '../../redux/store';
import { WELCOME } from '../../constants';

const { dropDownIcon } = images;
const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;
const { getJsonBackup, deleteAccount } = accountUtils;
const { addressMapper } = services;

const AccountList: React.FunctionComponent<AccountListInterface> = ({
    publicKey,
    accountName,
    marginBottom,
    marginTop,
    accountActive,
    publicKeyy,
    account,
    childAccounts,
}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const ref: any = useRef();
    const [isOpen, setIsOpen] = useState(false);
    const activeAccount = useSelector(
        (state: RootState) => state.activeAccount
    );
    const { authScreenModal } = useSelector(
        (state: RootState) => state.modalHandling
    );
    const accounts = useSelector((state: RootState) => state.accounts);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedProject, setSelectedProject] =
        useState<{ publicKey: string; accountName: string; seed: string }>();

    const isThisAParent = childAccounts
        ? childAccounts.filter(
              (cAcc: { parentAddress: string }) =>
                  cAcc.parentAddress === account.publicKey
          ).length > 0
        : false;

    useEffect(() => {
        const checkIfClickedOutside = (e: Event): void => {
            if (isOpen && ref.current && !ref.current.contains(e.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', checkIfClickedOutside);

        return () => {
            // Cleanup the event listener
            document.removeEventListener('click', checkIfClickedOutside);
        };
    }, [isOpen]);

    const expandModal = (project: any): void => {
        setSelectedProject(project);
        setModalIsOpen(true);
    };

    const closeModal = (): void => {
        setModalIsOpen(false);
    };

    useEffect(() => {
        const deleteActiveAccount = (): void => {
            if (Object.keys(accounts).length === 0) {
                dispatch(resetAccountSlice());
                navigate(WELCOME);
            }
        };
        deleteActiveAccount();
    }, [accounts]);

    const onOptionClicked = async (): Promise<void> => {
        await deleteAccount(publicKeyy);
        dispatch(deleteAccountRdx(publicKeyy));
        if (publicKeyy === encodeAddress(activeAccount.publicKey, 42)) {
            if (Object.keys(accounts).length > 1) {
                if (Object.keys(accounts)[0] !== publicKeyy) {
                    accountActive(
                        Object.values(accounts)[0].publicKey,
                        Object.values(accounts)[0].accountName
                    );
                } else {
                    accountActive(
                        Object.values(accounts)[1].publicKey,
                        Object.values(accounts)[1].accountName
                    );
                }
            } else {
                dispatch(resetAccountSlice());
            }
            navigate('/');
            setIsOpen(false);
        } else {
            navigate('/');
            setIsOpen(false);
        }
    };

    const downloadJson = async (
        address: string,
        password: string,
        sender = {}
    ): Promise<void> => {
        console.log('address, password', address, password, account);
        await getJsonBackup(address, password);
        dispatch(setAuthScreenModal(false));
    };

    // account dropdown
    const [anchorEl, setAnchorEl] = useState<any>();
    const open = Boolean(anchorEl);
    const handleClick = (event: any): void => {
        Object.values(accounts).map((acc) => {
            if (acc && acc.publicKey === publicKeyy) {
                setAnchorEl(event.currentTarget);
            }
            return null;
        });
    };
    const handleClose = (): void => {
        setAnchorEl(null);
    };
    // account dropdown end
    return (
        <>
            <Account marginBottom={marginBottom} marginTop={marginTop}>
                <AccountFlex>
                    <AccountCircle />
                    <AccountText
                        onClick={() => accountActive(publicKeyy, accountName)}
                    >
                        <AccountMainText className={mainHeadingfontFamilyClass}>
                            {accountName}
                        </AccountMainText>
                        <AccountSubText className={subHeadingfontFamilyClass}>
                            {publicKey}
                        </AccountSubText>
                    </AccountText>
                </AccountFlex>

                <DropDownContainer className={mainHeadingfontFamilyClass}>
                    <DropDownIcon onClick={handleClick}>
                        <img src={dropDownIcon} alt="3-dots" />
                    </DropDownIcon>
                </DropDownContainer>

                <AccountDropDown
                    anchorEl={anchorEl}
                    open={open}
                    key={account.publicKey}
                    handleClose={handleClose}
                    publicKey={selectedProject ? selectedProject.publicKey : ''}
                    account={account}
                    expandModal={expandModal}
                    publicKeyy={publicKeyy}
                    onOptionClicked={onOptionClicked}
                    isThisAParent={isThisAParent}
                />

                <DerivedAccountModal
                    open={modalIsOpen}
                    handleClose={closeModal}
                    publicKey={selectedProject ? selectedProject.publicKey : ''}
                    style={{
                        width: '300px',
                        background: '#141414',
                        position: 'relative',
                        bottom: 30,
                        p: 2,
                        px: 2,
                        pb: 3,
                        marginTop: '10rem',
                    }}
                />
            </Account>
            <AuthModal
                publicKey={account.publicKey}
                open={authScreenModal}
                handleClose={() => {
                    dispatch(setAuthScreenModal(false));
                }}
                onConfirm={downloadJson}
            />
        </>
    );
};

export default AccountList;
