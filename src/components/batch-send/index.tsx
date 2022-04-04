import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../common';
import { Wrapper, HorizontalContentDiv } from '../common/wrapper';
import BatchCreateView from './create-view';
import BatchConfirmView from './confirm-view';
import { SubHeading } from '../common/text';
import { SEND } from '../../constants';

import { images } from '../../utils';

import { Recepient } from './types';

const { ToggleOn } = images;

const BatchSend: React.FunctionComponent = () => {
    const navigate = useNavigate();

    const [step, setStep] = React.useState(0);
    const [recepientList, setRecepientList] = React.useState<Recepient[]>([
        { amount: '0.001', address: 'abc' },
        { amount: '0.002', address: 'xyz' },
    ]);

    const handleSendSwitch = (): void => {
        navigate(SEND);
    };

    return (
        <Wrapper width="88%">
            <Header
                centerText="Batch"
                overWriteBackHandler={step === 1 ? () => setStep(0) : undefined}
            />
            <HorizontalContentDiv
                justifyContent="flex-end"
                onClick={handleSendSwitch}
                marginTop="28px"
            >
                <SubHeading>Batch Transaction</SubHeading>
                <img
                    src={ToggleOn}
                    alt="Toggle"
                    style={{ marginLeft: '10px' }}
                />
            </HorizontalContentDiv>
            {step === 0 ? (
                <BatchCreateView
                    recepientList={recepientList}
                    setRecepientList={setRecepientList}
                    setStep={setStep}
                />
            ) : (
                <BatchConfirmView
                    recepientList={recepientList}
                    setRecepientList={setRecepientList}
                />
            )}
        </Wrapper>
    );
};

export default BatchSend;
