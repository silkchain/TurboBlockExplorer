import * as t from '@/actions/types';
import { fromWei } from '@/adapters/web3';

import * as routes from '@/router';

const initialState = {};

export default (state = initialState, { type, payload }) => {
  if (type === t.FETCH_TRANSACTIONS_SUCCESS) {

    return {
      ...state,
      ...payload,
    };
  }
  return state;
}

export function getSingleTransaction(state, hash) {
  return state.transactions[hash] || {};
}

export function getCurrentTransactionForDisplay(state, methods = { getSingleTransaction, fromWei }) {
  // redux-first-router has issues with '0x' strings
  const locationHash = state.location.payload.hash || '';
  const hash = locationHash.replace('_', '');
  const transactionData = methods.getSingleTransaction(state, hash);
  let valueInWei = '';
  let valueInEther = '';
  let gasPriceInGwei = 0;
  if (transactionData.value) {
    valueInWei = transactionData.value.toString(10);
    valueInEther = methods.fromWei(transactionData.value, 'ether');
  }

  if (transactionData.gasPrice) {
    gasPriceInGwei = methods.fromWei(transactionData.gasPrice, 'gwei');
  }

  return { ...transactionData, valueInWei, valueInEther, gasPriceInGwei };
}

export function getTransactionInState(state, hash, methods = { getSingleTransaction }) {
  return Object.keys(methods.getSingleTransaction(state, hash)).length > 0;
}

export function getTransactionsForDisplay(state, hashes, methods = { getSingleTransaction, fromWei }) {
  const transactionsForDisplay = [];

  hashes.forEach(hash => {
    const transaction = methods.getSingleTransaction(state, hash);
    const parsedValue = parseFloat(methods.fromWei(transaction.value, 'ether'), 10).toFixed(3);
    const valueParts = parsedValue.toString().split('.');
    let value = parsedValue;

    if (valueParts[1] === '000') {
      value = valueParts[0];
    }

    if (Object.keys(transaction).length > 0) {
      const displayTransaction = {
        key: {
          value: hash,
        },
        hash: {
          value: hash,
          linkType: routes.TRANSACTION_DETAIL,
          linkPayload: { hash: `_${hash}` },
        },
        amount: {
          value: `${value} Ether`,
        },
      };
      transactionsForDisplay.push(displayTransaction);
    }
  });

  return transactionsForDisplay;
}
