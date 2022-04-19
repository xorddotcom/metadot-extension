import React from 'react';
import {
    setAuthScreenModal,
    setConfirmSendModal,
} from '../../../../redux/slices/modalHandling';
import { ConfirmSendModalProps } from './types';
import useDispatcher from '../../../../hooks/useDispatcher';
import { CONFIRM_BUTTON } from '../../../../utils/app-content';
import ConfirmSendView from './view';

const ConfirmSend: React.FunctionComponent<ConfirmSendModalProps> = (props) => {
    console.log('confirm send props =====>>>', props);
    const { loading2 } = props;
    const transactionAmount = (valueOne: string, valueTwo: number): string => {
        const value = parseFloat(valueOne) + valueTwo;
        const val = value.toString();
        const trimmedValue = val.slice(0, val.indexOf('.') + 4);
        return trimmedValue;
    };

    const generalDispatcher = useDispatcher();

    const btnConfirm = {
        text: CONFIRM_BUTTON,
        style: {
            width: '100%',
            height: 50,
            borderRadius: 40,
        },
        handleClick: () => {
            generalDispatcher(() => setConfirmSendModal(false));
            generalDispatcher(() => setAuthScreenModal(true));
        },
        isLoading: loading2,
        disabled: loading2,
    };

    return (
        <ConfirmSendView
            {...props}
            transactionAmount={transactionAmount}
            btnConfirm={btnConfirm}
        />
    );
};

export default ConfirmSend;
