import * as actionTypes from './types';
import {AxiosResponse} from 'axios';

import {
  TableChangedProps,
  FetchTableDataStart,
  FetchTableDataError,
  FetchTableDataSuccess,
} from '@/types';

export const fetchTableDataStart = (): FetchTableDataStart => ({
  type: actionTypes.FETCH_TABLE_DATA_START,
});

export const fetchTableDataSuccess = (
  response: {
    vehicles: AxiosResponse<any>,
    dealers: any[],
  },
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
