import * as web3 from './helpers';

describe('adapters/web3/helpers', () => {
  let mockGetInstance, mockEth, mockFromWei, mockIsAddress;

  beforeEach(() => {
    mockEth = {};
    mockGetInstance = jest.fn(() => ({
      fromWei: mockFromWei,
      isAddress: mockIsAddress,
      eth: mockEth,
    }));
  });

  describe('fromWei', () => {
    it('should call the fromWei method on the instance', () => {
      mockFromWei = jest.fn(() => 'test');
      const result = web3.fromWei('42', 'gwei', mockGetInstance);

      expect(mockFromWei).toBeCalledWith('42', 'gwei');
      expect(result).toBe('test');
    });

    it('should convert the result to a string', () => {
      mockFromWei = jest.fn(() => 42);
      const result = web3.fromWei('42', 'gwei', mockGetInstance);

      expect(mockFromWei).toBeCalledWith('42', 'gwei');
      expect(result).toBe('42');
    });
  });

  describe('isAddress', () => {
    it('should call the isAddress method on the instance and return the result', () => {
      mockIsAddress = jest.fn((hex) => `A${hex}`);

      const result = web3.isAddress('test', mockGetInstance);
      expect(result).toBe('Atest');
    });
  });
});
