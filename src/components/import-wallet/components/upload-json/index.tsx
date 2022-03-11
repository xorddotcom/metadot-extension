import React, { useEffect } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import { fonts, images } from '../../../../utils';

import {
    UploadFile,
    UploadFileDiv,
    AccountDetailsDiv,
    Circle,
} from '../../style';
import { SubHeading, WarningText } from '../../../common/text';
import {
    HorizontalContentDiv,
    VerticalContentDiv,
} from '../../../common/wrapper';
import { Input } from '../../../common';
import { UploadJSONInterface } from '../../type';
import { PASSWORD } from '../../../../utils/app-content';

const { UploadFileIcon } = images;

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
    onSubmit,
}) => {
    const { subHeadingfontFamilyClass, mainHeadingfontFamilyClass } = fonts;
    const hiddenFileInput = React.useRef<HTMLInputElement>(null);

    console.log('jsooooon ->', json);
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
                        console.log(2, parsedFileContent);
                        if (parsedFileContent.exportedJson) {
                            if (!parsedFileContent.exportedJson.meta.name)
                                throw new Error('Invalid Json File');
                            setJson(parsedFileContent.exportedJson);
                        } else if (parsedFileContent.address) {
                            if (!parsedFileContent.meta.name)
                                throw new Error('Invalid Json File');
                            setJson(parsedFileContent);
                        } else {
                            throw new Error('invalid Json!');
                        }
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
                console.log('hiddenFileInput -------', hiddenFileInput);
                if (isFilePicked) {
                    console.log('already selected!');
                } else {
                    if (hiddenFileInput.current)
                        hiddenFileInput.current.click();
                    // } else {
                    //     hiddenFileInput.current.click();
                    // }
                    console.log('select in handle click');
                }
            } else if (operation === 'cancel') {
                console.log('cancel');
                console.log(
                    'hidden file value',
                    document.getElementsByTagName('input')[0].value
                );
                console.log(
                    'hiddenFileInput before',
                    hiddenFileInput?.current?.value
                );
                // document.getElementsByTagName('input')[0].value = '';
                if (hiddenFileInput.current) hiddenFileInput.current.value = '';
                console.log(
                    'hiddenFileInput after',
                    hiddenFileInput?.current?.value
                );
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
        onChange: passwordChangeHandler,
        hideHandler: () => setShowPassword(!showPassword),
        hideState: showPassword,
        disabled: !json,
    };

    const fileNameRender = (): string => {
        if (!isFilePicked) return 'Choose File';
        if (fileName?.name.length > 20) {
            return `${fileName.name.slice(0, 8)}...${fileName.name.slice(
                fileName.name.length - 8,
                fileName.name.length
            )}`;
        }

        return fileName.name;
    };

    return (
        <UploadFileDiv className={subHeadingfontFamilyClass}>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit();
                }}
            >
                {isFilePicked && json && (
                    <AccountDetailsDiv>
                        <HorizontalContentDiv>
                            <Circle />
                            <VerticalContentDiv
                                style={{
                                    marginLeft: '20px',
                                }}
                            >
                                <SubHeading
                                    lineHeight="2px"
                                    fontSize="16px"
                                    mb="20px"
                                    marginTop="0px"
                                    color="#FAFAFA"
                                >
                                    {json.meta.name}
                                </SubHeading>
                                <SubHeading
                                    lineHeight="2px"
                                    fontSize="14px"
                                    mb="0px"
                                    marginTop="0px"
                                    color="#FAFAFA"
                                    opacity="0.7"
                                >
                                    {json.address.slice(0, 8)} ...
                                    {json.address.slice(
                                        json.address.length - 8,
                                        json.address.length
                                    )}
                                </SubHeading>
                            </VerticalContentDiv>
                        </HorizontalContentDiv>
                    </AccountDetailsDiv>
                )}
                <SubHeading
                    className={mainHeadingfontFamilyClass}
                    marginTop="27px"
                    mb="10px"
                >
                    Upload JSON File
                </SubHeading>
                <UploadFile
                    htmlFor="actual-btn"
                    onClick={() => handleClick('select')}
                >
                    <HorizontalContentDiv width="91%" height="40px">
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
                    rightPosition="20px"
                    topPosition="26px"
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
