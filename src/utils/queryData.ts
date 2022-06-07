import { encodeAddress } from '@polkadot/util-crypto';
import { QueryForBatchObjectInterface, QueryObjectInterface } from './types';

const getQueryForBatch = (prefix: number, publicKey: string): string => {
    const address = encodeAddress(publicKey, prefix);

    return `{
query {
    account (id: "${address}") {
      transferTotalCount
      batchTotalCount
      batchRecordsFrom {
        nodes {
          senderId
          batch {
            extrinsicHash
            receivers {
              nodes {
                id
              }
            }
            calls
          }
        }
      }
      batchRecordsTo {
        nodes {
          batch {
            extrinsicHash
            sender {
              nodes {
                senderId
              }
            }
            calls
          }
        }
      }
    }
  }
  }`;
};

const getQueryForSwap = (prefix: number, publicKey: string): string => {
    const address = encodeAddress(publicKey, prefix);

    return `{
  query {
    account(id: "${address}") {
        swaps {
          nodes {
            id
            extrinsicHash
            fees
            status
            timestamp
            blockId
            data
            fromId
          }
        }
    }
  }
}`;
};

const getQuery = (prefix: number, publicKey: string): string => {
    const address = encodeAddress(publicKey, prefix);
    const query = `
     query {
    account(id: "${address}") {
        id
        transferTo {
          nodes {
            id
            token
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
    return query;
};
export const queryData = (
    queryEndpoint: string,
    publicKey: string,
    prefix: number
): QueryObjectInterface => {
    const query = getQuery(prefix, publicKey);
    return { query, endPoint: queryEndpoint };
};

export const queryDataForBatch = (
    queryEndpoint: string,
    publicKey: string,
    prefix: number
): QueryObjectInterface => {
    const query = getQueryForBatch(prefix, publicKey);
    return { query, endPoint: queryEndpoint };
};

export const queryDataForSwap = (
    queryEndpoint: string,
    publicKey: string,
    prefix: number
): QueryObjectInterface => {
    const query = getQueryForSwap(prefix, publicKey);
    return { query, endPoint: queryEndpoint };
};
