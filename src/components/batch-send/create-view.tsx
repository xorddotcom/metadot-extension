import React from 'react';

import { images } from '../../utils';
import { VerticalContentDiv, HorizontalContentDiv } from '../common/wrapper';
import FromInput from '../common/from-input';
import { Button } from '../common';

import FileInput from './components/file-input';
import RecepientCard from './components/recepient-card';

import { CreateBatchViewProps } from './types';

const { AddCircle, GoUpButton } = images;

const BatchView: React.FunctionComponent<CreateBatchViewProps> = ({
    recepientList,
    setStep,
    addressChangeHandler,
    amountChangeHandler,
    addRecepient,
    deleteRecepient,
}) => {
    return (
        <>
            <VerticalContentDiv marginTop="20px">
                <FromInput />
            </VerticalContentDiv>
            <FileInput />
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
            <HorizontalContentDiv
                justifyContent="space-between"
                marginTop="50px"
            >
                <img
                    src={AddCircle}
                    alt="add-circle"
                    aria-hidden
                    onClick={() => addRecepient({ address: '', amount: '' })}
                />
                <img src={GoUpButton} alt="add-circle" />
            </HorizontalContentDiv>

            <HorizontalContentDiv
                justifyContent="space-between"
                marginTop="30px"
            >
                <Button
                    id="next-button"
                    text="Next"
                    handleClick={() => {
                        setStep(1);
                    }}
                    style={{
                        width: '100%',
                        height: 50,
                        borderRadius: 40,
                    }}
                />
            </HorizontalContentDiv>
        </>
    );
};

export default BatchView;
