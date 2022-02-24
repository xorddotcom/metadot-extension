export interface OptionsInterface {
    importButtonHandler(): void;
    uploadButtonHandler(): void;
    selectedType: string;
}

export interface CardProps {
    title: string;
    access: boolean;
    onClick(): void;
}
