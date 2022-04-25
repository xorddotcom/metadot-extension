import '@polkadot/api-augment';
import React from 'react';
import Header from '../common/header';
import Button from '../common/button';
import { MainContent, CenterContent, Wrapper } from './style';
import ConfirmSend from '../common/modals/confirmSend';

import FromInput from '../common/from-input';
import ToInput from '../common/to-input';
import AmountInput from '../common/amount-input';
import EDC from './components/existential-deposit';
import { SendViewProps } from './types';

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
