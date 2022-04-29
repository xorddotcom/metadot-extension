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
    nativeTokenBalance: number,
    transactionFee: number,
    existentialDeposit: number,
    setDisableToggleButtons: any,
    isNative: boolean
): void => {
    console.log('toggles', {
        isNative,
        balance,
        transactionFee,
        existentialDeposit,
        nativeTokenBalance,
    });
    if (isNative) {
        if (Number(nativeTokenBalance) >= Number(transactionFee)) {
            console.log('in first IF');
            console.log('');
        } else if (nativeTokenBalance < transactionFee) {
            console.log('in second else if');
            setDisableToggleButtons({
                firstToggle: true,
                secondToggle: true,
            });
        }
    } else if (balance.toString() === existentialDeposit.toString()) {
        console.log('in else if first');
        setDisableToggleButtons((prevState: any) => ({
            ...prevState,
            firstToggle: true,
        }));
        console.log('in else if first');
        // setDisableToggleButtons((prevState: any) => ({
        //     ...prevState,
        //     firstToggle: true,
        // }));
    }
};

const setToggleButtons2 = (
    balance: number,
    transactionFee: number,
    existentialDeposit: number,
    setDisableToggleButtons: any,
    isNative: boolean
): void => {
    console.log('toggles', {
        isNative,
        balance,
        transactionFee,
        existentialDeposit,
    });
    if (balance - transactionFee > existentialDeposit) {
        console.log('in first IF');
        console.log('');
    } else if (balance.toString() === existentialDeposit.toString()) {
        console.log('in else if first');
        setDisableToggleButtons((prevState: any) => ({
            ...prevState,
            firstToggle: true,
        }));
    } else if (balance < transactionFee) {
        console.log('in second else if');
        setDisableToggleButtons({
            firstToggle: true,
            secondToggle: true,
        });
    }
};

export default {
    fetchExistentialDeposit,
    signTransactionFunction,
    setToggleButtons,
};
