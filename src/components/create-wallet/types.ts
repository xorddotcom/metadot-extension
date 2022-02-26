interface styledInputName {
    className: string;
    placeholder: string;
    height: string;
    value: string;
    onChange(t: string): void;
}

interface walletNameText {
    className: string;
    mb: string;
}

interface styledInputPassword {
    placeholder: string;
    className: string;
    value: string;
    height: string;
    onChange(t: string): void;
    hideHandler(): void;
    hideState: boolean;
}

interface styledInputConfirmPass {
    placeholder: string;
    className: string;
    value: string;
    height: string;
    onChange(t: string): void;
    hideHandler(): void;
    hideState: boolean;
}

interface ButtonStyle {
    width: string | number;
    height: string | number;
    borderRadius: string | number;
}

interface continueBtn {
    text: string;
    style: ButtonStyle;
    disabled: boolean;
    handleClick(): Promise<void>;
    isLoading: boolean;
}

export interface CreateWalletViewProps {
    backHandler(): void;
    isValidWalletName: boolean;
    passwordError: string;
    walletNameText: walletNameText;
    styledInputName: styledInputName;
    styledInputPassword: styledInputPassword;
    styledInputConfirmPass: styledInputConfirmPass;
    continueBtn: continueBtn;
}
