import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import type { ApiPromise as ApiPromiseType } from '@polkadot/api';
import Switch from '@mui/material/Switch';

import services from '../../../utils/services';

import { RootState } from '../../../redux/store';

const label = {
    inputProps: { 'aria-label': 'Switch demo' },
    // onClick: () => console.log('hello'),
    // value: true,
    // disabled: true,
};

export const SwitchButton: React.FunctionComponent<any> = (props) => {
    const currentUser = useSelector((state: RootState) => state);
    const api = currentUser.api.api as unknown as ApiPromiseType;
    const { getTransactionFee } = services;
    const { setTransferAll, setAmountOnToggle, disableToggleButtons } = props;
    const [switchChecked, setSwitchChecked] = useState(false);
    const [switchCheckedSecond, setSwitchCheckedSecond] = useState(false);
    const [disabled, setDisabled] = useState({
        firstSwitch: false,
        secondSwitch: false,
    });

    const { balance } = currentUser.activeAccount;

    const handleChange = (e: any): void => {
        setAmountOnToggle(!switchChecked, true);
        setSwitchCheckedSecond(false);
        setSwitchChecked(!switchChecked);
        setTransferAll({
            keepAlive: true,
            transferAll: true,
        });
    };

    const handleChangeSecond = (): void => {
        setAmountOnToggle(!switchCheckedSecond, false);
        setSwitchChecked(false);
        setSwitchCheckedSecond(!switchCheckedSecond);
        setTransferAll({
            keepAlive: false,
            transferAll: true,
        });
    };

    return (
        <div>
            <p style={{ color: 'white' }}>Trasnfer all, dont reap</p>
            <Switch
                size="medium"
                onChange={handleChange}
                checked={switchChecked}
                disabled={
                    disabled.firstSwitch || disableToggleButtons.firstToggle
                }
            />
            <br />
            <p style={{ color: 'white' }}>Transfer all and reap</p>
            <Switch
                {...label}
                size="medium"
                onChange={handleChangeSecond}
                checked={switchCheckedSecond}
                disabled={
                    disabled.secondSwitch || disableToggleButtons.secondToggle
                }
            />
            {/* <button onClick={compareED} type="button">
                Compare ED
            </button> */}
        </div>
    );
};
