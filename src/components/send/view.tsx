import '@polkadot/api-augment';
import React from 'react';
import Header from '../common/header';
import Button from '../common/button';
import { MainContent, CenterContent, Wrapper } from './style';
import ConfirmSend from '../common/modals/confirmSend';
import FromInput from './components/from-input';
import ToInput from './components/to-input';
import AmountInput from './components/amount-input';
import { SendViewProps } from './types';
import { SwitchButton } from '../common/switch-button';

const SendView: React.FunctionComponent<SendViewProps> = (props) => {
    const {
        toInput,
        amountInput,
        nextBtn,
        confirmSend,
        setTransferAll,
        setAmountOnToggle,
        transactionFee,
        existentialDeposit,
        disableToggleButtons,
    } = props;
    return (
        <Wrapper pb>
            <Header centerText="Send" />

            <MainContent>
                <FromInput />
                <ToInput {...toInput} />
                <AmountInput {...amountInput} />
            </MainContent>
            {/* <SwitchButton
                setTransferAll={setTransferAll}
                setAmountOnToggle={setAmountOnToggle}
                transactionFee={transactionFee}
                existentialDeposit={existentialDeposit}
                disableToggleButtons={disableToggleButtons}
            /> */}
            <CenterContent>
                <Button {...nextBtn} />
            </CenterContent>
            <ConfirmSend {...confirmSend} />
        </Wrapper>
    );
};

export default SendView;
