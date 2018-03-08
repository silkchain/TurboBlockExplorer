import * as web3 from './transactions';

describe('adapters/web3/transactions', () => {
  let mockGetInstance, mockEth;

  beforeEach(() => {
    mockEth = {};
    mockGetInstance = jest.fn(() => ({
      eth: mockEth,
    }));
  });

  describe('getTransactions', () => {
    it('should return an empty array if no transaction hashes are given', async () => {
      const transactions = await web3.getTransactions(undefined, mockGetInstance);

      expect(transactions).toEqual([]);
    });

    it('should return the transactions for all given hashes', async () => {
      mockEth.getTransaction = (hash, callback) => callback(null, `B${hash}`);

      const mockHashes = ['0x2', '0x5', '0x10'];
      const expectedTransactions = ['B0x2', 'B0x5', 'B0x10'];
      const transactions = await web3.getTransactions(mockHashes, mockGetInstance);

      expect(transactions).toEqual(expectedTransactions);
    });

    it('should filter out transactions that failed to load', async () => {
      const mockCallback = jest
        .fn((hash, callback) => callback(null, `B${hash}`))
        .mockImplementationOnce((hash, callback) => callback(null, `B${hash}`))
        .mockImplementationOnce((hash, callback) => callback('error'));
      mockEth.getTransaction = mockCallback;

      const mockHashes = ['0x2', '0x5', '0x10'];
      const expectedTransactions = ['B0x2', 'B0x10'];
      const transactions = await web3.getTransactions(mockHashes, mockGetInstance);

      expect(transactions).toEqual(expectedTransactions);
    });
  });
});
