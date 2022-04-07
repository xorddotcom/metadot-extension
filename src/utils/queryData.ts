import { encodeAddress } from '@polkadot/util-crypto';
import { QueryObjectInterface } from './types';

const getQuery = (prefix: number, publicKey: string): string => {
    const address = encodeAddress(publicKey, prefix);
    const queryWithoutTxFees = `
     query {
    account(id: "${address}") {
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
  }`;
    const query = `
     query {
    account(id: "${address}") {
        id
        transferTo {
          nodes {
            id
            token
            decimals
            extrinsicHash
            amount
            fees
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
            fees
            toId
            fromId
            timestamp
          }
        }
    }
  }`;
    return prefix === 0 ? queryWithoutTxFees : query;
};
export const queryData = (
    queryEndpoint: string,
    publicKey: string,
    prefix: number
): QueryObjectInterface => {
    const query = getQuery(prefix, publicKey);
    return { query, endPoint: queryEndpoint };
};
