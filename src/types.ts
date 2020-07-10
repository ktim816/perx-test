import * as actionTypes from '@/store/types';
import {AxiosResponse} from 'axios';
import {TablePaginationConfig} from 'antd/lib/table';

export interface RootState {
  vehicles: any[];
  loading: boolean;
  error: string;
  pagination: TablePaginationConfig;
}

export interface TableChangedProps {
  pagination: TablePaginationConfig;
}

// Action Creators
export interface DataLoading {
  type: typeof actionTypes.DATA_LOADING;
}

export interface FetchTableDataSuccess {
  type: typeof actionTypes.FETCH_TABLE_DATA_SUCCESS;
  response: AxiosResponse<any>;
  params: TableChangedProps;
}

export interface FetchTableDataError {
  type: typeof actionTypes.FETCH_TABLE_DATA_ERROR;
  error: string;
}

// Combine all actions into one
export type ActionCreators =
  DataLoading |
  FetchTableDataSuccess |
  FetchTableDataError;
