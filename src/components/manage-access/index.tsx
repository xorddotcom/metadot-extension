import React, { ChangeEventHandler, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Header } from '../common';

import {
    Wrapper,
    HorizontalContentDiv,
    VerticalContentDiv,
} from '../common/wrapper';
import SearchBar from '../common/search-bar';
import ManageAccessCard from './card';

const listOfWebsite = [
    { title: 'app.tailsman.com', access: true },
    { title: 'app.tailsman.commmmmm', access: true },
    { title: 'app.tailsmmmman.comm', access: false },
    { title: 'app.tailsmammmn.comn', access: true },
];

function ManageAccess(): JSX.Element {
    const [search, setSearch] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSearch(e.target.value);
    };

    return (
        <Wrapper>
            <Header
                centerText="Manage Website Access"
                backHandler={() => console.log('goBack')}
            />

            <SearchBar
                id="search-bar"
                value={search}
                placeHolder="Search"
                onChange={handleChange}
            />

            <VerticalContentDiv style={{ marginTop: '30px' }}>
                {listOfWebsite.map((el) => {
                    return (
                        <ManageAccessCard
                            title={el.title}
                            access={el.access}
                            onClick={() => console.log('clicked')}
                        />
                    );
                })}
            </VerticalContentDiv>
        </Wrapper>
    );
}

export default ManageAccess;
