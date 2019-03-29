import _ from 'lodash';
import React from 'react';
import Immutable from 'immutable';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import classNames from 'classnames';
import naturalSort from 'javascript-natural-sort';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { AutoSizer, MultiGrid } from 'react-virtualized';
import ResizeDetector from 'react-resize-detector';

import { HORIZONTAL_BAR } from '../../constants/emptyCell';
import Loading from '../Loading';
import { defaultRowKey } from './enhancedTableUtil';

const DEFAULT_CELL_HEIGHT = 50;
const DEFAULT_TABLE_HEIGHT = '400px';
const UPDATE_THRESHOLD = 250; // ms

const styles = theme => ({
  table: {
    fontFamily: theme.typography.fontFamily,
    outline: 'none',
    '&:focus': { outline: 'none' }
  },
  tableCellFlex: {
    cursor: 'pointer',
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    boxSizing: 'border-box',
    flexDirection: 'row',
    outline: 'none',
    '&:focus': { outline: 'none' }
  },
  centerFlex: {
    justifyContent: 'center'
  }
});

const sortComparator = (orderBy, orderDirection, isNumeric) => (first, second) => {
  const a = _.get(first, orderBy);
  const b = _.get(second, orderBy);
  if (_.isNil(a)) {
    return 1;
  }
  if (_.isNil(b)) {
    return -1;
  }

  const comparator = isNumeric ? _.subtract : naturalSort;
  const args = orderDirection === 'desc' ? [b, a] : [a, b];
  return comparator(...args);
};

class EnhancedTable extends React.Component {
  constructor(props) {
    super(props);

    this.lastUpdateTime = Date.now();
    this.state = {
      orderBy: props.defaultOrderBy,
      orderDirection: props.defaultOrderDirection,
      cols: null,
      data: null,
      scrollbars: null,
      width: 0,
      height: 0
    };
  }

  componentDidUpdate = prevProps => {
    if (prevProps.dataSource !== this.props.dataSource) {
      this.setupData();
    }

    if (prevProps.columns !== this.props.columns) {
      this.recomputeGridSize();
    }
  };

  setupData = () => {
    const { columns, dataSource, rowSelection } = this.props;

    // TODO: force usage of plain js?
    let cols = columns.toJS ? columns.toJS() : columns;
    let data = dataSource.toJS ? dataSource.toJS() : dataSource;

    if (rowSelection) {
      cols.unshift({ width: 75, selectorType: rowSelection.get('selectorType'), key: 'checkbox', disableSort: true });
    }

    const headerRow = { grid__header: cols, name: 'grid__header' };
    data.unshift(headerRow);

    const colsWithFixedWidth = _.filter(cols, col => col.width);
    const colsWithoutFixedWidth = _.differenceBy(cols, colsWithFixedWidth, 'label');
    const fixedWidth = _.reduce(colsWithFixedWidth, (total, cur) => total + cur.width, 0);
    const numColsFixedWidth = colsWithFixedWidth.length;

    this.setState({
      colsWithFixedWidth,
      colsWithoutFixedWidth,
      numColsFixedWidth,
      totalFixedWidth: fixedWidth,
      cols,
      data
    });
  };

  handleRequestSort = (dataKey, isNumeric) => {
    const otherDirection = {
      asc: 'desc',
      desc: 'asc'
    };

    this.setState(({ orderBy, orderDirection, data }) => {
      const newDirection = dataKey !== orderBy ? 'desc' : otherDirection[orderDirection];
      const newData = _.cloneDeep(data).sort(sortComparator(dataKey, newDirection, isNumeric));
      return {
        orderBy: dataKey,
        orderDirection: newDirection,
        data: newData
      };
    });
  };

  getRowProps = datum => {
    const { rowProps } = this.props;

    if (_.isFunction(rowProps)) {
      const calculatedRowProps = rowProps(datum);
      return _.isPlainObject(calculatedRowProps) ? calculatedRowProps : {};
    }

    if (_.isObject(rowProps)) {
      return rowProps;
    }

    return {};
  };

  validateColumnKeys(columns) {
    const missingKeys = _.map(_.filter(columns, x => !_.has(x, 'key')), x => x.label);

    if (missingKeys.length > 0) {
      throw `The key property is required and must be unique for each column configured. Affected columns ${missingKeys.join(
        ','
      )}`;
    }
  }

  getSelectedRowCount = () => {
    const { rowSelection, rowKey } = this.props;
    const { data } = this.state;

    const rowKeyFn = _.isFunction(rowKey) ? rowKey : defaultRowKey;

    if (rowSelection && _.isFunction(rowSelection.get('rowIsSelected'))) {
      return _.filter(data, x => rowSelection.get('rowIsSelected')(x, rowKeyFn(x))).length;
    }

    return 0;
  };

  noRowsRenderer = () => {
    const { noDataText, rowHeight, classes } = this.props;

    return (
      <TableCell
        style={{ height: `${rowHeight || DEFAULT_CELL_HEIGHT}px` }}
        component="div"
        variant="body"
        className={classNames(classes.tableCellFlex, classes.centerFlex)}
      >
        {noDataText}
      </TableCell>
    );
  };

  getRowKeys = data => {
    const { rowKey } = this.props;
    return _.isFunction(rowKey) ? _.map(data, rowKey) : [];
  };

  _cellRenderer = cellRenderData => {
    // console.log('cellRenderer called');
    const { columnIndex, key: cellKey, rowIndex, style } = cellRenderData;
    const { classes, rowRenderOptions, rowSelection, rowKey } = this.props;
    const { cols, data, orderBy, orderDirection } = this.state;
    const colData = cols[columnIndex];
    const dataKey = colData.dataKey;
    const rowData = data[rowIndex];
    const cellData = _.get(data[rowIndex], dataKey);

    const rowKeyFn = _.isFunction(rowKey) ? rowKey : defaultRowKey;
    const customRenderer = colData.render;
    const placeholder = colData.numeric ? 0 : HORIZONTAL_BAR;
    const content = _.isNil(cellData) || cellData === '' ? placeholder : cellData;

    // RENDER HEADER ROW

    if (rowIndex === 0) {
      const { disableSort, dataKey, label } = colData;

      if (rowSelection && columnIndex === 0) {
        if (rowSelection.get('selectorType') === 'radio') {
          return <div key={cellKey} />;
        }
        const nonHeaderData = data.slice(1);
        const dataLength = nonHeaderData.length;
        const allRowSelectFn = _.isFunction(rowSelection.get('onSelectAll'))
          ? rowSelection.get('onSelectAll')
          : () => {};

        const onChangeHandler = _.partialRight(allRowSelectFn, nonHeaderData, this.getRowKeys(nonHeaderData));

        const selectedRowCount = this.getSelectedRowCount();

        return (
          <TableCell
            key={cellKey}
            style={style}
            component="div"
            variant="body"
            padding="checkbox"
            className={classNames(classes.tableCellFlex, colData.className)}
          >
            <Checkbox
              indeterminate={selectedRowCount > 0 && selectedRowCount < dataLength}
              checked={selectedRowCount === dataLength && dataLength > 0}
              onChange={onChangeHandler}
              disabled={dataLength === 0}
            />
          </TableCell>
        );
      }

      return (
        <TableCell
          key={cellKey}
          style={style}
          component="div"
          variant="head"
          className={classNames(classes.tableCellFlex, colData.className)}
          onClick={disableSort ? _.noop : _.partial(this.handleRequestSort, colData.dataKey, colData.numeric)}
        >
          {!disableSort && (
            <TableSortLabel active={orderBy === dataKey} direction={_.toLower(orderDirection)}>
              {label}
            </TableSortLabel>
          )}
          {disableSort && label}
        </TableCell>
      );
    }

    const rowSelectFn =
      rowSelection && _.isFunction(rowSelection.get('onSelect')) ? rowSelection.get('onSelect') : () => {};
    const onChangeHandler = _.partialRight(rowSelectFn, rowData, rowKeyFn(rowData));

    // RENDER SELECTION BUTTON COLUMNS
    if (rowSelection && columnIndex === 0) {
      if (rowSelection.get('selectorType') === 'radio') {
        return (
          <TableCell
            key={cellKey}
            style={style}
            component="div"
            variant="body"
            padding="checkbox"
            className={classNames(classes.tableCellFlex, colData.className)}
          >
            <Radio checked={rowSelection.get('rowIsSelected')(rowData, rowKeyFn(rowData))} onChange={onChangeHandler} />
          </TableCell>
        );
      }
      return (
        <TableCell
          key={cellKey}
          style={style}
          component="div"
          variant="body"
          padding="checkbox"
          className={classNames(classes.tableCellFlex, colData.className)}
        >
          <Checkbox
            checked={rowSelection.get('rowIsSelected')(rowData, rowKeyFn(rowData))}
            onChange={onChangeHandler}
          />
        </TableCell>
      );
    }

    const calcRowProps = this.getRowProps(rowData);

    // ANY OTHER CELL
    return (
      <TableCell
        {...calcRowProps}
        style={style}
        key={cellKey}
        component="div"
        variant="body"
        className={classNames(classes.tableCellFlex, colData.className)}
      >
        {_.isFunction(customRenderer) ? customRenderer(cellData, rowData, rowRenderOptions) : content}
      </TableCell>
    );
  };

  _getColumnWidth = ({ index }, gridWidth) => {
    // console.log('columnWidth called', index);
    const { columnMinWidth } = this.props;
    const { cols, scrollbars, colsWithoutFixedWidth, totalFixedWidth: fixedWidth, numColsFixedWidth } = this.state;

    const remainingWidth = gridWidth - fixedWidth;
    const colLength = cols.length;
    const isVerticalScrollbarVisible = scrollbars && scrollbars.vertical;
    const isLastColumn = index === colLength - 1;
    const lastColWithoutFixedWidth = _.last(colsWithoutFixedWidth);
    const isLastColWithoutFixedWidth = _.isEqual(lastColWithoutFixedWidth, cols[index]);
    const unusedSpace = remainingWidth > 0 && numColsFixedWidth === colLength;
    const numColsNoFixedWidth = colLength - numColsFixedWidth;

    let padding =
      isVerticalScrollbarVisible && (isLastColWithoutFixedWidth || (isLastColumn && unusedSpace)) ? scrollbars.size : 0;
    if (cols[index].width) {
      if (unusedSpace) {
        return remainingWidth + cols[index].width - padding;
      }
      return cols[index].width;
    }

    if (remainingWidth <= 0) {
      return columnMinWidth;
    }

    const adjustedWidth = numColsNoFixedWidth > 0 ? remainingWidth / numColsNoFixedWidth : columnMinWidth;

    const finalWidth = adjustedWidth - padding < columnMinWidth ? columnMinWidth : adjustedWidth - padding;
    return _.floor(finalWidth);
  };

  getTableHeight = () => {
    const { rowHeight, height, maxHeight } = this.props;
    const { data, scrollbars } = this.state;

    if (height) {
      return height;
    }

    if (!data) {
      return DEFAULT_TABLE_HEIGHT;
    }

    // TODO: fix this? data.length checks for 1 because we insert a dummy row for the column header
    const numVisibleRenderedRows = data.length === 1 ? 2 : data.length;

    const padding = scrollbars && scrollbars.horizontal ? scrollbars.size : 0;
    let calcHeight = rowHeight ? rowHeight * numVisibleRenderedRows : DEFAULT_CELL_HEIGHT * numVisibleRenderedRows;
    calcHeight += padding;
    if (calcHeight > maxHeight) {
      calcHeight = maxHeight;
    }

    return `${calcHeight}px`;
  };

  recomputeGridSize = () => {
    console.log('recomputegridsizde');
    if (this.ref) {
      this.ref.recomputeGridSize();
    }
  };

  setRef = ref => {
    if (!this.ref) {
      this.ref = ref;
    }
  };

  scrollbarPresenceChange = scrollbars => {
    const refreshGridSize = this.state.scrollbars ? _.noop : this.recomputeGridSize;

    this.setState(
      {
        scrollbars
      },
      refreshGridSize
    );
  };

  onResize = (width, height) => {
    this.setState({ width, height });
    this.recomputeGridSize();
  };

  render() {
    const { cols, data, width, height } = this.state;

    const { loading, classes, rowSelection, rowHeight, tableClassName } = this.props;

    if (!loading && !data) {
      this.setupData();
      this.validateColumnKeys(cols);
    }

    return (
      <Paper style={{ height: this.getTableHeight(), width: '100%', boxShadow: 'none' }}>
        {loading && <Loading />}
        {!loading && data && (
          <React.Fragment>
            <ResizeDetector handleWidth handleHeight onResize={_.debounce(this.onResize, 1000)} />
            <MultiGrid
              ref={this.setRef}
              data={data}
              className={classNames(classes.table, tableClassName)}
              fixedRowCount={1}
              fixedColumnCount={rowSelection && data.length - 1 > 0 ? 1 : 0}
              rowCount={data.length}
              cellRenderer={this._cellRenderer}
              noContentRenderer={this.noRowsRenderer}
              columnWidth={_.partial(this._getColumnWidth, _, width)}
              columnCount={cols.length}
              enableFixedColumnScroll
              enableFixedRowScroll
              rowHeight={rowHeight || DEFAULT_CELL_HEIGHT}
              height={height}
              width={width}
              onScrollbarPresenceChange={this.scrollbarPresenceChange}
              hideTopRightGridScrollbar
              hideBottomLeftGridScrollbar
            />
          </React.Fragment>
        )}
      </Paper>
    );
  }
}
EnhancedTable.propTypes = {
  columns: PropTypes.array,
  dataSource: PropTypes.array,
  rowKey: PropTypes.func,
  loading: PropTypes.bool,
  rowSelection: ImmutablePropTypes.record,
  rowProps: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  noDataText: PropTypes.string,
  defaultOrderDirection: PropTypes.string,
  defaultOrderBy: PropTypes.string,
  rowRenderOptions: PropTypes.object
};

EnhancedTable.defaultProps = {
  columns: [],
  dataSource: [],
  rowKey: defaultRowKey,
  loading: false,
  noDataText: 'No data',
  defaultOrderBy: '',
  defaultOrderDirection: 'asc',
  rowRenderOptions: {}
};

export default withStyles(styles)(EnhancedTable);
