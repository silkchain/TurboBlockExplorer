import { initializeWeb3 } from '@/adapters/web3';

export default {
  onBeforeChange() {
    initializeWeb3();
  }
}
