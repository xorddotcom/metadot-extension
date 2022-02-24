import React from 'react';
import SearchIcon from '../../../assets/images/icons/search_icon.svg';
import { Props } from './type';
import { HorizontalContentDiv } from '../wrapper';

const SearchBar: React.FunctionComponent<Props> = ({
    placeHolder,
    id,
    value,
    onChange,
}) => {
    return (
        <HorizontalContentDiv
            style={{
                border: '1px solid rgba(196, 196, 196, 0.4)',
                height: '52px',
                borderRadius: '8px',
                marginTop: '30px',
            }}
        >
            <img
                src={SearchIcon}
                alt="search"
                style={{ height: '13px', width: '13px', marginLeft: '15px' }}
            />
            <input
                placeholder="Search"
                value={value}
                onChange={onChange}
                style={{
                    background: 'transparent',
                    border: 'none',
                    width: '80%',
                    marginLeft: '15px',
                }}
            />
        </HorizontalContentDiv>
    );
};

export default SearchBar;
