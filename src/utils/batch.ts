// const batchTransfer = (): boolean => {
//     const seed = 'Here comes the seed';
//     const keyring = new Keyring({ type: 'sr25519' });
//     console.log('Working');
//     const sender = keyring.addFromUri(seed);
//     const amount: number = 0.1 * 10 ** api.registry.chainDecimals[0];
//     console.log('Decimals', api.registry.chainDecimals);
//     console.log('Amount', amount);
//     const txs = [
//         api.tx.balances.transfer(
//             'Xrc9M14UDLpH1zEHDn1TCDjGVQaKQrC3TRiatL4PKoRdUYd',
//             BigInt(amount)
//         ),
//         api.tx.balances.transfer(
//             'bEFX3VBCRJJhW9iWGRwBCrWn2fZhFw6BxtTPSh4jcd6cB2p',
//             BigInt(amount)
//         ),
//         api.tx.balances.transfer(
//             'a2TyRwr61hRZqmsawRujtxV7oBVB8JvL47SDb71dRdWk5Y6',
//             BigInt(amount)
//         ),
//     ];

//     // construct the batch and send the transactions
//     api.tx.utility.batch(txs).signAndSend(sender, ({ status }: any) => {
//         if (status.isInBlock) {
//             console.log(`included in ${status.asInBlock}`);
//         }
//     });
//     return true;
// };
export {};
