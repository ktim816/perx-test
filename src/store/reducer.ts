import * as actionTypes from './types';
import {RootState, ActionCreators} from '@/types';

import {
  update,
} from '@/helpers';

const initialState: RootState = {
  vehicles: [],
  loading: false,
  error: '',
  pagination: {
    current: 1,
    pageSize: 20,
    position: ['bottomCenter']
  },
};

export default (state = initialState, action: ActionCreators): RootState => {
  switch (action.type) {
    case actionTypes.DATA_LOADING:
      return update(state, {
        loading: true,
      });
    case actionTypes.FETCH_TABLE_DATA_SUCCESS:
      return update(state, {
        vehicles: action.response.data,
        pagination: update(action.params.pagination, {
          total: action.response.headers['x-total-count']
        }),
        loading: false,
      });
    case actionTypes.FETCH_TABLE_DATA_ERROR:
      return update(state, {
        loading: false,
        error: action.error
      });
    default:
      return state;
  }
};
