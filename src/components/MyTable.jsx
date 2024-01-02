import React from 'react';
import { Table } from 'antd';
import data from '../data/data';
import styled from 'styled-components';

const ansCounts = [0, 0, 0, 0];
data.forEach((item) => ansCounts[item.answers.ansKey - 1]++);

const total = data.length;
const ansPercents = ansCounts.map((count) =>
  ((count / total) * 100).toFixed(2)
);

const columns = [
  {
    title: 'Gesamt',
    dataIndex: 'total',
    key: 'total',
  },
  {
    title: '1. Option',
    dataIndex: 'ans1',
    key: 'ans1',
  },
  {
    title: '2. Option',
    dataIndex: 'ans2',
    key: 'ans2',
  },
  {
    title: '3. Option',
    dataIndex: 'ans3',
    key: 'ans3',
  },
  {
    title: '4. Option',
    dataIndex: 'ans4',
    key: 'ans4',
  },
];

const tableData = [
  {
    key: '1',
    total: `${total} von 310`,
    ans1: ansCounts[0],
    ans2: ansCounts[1],
    ans3: ansCounts[2],
    ans4: ansCounts[3],
  },
  {
    key: '2',
    total: `${((total * 100) / 310).toFixed(2)}%`,
    ans1: `${ansPercents[0]}%`,
    ans2: `${ansPercents[1]}%`,
    ans3: `${ansPercents[2]}%`,
    ans4: `${ansPercents[3]}%`,
  },
];

const MyTable = () => {
  return (
    <CustomTable
      columns={columns}
      dataSource={tableData}
      bordered
      size="small"
      pagination={false}
    />
  );
};

const CustomTable = styled(Table)`
  .ant-table-cell {
    text-align: center;
  }
`;

export default MyTable;
