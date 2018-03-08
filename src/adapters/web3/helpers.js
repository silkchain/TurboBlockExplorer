import { getWeb3Instance } from './init';

export function fromWei(number, unit, getInstance = getWeb3Instance) {
  const instance = getInstance();

  return instance.fromWei(number, unit).toString();
}

export function isAddress(hex, getInstance = getWeb3Instance) {
  const instance = getInstance();
  return instance.isAddress(hex);
}
