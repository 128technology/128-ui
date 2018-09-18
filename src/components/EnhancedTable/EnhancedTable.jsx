import _ from 'lodash';
import React from 'react';
import Immutable from 'immutable';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TablePagination from '@material-ui/core/TablePagination';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import naturalSort from 'javascript-natural-sort';

import Loading from '../Loading';
import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableBody from './EnhancedTableBody';
import { RowSelection, defaultRowKey } from './enhancedTableUtil';

const styles = {
  tableContainer: {
    position: 'relative'
  },
  tableScrollArea: {
    overflowY: 'auto',
    flexGrow: '1'
  },
  tableContainerFullHeight: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  }
};

const sortComparator = (isNumeric, orderDirection) => (a, b) => {
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

    this.state = {
      orderBy: props.defaultOrderBy,
      orderDirection: props.defaultOrderDirection,
      numericSort: false,
      page: 0,
      rowsPerPage: props.rowsPerPage || null
    };

    _.bindAll(this, ['handleRequestSort', 'handleRequestChangePage', 'handleRequestChangeRowsPerPage', 'sort']);
  }

  handleRequestSort(dataIndex, isNumeric) {
    const otherDirection = {
      asc: 'desc',
      desc: 'asc'
    };

    this.setState(({ orderBy, orderDirection }) => ({
      orderBy: dataIndex,
      numericSort: Boolean(isNumeric),
      orderDirection: dataIndex !== orderBy ? 'desc' : otherDirection[orderDirection]
    }));
  }

  handleRequestChangePage(event, page) {
    this.setState({ page });
  }

  handleRequestChangeRowsPerPage(event) {
    this.setState({ rowsPerPage: event.target.value });
  }

  sort(dataSource) {
    const { orderDirection, orderBy, numericSort } = this.state;

    if (!orderBy || !orderDirection) {
      return dataSource;
    }

    return dataSource.sortBy(x => x.get(orderBy), sortComparator(numericSort, orderDirection));
  }

  validateColumnKeys() {
    const { columns } = this.props;

    const missingKeys = columns
      .filter(x => !x.has('key'))
      .map(x => x.get('title'))
      .toSet();

    if (missingKeys.size > 0) {
      throw `The key property is required and must be unique for each column configured. Affected columns ${missingKeys.join(
        ','
      )}`;
    }
  }

  render() {
    const { orderBy, orderDirection, page, rowsPerPage } = this.state;

    const {
      columns,
      dataSource,
      rowKey,
      rowProps,
      className,
      loading,
      classes,
      rowSelection,
      fullHeight,
      noDataText,
      rowRenderOptions
    } = this.props;

    this.validateColumnKeys();

    return (
      <div className={classNames(classes.tableContainer, { [classes.tableContainerFullHeight]: fullHeight })}>
        {loading && <Loading />}
        <div className={classes.tableScrollArea}>
          <Table className={className}>
            <EnhancedTableHead
              columns={columns}
              onRequestSort={this.handleRequestSort}
              orderBy={orderBy}
              orderDirection={orderDirection}
              dataSource={dataSource}
              rowSelection={rowSelection}
              rowKey={rowKey}
            />
            <EnhancedTableBody
              columns={columns}
              dataSource={this.sort(dataSource)}
              rowKey={rowKey}
              page={page}
              rowsPerPage={rowsPerPage}
              rowSelection={rowSelection}
              rowProps={rowProps}
              noDataText={noDataText}
              rowRenderOptions={rowRenderOptions}
            />
          </Table>
        </div>
        {rowsPerPage && (
          <TablePagination
            rowsPerPage={rowsPerPage}
            count={dataSource.size}
            page={page}
            onChangePage={this.handleRequestChangePage}
            onChangeRowsPerPage={this.handleRequestChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 15, 25]}
            component="div"
          />
        )}
      </div>
    );
  }
}

EnhancedTable.propTypes = {
  columns: PropTypes.instanceOf(Immutable.List),
  dataSource: PropTypes.instanceOf(Immutable.List),
  rowKey: PropTypes.func,
  rowsPerPage: PropTypes.number,
  loading: PropTypes.bool,
  rowSelection: PropTypes.instanceOf(RowSelection),
  fullHeight: PropTypes.bool,
  rowProps: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  noDataText: PropTypes.string,
  defaultOrderDirection: PropTypes.string,
  defaultOrderBy: PropTypes.string,
  rowRenderOptions: PropTypes.instanceOf(Immutable.Map)
};

EnhancedTable.defaultProps = {
  columns: Immutable.List(),
  dataSource: Immutable.List(),
  rowKey: defaultRowKey,
  loading: false,
  fullHeight: false,
  noDataText: 'No data',
  defaultOrderBy: '',
  defaultOrderDirection: 'asc',
  rowRenderOptions: Immutable.Map()
};

export default withStyles(styles)(EnhancedTable);
