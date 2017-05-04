import _ from 'lodash';
import React from 'react';
import { Table as AntdTable } from 'antd';

import './Table.scss';

/**
 * 128 wrapper for the Ant Design `<Table />` component.
 * 
 * Please see the [Ant Design Table documentation](https://ant.design/components/table/)
 */
const Table = ({ className = '', borderedTable = false, expandedRowRender, ...otherProps }) => {
  let newExpandedRowRender = null;

  if (_.isFunction(expandedRowRender)) {
    newExpandedRowRender = () => (<span className='ui-128 ui-128__table--nested'>{expandedRowRender()}</span>);
  }

  return (
    <AntdTable
      {...otherProps}
      className={`${className} ${borderedTable ? 'ui-128__table--bordered' : ''} ui-128__table ui-128`}
      expandedRowRender={newExpandedRowRender}
    />
  );
};

export default Table;
