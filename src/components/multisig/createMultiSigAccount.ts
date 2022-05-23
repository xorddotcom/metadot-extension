import { encodeMultiAddress } from '@polkadot/util-crypto';

const createMultiSig = async (
    addresses: string[],
    THRESHOLD: number
): Promise<string> => {
    const multisigAddress = encodeMultiAddress(addresses, THRESHOLD);
    console.log(`Multisig Address: ${multisigAddress}\n`);
    return multisigAddress;
};

export default createMultiSig;
