// const swapOnkarura2 = async (): Promise<void> => {
//     const keyring = new Keyring({ type: 'sr25519' });
//     const decimals = api.registry.chainDecimals[0];
//     const amountOfACAToConvert = 10;
//     // const { symbolsDecimals } = await getDecimals();

//     const seed = 'Here comes the seed';
//     const sender = keyring.addFromUri(seed);
//     const supplyAmount = 0.05 * 10 ** decimals;

//     const path = [
//         {
//             TOKEN: 'KAR',
//         },
//         {
//             TOKEN: 'LKSM',
//         },
//     ];
//     const minTargetAmount = '0x0';

//     const extrinsic = api.tx.dex.swapWithExactSupply(
//         path,
//         supplyAmount,
//         minTargetAmount
//     );
//     const hash = await extrinsic.signAndSend(sender);
//     console.log('hash', hash.toHuman());
// };
