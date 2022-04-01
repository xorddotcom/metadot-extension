export interface VerticalContentDivPropsInterface {
    marginTop?: string;
    mb?: string;
}

export interface HorizontalContentInterface {
    paddingBottom?: string;
    paddingTop?: boolean;
    marginTop?: string;
    marginBottom?: boolean;
    borderBottom?: boolean;
}

export interface VerticalContentInterface {
    marginTop?: string;
    marginBottom?: string;
    paddingBottom?: boolean;
    border?: boolean;
    specialPadding?: boolean;
    className?: string;
}

export interface ModalText2Interface {
    id?: string;
    textAlign?: string;
    hide?: boolean;
    marginTop?: string;
    marginBottom?: string;
    className?: string;
}

export interface SubTextInterface {
    id?: string;
    textAlign?: string;
    hide?: string;
    className?: string;
}

export interface CommonTextInterface {
    marginTop?: string;
    textAlign?: string;
    successText?: string | boolean;
    hide?: boolean;
    pl10?: boolean;
    className?: string;
    style?: object;
    fontSize?: string;
    margin?: string;
    fontWeight?: string;
    color?: string;
    opacity?: string;
}
