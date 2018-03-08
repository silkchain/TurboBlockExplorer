import * as actions from '@/actions/creators';
import * as t from '@/actions/types';
import * as selectors from '@/reducers/selectors';
import * as web3 from '@/adapters/web3';
import { maxBlocksPerPage } from '@/constants';

export default (store, adapter = web3) => next => async action => {
  if (action.type === t.FETCH_BLOCKS) {
    const {
      requestedBlockNumber = -1,
      amountOfBlocks = maxBlocksPerPage,
    } = action.payload;

    let currentBlockNumber = requestedBlockNumber;
    if (requestedBlockNumber < 0) {
      currentBlockNumber = await adapter.getLatestBlockNumber();
    }

    const blockNumbers = [];
    while (blockNumbers.length < amountOfBlocks) {
      blockNumbers.push(currentBlockNumber);
      currentBlockNumber -= 1;

      if (currentBlockNumber < 0) break;
    }

    const blocksInState = selectors.getBlockNumbers(store.getState());
    const missingBlocks = blockNumbers.filter(b => !blocksInState.includes(b));

    const fetchedBlocks = await adapter.getBlocks(missingBlocks);
    const blocks = {};

    fetchedBlocks.forEach(block => {
      blocks[block.number] = block;
    });

    store.dispatch(actions.fetchBlocksSuccess(Object.keys(blocks), blocks));

  } else {
    next(action);
  }
}
