import * as t from '@/actions/types';
import { fromWei } from '@/adapters/web3';
import { getLatestBlocks } from '@/reducers/selectors';

const initialState = {
  latestBlockNumber: 0,
  gasPrice: 0,
  peerCount: 0,
};

export default (state = initialState, { type, payload }) => {
  if (type === t.FETCH_STATISTICS_SUCCESS) {
    return {
      ...state,
      ...payload,
    };
  }
  return state;
}

export function getStatisticsForDisplay(state, methods = { fromWei, getLatestBlocks }) {
  let consideredBlocks,
      averageDifficulty, averageBlockTime,
      blockTimes, difficulties, hashRate;
  const { gasPrice, peerCount, latestBlockNumber } = state.statistics;
  const latestBlocks = methods.getLatestBlocks(state);

  if (latestBlocks.length > 0) {
    // since the block times are only available for n-1 blocks,
    // we need to adjust the statistics accordingly.
    consideredBlocks = latestBlocks.length - 1;
    const difficultyTotal = latestBlocks.reduce(
      (acc, block) => acc + block.difficulty.toNumber(), 0
    ) - latestBlocks[consideredBlocks].difficulty;

    blockTimes = latestBlocks.map(
      (block, i) => {
        if (i === 0) {
          return null;
        }
        return latestBlocks[i - 1].timestamp - block.timestamp;
      }
    ).filter(t => t !== null);
    const blockTimesTotal = blockTimes.reduce((a, b) => a + b, 0);

    averageDifficulty = difficultyTotal / consideredBlocks;
    averageBlockTime = blockTimesTotal / consideredBlocks;
    hashRate = difficultyTotal / blockTimesTotal;
    difficulties = latestBlocks.map(block => (block.difficulty.toNumber()));
    difficulties.pop();
  }

  return {
    gasPriceInWei: gasPrice.toString(10),
    gasPriceInGwei: methods.fromWei(gasPrice, 'gwei'),
    peerCount,
    latestBlockNumber: latestBlocks[0] ? latestBlocks[0].number : latestBlockNumber,
    consideredBlocks,
    averageDifficulty,
    averageBlockTime,
    hashRate,
    blockTimes,
    difficulties,
  };
}
