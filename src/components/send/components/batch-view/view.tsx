import React from 'react';

import { useNavigate } from 'react-router-dom';
import { images } from '../../../../utils';
import { HorizontalContentDiv } from '../../../common/wrapper';
import { Button } from '../../../common';

import FileInput from '../file-input';
import RecepientCard from '../recepient-card';

const { AddCircle, GoUpButton } = images;

const BatchView: React.FunctionComponent = () => {
    const navigate = useNavigate();

    const [recepientList, setRecepientList] = React.useState([
        { id: 1, amount: '', address: '' },
        { id: 2, amount: '', address: '' },
    ]);

    const handleOnAdd = (): void => {
        console.log(recepientList.length);
        setRecepientList((items) => [
            ...items,
            { amount: '', address: '', id: recepientList.length + 1 },
        ]);
    };
    const handleDelete = (id: number): void => {
        setRecepientList(
            recepientList.filter((recepient) => recepient.id !== id)
        );
    };

    return (
        <>
            <FileInput />
            {recepientList.map((item) => (
                <RecepientCard
                    key={item.id}
                    amount={item.amount}
                    address={item.address}
                    recepientNumber={item.id}
                    id={item.id}
                    handleDelete={() => handleDelete(item.id)}
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
                        navigate(BATCH_SEND);
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
