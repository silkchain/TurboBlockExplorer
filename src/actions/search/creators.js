import * as t from './types';

export function searchFor(query) {
  return {
    type: t.SEARCH_FOR,
    payload: {
      query,
    },
  };
}
