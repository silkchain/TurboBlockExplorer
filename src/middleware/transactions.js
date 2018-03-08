import * as actions from '@/actions/creators'
import * as t from '@/actions/types';
import * as selectors from '@/reducers/selectors';
import * as web3 from '@/adapters/web3';

export default (store, adapter = web3, getters = selectors) => next => async action => {
  if (action.type === t.FETCH_TRANSACTIONS) {
    const { hashes } = action.payload;

    const fetchedTransactions = await adapter.getTransactions(hashes);
    const transactions = {};

    fetchedTransactions.forEach(transaction => {
      transactions[transaction.hash] = transaction;
    });

    store.dispatch(actions.fetchTransactionsSuccess(transactions));
  }

  else if (action.type === t.FETCH_TRANSACTIONS_FOR_BLOCK) {
    const { blockNumber } = action.payload;
    const blockInState = getters.getBlockInState(store.getState(), blockNumber);

    if (!blockInState) {
      const fetchedBlock = await adapter.getBlocks([blockNumber]);
      const block = { [fetchedBlock[0].number]: fetchedBlock[0] };
      store.dispatch(actions.fetchBlocksSuccess([blockNumber], block));
    }

    const hashes = getters.getTransactionHashesForBlock(store.getState(), blockNumber);
    store.dispatch(actions.fetchTransactions(hashes));
  }

  else {
    next(action);
  }
}
