import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import { withStyles } from '@material-ui/core/styles';

import { HORIZONTAL_BAR } from '../../constants/emptyCell';
import Colors from '../../constants/colors';
import { RowSelection, defaultRowKey } from './enhancedTableUtil';

const styles = {
  tableCell: {
    fontWeight: '300'
  },
  noDataTableCell: {
    textAlign: 'center',
    color: Colors.WARM_GREY
  }
};

class EnhancedTableBody extends React.Component {
  renderCell(datum, col) {
    const { rowRenderOptions } = this.props;
    const dataIndex = col.get('dataIndex');
    const render = col.get('render');

    const textValue = dataIndex && dataIndex.toJS ? datum.getIn(dataIndex) : datum.get(dataIndex);
    const content = render && _.isFunction(render) ? render(textValue, datum, rowRenderOptions) : textValue;

    return _.isNil(content) || content === '' ? HORIZONTAL_BAR : content;
  }

  getRowSelector(datum) {
    const { rowSelection, rowKey } = this.props;
    const rowSelectFn = _.isFunction(rowSelection.get('onSelect')) ? rowSelection.get('onSelect') : () => {};
    const onChangeHandler = _.partialRight(rowSelectFn, datum, rowKey(datum));

    if (rowSelection.get('selectorType') === 'radio') {
      return <Radio checked={rowSelection.get('rowIsSelected')(datum, rowKey(datum))} onChange={onChangeHandler} />;
    }

    return <Checkbox checked={rowSelection.get('rowIsSelected')(datum, rowKey(datum))} onChange={onChangeHandler} />;
  }

  getRowProps(datum) {
    const { rowProps } = this.props;

    if (_.isFunction(rowProps)) {
      const calculatedRowProps = rowProps(datum);
      return _.isPlainObject(calculatedRowProps) ? calculatedRowProps : {};
    }

    if (_.isObject(rowProps)) {
      return rowProps;
    }

    return {};
  }

  render() {
    const {
      columns,
      dataSource: rawDataSource,
      rowKey,
      classes,
      rowsPerPage,
      page,
      rowSelection,
      noDataText
    } = this.props;

    if (rawDataSource.size === 0) {
      return (
        <TableBody>
          <TableRow>
            <TableCell className={classes.noDataTableCell} colSpan={columns.size + Number(Boolean(rowSelection))}>
              {noDataText}
            </TableCell>
          </TableRow>
        </TableBody>
      );
    }

    const dataSource = rowsPerPage
      ? rawDataSource.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : rawDataSource;

    const rows = dataSource.map(datum => (
      <TableRow key={rowKey(datum)} {...this.getRowProps(datum)}>
        {rowSelection && (
          <TableCell padding="checkbox" onClick={e => e.stopPropagation()}>
            {this.getRowSelector(datum)}
          </TableCell>
        )}
        {columns.map(col => (
          <TableCell
            key={col.get('key')}
            numeric={col.get('numeric')}
            className={classes.tableCell}
            style={col.get('bodyStyle', Immutable.Map()).toJS() || {}}
          >
            {this.renderCell(datum, col)}
          </TableCell>
        ))}
      </TableRow>
    ));

    return <TableBody>{rows}</TableBody>;
  }
}

EnhancedTableBody.propTypes = {
  columns: PropTypes.instanceOf(Immutable.List),
  dataSource: PropTypes.instanceOf(Immutable.List),
  rowKey: PropTypes.func,
  rowsPerPage: PropTypes.number,
  page: PropTypes.number,
  rowSelection: PropTypes.instanceOf(RowSelection),
  noDataText: PropTypes.string,
  rowRenderOptions: PropTypes.instanceOf(Immutable.Map)
};

EnhancedTableBody.defaultProps = {
  columns: Immutable.List(),
  dataSource: Immutable.List(),
  rowKey: defaultRowKey,
  page: 0,
  noDataText: '',
  classes: {},
  rowRenderOptions: Immutable.Map()
};

export { EnhancedTableBody };

export default withStyles(styles)(EnhancedTableBody);
