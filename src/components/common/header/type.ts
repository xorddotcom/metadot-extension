export interface Props {
    centerText: string;
    backHandler?(): void;
}

export interface HeadieViewProps {
    backHandler?(): void;
    onBackClick(): void;
    centerText?: string;
}
