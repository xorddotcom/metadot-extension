export interface Props {
    centerText: string;
    backHandler?(): void;
    overWriteBackHandler?(): void;
}

export interface HeadieViewProps {
    backHandler?(): void;
    onBackClick(): void;
    centerText?: string;
}
