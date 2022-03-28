export interface MainHeadingInterface {
    className?: string;
    weight?: string;
    color?: string;
    marginBottom?: string;
    textAlign?: string;
    fontSize?: string;
}

export interface SubHeadingInterface {
    weight?: string;
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
    color?: string;
}

export interface WarningTextInterface {
    className?: string;
    id?: string;
    visibility?: boolean;
    ml?: string;
    mb?: string;
    style?: object;
    mt?: string;
}

export interface MainTextInterface {
    height?: string;
    width?: string;
    id?: string;
    className?: string;
    color?: string;
    balOverFlow?: boolean;
    fontSize?: string;
    fontWeight?: string;
    textAlign?: string;
    style?: object;
}

export interface ModalTextPropsInterface {
    marginTop?: string;
    textAlign?: string;
    className?: string;
    style?: object;
}
