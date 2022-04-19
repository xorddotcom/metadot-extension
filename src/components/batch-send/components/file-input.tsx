import React, { useEffect } from 'react';
import { decodeAddress, encodeAddress } from '@polkadot/keyring';
import { hexToU8a, isHex } from '@polkadot/util';
import CancelIcon from '@mui/icons-material/Cancel';
import { SubHeading, MainText, WarningText } from '../../common/text';
import { fonts, images } from '../../../utils';
import { FileInputDiv } from '../style';
import help from '../../../assets/images/icons/ED_help.svg';

import { FileInputProps, Recepient } from '../types';

const { CSVIcon, crossIconRound } = images;
const { subHeadingfontFamilyClass, mainHeadingfontFamilyClass } = fonts;

const FileInput: React.FunctionComponent<FileInputProps> = ({
    recepientList,
    addRecepient,
}) => {
    const [csvFile, setCsvFile] = React.useState<any>();
    const [csvData, setCsvData] = React.useState<any>();
    const [resetRecepientList, setResetRecepientList] = React.useState<
        Recepient[]
    >([]);
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
                    const keys = text
                        ?.slice(0, text.indexOf('\n'))
                        .trim()
                        .split(',');

                    const values = text
                        ?.slice(text.indexOf('\n') + 1)
                        .split('\n');

                    const recepientLists = values.map((value) => {
                        return {
                            [keys[0]]: value.trim().split(',')[0],
                            [keys[1]]: value.trim().split(',')[1],
                        };
                    });
                    recepientLists.pop();
                    setCsvData(recepientLists);
                };

                reader.readAsText(file);
            } catch (e: any) {
                console.log(e);
            }
        }
    }, [csvFile]);

    useEffect(() => {
        if (csvData) {
            setResetRecepientList(recepientList);
            const allowedKeys = ['address', 'amount'];
            console.log('csv data ==>>', csvData);

            const keysValidation = allowedKeys.every((val) =>
                Object.keys(csvData[0]).includes(val)
            );
            console.log('keys validation ==>>', keysValidation);
            const valuesValidation = csvData.every(
                (val: Recepient) =>
                    isValidAddressPolkadotAddress(val.address) &&
                    !Number.isNaN(Number(val.amount))
            );
            console.log('values validation ==>>', valuesValidation);

            if (keysValidation && valuesValidation) {
                addRecepient(
                    recepientList
                        .filter(
                            (recepient) => recepient.address || recepient.amount
                        )
                        .concat(csvData),
                    true
                );
            } else {
                setError('Invalid csv');
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [csvData]);

    const handleClick = (operation: string): void => {
        try {
            if (operation === 'select') {
                if (hiddenFileInput.current && !csvFile)
                    hiddenFileInput.current.click();
            } else if (operation === 'cancel') {
                if (hiddenFileInput.current) hiddenFileInput.current.value = '';
                setCsvFile(undefined);
                addRecepient(resetRecepientList, true);
            }
        } catch (err) {
            console.log('in handle click error', err);
        }
    };

    const copyIconTooltip = {
        id: 'copy-icon',
        className: `main-card-tooltip ${mainHeadingfontFamilyClass}`,
        style: { cursor: 'pointer' },
    };

    const copyIconTooltipText = {
        className: 'main-card-tooltiptext',
        style: {
            bottom: '120%',
            fontSize: '11px',
            fontWeight: 300,
            padding: '5px',
            transition: 'all 0.1s ease-in',
        },
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

                <div
                    style={{
                        display: 'flex',
                        marginLeft: 'auto',
                        marginRight: '16px',
                    }}
                >
                    {csvFile ? (
                        <img
                            src={crossIconRound}
                            alt="cros icon"
                            aria-hidden
                            onClick={(e) => {
                                e.stopPropagation();
                                handleClick('cancel');
                            }}
                        />
                    ) : (
                        <div {...copyIconTooltip}>
                            <img
                                aria-hidden
                                src={help}
                                alt="img"
                                height="max-content"
                                style={{ margin: '0px 8px' }}
                            />
                            <span {...copyIconTooltipText}>
                                Your csv must contain amount and address columns
                                with atleast 2 entries
                            </span>
                        </div>
                    )}
                </div>
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
