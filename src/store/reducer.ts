import * as actionTypes from './types';

import {
  RootState,
  ActionCreators,
  FetchTableDataSuccess
} from '@/types';

import {
  update,
} from '@/helpers';

const initialState: RootState = {
  vehicles: [],
  dealers: [],
  loading: false,
  error: '',
  pagination: {
    current: 1,
    pageSize: 20,
    position: [
      'topCenter',
      'bottomCenter'
    ],
  },
};

export default (state = initialState, action: ActionCreators): RootState => {

  switch (action.type) {

    case actionTypes.FETCH_TABLE_DATA_START:
      return update(state, {
        loading: true,
      });

    case actionTypes.FETCH_TABLE_DATA_SUCCESS:
      return updateTableData(state, action);

    case actionTypes.FETCH_TABLE_DATA_ERROR:
      return update(state, {
        loading: false,
        error: action.error
      });

    default:
      return state;
  }
};

function updateTableData(
  state: RootState,
  action: FetchTableDataSuccess
): RootState {

  const {response, params} = action;
  const {vehicles, dealers} = response;

  return update(state, {
    vehicles: vehicles.data,
    dealers,
    pagination: update(params.pagination, {
      total: vehicles.headers['x-total-count']
    }),
    loading: false,
  });
}
