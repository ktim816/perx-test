import * as actionTypes from '@/store/types';
import {AxiosResponse} from 'axios';
import {TablePaginationConfig} from 'antd/lib/table';

export interface RootState {
  vehicles: any[];
  dealers: any[];
  loading: boolean;
  error: string;
  pagination: TablePaginationConfig;
}

export interface TableChangedProps {
  pagination: TablePaginationConfig;
}

// Action Creators
export interface FetchTableDataStart {
  type: typeof actionTypes.FETCH_TABLE_DATA_START;
}

export interface FetchTableDataSuccess {
  type: typeof actionTypes.FETCH_TABLE_DATA_SUCCESS;
  response: {
    vehicles: AxiosResponse<any>;
    dealers: any[];
  },
  params: TableChangedProps;
}

export interface FetchTableDataError {
  type: typeof actionTypes.FETCH_TABLE_DATA_ERROR;
  error: string;
}

// Combine all actions into one
export type ActionCreators =
  FetchTableDataStart |
  FetchTableDataSuccess |
  FetchTableDataError;
