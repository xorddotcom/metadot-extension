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
import { RecpientInputDiv } from '../style';

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
}) => {
    const onChange = (value: string): void => {
        addressChangeHandler(value, index);
    };
    const { tokenName, tokenImage } = useSelector(
        (state: RootState) => state.activeAccount
    );

    const [isCorrect, setIsCorrect] = React.useState(false);

    const styledInput = {
        id: 'InputField',
        placeholder: 'Amount',
        type: 'Number',
        value: recepient.amount,
        className: subHeadingfontFamilyClass,
        onChange: (value: string) => amountChangeHandler(value, index),
        blockInvalidChar: true,
        tokenLogo: true,
        tokenName,
        tokenImage,
    };

    return (
        <RecpientInputDiv style={{ marginTop: '20px' }}>
            <HorizontalContentDiv
                onClick={() => deleteRecepient(index)}
                justifyContent="flex-end"
            >
                <img src={crossIcon} alt="close-btn" />
            </HorizontalContentDiv>
            <SubHeading lineHeight="0px" color="#FAFAFA">
                Recepient {index + 1}
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
                    recepient.validateReaping === false
                        ? '0.7'
                        : '0'
                }
                lineHeight="0px"
                marginTop="-10px"
                mb="10px"
            >
                {!recepient.validateAddress
                    ? 'Invalid Address'
                    : 'Receiver might get reaped'}
            </SubHeading>

            <MainText className={mainHeadingfontFamilyClass}>Amount</MainText>
            <Input {...styledInput} />
        </RecpientInputDiv>
    );
};

export default RecepientCard;
