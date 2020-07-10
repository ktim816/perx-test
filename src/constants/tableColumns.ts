import {ColumnsType} from "antd/lib/table";

export const TABLE_COLUMNS: ColumnsType<any> = [{
  title: '№',
  render: (_, __, index) => index + 1,
  key: 'index',
  width: '5%',
}, {
  title: 'VIN',
  dataIndex: 'vin',
  key: 'vin',
  width: '12%',
}, {
  title: 'Brand',
  dataIndex: 'brand',
  key: 'brand',
  width: '10%',
}, {
  title: 'Model',
  dataIndex: 'model',
  key: 'model',
  width: '12%',
}, {
  title: 'Grade',
  dataIndex: 'grade',
  key: 'grade',
  width: '12%',
}, {
  title: 'Dealer',
  dataIndex: ['dealer', 'name'],
  key: 'dealer',
  width: '15%',
}, {
  title: 'Address',
  ellipsis: true,
  render: (_, {dealer}) => {
    const toAddress = (dealer: any) => dealer.address;
    return dealer.offices.map(toAddress).join(', ');
  },
  key: 'address',
}];
