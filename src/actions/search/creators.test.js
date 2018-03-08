import * as actions from './creators';
import * as t from './types';

describe('actions/creators/search', () => {
  describe('searchFor', () => {
    it('should return an action with the correct type and payload', () => {
      const action = actions.searchFor('test');

      expect(action).toHaveProperty('type', t.SEARCH_FOR);
      expect(action).toHaveProperty('payload');
      expect(action.payload).toHaveProperty('query', 'test');
    });
  });
});
