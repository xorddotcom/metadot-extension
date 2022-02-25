interface ContentCopyIconDivPropsInterface {
    id: string;
    onClick(): void;
    onMouseOver(): void;
    style: object;
}
interface ButtonStyle {
    width: string | number;
    height: string | number;
    borderRadius: string | number;
}

interface ContinueBtnPropsInterface {
    id: string;
    text: string;
    style: ButtonStyle;
    handleClick(): void;
}

interface WarningModalPropsInterface {
    open: boolean;
    handleClose(): void;
    onConfirm(): void;
    style: object;
    mainText: string;
    subText: string;
}

export interface ShowSeedViewProps {
    copy: string;
    currSeed: string;
    backHandler(): void;
    contentCopyIconDivProps: ContentCopyIconDivPropsInterface;
    continueBtnProps: ContinueBtnPropsInterface;
    warningModal: WarningModalPropsInterface;
}
