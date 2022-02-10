import { ReactNode } from 'react';

export interface NetworkConfigType {
    name?: string;
    theme?: string;
    moreOptions?: boolean;
    rpcUrl?: string;
    prefix?: number;
    disabled?: boolean;
    icon?: string;
    tokenName?: string;
}

// type IntrinsicAttributes = ModalStateInterface;

// IntrinsicAttributes &
//         SelectNetworkProps & { children?: ReactNode };
export interface SelectNetworkProps {
    open: boolean;
    handleClose(): void;
    modalState: ModalStateInterface;
    resetState(): void;
    style?: object;
    handleClickForKusama(data: NetworkConfigType): Promise<void>;
    handleClickForOthers(data: NetworkConfigType): Promise<void>;
    isLoading: boolean;
}

export interface ModalStateInterface {
    firstStep: boolean;
    renderMethod(obj?: RenderMethodProps): JSX.Element;
    currentData: NetworkConfigType[];
}

export interface RenderMethodProps {
    data: NetworkConfigType;
    handleClick(v: NetworkConfigType): Promise<void>;
}
