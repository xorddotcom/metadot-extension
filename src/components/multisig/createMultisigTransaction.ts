// import { signTransaction } from '../../messaging';
import { u8aToHex } from '@polkadot/util';
import accounts from '../../utils/accounts';

const { signTransaction } = accounts;

const createMultisigTransaction = async (
    api: any,
    MAX_WEIGHT: number,
    THRESHOLD: number,
    mainAccount: string,
    otherAccounts: string[],
    password: string,
    signatoryToSign: string
): Promise<any> => {
    try {
        console.log('mark1', {
            api,
            MAX_WEIGHT,
            THRESHOLD,
            otherAccounts,
            password,
            signatoryToSign,
        });
        const nonce = await api.rpc.system.accountNextIndex(signatoryToSign);
        console.log('mark2');
        const call = api.tx.balances.transfer(signatoryToSign, 1000000000000);
        console.log('mark3');
        console.log('call data', call);

        const TIME_POINT = null;

        const tx = api.tx.multisig.approveAsMulti(
            THRESHOLD,
            otherAccounts,
            TIME_POINT,
            call.method.hash,
            MAX_WEIGHT
        );
        console.log('mark4');

        const signer = api.createType('SignerPayload', {
            method: tx,
            nonce,
            genesisHash: api.genesisHash,
            blockHash: api.genesisHash,
            runtimeVersion: api.runtimeVersion,
            version: api.extrinsicVersion,
        });

        console.log('mark5');

        const txPayload: any = api.createType(
            'ExtrinsicPayload',
            signer.toPayload(),
            { version: api.extrinsicVersion }
        );

        console.log('mark6');

        // const txHex = txPayload.toU8a(true);

        const txU8a = txPayload.toU8a(true);
        let txHex;
        if (txU8a.length > 256) {
            txHex = api.registry.hash(txU8a);
        } else {
            txHex = u8aToHex(txU8a);
        }

        console.log('mark7');

        const response = await signTransaction(
            signatoryToSign,
            password,
            txHex.toString(),
            'substrate',
            false
        );

        console.log('mark8', response);

        const signature = response;

        console.log('mark9');

        tx.addSignature(signatoryToSign, signature, txPayload);

        console.log('mark10');

        return tx;
    } catch (error) {
        console.log('ERROR IN createMultisigTransaction', error);
        return false;
    }
};

export default createMultisigTransaction;
