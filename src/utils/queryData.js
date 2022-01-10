/* eslint-disable */
import { encodeAddress } from '@polkadot/util-crypto';
import { useSelector } from 'react-redux';


export const queryData = (network) =>{

    let query = '';
    let endPoint = '';
    switch (network) {
        case 'Polkadot Main Network':
            query = getQuery();
            endPoint = 'https://api.subquery.network/sq/khuzama98/subql-polkadot__a2h1e' 
            return {query, endPoint};            
    
        case 'Westend':
            query = getQuery();
            endPoint = 'https://api.subquery.network/sq/khuzama98/subql-westend__a2h1e'; 
            return {query, endPoint};

        case 'Dusty':
            query = getQuery();
            endPoint = 'https://api.subquery.network/sq/khuzama98/subql-dusty__a2h1e'    
            return {query, endPoint};
        default:
            return {query, endPoint};
    }
}


export const getQuery = () =>{

  const publicKey = useSelector((state) => state?.account?.publicKey);
//   const address = encodeAddress(publicKey, network);

  const address = "5EUdHaRdL6mamfYN89rZf2SPQCQJXKqUWqVpLKExaLhEerT8" 

  const query = `
      query {
    account(id: "5EUdHaRdL6mamfYN89rZf2SPQCQJXKqUWqVpLKExaLhEerT8") {
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