import React from 'react';

import { images } from '../../utils';
import { VerticalContentDiv, HorizontalContentDiv } from '../common/wrapper';
import FromInput from '../common/from-input';
import { Button } from '../common';
import { SubHeading } from '../common/text';

import FileInput from './components/file-input';
import RecepientCard from './components/recepient-card';
import { AddCircle, GoUpCircle } from './style';
import { CreateBatchViewProps } from './types';

const { GoUpIcon, PlusIcon } = images;

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
            <FileInput addRecepient={addRecepient} />
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
                <HorizontalContentDiv
                    onClick={() => addRecepient({ address: '', amount: '' })}
                >
                    <AddCircle>
                        <img src={PlusIcon} alt="plus" />
                    </AddCircle>
                    <SubHeading color="#2E9B9B" fontSize="14px" ml="12px">
                        Add Recepient
                    </SubHeading>
                </HorizontalContentDiv>
                <GoUpCircle>
                    <img src={GoUpIcon} alt="go up" />
                </GoUpCircle>
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
