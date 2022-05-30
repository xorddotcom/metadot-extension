import '@polkadot/api-augment';
import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../common/header';
import Button from '../common/button';
import { MainContent, CenterContent } from './style';
import ConfirmSend from '../common/modals/confirmSend';
import { images, fonts } from '../../utils';

import FromInput from '../common/from-input';
import ToInput from '../common/to-input';
import AmountInput from '../common/amount-input';
import EDC from './components/existential-deposit';
import { SendViewProps } from './types';
import { SubHeading, MainText } from '../common/text';
import { MyAccounts } from '../common/modals';
import { Input } from '../common';
import { RootState } from '../../redux/store';

const { dropdownIcon } = images;
const { mainHeadingfontFamilyClass } = fonts;

const SendView: React.FunctionComponent<SendViewProps> = (props) => {
    const { toInput, amountInput, ED, nextBtn, confirmSend, fromInput } = props;

    return (
        <>
            <FromInput {...fromInput} />
            <MainContent>
                <ToInput {...toInput} />
                <AmountInput {...amountInput} />

                <EDC {...ED} />
            </MainContent>
            <CenterContent>
                <Button {...nextBtn} />
            </CenterContent>

            <ConfirmSend {...confirmSend} />
        </>
    );
};

export default SendView;
