export interface Token {
    name: string;
    balance: number;
    isNative: boolean;
    decimal: number;
}

export interface SelectTokenProps {
    open: boolean;
    handleClose(): void;
    tokenList: Token[];
    style?: object;
    handleSelect(token: Token): void;
}

export interface OptionProps {
    token: Token;
    handleSelect(token: Token): void;
}
