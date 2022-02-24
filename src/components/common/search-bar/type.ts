import { ChangeEventHandler } from 'react';

export interface Props {
    id: string;
    placeHolder: string;
    value: string;
    onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}
