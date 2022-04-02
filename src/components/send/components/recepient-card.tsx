import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

import ToInput from './to-input';
import { Input } from '../../common';

import { SubHeading, MainText } from '../../common/text';
import { HorizontalContentDiv } from '../../common/wrapper/index';
import { fonts, images } from '../../../utils';
import { RecpientInputDiv } from '../style';

const { crossIcon } = images;
const { mainHeadingfontFamilyClass, subHeadingfontFamilyClass } = fonts;

const errorMessages = {
    invalidAddress: 'Invalid address',
    enterAddress: 'Enter address',
    enterAmount: 'Enter amount',
};

const RecepientCard = (): JSX.Element => {
    const [isCorrect, setIsCorrect] = React.useState(true);
    const [receiverAddress, setReceiverAddress] = React.useState('');
    const [amountInput, setAmountInput] = React.useState('');

    const onChange = (e: string): void => {
        setReceiverAddress(e);
    };
    const { tokenName, tokenImage } = useSelector(
        (state: RootState) => state.activeAccount
    );

    const styledInput = {
        id: 'InputField',
        placeholder: 'Amount',
        type: 'Number',
        value: amountInput,
        className: subHeadingfontFamilyClass,
        onChange: (e: string) => setAmountInput(e),
        blockInvalidChar: true,
        tokenLogo: true,
        tokenName,
        tokenImage,
    };

    return (
        <RecpientInputDiv style={{ marginTop: '20px' }}>
            <HorizontalContentDiv justifyContent="flex-end">
                <img src={crossIcon} alt="close-btn" />
            </HorizontalContentDiv>

            <SubHeading lineHeight="0px" color="#FAFAFA">
                Recepient 1
            </SubHeading>
            <ToInput
                errorMessages={errorMessages}
                onChange={onChange}
                isCorrect={isCorrect}
                receiverAddress={receiverAddress}
            />
            <MainText className={mainHeadingfontFamilyClass}>Amount</MainText>
            <Input {...styledInput} />
        </RecpientInputDiv>
    );
};

export default RecepientCard;
