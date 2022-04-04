import React from 'react';
import { SubHeading, MainText } from '../../common/text';
import { fonts, images } from '../../../utils';
import { FileInputDiv } from '../style';

const { CSVIcon } = images;
const { mainHeadingfontFamilyClass } = fonts;

const FileInput = (): JSX.Element => {
    const hiddenFileInput = React.useRef<HTMLInputElement>(null);
    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        console.log('click');
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
            <FileInputDiv>
                <img
                    src={CSVIcon}
                    alt="Upload CSV"
                    style={{
                        height: '14px',
                        width: '14px',
                        marginLeft: '14px',
                    }}
                />
                <SubHeading ml="14px">Choose File</SubHeading>
            </FileInputDiv>
            <input
                id="upload-file"
                type="file"
                accept=".json"
                ref={hiddenFileInput}
                onChange={(e) => handleFileInput(e)}
                style={{ display: 'none' }}
            />
        </>
    );
};

export default FileInput;
