import React from 'react';

const PopupSign: React.FunctionComponent<any> = ({ requests }) => {
    console.log('requests ==>>', requests);
    return (
        <>
            <p>Popup Sign</p>
            <button type="button">Sign</button>
        </>
    );
};

export default PopupSign;
