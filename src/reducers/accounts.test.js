import * as t from '@/actions/types';
import reducer, * as selectors from './accounts';

describe('reducers/accounts', () => {
  it('should ignore unrecognized actions', () => {
    const mockAction = {
      type: 'test/TEST_ACTION',
    };
    const state = reducer('test', mockAction);

    expect(state).toEqual('test');
  });

  it('should save accounts to the store', () => {
    const mockAction = {
      type: t.FETCH_ACCOUNT_SUCCESS,
      payload: {
        address: 'test',
        balance: 10,
        transactionCount: 2,
      },
    };
    const state = reducer(undefined, mockAction);

    expect(state).toHaveProperty('test');
    expect(state.test).toHaveProperty('address', 'test');
    expect(state.test).toHaveProperty('balance', 10);
    expect(state.test).toHaveProperty('transactionCount', 2);
  });

  it('should update accounts if the data changed', () => {
    const mockAction = {
      type: t.FETCH_ACCOUNT_SUCCESS,
      payload: {
        address: 'test',
        balance: 15,
        transactionCount: 3,
      },
    };
    const mockState = {
      test: {
        address: 'test',
        balance: 10,
        transactionCount: 2,
      },
    };
    const state = reducer(mockState, mockAction);

    expect(state.test).toHaveProperty('address', 'test');
    expect(state.test).toHaveProperty('balance', 15);
    expect(state.test).toHaveProperty('transactionCount', 3);
  });
});

describe('selectors/accounts', () => {
  describe('getAccount', () => {
    it('should return the correct account from state', () => {
      const mockState = {
        accounts: {
          test: {
            balance: 10,
          },
        },
      };

      const account = selectors.getAccount(mockState, 'test');

      expect(account).toHaveProperty('balance', 10);
    });
  });

  describe('getCurrentAccountForDisplay', () => {
    const mockState = {
      location: {
        payload: {
          address: '_0x12345678',
        },
      },
    };
    const mockGetAccount = jest.fn((state, address) => ({ address, balance: 235, transactionCount: 2 }));
    const mockFromWei = jest.fn(amount => amount * 10);
    const mockMethods = { getAccount: mockGetAccount, fromWei: mockFromWei };

    it('should use the address from location to get the current account', () => {
      selectors.getCurrentAccountForDisplay(mockState, mockMethods);

      expect(mockGetAccount).toBeCalled();
      expect(mockGetAccount).toBeCalledWith(mockState, '0x12345678');
    });

    it('should transform the Wei balance to Ether', () => {
      selectors.getCurrentAccountForDisplay(mockState, mockMethods);

      expect(mockFromWei).toBeCalled();
      expect(mockFromWei).toBeCalledWith(235, 'ether');
    });

    it('should return an object with account display data', () => {
      const value = selectors.getCurrentAccountForDisplay(mockState, mockMethods);

      expect(value).toHaveProperty('address', '0x12345678');
      expect(value).toHaveProperty('balanceInWei', '235');
      expect(value).toHaveProperty('balanceInEther', '2350.000');
      expect(value).toHaveProperty('transactionCount', 2);
    });
  });
});
