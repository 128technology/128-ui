import React from 'react';
import { Table as AntdTable } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

import './Table.scss';

/**
 * 128 wrapper for the Ant Design `<Table />` component.
 * 
 * Please see the [Ant Design Table documentation](https://ant.design/components/table/)
 */
const Table = (props) => (
  <div className="ui-128-table">
    <AntdTable {...props} locale={enUS.Table} />
  </div>
);

export default Table;
