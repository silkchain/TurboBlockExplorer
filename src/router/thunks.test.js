import * as actions from '@/actions/creators';
import * as thunks from './thunks';

describe('router/thunks', () => {
  describe('fetchAccount', () => {
    it('should dispatch an action to fetch an account according to the location', () => {
      const mockState = {
        location: {
          payload: {
            address: 'test',
          },
        },
        accounts: {},
      };
      const mockDispatch = jest.fn();
      const mockGetState = jest.fn(() => mockState);
      const expectedAction = actions.fetchAccount('test');

      thunks.fetchAccount(mockDispatch, mockGetState);

      expect(mockDispatch).toBeCalledWith(expectedAction);
    });

    it('should strip the leading _ from the account address in the location', () => {
      const mockState = {
        location: {
          payload: {
            address: '_test',
          },
        },
        accounts: {},
      };
      const mockDispatch = jest.fn();
      const mockGetState = jest.fn(() => mockState);
      const expectedAction = actions.fetchAccount('test');

      thunks.fetchAccount(mockDispatch, mockGetState);

      expect(mockDispatch).toBeCalledWith(expectedAction);
    });
  });

  describe('fetchBlocks', () => {
    it('should dispatch an action to fetch the latest blocks', () => {
      const mockDispatch = jest.fn();
      const expectedAction = actions.fetchBlocks();

      thunks.fetchBlocks(mockDispatch);

      expect(mockDispatch).toBeCalledWith(expectedAction);
    });
  });

  describe('fetchSingleBlock', () => {
    it('should dispatch an action to fetch a block according to the location', () => {
      const mockState = {
        location: {
          payload: {
            blockNumber: 5,
          },
        },
        blocks: {
          blocks: {},
        },
      };
      const mockDispatch = jest.fn();
      const mockGetState = jest.fn(() => mockState);
      const expectedAction = actions.fetchBlocks(5, 1);

      thunks.fetchSingleBlock(mockDispatch, mockGetState);

      expect(mockDispatch).toBeCalledWith(expectedAction);
    });

    it('should not dispatch an action if the block is already in state', () => {
      const mockState = {
        location: {
          payload: {
            blockNumber: 5,
          },
        },
        blocks: {
          blocks: { 5: { number: 5 }},
        },
      };
      const mockDispatch = jest.fn();
      const mockGetState = jest.fn(() => mockState);

      thunks.fetchSingleBlock(mockDispatch, mockGetState);

      expect(mockDispatch).not.toBeCalled();
    });
  });

  describe('fetchSingleTransaction', () => {
    it('should dispatch an action to fetch a transaction according to the location', () => {
      const mockState = {
        location: {
          payload: {
            hash: 'test',
          },
        },
        transactions: {},
      };
      const mockDispatch = jest.fn();
      const mockGetState = jest.fn(() => mockState);
      const expectedAction = actions.fetchTransactions(['test']);

      thunks.fetchSingleTransaction(mockDispatch, mockGetState);

      expect(mockDispatch).toBeCalledWith(expectedAction);
    });

    it('should not dispatch an action if the transaction is already in state', () => {
      const mockState = {
        location: {
          payload: {
            hash: 'test',
          },
        },
        transactions: {
          test: {
            blockNumber: 10,
          },
        },
      };
      const mockDispatch = jest.fn();
      const mockGetState = jest.fn(() => mockState);

      thunks.fetchSingleTransaction(mockDispatch, mockGetState);

      expect(mockDispatch).not.toBeCalled();
    });

    it('should strip the leading _ from the transaction hash in the location', () => {
      const mockState = {
        location: {
          payload: {
            hash: '_test',
          },
        },
        transactions: {},
      };
      const mockDispatch = jest.fn();
      const mockGetState = jest.fn(() => mockState);
      const expectedAction = actions.fetchTransactions(['test']);

      thunks.fetchSingleTransaction(mockDispatch, mockGetState);

      expect(mockDispatch).toBeCalledWith(expectedAction);
    });
  });
});
