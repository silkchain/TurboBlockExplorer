import * as t from '@/actions/types';
import * as routes from '@/router';
import middleware from './search';

describe('middleware/search', () => {
  let mockStore, mockNext, mockAction, mockDispatch, mockGetState,
      mockAdapter;

  beforeEach(() => {
    mockDispatch = jest.fn();
    mockStore = {
      dispatch: mockDispatch,
      getState: mockGetState,
    };
    mockNext = jest.fn();
    mockAdapter = {};
  });

  it('should forward unrecognized actions', () => {
    mockAction = {
      type: 'test/TEST_ACTION',
    };

    middleware(mockStore)(mockNext)(mockAction);

    expect(mockNext).toBeCalledWith(mockAction);
  });

  describe('query is address', () => {
    beforeEach(() => {
      mockAction = {
        type: t.SEARCH_FOR,
        payload: {
          query: 'test',
        },
      };
      mockAdapter.isAddress = jest.fn(() => true);
      mockAdapter.getBlocks = jest.fn();
      mockAdapter.getTransactions = jest.fn();
    });

    it('should call isAddress with the given query', () => {
      middleware(mockStore, mockAdapter)(mockNext)(mockAction);

      expect(mockAdapter.isAddress).toBeCalled();
      expect(mockAdapter.isAddress).toBeCalledWith('test');
    });

    it('should not request a block', () => {
      middleware(mockStore, mockAdapter)(mockNext)(mockAction);

      expect(mockAdapter.getBlocks).not.toBeCalled();
    });

    it('should not request a transaction', () => {
      middleware(mockStore, mockAdapter)(mockNext)(mockAction);

      expect(mockAdapter.getTransactions).not.toBeCalled();
    });

    it('should redirect to account details', () => {
      middleware(mockStore, mockAdapter)(mockNext)(mockAction);

      const dispatchAction = mockDispatch.mock.calls[0][0];
      expect(dispatchAction).toHaveProperty('type', routes.ACCOUNT_DETAIL);
      expect(dispatchAction).toHaveProperty('payload');
      expect(dispatchAction.payload).toHaveProperty('address', '_test');
    });
  });

  describe('query is block number or hash', () => {
    beforeEach(() => {
      mockAction = {
        type: t.SEARCH_FOR,
        payload: {
          query: 'test',
        },
      };
      mockAdapter.isAddress = jest.fn(() => false);
      mockAdapter.getBlocks = jest.fn(() => [{ number: 1212 }]);
    });

    it('should try to fetch the block if the query is not an account', async () => {
      await middleware(mockStore, mockAdapter)(mockNext)(mockAction);

      expect(mockAdapter.getBlocks).toBeCalled();
      expect(mockAdapter.getBlocks).toBeCalledWith(['test']);
    });

    it('should dispatch a success action', async () => {
      await middleware(mockStore, mockAdapter)(mockNext)(mockAction);

      const successAction = mockDispatch.mock.calls[0][0];
      expect(successAction).toHaveProperty('type', t.FETCH_BLOCKS_SUCCESS);
      expect(successAction).toHaveProperty('payload');
      expect(successAction.payload).toHaveProperty('blockNumbers', ['1212']);
      expect(successAction.payload).toHaveProperty('blocks', { '1212': { number: 1212 }});
    });

    it('should redirect to block details', async () => {
      await middleware(mockStore, mockAdapter)(mockNext)(mockAction);

      const redirectAction = mockDispatch.mock.calls[1][0];
      expect(redirectAction).toHaveProperty('type', routes.BLOCK_DETAIL);
      expect(redirectAction).toHaveProperty('payload');
      expect(redirectAction.payload).toHaveProperty('blockNumber', 1212);
    });
  });

  describe('query is transaction hash', () => {
    // has to be in a valid transaction hash format
    const validQuery = '0x96b9824275dfad54f054124f1c91ff1727f11d7861c1577d4d63288c796ce999';

    beforeEach(() => {
      mockAction = {
        type: t.SEARCH_FOR,
        payload: {
          query: validQuery,
        },
      };
      mockAdapter.isAddress = jest.fn(() => false);
      mockAdapter.getBlocks = jest.fn(() => []);
      mockAdapter.getTransactions = jest.fn(() => ([{ hash: validQuery, test: true }]));
    });

    it('should try to fetch the transaction if the query is not an account or block', async () => {
      await middleware(mockStore, mockAdapter)(mockNext)(mockAction);

      expect(mockAdapter.getTransactions).toBeCalled();
      expect(mockAdapter.getTransactions).toBeCalledWith([validQuery]);
    });

    it('should dispatch a success action', async () => {
      await middleware(mockStore, mockAdapter)(mockNext)(mockAction);

      const successAction = mockDispatch.mock.calls[0][0];
      expect(successAction).toHaveProperty('type', t.FETCH_TRANSACTIONS_SUCCESS);
      expect(successAction).toHaveProperty('payload');
      expect(successAction.payload).toHaveProperty(validQuery);
    });

    it('should redirect to transaction details', async () => {
      await middleware(mockStore, mockAdapter)(mockNext)(mockAction);

      const redirectAction = mockDispatch.mock.calls[1][0];
      expect(redirectAction).toHaveProperty('type', routes.TRANSACTION_DETAIL);
      expect(redirectAction).toHaveProperty('payload');
      expect(redirectAction.payload).toHaveProperty('hash', `_${validQuery}`);
    });
  });
});
