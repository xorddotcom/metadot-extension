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
                style={{
                    height: '14px',
                    width: '14px',
                    marginLeft: '15px',
                }}
            />
            <input
                placeholder={placeHolder}
                value={value}
                onChange={onChange}
                style={{
                    background: 'transparent',
                    border: 'none',
                    width: '80%',
                    marginLeft: '15px',
                    color: '#FAFAFA',
                    opacity: '0.8',
                }}
                id={id}
            />
        </HorizontalContentDiv>
    );
};

export default SearchBar;
