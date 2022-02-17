import React from 'react';

const PopupMeta: React.FunctionComponent<any> = ({ requests }) => {
    console.log('requests ==>>', requests);
    return (
        <>
            <p>Popup Meta</p>
            <button type="button">Update Metadata</button>
        </>
    );
};

export default PopupMeta;
