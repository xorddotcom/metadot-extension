import React from 'react';
import { approveAuthRequest } from '../../messaging';

const PopupAuth: React.FunctionComponent<any> = ({ requests }) => {
    console.log('requests ==>>', requests);
    return (
        <>
            <p>Popup Auth</p>
            <button
                type="button"
                onClick={() => approveAuthRequest(requests[0].id)}
            >
                Authorize
            </button>
        </>
    );
};

export default PopupAuth;
