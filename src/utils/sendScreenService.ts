import type { ApiPromise as ApiPromiseType } from '@polkadot/api';
import { hexToU8a, isHex, u8aToHex } from '@polkadot/util';
import accounts from './accounts';

import services from './services';
import { getExistentialDepositConfig } from './existentialDeposit';

const { signTransaction } = accounts;
const { getBalance } = services;

const signTransactionFunction = async (
    tx: any,
    address: string,
    password: string,
    api: ApiPromiseType,
    savePassword: boolean,
    setLoading2: (e: boolean) => void
): Promise<any> => {
    const nonce = await api?.rpc?.system?.accountNextIndex(address);
    const signer = api?.createType('SignerPayload', {
        method: tx,
        nonce,
        genesisHash: api?.genesisHash,
        blockHash: api?.genesisHash,
        runtimeVersion: api?.runtimeVersion,
        version: api?.extrinsicVersion,
    });
    const txPayload: any = api?.createType(
        'ExtrinsicPayload',
        signer.toPayload(),
        { version: api?.extrinsicVersion }
    );

    const txU8a = txPayload.toU8a(true);
    let txHex;
    if (txU8a.length > 256) {
        txHex = api.registry.hash(txU8a);
    } else {
        txHex = u8aToHex(txU8a);
    }
    let signature;
    try {
        signature = await signTransaction(
            address,
            password,
            txHex.toString(),
            'substrate',
            savePassword
        );
    } catch (err) {
        setLoading2(false);
        throw new Error('Invalid Password!');
    }
    tx.addSignature(address, signature, txPayload);
    return tx;
};

const fetchExistentialDeposit = (
    api: ApiPromiseType,
    isNative: boolean,
    tokenName: string
): number => {
    const decimalPlaces = api?.registry?.chainDecimals[0];
    let ED: number;
    if (!isNative) {
        ED = Number(
            getExistentialDepositConfig(
                api.runtimeChain.toString(),
                tokenName.toUpperCase()
            )
        );
    } else {
        ED =
            Number(api?.consts?.balances?.existentialDeposit.toString()) /
            10 ** decimalPlaces;
    }
    return ED;
};

const setToggleButtons = (
    balance: number,
    transactionFee: number,
    existentialDeposit: number,
    setDisableToggleButtons: any
): void => {
    if (balance - transactionFee > existentialDeposit) {
        console.log('');
    } else if (balance.toString() === existentialDeposit.toString()) {
        setDisableToggleButtons((prevState: any) => ({
            ...prevState,
            firstToggle: true,
        }));
    } else if (balance < transactionFee) {
        setDisableToggleButtons({
            firstToggle: true,
            secondToggle: true,
        });
    }
};

type transferAll = {
    transferAll: boolean;
    keepAlive: boolean;
};

const setTransactionType = (
    api: ApiPromiseType,
    amount: string,
    decimal: number,
    receiverAddress: string,
    tokenName: string,
    isNative: boolean,
    transferAll: transferAll
    // setAmount: (e: string) => void
): any => {
    let tx;
    if (transferAll.transferAll) {
        const txNative = api?.tx?.balances?.transferAll(
            receiverAddress,
            transferAll.keepAlive
        );
        const txNonNative = api?.tx?.currencies?.transferAll(
            receiverAddress,
            { Token: tokenName },
            transferAll.keepAlive
        );
        tx = isNative ? txNative : txNonNative;
    } else {
        const amountSending = Number(amount) * 10 ** decimal;
        const txSingle = api?.tx?.balances?.transfer(
            receiverAddress as string,
            BigInt(amountSending)
        );

        const txMultiple = api?.tx?.currencies?.transfer(
            receiverAddress as string,
            {
                Token: tokenName,
            },
            BigInt(amountSending)
        );

        tx = isNative ? txSingle : txMultiple;
    }

    return tx;
};

const validateTxErrors = async (
    txFee: number,
    api: ApiPromiseType,
    receiverAddress: string,
    tokenName: string,
    existentialDeposit: string,
    balance: string,
    amount: any,
    isNative: boolean,
    setSubTextForWarningModal: (e: string) => void,
    setIsWarningModalOpen: (e: boolean) => void
): Promise<void> => {
    console.log(
        typeof txFee,
        typeof existentialDeposit,
        typeof balance,
        typeof amount
    );
    try {
        console.log('validateTxErrors', txFee);
        const tokens = await api?.registry?.chainTokens;

        const recipientBalance: any = await getBalance(api, receiverAddress);
        const filterBalance = recipientBalance.filter((e: any) => {
            return e.name === tokenName;
        });
        const senderBalance = balance;

        const ED = existentialDeposit;

        if (Number(ED) > Number(filterBalance[0].balance + amount)) {
            // Show warning modal
            setSubTextForWarningModal(
                `The receiver have insufficient balance
                 to receive the transaction.
                 Do you still want to confirm?`
            );
            setIsWarningModalOpen(true);
        }
        if (
            Number(senderBalance) -
                Number(amount) -
                Number(isNative ? txFee : 0) <
            Number(ED)
        ) {
            // if (tokens.length > 1) {
            setSubTextForWarningModal(
                `The ${
                    tokens.length > 1 ? 'sending token' : 'sender account'
                } might get reaped`
            );
            setIsWarningModalOpen(true);
        }
    } catch (err) {
        console.log('In validate tx errors', err);
    }
};

const resetToggles = (
    setSwitchChecked: (e: boolean) => void,
    setSwitchCheckedSecond: (e: boolean) => void,
    setAmount: (e: string) => void,
    setTransferAll: any
): void => {
    console.log('reset toggle working ----->>>>');
    setSwitchChecked(false);
    setSwitchCheckedSecond(false);
    setTransferAll({
        transferAll: false,
        keepAlive: false,
    });
    setAmount('');
};

export default {
    fetchExistentialDeposit,
    signTransactionFunction,
    setTransactionType,
    setToggleButtons,
    validateTxErrors,
    resetToggles,
};
