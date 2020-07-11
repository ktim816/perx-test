import * as actions from './actions';
import {AxiosResponse} from 'axios';
import {ThunkDispatch} from 'redux-thunk';
import {Action} from 'redux';
import {RootState, TableChangedProps} from '@/types';
import isEmpty from 'lodash/isEmpty';
import Api from '@/api';

import {
  uniq,
} from '@/helpers';

import {
  getDealerIds,
  getCurrentPage,
  getUpdatedVehicles,
} from './thunkHelpers';

type TableThunkDispatch = ThunkDispatch<RootState, TableChangedProps, Action>;

export function fetchTableData(params: TableChangedProps) {

  const {pagination} = params;

  return async (dispatch: TableThunkDispatch, getState: () => RootState) => {

    const {dealers} = getState();

    // start fetching
    dispatch(actions.fetchTableDataStart());

    try {

      // fetch vehicles with params
      const vehicles = await Api.fetch('/vehicles', {
        headers: {'X-CS-Dealer-Id-Only': 1},
        params: {
          state: 'active',
          hidden: false,
          group: 'new',
          per_page: pagination.pageSize,
          page: getCurrentPage(pagination.current),
        }
      });

      const vehicleDealerIds = getDealerIds(vehicles.data);
      const dealerIds = dealers.map((dealer: any) => dealer.id);
      const uniqDealerIds = uniq(vehicleDealerIds)
        .filter((id: string) => !dealerIds.includes(id));

      let newDealers: AxiosResponse<any> | undefined;

      if (!isEmpty(uniqDealerIds)) {

        // fetch dealers with params
        newDealers = await Api.fetch('/dealers', {
          params: {
            id__in: uniqDealerIds.join(','),
          }
        });
      }

      // combine vehicles with dealers
      const updatedDealers = newDealers ? [...dealers, ...newDealers.data] : dealers;
      const updatedVehicles = getUpdatedVehicles(vehicles, updatedDealers);

      // update table with some params
      dispatch(actions.fetchTableDataSuccess({
        vehicles: updatedVehicles,
        dealers: updatedDealers,
      }, params));

    } catch (err) {
      dispatch(actions.fetchTableDataError(err));
    }
  };
};
