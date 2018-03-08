import * as t from '@/actions/types';
import middleware from './transactions';

describe('middleware/transactions', () => {
  let mockStore, mockNext, mockAction, mockDispatch, mockGetState,
      mockAdapter;

  beforeEach(() => {
    mockDispatch = jest.fn();
    mockGetState = jest.fn(() => ({}));
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

  describe('FETCH_TRANSACTIONS', () => {
    it('should fetch the requested transactions', async () => {
      mockAction = {
        type: t.FETCH_TRANSACTIONS,
        payload: {
          hashes: ['test'],
        },
      };
      mockAdapter.getTransactions = jest.fn(() => ([{ blockNumber: 2 }]));

      await middleware(mockStore, mockAdapter)(mockNext)(mockAction);

      expect(mockAdapter.getTransactions).toBeCalled();
      expect(mockAdapter.getTransactions).toBeCalledWith(['test']);
    });

    it('should dispatch a success action with the fetched data', async () => {
      mockAction = {
        type: t.FETCH_TRANSACTIONS,
        payload: {
          hash: 'test',
        },
      };
      mockAdapter.getTransactions = jest.fn(() => ([{ hash: 'test', blockNumber: 2 }]));

      await middleware(mockStore, mockAdapter)(mockNext)(mockAction);

      const dispatchedAction = mockDispatch.mock.calls[0][0];
      expect(dispatchedAction).toHaveProperty('type', t.FETCH_TRANSACTIONS_SUCCESS);
      expect(dispatchedAction).toHaveProperty('payload');
      expect(dispatchedAction.payload).toHaveProperty('test', { hash: 'test', blockNumber: 2 });
    });
  });

  describe('FETCH_TRANSACTIONS_FOR_BLOCK', () => {
    let mockSelectors, mockGetBlockInState, mockGetTransactionHashes;

    beforeEach(() => {
      mockGetBlockInState = jest.fn();
      mockGetTransactionHashes = jest.fn(() => ['0xA', '0xB']);
      mockAction = {
        type: t.FETCH_TRANSACTIONS_FOR_BLOCK,
        payload: {
          blockNumber: 'testBlock',
        },
      };
      mockSelectors = {
        getBlockInState: mockGetBlockInState,
        getTransactionHashesForBlock: mockGetTransactionHashes,
      };
      mockAdapter.getBlocks = jest.fn(() => ['1']);
      mockAdapter.getTransactions = jest.fn();
    });


    it('should check if the requested block is stored in state', async () => {
      await middleware(mockStore, mockAdapter, mockSelectors)(mockNext)(mockAction);

      expect(mockGetBlockInState).toBeCalledWith({}, 'testBlock');
    });

    it('should fetch the block if it is not stored in state', async () => {
      mockGetBlockInState.mockReturnValueOnce(false);

      await middleware(mockStore, mockAdapter, mockSelectors)(mockNext)(mockAction);

      expect(mockAdapter.getBlocks).toBeCalledWith(['testBlock']);
    });

    it('should dispatch a success action for the fetched block', async () => {
      mockGetBlockInState.mockReturnValueOnce(false);

      await middleware(mockStore, mockAdapter, mockSelectors)(mockNext)(mockAction);

      const dispatchedAction = mockDispatch.mock.calls[0][0];
      expect(dispatchedAction).toHaveProperty('type', t.FETCH_BLOCKS_SUCCESS);
      expect(dispatchedAction).toHaveProperty('payload');
      expect(dispatchedAction.payload).toHaveProperty('blockNumbers');
      expect(dispatchedAction.payload).toHaveProperty('blocks');
    });

    it('should not fetch the block if it is already in state', () => {
      mockGetBlockInState.mockReturnValueOnce(true);

      middleware(mockStore, mockAdapter, mockSelectors)(mockNext)(mockAction);

      expect(mockAdapter.getBlocks).not.toBeCalled();
    });

    it('should get the transaction hashes for the specified block', () => {
      mockGetBlockInState.mockReturnValueOnce(true);

      middleware(mockStore, mockAdapter, mockSelectors)(mockNext)(mockAction);

      expect(mockSelectors.getTransactionHashesForBlock).toBeCalledWith({}, 'testBlock');
    });

    it('should dispatch an action to fetch the requested hashes', () => {
      mockGetBlockInState.mockReturnValueOnce(true);

      middleware(mockStore, mockAdapter, mockSelectors)(mockNext)(mockAction);

      const dispatchedAction = mockDispatch.mock.calls[0][0];
      expect(dispatchedAction).toHaveProperty('type', t.FETCH_TRANSACTIONS);
      expect(dispatchedAction).toHaveProperty('payload');
      expect(dispatchedAction.payload).toHaveProperty('hashes', ['0xA', '0xB']);
    });
  });
});
