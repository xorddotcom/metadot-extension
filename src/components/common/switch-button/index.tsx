import React, { useState, useEffect } from 'react';
import Switch from '@mui/material/Switch';

const label = {
    inputProps: { 'aria-label': 'Switch demo' },
};

export const SwitchButton: React.FunctionComponent<any> = (props) => {
    const { setTransferAll, setAmountOnToggle, disableToggleButtons } = props;
    const [switchChecked, setSwitchChecked] = useState(false);
    const [switchCheckedSecond, setSwitchCheckedSecond] = useState(false);
    const [disabled, setDisabled] = useState({
        firstSwitch: false,
        secondSwitch: false,
    });

    const handleChange = (): void => {
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
        </div>
    );
};
