import * as t from './types';

export function fetchAccount(address) {
  return {
    type: t.FETCH_ACCOUNT,
    payload: {
      address,
    },
  };
}

export function fetchAccountSuccess(account) {
  return {
    type: t.FETCH_ACCOUNT_SUCCESS,
    payload: account,
  };
}

export function fetchBlocks(requestedBlockNumber, amountOfBlocks) {
  return {
    type: t.FETCH_BLOCKS,
    payload: {
      requestedBlockNumber,
      amountOfBlocks,
    },
  };
}

export function fetchBlocksSuccess(blockNumbers, blocks) {
  return {
    type: t.FETCH_BLOCKS_SUCCESS,
    payload: {
      blockNumbers,
      blocks,
    },
  };
}

export function fetchStatistics() {
  return {
    type: t.FETCH_STATISTICS,
  };
}

export function fetchStatisticsSuccess(latestBlockNumber, gasPrice, peerCount) {
  return {
    type: t.FETCH_STATISTICS_SUCCESS,
    payload: {
      latestBlockNumber,
      gasPrice,
      peerCount,
    },
  };
}

export function fetchTransactions(hashes) {
  return {
    type: t.FETCH_TRANSACTIONS,
    payload: {
      hashes,
    },
  };
}

export function fetchTransactionsForBlock(blockNumber) {
  return {
    type: t.FETCH_TRANSACTIONS_FOR_BLOCK,
    payload: {
      blockNumber,
    },
  };
}

export function fetchTransactionsSuccess(transactions) {
  return {
    type: t.FETCH_TRANSACTIONS_SUCCESS,
    payload: transactions,
  };
}
