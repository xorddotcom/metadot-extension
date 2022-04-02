import '@polkadot/api-augment';
import React from 'react';
import Header from '../../../common/header';
import Button from '../../../common/button';
import { MainContent, CenterContent, Wrapper } from '../../style';
import ConfirmSend from '../../../common/modals/confirmSend';
import FromInput from '../from-input';
import ToInput from '../to-input';
import AmountInput from '../amount-input';
import { SendViewProps } from '../../types';

const SendView: React.FunctionComponent<SendViewProps> = (props) => {
    const { toInput, amountInput, nextBtn, confirmSend } = props;
    return (
        <>
            <MainContent>
                <ToInput {...toInput} />
                <AmountInput {...amountInput} />
            </MainContent>
            <CenterContent>
                <Button {...nextBtn} />
            </CenterContent>

            <ConfirmSend {...confirmSend} />
        </>
    );
};

export default SendView;
