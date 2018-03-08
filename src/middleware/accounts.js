import * as actions from '@/actions/creators'
import * as t from '@/actions/types';
import * as web3 from '@/adapters/web3';

export default (store, adapter = web3) => next => async action => {
  if (action.type === t.FETCH_ACCOUNT) {
    const { address } = action.payload;

    const accountData = await Promise.all([
      adapter.getBalance(address),
      adapter.getTransactionCount(address),
    ]);

    store.dispatch(actions.fetchAccountSuccess({
      address,
      balance: accountData[0],
      transactionCount: accountData[1],
    }));

  } else {
    next(action);
  }
}
