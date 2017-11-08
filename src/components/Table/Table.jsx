import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';
import { Table as AntdTable } from 'antd';

import './Table.scss';

/**
 * 128 wrapper for the Ant Design `<Table />` component.
 *
 * Please see the [Ant Design Table documentation](https://ant.design/components/table/)
 */
function Table({ className, borderedTable = false, expandedRowRender, onRowClick, ...otherProps }) {
  const newExpandedRowRender = _.isFunction(expandedRowRender)
    ? (...args) => <span className="ui-128 ui-128__table--nested">{expandedRowRender(...args)}</span>
    : null;

  return (
    <AntdTable
      {...otherProps}
      className={classNames(className, 'ui-128__table', 'ui-128', {
        'ui-128__table--bordered': borderedTable,
        'ui-128__table--selectable': onRowClick
      })}
      expandedRowRender={newExpandedRowRender}
      onRowClick={onRowClick}
    />
  );
}

Table.propTypes = {
  borderedTable: PropTypes.bool
};

export default Table;
