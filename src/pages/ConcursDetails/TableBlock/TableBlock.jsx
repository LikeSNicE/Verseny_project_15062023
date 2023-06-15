import React from 'react';
import TableUI from '../../../Common/Table/Table';
import {headData } from '../ConcursDetailsData';

const TableBlock = ({json_winners}) => {
  return (
    <div>
      <TableUI data={json_winners} head={headData} />
    </div>
  );
};

export default TableBlock;