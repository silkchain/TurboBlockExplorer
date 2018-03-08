import * as actions from '@/actions/creators';
import * as t from '@/actions/types';
import * as web3 from '@/adapters/web3';

export default (store, adapter = web3) => next => async action => {
  if (action.type === t.SEARCH_FOR) {
    const { query } = action.payload;

    const isAddress = adapter.isAddress(query);
    if (isAddress) {
      return store.dispatch(actions.redirectAccountDetail(query));
    }

    const blockArray = await adapter.getBlocks([query]);
    if (blockArray.length === 1) {
      const block = blockArray[0];
      store.dispatch(actions.fetchBlocksSuccess([block.number.toString()], { [block.number]: block }));
      return store.dispatch(actions.redirectBlockDetail(block.number));
    }

    if (query.substring(0, 2) === '0x' && query.length === 66) {
      const transactionArray = await adapter.getTransactions([query]);
      if (transactionArray.length === 1) {
        const transaction = transactionArray[0];
        store.dispatch(actions.fetchTransactionsSuccess({ [transaction.hash]: transaction }));
        return store.dispatch(actions.redirectTransactionDetail(query));
      }
    }

    console.log('Invalid search query.'); // TODO: error handling

  }

  next(action);
}
