import * as actions from '@/actions/creators';
import * as selectors from '@/reducers/selectors';

export function fetchAccount(dispatch, getState) {
  const addressLocation = getState().location.payload.address || '';
  // redux-first-router has issues with '0x' strings
  const address = addressLocation.replace('_', '');

  dispatch(actions.fetchAccount(address));
}

export function fetchBlocks(dispatch) {
  dispatch(actions.fetchBlocks());
}

export function fetchSingleBlock(dispatch, getState) {
  const blockNumber = getState().location.payload.blockNumber;
  const blockInState = selectors.getBlockInState(getState(), blockNumber);

  if (!blockInState) {
    dispatch(actions.fetchBlocks(blockNumber, 1));
  }
}

export function fetchStatistics(dispatch) {
  dispatch(actions.fetchStatistics());
}

export function fetchTransactions(dispatch, getState) {
  const blockNumber = getState().location.payload.blockNumber;

  dispatch(actions.fetchTransactionsForBlock(blockNumber));
}

export function fetchSingleTransaction(dispatch, getState) {
  const hashLocation = getState().location.payload.hash || '';
  // redux-first-router has issues with '0x' strings
  const hash = hashLocation.replace('_', '');
  const hashInState = selectors.getTransactionInState(getState(), hash);

  if (!hashInState) {
    dispatch(actions.fetchTransactions([hash]));
  }
}
