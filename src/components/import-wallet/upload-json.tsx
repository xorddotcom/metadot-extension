import React, { useEffect } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import { fonts } from '../../utils';

import { UploadFile, UploadFileDiv } from './style';
import UploadFileIcon from '../../assets/images/icons/uploadFile.svg';
import { SubHeading, WarningText } from '../common/text';
import { HorizontalContentDiv } from '../common/wrapper';
import { Input } from '../common';
import { UploadJSONInterface } from './type';
import { PASSWORD } from '../../utils/app-content';

const UploadJson: React.FC<UploadJSONInterface> = ({
    fileName,
    isFilePicked,
    json,
    password,
    showPassword,
    passwordError,
    setFileName,
    setIsFilePicked,
    setJson,
    passwordChangeHandler,
    setShowPassword,
    setPasswordError,
    invalidJSONFileError,
    setInvalidJSONFileError,
    setSeedPhrase,
    setInvalidSeedMessage,
}) => {
    const { subHeadingfontFamilyClass, mainHeadingfontFamilyClass } = fonts;
    const hiddenFileInput = React.useRef<HTMLInputElement>(null);

    useEffect(() => {
        setSeedPhrase('');
        setInvalidSeedMessage('');
    });

    useEffect(() => {
        console.log('Use effect running');
        setIsFilePicked(false);
        setJson('');
        setFileName({ name: '' });
        setInvalidJSONFileError(false);
        setPasswordError(false);
    }, []);

    const showFile = async (
        e: React.ChangeEvent<HTMLInputElement>
    ): Promise<void> => {
        try {
            e.preventDefault();
            const reader = new FileReader();
            if (e.target.files) {
                const file = e.target.files[0];
                reader.onload = async () => {
                    try {
                        const fileContent = reader.result;
                        console.log(1);
                        const parsedFileContent = JSON.parse(
                            fileContent as string
                        );
                        console.log(2);
                        setJson(parsedFileContent.exportedJson);
                        console.log(3);
                        setInvalidJSONFileError(false);
                    } catch (err) {
                        console.log('In catch here', err);
                        setInvalidJSONFileError(true);
                    }
                };
                reader.readAsText(file);
                setFileName(
                    e.target.files[0] ? e.target.files[0] : { name: 'file' }
                );
                setIsFilePicked(true);
            }
        } catch (err) {
            console.log('err here ===>>>>');
        }
    };

    const handleClick = (operation: string): void => {
        setInvalidJSONFileError(false);
        setPasswordError(false);
        try {
            if (operation === 'select') {
                if (isFilePicked) {
                    console.log('already selected!');
                } else {
                    if (hiddenFileInput.current)
                        hiddenFileInput.current.click();
                    console.log('select in handle click');
                }
            } else if (operation === 'cancel') {
                console.log('cancel');
                console.log(
                    'file value',
                    document.getElementsByTagName('input')[0].value
                );
                document.getElementsByTagName('input')[0].value = '';
                setFileName({ name: 'file' });
                setIsFilePicked(false);
                passwordChangeHandler('');
                setShowPassword(false);
                setPasswordError(false);
                setJson('');
            }
        } catch (err) {
            console.log('in handle click error', err);
        }
    };

    const InputProps = {
        placeholder: PASSWORD,
        className: subHeadingfontFamilyClass,
        value: password,
        height: '14px',
        onChange: passwordChangeHandler,
        hideHandler: () => setShowPassword(!showPassword),
        hideState: showPassword,
        disabled: !json,
    };

    const fileNameRender = (): string => {
        if (!isFilePicked) return 'Choose File';
        if (fileName?.name.length > 20)
            return `${fileName.name.slice(0, 8)}...${fileName.name.slice(
                fileName.name.length - 8,
                fileName.name.length
            )}`;
        return fileName.name;
    };

    return (
        <UploadFileDiv className={subHeadingfontFamilyClass}>
            <form onSubmit={(e) => e.preventDefault()}>
                {/*  our custom upload button --> */}
                <UploadFile
                    htmlFor="actual-btn"
                    onClick={() => handleClick('select')}
                >
                    <HorizontalContentDiv width="91%">
                        <img
                            src={UploadFileIcon}
                            alt="upload-file-icon"
                            style={{ marginRight: '1rem' }}
                        />
                        <div>{fileNameRender()}</div>
                    </HorizontalContentDiv>
                    {isFilePicked && (
                        <div>
                            <CancelIcon
                                onClick={() => handleClick('cancel')}
                                fontSize="small"
                                style={{
                                    marginTop: '0.2rem',
                                    marginRight: '-0.3rem',
                                }}
                            />
                        </div>
                    )}
                </UploadFile>
                {invalidJSONFileError && (
                    <WarningText
                        id="warning-text-3"
                        mb="10px"
                        className={subHeadingfontFamilyClass}
                        visibility
                    >
                        Invalid Json file!
                    </WarningText>
                )}
                <SubHeading
                    className={mainHeadingfontFamilyClass}
                    marginTop="27px"
                    mb="10px"
                >
                    Password
                </SubHeading>
                <Input
                    id="password"
                    inputWrapperWidth="97%"
                    fullWidth="82%"
                    {...InputProps}
                    typePassword
                    isCorrect
                    rightIcon
                    leftPosition="-4px"
                    topPosition="2px"
                />
                {passwordError && (
                    <WarningText
                        id="warning-text-3"
                        mb="10px"
                        className={subHeadingfontFamilyClass}
                        visibility
                    >
                        Invalid Password!
                    </WarningText>
                )}

                {console.log('Invalid json error state', invalidJSONFileError)}

                <input
                    id="upload-file"
                    type="file"
                    accept=".json"
                    ref={hiddenFileInput}
                    onChange={(e) => showFile(e)}
                    style={{ display: 'none' }}
                />
            </form>
        </UploadFileDiv>
    );
};

export default UploadJson;
