import React from 'react';
import { Table as AntdTable } from 'antd';

import './Table.scss';

/**
 * 128 wrapper for the Ant Design `<Table />` component.
 * 
 * Please see the [Ant Design Table documentation](https://ant.design/components/table/)
 */
const Table = (props) => (
  <AntdTable {...props} className={`${props.className} ui-128__table ui-128`} />
);

export default Table;
