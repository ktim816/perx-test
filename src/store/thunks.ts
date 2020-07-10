import * as actions from './actions';
import {ThunkDispatch} from 'redux-thunk';
import {Action} from 'redux';
import {RootState, TableChangedProps} from '@/types';
import isEmpty from 'lodash/isEmpty';

import {
  uniq,
} from '@/helpers';

import {
  fetchVehicles,
  fetchDealers,
  getDealerIds,
  getCurrentPage,
  getUpdatedVehicles,
} from './thunkHelpers';

type TableThunkDispatch = ThunkDispatch<RootState, TableChangedProps, Action>;

export function fetchTableData(params: TableChangedProps) {
  const {pagination} = params;
  return async (dispatch: TableThunkDispatch) => {
    // start fetching
    dispatch(actions.loadingData());
    try {
      // fetch vehicles with params
      const vehicles = await fetchVehicles({ 
        state: 'active',
        hidden: false,
        group: 'new',
        per_page: pagination.pageSize,
        page: getCurrentPage(pagination.current),
      });
      const dealerIds = await getDealerIds(vehicles.data);
      if (isEmpty(dealerIds)) {
        dispatch(actions.fetchTableDataSuccess(vehicles, params));
      } else {
        // fetch dealers with params
        const dealers = await fetchDealers({
          id__in: uniq(dealerIds).join(','),
        });
        // combine vehicles with dealers
        const updatedVehicles = getUpdatedVehicles(vehicles, dealers);
        // update table with some params
        dispatch(actions.fetchTableDataSuccess(updatedVehicles, params));
      }
    } catch (err) {
      dispatch(actions.fetchTableDataError(err));
    }
  };
};
