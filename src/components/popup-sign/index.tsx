import React, { useState, useEffect } from 'react';
import { TypeRegistry } from '@polkadot/types';
import { approveSignPassword } from '../../messaging';

const registry = new TypeRegistry();
console.log('registry in sign popup', registry);

const PopupSign: React.FunctionComponent<any> = ({ requests }) => {
    const [password, setPassword] = useState('');
    const passwordChangeHandler = (e: any): void => {
        setPassword(e.target.value);
    };

    // useEffect((): void => {
    //     if (requests[0]) {
    //         const { payload } = requests[0].request;
    //         registry.setSignedExtensions(payload.signedExtensions);
    //     }
    // }, [requests]);
    console.log('sign requests ==>>', requests);
    return (
        <>
            <p>Popup Sign</p>
            <input
                type="text"
                onChange={passwordChangeHandler}
                value={password}
            />
            <button
                type="button"
                onClick={() =>
                    approveSignPassword(requests[0].id, false, password)
                }
            >
                Sign
            </button>
        </>
    );
};

export default PopupSign;
