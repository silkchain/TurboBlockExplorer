import * as web3 from './blocks';

describe('adapters/web3/blocks', () => {
  let mockGetInstance, mockEth;

  beforeEach(() => {
    mockEth = {};
    mockGetInstance = jest.fn(() => ({
      eth: mockEth,
    }));
  });

  describe('getLatestBlockNumber', () => {
    it('should reject if getting the block failed', async () => {
      mockEth.getBlockNumber = callback => callback('rejected');

      await expect(web3.getLatestBlockNumber(mockGetInstance))
        .rejects.toEqual('rejected');
    });

    it('should resolve with the block number', async () => {
      mockEth.getBlockNumber = callback => callback(null, 10);

      await expect(web3.getLatestBlockNumber(mockGetInstance))
        .resolves.toEqual(10);
    });
  });

  describe('getBlocks', () => {
    it('should return an empty array if no block numbers are given', async () => {
      const blocks = await web3.getBlocks(undefined, mockGetInstance);

      expect(blocks).toEqual([]);
    });

    it('should return the blocks for all given numbers', async () => {
      mockEth.getBlock = (number, callback) => callback(null, `B${number}`);

      const mockNumbers = [2, 5, 10];
      const expectedBlocks = ['B2', 'B5', 'B10'];
      const blocks = await web3.getBlocks(mockNumbers, mockGetInstance);

      expect(blocks).toEqual(expectedBlocks);
    });

    it('should filter out blocks that failed to load', async () => {
      const mockCallback = jest
        .fn((number, callback) => callback(null, `B${number}`))
        .mockImplementationOnce((number, callback) => callback(null, `B${number}`))
        .mockImplementationOnce((number, callback) => callback('error'));
      mockEth.getBlock = mockCallback;

      const mockNumbers = [2, 5, 10];
      const expectedBlocks = ['B2', 'B10'];
      const blocks = await web3.getBlocks(mockNumbers, mockGetInstance);

      expect(blocks).toEqual(expectedBlocks);
    });
  });
});
