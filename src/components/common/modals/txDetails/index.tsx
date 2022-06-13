import React, { useState } from 'react';
import { TxDetailsProps } from './types';
import TxDetailsView from './view';

const TxDetails: React.FunctionComponent<TxDetailsProps> = (props) => {
    const { txDetailsModalData } = props;
    const { hash } = txDetailsModalData;

    const [copy, setCopy] = useState('Copy');

    const getTotalBalance = (
        value1: number[],
        value2: string,
        tokenNameInTx: string,
        nativeToken: any
    ): any => {
        const { operation } = txDetailsModalData;
        const sum =
            operation === 'Swap'
                ? value1[0]
                : value1.reduce((a, b) => {
                      return a + b;
                  }, 0);
        if (tokenNameInTx === nativeToken.name) {
            const val = sum + parseFloat(value2);
            return `${Number(val.toFixed(4))} ${nativeToken.name}`;
        }
        return `${Number(sum.toFixed(4))} ${tokenNameInTx} + ${Number(
            value2
        ).toFixed(4)} ${nativeToken.name}`;
    };

    const copyText = (stringNeedToBeCopied?: string): void => {
        navigator.clipboard.writeText(stringNeedToBeCopied || 'abc');
        setCopy('Copied');
    };

    const tooltipText = {
        onClick: copyText,
        onMouseOver: () => setCopy('Copy'),
        style: { cursor: 'pointer' },
    };

    return (
        <TxDetailsView
            {...props}
            copy={copy}
            tooltipText={tooltipText}
            getTotalBalance={getTotalBalance}
        />
    );
};

export default TxDetails;
