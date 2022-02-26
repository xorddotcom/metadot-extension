interface seedGridObj {
    value: string;
    indexValue: number;
    selected: boolean;
}

interface styledInputInterface {
    onChange(text: string): void;
    placeholder: string;
    value: string;
    className: string;
    isCorrect: boolean;
    marginBottom: string;
    rightIconCross: string;
    rightIconCrossClickHandler(): void;
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
    handleClick(): void;
}

interface headingProps {
    marginTop: string;
    className: string;
}

export interface ConfirmSeedViewProps {
    backHandler(): void;
    seedArrayForGrid: seedGridObj[];
    handleSelect(seedObj: { value: string; indexValue: number }): void;
    styledInput1: styledInputInterface;
    styledInput2: styledInputInterface;
    styledInput3: styledInputInterface;
    styledInput4: styledInputInterface;
    continueBtn: continueBtn;
    mainHeading: headingProps;
    subHeading: headingProps;
}
