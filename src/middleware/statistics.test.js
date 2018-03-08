import * as t from '@/actions/types';
import middleware from './statistics';

describe('middleware/statistics', () => {
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
      getLatestBlockNumber: jest.fn(),
      getGasPrice: jest.fn(),
      getPeerCount: jest.fn(),
    };
    mockAction = {
      type: t.FETCH_STATISTICS,
    };
  });

  it('should forward unrecognized actions', () => {
    const testAction = {
      type: 'test/TEST_ACTION',
    };

    middleware(mockStore)(mockNext)(testAction);

    expect(mockNext).toBeCalledWith(testAction);
  });

  it('should fetch the latest block number', async () => {
    await middleware(mockStore, mockAdapter)(mockNext)(mockAction);

    expect(mockAdapter.getLatestBlockNumber).toBeCalled();
  });

  it('should dispatch an action to fetch the latest blocks', async () => {
    mockAdapter.getLatestBlockNumber.mockImplementation(() => 10);

    await middleware(mockStore, mockAdapter)(mockNext)(mockAction);

    expect(mockDispatch.mock.calls[0][0]).toHaveProperty('type', t.FETCH_BLOCKS);
    expect(mockDispatch.mock.calls[0][0]).toHaveProperty('payload');
    expect(mockDispatch.mock.calls[0][0].payload).toHaveProperty('requestedBlockNumber', 10);
  });

  it('should fetch gas price and peer count', async () => {
    await middleware(mockStore, mockAdapter)(mockNext)(mockAction);

    expect(mockAdapter.getGasPrice).toBeCalled();
    expect(mockAdapter.getPeerCount).toBeCalled();
  });

  it('should dispatch an action with the fetched statistics', async () => {
    mockAdapter.getLatestBlockNumber.mockImplementation(() => 10);
    mockAdapter.getGasPrice.mockImplementation(() => 200);
    mockAdapter.getPeerCount.mockImplementation(() => 3);

    await middleware(mockStore, mockAdapter)(mockNext)(mockAction);

    const dispatchAction = mockDispatch.mock.calls[1][0];

    expect(dispatchAction).toHaveProperty('type', t.FETCH_STATISTICS_SUCCESS);
    expect(dispatchAction).toHaveProperty('payload');
    expect(dispatchAction.payload).toHaveProperty('latestBlockNumber', 10);
    expect(dispatchAction.payload).toHaveProperty('gasPrice', 200);
    expect(dispatchAction.payload).toHaveProperty('peerCount', 3);
  });
});
