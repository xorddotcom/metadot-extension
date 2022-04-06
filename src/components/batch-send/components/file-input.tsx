import React, { useEffect } from 'react';
import { decodeAddress, encodeAddress } from '@polkadot/keyring';
import { hexToU8a, isHex } from '@polkadot/util';
import { SubHeading, MainText, WarningText } from '../../common/text';
import { fonts, images } from '../../../utils';
import { FileInputDiv } from '../style';

import { FileInputProps, Recepient } from '../types';

const { CSVIcon } = images;
const { subHeadingfontFamilyClass, mainHeadingfontFamilyClass } = fonts;

const FileInput: React.FunctionComponent<FileInputProps> = ({
    addRecepient,
}) => {
    const [csvFile, setCsvFile] = React.useState<any>();
    const [csvData, setCsvData] = React.useState<any>();
    const [error, setError] = React.useState<string>('');
    const hiddenFileInput = React.useRef<HTMLInputElement>(null);

    const isValidAddressPolkadotAddress = (address: string): boolean => {
        try {
            encodeAddress(
                isHex(address) ? hexToU8a(address) : decodeAddress(address)
            );
            return true;
        } catch (err) {
            return false;
        }
    };

    useEffect(() => {
        if (csvFile) {
            try {
                const file = csvFile;
                const reader = new FileReader();

                reader.onload = function (e) {
                    const text = e.target?.result as string;
                    const keys = text?.slice(0, text.indexOf('\n')).split(',');

                    const values = text
                        ?.slice(text.indexOf('\n') + 1)
                        .split('\n');

                    const recepientList = values.map((value) => {
                        return {
                            [keys[0]]: value.split(',')[0],
                            [keys[1]]: value.split(',')[1],
                        };
                    });
                    recepientList.pop();
                    setCsvData(recepientList);
                };

                reader.readAsText(file);
            } catch (e: any) {
                console.log(e);
            }
        }
    }, [csvFile]);

    useEffect(() => {
        if (csvData) {
            const allowedKeys = ['address', 'amount'];

            const keysValidation = allowedKeys.every((val) =>
                Object.keys(csvData[0]).includes(val)
            );
            const valuesValidation = csvData.every(
                (val: Recepient) =>
                    isValidAddressPolkadotAddress(val.address) &&
                    !Number.isNaN(Number(val.amount))
            );

            if (keysValidation && valuesValidation) {
                addRecepient(csvData);
            } else {
                setError('Invalid csv');
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [csvData]);

    const handleClick = (operation: string): void => {
        try {
            if (operation === 'select') {
                if (hiddenFileInput.current) hiddenFileInput.current.click();
            } else if (operation === 'cancel') {
                if (hiddenFileInput.current) hiddenFileInput.current.value = '';
            }
        } catch (err) {
            console.log('in handle click error', err);
        }
    };

    return (
        <>
            <MainText
                className={mainHeadingfontFamilyClass}
                mb="12px"
                mt="10px"
            >
                Upload CSV File (optional)
            </MainText>
            <FileInputDiv onClick={() => handleClick('select')}>
                <img
                    src={CSVIcon}
                    alt="Upload CSV"
                    style={{
                        height: '14px',
                        width: '14px',
                        marginLeft: '14px',
                    }}
                />
                <SubHeading ml="14px">
                    {csvFile ? csvFile.name : 'Choose File'}
                </SubHeading>
            </FileInputDiv>
            {error && (
                <WarningText
                    id="warning-text-3"
                    mb="10px"
                    className={subHeadingfontFamilyClass}
                    visibility
                >
                    Invalid csv file!
                </WarningText>
            )}
            <input
                id="csv-file"
                type="file"
                accept=".csv"
                ref={hiddenFileInput}
                onChange={(e) => {
                    return e.target.files && setCsvFile(e.target.files[0]);
                }}
                style={{ display: 'none' }}
            />
        </>
    );
};

export default FileInput;
