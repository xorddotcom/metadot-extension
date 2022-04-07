import React from 'react';
import { useSelector } from 'react-redux';

import { decodeAddress, encodeAddress } from '@polkadot/keyring';
import type { ApiPromise as ApiPromiseType } from '@polkadot/api';
import { hexToU8a, isHex } from '@polkadot/util';
import { RootState } from '../../redux/store';
import { images, fonts, helpers } from '../../utils';
import services from '../../utils/services';

import { VerticalContentDiv, HorizontalContentDiv } from '../common/wrapper';
import FromInput from '../common/from-input';
import { Button } from '../common';
import { SubHeading } from '../common/text';

import FileInput from './components/file-input';
import RecepientCard from './components/recepient-card';
import { AddCircle, GoUpCircle } from './style';
import { CreateBatchViewProps } from './types';

const { GoUpIcon, PlusIcon } = images;
const { mainHeadingfontFamilyClass } = fonts;
const { trimContent } = helpers;

const BatchView: React.FunctionComponent<CreateBatchViewProps> = ({
    recepientList,
    setStep,
    addressChangeHandler,
    amountChangeHandler,
    addRecepient,
    deleteRecepient,
    setValidation,
    getTransactionFees,
}) => {
    const { activeAccount } = useSelector((state: RootState) => state);
    const { balance, tokenName } = activeAccount;

    const [insufficientBal, setInsufficientBal] = React.useState(false);

    const isValidAddressPolkadotAddress = (address: string): boolean => {
        try {
            encodeAddress(
                isHex(address) ? hexToU8a(address) : decodeAddress(address)
            );
            return true;
        } catch (err) {
            return false;
        }
    };
    const calculatedAmount = (): string => {
        const dummyArray = [...recepientList];
        const val = dummyArray.reduce((a, b) => {
            return {
                amount: String(Number(a.amount) + Number(b.amount)),
                address: a.address,
            };
        });
        return val.amount;
    };

    const validateAddresses = (): boolean => {
        const invalidAddress = [];
        recepientList.forEach((item, index) => {
            if (!isValidAddressPolkadotAddress(item.address)) {
                setValidation(false, index);
                invalidAddress.push(item.address);
            } else {
                setValidation(true, index);
            }
        });
        if (invalidAddress.length > 0) return false;
        return true;
    };

    const validateBalance = async (): Promise<boolean> => {
        const totalAmount = calculatedAmount();
        const transactionFee = await getTransactionFees(totalAmount);
        console.log(balance, totalAmount, transactionFee, '----> amt, feee');
        console.log(transactionFee);
        if (Number(balance) < Number(totalAmount) + Number(transactionFee)) {
            setInsufficientBal(true);
            return false;
        }
        return true;
    };

    const handleSubmit = async (): Promise<void> => {
        setInsufficientBal(false);
        const addressValidated = validateAddresses();
        const balanceValidated = await validateBalance();

        if (addressValidated && balanceValidated) {
            setStep(1);
        } else {
            console.log('check errors');
        }
    };

    const checkButttonStatus = (): boolean => {
        if (recepientList.some((e) => e.address === '' || e.amount === ''))
            return true;
        return false;
    };

    return (
        <>
            <VerticalContentDiv marginTop="20px">
                <FromInput />
            </VerticalContentDiv>
            <FileInput
                recepientList={recepientList}
                addRecepient={addRecepient}
            />
            {recepientList.map((item, index) => (
                <RecepientCard
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    recepient={item}
                    index={index}
                    addressChangeHandler={addressChangeHandler}
                    amountChangeHandler={amountChangeHandler}
                    deleteRecepient={deleteRecepient}
                />
            ))}

            {insufficientBal && (
                <SubHeading
                    color="#F63A3A"
                    fontSize="12px"
                    opacity="0.7"
                    lineHeight="0px"
                    marginTop="20px"
                >
                    Insufficient Funds
                </SubHeading>
            )}

            <HorizontalContentDiv justifyContent="flex-end" marginTop="12px">
                <SubHeading
                    className={mainHeadingfontFamilyClass}
                    lineHeight="0px"
                    color="#FAFAFA"
                    opacity="0.7"
                    fontSize="12px"
                >
                    Balance: {`${trimContent(balance, 6)} ${tokenName}`}
                </SubHeading>
            </HorizontalContentDiv>

            <HorizontalContentDiv
                justifyContent="space-between"
                marginTop="50px"
            >
                <HorizontalContentDiv
                    onClick={() => addRecepient({ address: '', amount: '' })}
                >
                    <AddCircle>
                        <img src={PlusIcon} alt="plus" />
                    </AddCircle>
                    <SubHeading color="#2E9B9B" fontSize="14px" ml="12px">
                        Add Recepient
                    </SubHeading>
                </HorizontalContentDiv>
                <GoUpCircle>
                    <img src={GoUpIcon} alt="go up" />
                </GoUpCircle>
            </HorizontalContentDiv>

            <HorizontalContentDiv
                justifyContent="space-between"
                marginTop="30px"
            >
                <Button
                    id="next-button"
                    text="Next"
                    handleClick={() => {
                        // setStep(1);
                        handleSubmit();
                    }}
                    style={{
                        width: '100%',
                        height: 50,
                        borderRadius: 40,
                    }}
                    disabled={checkButttonStatus()}
                />
            </HorizontalContentDiv>
        </>
    );
};

export default BatchView;
