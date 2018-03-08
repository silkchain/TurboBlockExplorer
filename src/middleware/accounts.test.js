import * as t from '@/actions/types';
import middleware from './accounts';

describe('middleware/accounts', () => {
  let mockStore, mockNext, mockAction, mockDispatch, mockGetState,
      mockAdapter;

  beforeEach(() => {
    mockDispatch = jest.fn();
    mockStore = {
      dispatch: mockDispatch,
      getState: mockGetState,
    };
    mockNext = jest.fn();
    mockAdapter = {
      getBalance: jest.fn(() => 100),
      getTransactionCount: jest.fn(() => 2),
    };
  });

  it('should forward unrecognized actions', () => {
    mockAction = {
      type: 'test/TEST_ACTION',
    };

    middleware(mockStore)(mockNext)(mockAction);

    expect(mockNext).toBeCalledWith(mockAction);
  });

  it('should fetch balance and transactionCount', async () => {
    mockAction = {
      type: t.FETCH_ACCOUNT,
      payload: {
        address: 'test',
      },
    };

    await middleware(mockStore, mockAdapter)(mockNext)(mockAction);

    expect(mockAdapter.getBalance).toBeCalled();
    expect(mockAdapter.getBalance).toBeCalledWith('test');
    expect(mockAdapter.getTransactionCount).toBeCalled();
    expect(mockAdapter.getTransactionCount).toBeCalledWith('test');

  });

  it('should dispatch a success action with the fetched data', async () => {
    mockAction = {
      type: t.FETCH_ACCOUNT,
      payload: {
        address: 'test',
      },
    };

    await middleware(mockStore, mockAdapter)(mockNext)(mockAction);

    const dispatchedAction = mockDispatch.mock.calls[0][0];
    expect(dispatchedAction).toHaveProperty('type', t.FETCH_ACCOUNT_SUCCESS);
    expect(dispatchedAction).toHaveProperty('payload');
    expect(dispatchedAction.payload).toHaveProperty('address', 'test');
    expect(dispatchedAction.payload).toHaveProperty('balance', 100);
    expect(dispatchedAction.payload).toHaveProperty('transactionCount', 2);
  });
});
