import * as helpers from './numbers';

describe('helpers/numbers', () => {
  describe('transformBigNumber', () => {
    it('should return the value fixed to 3 decimals', () => {
      const input = 60123456;
      const { number } = helpers.transformBigNumber(input);

      expect(number).toBe('60.123');
    });

    it('should return an empty string for values < 1001', () => {
      const input = 600;
      const { prefix, number } = helpers.transformBigNumber(input);

      expect(prefix).toBe('');
      expect(number).toBe('600');
    });

    it('should return K and the according value', () => {
      const input = 60123;
      const { prefix, number } = helpers.transformBigNumber(input);

      expect(prefix).toBe('k');
      expect(number).toBe('60.123');
    });

    it('should return M and the according value', () => {
      const input = 6000000;
      const { prefix, number } = helpers.transformBigNumber(input);

      expect(prefix).toBe('M');
      expect(number).toBe('6');
    });

    it('should return G and the according value', () => {
      const input = 6000000000;
      const { prefix, number } = helpers.transformBigNumber(input);

      expect(prefix).toBe('G');
      expect(number).toBe('6');
    });

    it('should return T and the according value', () => {
      const input = 6000000000000;
      const { prefix, number } = helpers.transformBigNumber(input);

      expect(prefix).toBe('T');
      expect(number).toBe('6');
    });
  });
});
