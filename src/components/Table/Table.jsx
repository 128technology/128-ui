import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';
import { Table as AntdTable } from 'antd';

import './Table.scss';

function TableCell({ children }) {
  return <div className="ui-128 ui-128__table--cell">{children}</div>;
}

/**
 * 128 wrapper for the Ant Design `<Table />` component.
 *
 * Please see the [Ant Design Table documentation](https://ant.design/components/table/)
 */
function Table({ borderedTable = false, className, columns = [], expandedRowRender, onRowClick, ...otherProps }) {
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
      columns={columns.map(column =>
        _.assign({}, column, {
          title: <TableCell>{column.title}</TableCell>,
          render: (...args) => <TableCell>{_.isFunction(column.render) ? column.render(...args) : args[0]}</TableCell>
        })
      )}
      expandedRowRender={newExpandedRowRender}
      onRowClick={onRowClick}
    />
  );
}

Table.propTypes = {
  borderedTable: PropTypes.bool
};

export default Table;
