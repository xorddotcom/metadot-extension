import React from 'react';
import { approveMetaRequest } from '../../messaging';

const PopupMeta: React.FunctionComponent<any> = ({ requests }) => {
    console.log('meta requests ==>>', requests);
    return (
        <>
            <p>Popup Meta</p>
            <button type="button">Update Metadata</button>
        </>
    );
};

export default PopupMeta;
