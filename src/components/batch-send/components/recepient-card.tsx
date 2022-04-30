import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type { ApiPromise as ApiPromiseType } from '@polkadot/api';
import { decodeAddress, encodeAddress } from '@polkadot/keyring';
import { hexToU8a, isHex } from '@polkadot/util';
import { RootState } from '../../../redux/store';

import ToInput from '../../common/to-input';
import { Input } from '../../common';

import { SubHeading, MainText } from '../../common/text';
import { HorizontalContentDiv } from '../../common/wrapper/index';
import { fonts, helpers, images } from '../../../utils';
import { RecpientInputDiv, ImageButtons } from '../style';

import { RecepientCardInterface } from '../types';
import services from '../../../utils/services';

const { crossIcon } = images;
const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;
const { trimContent } = helpers;
const { getBalancesForBatch, getBalanceWithSingleToken } = services;

const errorMessages = {
    invalidAddress: 'Invalid address',
    enterAddress: 'Enter address',
    enterAmount: 'Enter amount',
};

const RecepientCard: React.FunctionComponent<RecepientCardInterface> = ({
    recepient,
    index,
    addressChangeHandler,
    amountChangeHandler,
    deleteRecepient,
    setErrorsFalse,
    handleNetworkModalOpen,
}) => {
    const onChange = (value: string): void => {
        addressChangeHandler(value, index);
        setErrorsFalse();
    };
    const currRedux = useSelector((state: RootState) => state);
    const api = currRedux.api.api as unknown as ApiPromiseType;
    const { tokenName, tokenImage, balances, publicKey } = useSelector(
        (state: RootState) => state.activeAccount
    );
    const [balanceOfSelectedToken, setBalanceOfSelectedToken] = useState(
        balances[0].balance
    );

    useEffect(() => {
        const getBalForSelectedToken = async (): Promise<void> => {
            const isNativeToken = balances.filter(
                (bal) => bal.name === recepient.token
            );
            console.log('isNativeToken', isNativeToken);
            if (!isNativeToken[0].isNative) {
                const receiverBalance = await getBalancesForBatch(api, [
                    {
                        address: publicKey,
                        token: recepient.token,
                    },
                ]);
                console.log('receiverBalance', receiverBalance);
                setBalanceOfSelectedToken(receiverBalance[0]);
            } else {
                const nativeBalance = await getBalanceWithSingleToken(
                    api,
                    publicKey
                );
                console.log('nativeBalance', nativeBalance);
                setBalanceOfSelectedToken(nativeBalance.balance);
            }
        };
        getBalForSelectedToken();
    }, [recepient.token]);

    const styledInput = {
        id: 'InputField',
        placeholder: 'Amount',
        type: 'Number',
        value: recepient.amount,
        className: subHeadingfontFamilyClass,
        onChange: (value: string) => {
            amountChangeHandler(value, index);
            setErrorsFalse();
        },
        blockInvalidChar: true,
        tokenLogo: true,
        tokenName: recepient.token,
        tokenImage:
            balances.length > 1
                ? `https://token-resources-git-dev-acalanetwork.vercel.app/tokens/${recepient.token}.png`
                : tokenImage,
        tokenDropDown: balances.length > 1,
        tokenDropDownHandler: () => handleNetworkModalOpen(index),
    };

    const checkForAccountErrors = (): string => {
        let errMessage = '';
        if (recepient.empytAaddress) {
            errMessage = 'Enter Recipient Address';
        } else if (!recepient.validateAddress) {
            errMessage = 'Invalid Address';
        } else {
            errMessage = 'Receiver might get reaped';
        }
        return errMessage;
    };

    return (
        <RecpientInputDiv style={{ marginTop: '20px' }}>
            <HorizontalContentDiv justifyContent="flex-end">
                <ImageButtons
                    src={crossIcon}
                    alt="close-btn"
                    aria-hidden
                    onClick={() => deleteRecepient(index)}
                />
            </HorizontalContentDiv>
            <SubHeading lineHeight="0px" color="#FAFAFA">
                Recipient {index + 1}
            </SubHeading>
            <ToInput
                errorMessages={errorMessages}
                onChange={onChange}
                isCorrect
                receiverAddress={recepient.address}
            />

            <SubHeading
                color="#F63A3A"
                fontSize="12px"
                opacity={
                    recepient.validateAddress === false ||
                    recepient.validateReaping === false ||
                    recepient.empytAaddress === true
                        ? '0.7'
                        : '0'
                }
                lineHeight="0px"
                marginTop="-10px"
                mb="10px"
            >
                {checkForAccountErrors()}
            </SubHeading>

            <MainText className={mainHeadingfontFamilyClass}>Amount</MainText>
            <Input {...styledInput} />
            <SubHeading
                color="#F63A3A"
                fontSize="12px"
                opacity={recepient.empytAmount ? '0.7' : '0'}
                lineHeight="0px"
                mb="10px"
                hide={!recepient.empytAmount}
            >
                Enter Amount
            </SubHeading>
            <HorizontalContentDiv justifyContent="flex-end" marginTop="12px">
                <SubHeading
                    className={mainHeadingfontFamilyClass}
                    lineHeight="0px"
                    color="#FAFAFA"
                    opacity="0.7"
                    fontSize="12px"
                >
                    Balance:{' '}
                    {`${trimContent(balanceOfSelectedToken, 6)} ${
                        recepient.token
                    }`}
                </SubHeading>
            </HorizontalContentDiv>
        </RecpientInputDiv>
    );
};

export default RecepientCard;
