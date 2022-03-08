export interface OptionsInterface {
    importButtonHandler(): void;
    uploadButtonHandler(): void;
    selectedType: string;
}

export interface EnterSeedInterface {
    handleChange(value: string): void;
    seedPhrase: string;
    invalidSeedMessage: string;
    setPassword(value: string): void;
    onSubmit(): void;
}

export interface UploadJSONInterface {
    fileName: File | { name: string };
    isFilePicked: boolean;
    json: object | string;
    password: string;
    showPassword: boolean;
    passwordError: boolean;
    setSeedPhrase(value: string): void;
    setInvalidSeedMessage(value: string): void;
    setFileName: React.Dispatch<React.SetStateAction<File | { name: string }>>;
    setIsFilePicked(value: boolean): void;
    setJson(value: object | string): void;
    passwordChangeHandler(value: string): void;
    setShowPassword(value: boolean): void;
    setPasswordError(value: boolean): void;
    invalidJSONFileError: boolean;
    setInvalidJSONFileError(value: boolean): void;
    onSubmit(): void;
}
