import { getWeb3Instance } from './init';

export function getLatestBlockNumber(getInstance = getWeb3Instance) {
  const eth = getInstance().eth;

  return new Promise((resolve, reject) => {
    eth.getBlockNumber((err, number) => {
      if (err) {
        reject(err);
      } else {
        resolve(number);
      }
    });
  });
}

export async function getBlocks(blockNumbers = [], getInstance = getWeb3Instance) {
  const eth = getInstance().eth;

  const blockRequests = blockNumbers.map(number => {
    return new Promise(resolve => {
      eth.getBlock(number, (err, block) => {
        if (err) {
          resolve(null);
        } else {
          resolve(block);
        }
      });
    });
  });

  const blocks = await Promise.all(blockRequests);
  return blocks.filter(block => block !== null);
}
