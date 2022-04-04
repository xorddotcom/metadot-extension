import React from 'react';

import { images } from '../../utils';
import { VerticalContentDiv, HorizontalContentDiv } from '../common/wrapper';
import FromInput from '../common/from-input';
import { Button } from '../common';

import FileInput from './components/file-input';
import RecepientCard from './components/recepient-card';
import { BATCH_SEND } from '../../constants';

import { CreateBatchViewProps } from './types';

const { AddCircle, GoUpButton } = images;

const BatchView: React.FunctionComponent<CreateBatchViewProps> = ({
    recepientList,
    setRecepientList,
    setStep,
}) => {
    const handleOnAdd = (): void => {
        console.log('add handler');
        // setRecepientList((items) => [
        //     ...items,
        //     { amount: '', address: '', id: recepientList.length + 1 },
        // ]);
    };
    const handleDelete = (): void => {
        console.log('delete handler');
        // setRecepientList(
        //     recepientList.filter((recepient) => recepient.id !== id)
        // );
    };

    return (
        <>
            <VerticalContentDiv marginTop="20px">
                <FromInput />
            </VerticalContentDiv>
            <FileInput />
            {recepientList.map((item, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <RecepientCard key={index} recepient={item} index={index} />
            ))}
            <HorizontalContentDiv
                justifyContent="space-between"
                marginTop="50px"
            >
                <img
                    src={AddCircle}
                    alt="add-circle"
                    aria-hidden
                    onClick={handleOnAdd}
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
