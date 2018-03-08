import { getWeb3Instance } from './init';

export function getGasPrice(getInstance = getWeb3Instance) {
  const eth = getInstance().eth;

  return new Promise((resolve, reject) => {
    eth.getGasPrice((err, gasPrice) => {
      if (err) {
        reject(err);
      } else {
        resolve(gasPrice);
      }
    });
  });
}

export function getPeerCount(getInstance = getWeb3Instance) {
  const net = getInstance().net;

  return new Promise((resolve, reject) => {
    net.getPeerCount((err, peerCount) => {
      if (err) {
        reject(err);
      } else {
        resolve(peerCount);
      }
    });
  });
}
