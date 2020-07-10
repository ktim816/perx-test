import * as actionTypes from './types';
import {AxiosResponse} from 'axios';

import {
  TableChangedProps,
  FetchTableDataError,
  DataLoading,
  FetchTableDataSuccess
} from '@/types';

export const loadingData = (): DataLoading => ({
  type: actionTypes.DATA_LOADING,
});

export const fetchTableDataSuccess = (
  response: AxiosResponse<any>,
  params: TableChangedProps,
): FetchTableDataSuccess => ({
  type: actionTypes.FETCH_TABLE_DATA_SUCCESS,
  response,
  params,
});

export const fetchTableDataError = (
  error: string
): FetchTableDataError => ({
  type: actionTypes.FETCH_TABLE_DATA_ERROR,
  error,
});
