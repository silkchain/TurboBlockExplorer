import { getWeb3Instance } from './init';

export function getBalance(address, getInstance = getWeb3Instance) {
  const eth = getInstance().eth;

  return new Promise((resolve, reject) => {
    eth.getBalance(address, (err, balance) => {
      if (err) {
        reject(err);
      } else {
        resolve(balance);
      }
    });
  });
}

export function getTransactionCount(address, getInstance = getWeb3Instance) {
  const eth = getInstance().eth;

  return new Promise((resolve, reject) => {
    eth.getTransactionCount(address, (err, txCount) => {
      if (err) {
        reject(err);
      } else {
        resolve(txCount);
      }
    });
  });
}
