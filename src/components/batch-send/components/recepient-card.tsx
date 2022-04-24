import React from 'react';
import { useSelector } from 'react-redux';
import { decodeAddress, encodeAddress } from '@polkadot/keyring';
import { hexToU8a, isHex } from '@polkadot/util';
import { RootState } from '../../../redux/store';

import ToInput from '../../common/to-input';
import { Input } from '../../common';

import { SubHeading, MainText } from '../../common/text';
import { HorizontalContentDiv } from '../../common/wrapper/index';
import { fonts, images } from '../../../utils';
import { RecpientInputDiv, ImageButtons } from '../style';

import { RecepientCardInterface } from '../types';

const { crossIcon } = images;
const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

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
    const { tokenName } = useSelector(
        (state: RootState) => state.activeAccount
    );

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
        tokenImage: `https://token-resources-git-dev-acalanetwork.vercel.app/tokens/${recepient.token}.png`,
        tokenDropDown: true,
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
            >
                Enter Amount
            </SubHeading>
        </RecpientInputDiv>
    );
};

export default RecepientCard;
