import React from 'react';

import { images } from '../../../../utils';
import { HorizontalContentDiv } from '../../../common/wrapper';
import { Button } from '../../../common';

import FileInput from '../file-input';
import RecepientCard from '../recepient-card';

const { AddCircle, GoUpButton } = images;

const BatchView: React.FunctionComponent = () => {
    const [recepientList, setRecepientList] = React.useState([
        { amount: '', address: '' },
        { amount: '', address: '' },
    ]);

    const handleOnAdd = (): void => {
        setRecepientList((items) => [...items, { amount: '', address: '' }]);
    };

    return (
        <>
            <FileInput />
            {recepientList.map((item) => (
                <RecepientCard />
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
                    handleClick={() => console.log('next')}
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
