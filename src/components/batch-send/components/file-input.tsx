import React, { useRef, useEffect } from 'react';
import { SubHeading, MainText } from '../../common/text';
import { fonts, images } from '../../../utils';
import { FileInputDiv } from '../style';

import { FileInputProps, Recepient } from '../types';

const { CSVIcon } = images;
const { mainHeadingfontFamilyClass } = fonts;

const FileInput: React.FunctionComponent<FileInputProps> = ({
    addRecepient,
}) => {
    const [csvFile, setCsvFile] = React.useState<any>();
    const hiddenFileInput = React.useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (csvFile) {
            const file = csvFile;
            const reader = new FileReader();

            reader.onload = function (e) {
                const text = e.target?.result as string;
                const keys = text?.slice(0, text.indexOf('\n')).split(',');
                const values = text?.slice(text.indexOf('\n') + 1).split('\n');

                const recepientList = values.map((value) => {
                    return {
                        [keys[0]]: value.split(',')[0],
                        [keys[1]]: value.split(',')[1],
                    };
                });

                recepientList.pop();
                addRecepient(recepientList as unknown as Recepient[]);
            };

            reader.readAsText(file);
        }
    }, [csvFile]);

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
