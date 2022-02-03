import React from 'react';
import { Input } from '@mui/material';
import { WarningText } from '../common/text';
import { colors, fonts } from '../../utils';
import { EnterSeedInterface } from './type';

const index: React.FunctionComponent<EnterSeedInterface> = ({
    handleChange,
    seedPhrase,
    invalidSeedMessage,
}) => {
    const { primaryText, darkBackground1 } = colors;
    const { subHeadingfontFamilyClass } = fonts;
    const input = {
        id: 'seed-input',
        style: {
            padding: '13px 15px',
            background: darkBackground1,
            color: primaryText,
            width: '100%',
            borderRadius: '8px',
            fontSize: '0.8rem',
            lineHeight: '1.7em',
        },
        className: subHeadingfontFamilyClass,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(e.target.value.replace(/[^A-Z\s]/gi, '')),
        value: seedPhrase,
        rows: 5,
        placeholder: 'Place your seed here',
    };

    return (
        <div style={{ marginTop: '1rem' }}>
            <Input {...input} autoFocus multiline disableUnderline />
            <WarningText
                id="warning-text"
                className={subHeadingfontFamilyClass}
                visibility={!!invalidSeedMessage}
            >
                {invalidSeedMessage}
            </WarningText>
        </div>
    );
};

export default index;
