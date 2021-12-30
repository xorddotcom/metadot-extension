/* eslint-disable */
import { encodeAddress } from '@polkadot/util-crypto';

export const getQuery = (publicKey, network) =>{


  const address = encodeAddress(publicKey, network);


  const query = `
      query {
    account(id: "14zpczyVC5kkitTjZyCStijAJQCZn7jaYpP8AdTk7PqeGYvW") {
        id
        transferTo {
          nodes {
            id
            token
            decimals
            extrinsicHash
            amount
            status
            toId
            fromId
            timestamp
          }
        }
        transferFrom {
          nodes {
            id
            token
            decimals
            extrinsicHash
            amount
            status
            toId
            fromId
            timestamp
          }
        }
    }
  }`
  return query;
}

