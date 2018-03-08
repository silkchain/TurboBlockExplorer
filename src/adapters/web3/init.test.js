import * as web3 from './init';

describe('adapters/web3/init', () => {
  let mockGetInstance, mockEth;

  beforeEach(() => {
    mockEth = {};
    mockGetInstance = jest.fn(() => ({
      eth: mockEth,
    }));
  });

  describe('getWeb3Instance', () => {
    it('should return undefined for an initial web3', () => {
      const instance = web3.getWeb3Instance();

      expect(instance).not.toBeDefined();
    });
  });

  describe('initializeWeb3', () => {
    beforeEach(() => {
      web3.resetWeb3Instance();
    });

    it('should initialize web3 from the current provider', () => {
      const mockWindow = {
        web3: {
          currentProvider: 'testProvider',
        },
      };
      const mockConstructor = jest.fn();
      class mockPackage {
        constructor(provider) {
          mockConstructor(provider);
        }
      }
      web3.initializeWeb3(mockWindow, mockPackage);

      expect(mockConstructor).toBeCalledWith('testProvider');
    });

    it('should use the httpProivder if web3 is not available', () => {
      const mockWindow = {};
      const mockWeb3Constructor = jest.fn();
      const mockHPConstructor = jest.fn();
      class mockPackage {
        constructor(provider) {
          mockWeb3Constructor(provider);
        }
      }
      class mockHttpProvider {
        constructor(url) {
          mockHPConstructor(url);
        }
      }
      mockPackage.providers = {
        HttpProvider: mockHttpProvider,
      };
      web3.initializeWeb3(mockWindow, mockPackage);

      expect(mockHPConstructor).toBeCalled();
      expect(mockWeb3Constructor).toBeCalled();
    });
  });


  describe('resetWeb3Instance', () => {
    it('should reset the current web3 instance', () => {
      const mockWindow = {
        web3: {
          currentProvider: 'testProvider',
        },
      };
      const mockConstructor = jest.fn();
      class mockPackage {
        constructor(provider) {
          mockConstructor(provider);
        }
      }
      web3.resetWeb3Instance();
      web3.initializeWeb3(mockWindow, mockPackage);

      const instance1 = web3.getWeb3Instance();
      expect(instance1).toEqual({});

      web3.resetWeb3Instance();

      const instance2 = web3.getWeb3Instance();
      expect(instance2).toBe(undefined);
    });
  });

  describe('getIsUsingWeb3', () => {
    beforeEach(() => {
      web3.resetWeb3Instance();
    });

    it('should return false if web3 exists in the browser', () => {
      const mockWindow = {
        web3: {
          currentProvider: 'testProvider',
        },
      };
      const mockConstructor = jest.fn();
      class mockPackage {
        constructor(provider) {
          mockConstructor(provider);
        }
      }
      web3.initializeWeb3(mockWindow, mockPackage);

      const isUsingFallback = web3.getIsUsingFallback();

      expect(isUsingFallback).toBe(false);
    });

    it('should return true if web3 does not exist the browser', () => {
      const mockWindow = {};
      const mockWeb3Constructor = jest.fn();
      const mockHPConstructor = jest.fn();
      class mockPackage {
        constructor() {
          mockWeb3Constructor();
        }
      }
      class mockHttpProvider {
        constructor() {
          mockHPConstructor();
        }
      }
      mockPackage.providers = {
        HttpProvider: mockHttpProvider,
      };
      web3.initializeWeb3(mockWindow, mockPackage);

      const isUsingFallback = web3.getIsUsingFallback();

      expect(isUsingFallback).toBe(true);
    });
  });
});
