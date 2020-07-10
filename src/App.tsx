import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from './types';
import {TablePaginationConfig} from 'antd/lib/table';
import uniqid from 'uniqid';
import * as thunks from '@/store/thunks';

import {
  Table,
  Layout,
} from 'antd';

import {
  TABLE_COLUMNS,
} from '@/constants';

const getDataLoading = (state: RootState) => state.loading;
const getVehicles = (state: RootState) => state.vehicles;
const getPagination = (state: RootState) => state.pagination;

const layoutStyles = {
  padding: 90,
  minHeight: '100vh'
};

const App: React.FC = () => {

  const dataLoading = useSelector(getDataLoading);
  const vehicles = useSelector(getVehicles);
  const pagination = useSelector(getPagination);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunks.fetchTableData({pagination}));
  }, []);

  function handleTableChange(pagination: TablePaginationConfig) {
    dispatch(thunks.fetchTableData({pagination}));
  }

  return (
    <Layout style={layoutStyles}>
      <Table
        columns={TABLE_COLUMNS}
        rowKey={() => uniqid()}
        dataSource={vehicles}
        pagination={pagination}
        loading={dataLoading}
        onChange={handleTableChange}
      />
    </Layout>
  );
};

export default App;
