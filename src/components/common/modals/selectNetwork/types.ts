export interface SelectNetworkProps {
    open: boolean;
    handleClose(): void;
    modalState: {
        firstStep: boolean;
        renderMethod(obj: RenderMethodProps): JSX.Element;
        currentData: [];
    };
    resetState(): void;
    style?: object;
    handleClickForKusama(): void;
    handleClickForOthers(): void;
    isLoading: boolean;
}

export interface RenderMethodProps {
    data: object;
    handleClick(): JSX.Element | void;
}

export interface NetworkConfigType {
    name: string;
    theme: string;
    moreOptions?: boolean;
    rpcUrl: string;
    prefix?: number;
    disabled?: boolean;
}
