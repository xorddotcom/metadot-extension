export interface WrapperInterface {
    isCorrect?: boolean;
    marginBottom?: string;
    inputWrapperWidth?: string;
    disabled?: boolean;
}
export interface NewWrapperInterface {
    isCorrect?: boolean;
}

export interface FieldInterface {
    bgColor?: string;
    tokenLogo?: boolean;
    id?: string;
    maxlength?: string;
    fontSize?: string;
    height?: string;
    value?: string;
    fullWidth?: string;
    placeholder?: string;
    onKeyDown?(e: React.KeyboardEvent): void;
    onChange?(e: React.ChangeEvent<HTMLInputElement>): void;
    isCorrect?: boolean;
    disabled?: boolean;
    type?: string;
    disableUnderline?: boolean;
    autocomplete?: string;
    border?: string;
}

export interface IconInterface {
    leftPosition?: string;
    topPosition?: string;
    rightPosition?: string;
    onClick?(): void;
}

export interface Props {
    bgColor?: string;
    tokenName?: string;
    tokenImage?: string;
    tokenLogo?: boolean;
    rightPosition?: string;
    className?: string;
    placeholder?: string;
    onChange(v: string): void;
    value: string;
    rightIconCross?: string;
    rightIconCrossClickHandler?(): void;
    rightIconLock?: boolean;
    isCorrect?: boolean;
    type?: string;
    fullWidth?: string;
    fontSize?: string;
    height?: string;
    rightIcon?: string | boolean;
    typePassword?: boolean;
    hideHandler?(): void;
    hideState?: boolean;
    marginBottom?: string;
    maxlength?: string;
    blockInvalidChar?: boolean;
    id: string;
    mt?: string;
    mr?: string;
    leftPosition?: string;
    topPosition?: string;
    disabled?: boolean;
    amount?: any;
    style?: any;
    inputWrapperWidth?: string;
    searchIcon?: boolean;
    rightIconDropDown?: boolean;
    border?: string;
    setSwitchCheckedSecond?(input: boolean): void;
    setSwitchChecked?(input: boolean): void;
}
