export interface MainHeadingInterface {
    className?: string;
    weight?: string;
    color?: string;
    marginBottom?: string;
    textAlign?: string;
}

export interface SubHeadingInterface {
    className?: string;
    fontSize?: string;
    textLightColor?: boolean;
    textAlign?: string;
    textAlignLast?: string;
    lineHeight?: string;
    marginTop?: string;
    mb?: string;
    ml?: string;
    opacity?: string;
    overFlow?: boolean;
}

export interface WarningTextInterface {
    className?: string;
    id?: string;
    visibility?: boolean;
    ml?: string;
    mb?: string;
    style?: object;
}

export interface MainTextInterface {
    id?: string;
    className?: string;
    color?: string;
    balOverFlow?: boolean;
}

export interface ModalTextPropsInterface {
    marginTop?: string;
    textAlign?: string;
    className?: string;
    style?: object;
}
