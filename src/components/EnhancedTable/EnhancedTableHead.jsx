import _ from 'lodash';
import React from 'react';
import Immutable from 'immutable';
import PropTypes from 'prop-types';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { onlyUpdateForPropTypes } from '../../utils/hoc';
import { RowSelection, defaultRowKey } from './enhancedTableUtil';

class EnhancedTableHead extends React.Component {
  createSortHandler(dataIndex, isNumeric) {
    return event => this.props.onRequestSort(dataIndex, isNumeric);
  }

  getTitle(col) {
    const title = col.get('title');

    return title && _.isFunction(title.toJS) ? title.toJS() : title;
  }

  getSelectedRowCount() {
    const { dataSource, rowSelection, rowKey } = this.props;
    const rowKeyFn = _.isFunction(rowKey) ? rowKey : defaultRowKey;

    if (rowSelection && _.isFunction(rowSelection.get('rowIsSelected'))) {
      return dataSource.count(x => rowSelection.get('rowIsSelected')(x, rowKeyFn(x)));
    }

    return 0;
  }

  getRowKeys() {
    const { rowKey, dataSource } = this.props;
    return _.isFunction(rowKey) ? dataSource.map(rowKey).toSet() : Immutable.Set();
  }

  render() {
    const { columns, dataSource, orderBy, orderDirection, rowSelection } = this.props;
    const selectedRowCount = this.getSelectedRowCount();

    const cells = columns.map(x => (
      <TableCell key={x.get('key')} numeric={x.get('numeric')} style={x.get('headStyle', Immutable.Map()).toJS() || {}}>
        {x.get('title') && (
          <TableSortLabel
            active={x.get('dataIndex') && x.get('dataIndex') === orderBy}
            direction={orderDirection}
            onClick={this.createSortHandler(x.get('dataIndex'), x.get('numeric'))}
          >
            {this.getTitle(x)}
          </TableSortLabel>
        )}
      </TableCell>
    ));

    return (
      <TableHead>
        <TableRow>
          {rowSelection && (
            <TableCell padding="checkbox">
              {rowSelection.get('selectorType') !== 'radio' && (
                <Checkbox
                  indeterminate={selectedRowCount > 0 && selectedRowCount < dataSource.size}
                  checked={selectedRowCount === dataSource.size && selectedRowCount > 0}
                  onChange={_.partialRight(rowSelection.get('onSelectAll'), dataSource, this.getRowKeys(dataSource))}
                  disabled={dataSource.size === 0}
                />
              )}
            </TableCell>
          )}
          {cells}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  columns: PropTypes.instanceOf(Immutable.List),
  orderBy: PropTypes.string,
  orderDirection: PropTypes.string,
  onRequestSort: PropTypes.func,
  rowSelection: PropTypes.instanceOf(RowSelection),
  rowKey: PropTypes.func
};

EnhancedTableHead.defaultProps = {
  columns: Immutable.List(),
  onRequestSort: () => {},
  rowKey: defaultRowKey
};

export { EnhancedTableHead };

export default onlyUpdateForPropTypes(EnhancedTableHead);
