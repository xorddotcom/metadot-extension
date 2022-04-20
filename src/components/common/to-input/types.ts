export interface errorMessages {
    invalidAddress?: string;
    enterAddress?: string;
    enterAmount?: string;
    sameAddressError?: string;
}

export interface ToInputInterface {
    errorMessages: errorMessages;
    onChange(e: string): void;
    isCorrect: boolean;
    receiverAddress: string;
}
