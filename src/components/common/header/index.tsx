import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Props } from './type';
import HeaderView from './view';

const Header: React.FunctionComponent<Props> = (props) => {
    const { backHandler, overWriteBackHandler } = props;
    const navigate = useNavigate();

    const onBackClick = async (): Promise<void> => {
        if (overWriteBackHandler) {
            overWriteBackHandler();
        } else if (backHandler) {
            backHandler();
            navigate(-1);
        } else {
            navigate(-1);
        }
    };

    return <HeaderView {...props} onBackClick={onBackClick} />;
};

export default Header;
