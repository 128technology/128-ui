import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import naturalSort from 'javascript-natural-sort';
import { AutoSizer } from 'react-virtualized';
import MuiTable from 'mui-virtualized-table';

import Loading from '../Loading';

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

const sort = (data, orderBy, orderDirection, isNumeric) => {
  if (!orderBy) {
    return data;
  }
  return _.clone(data).sort(sortComparator(orderBy, orderDirection, isNumeric));
};

const EnhancedTable = ({
  loading,
  defaultOrderBy,
  defaultOrderDirection,
  data,
  width: propWidth,
  height: propHeight,
  maxHeight,
  ...tableProps
}) => {
  const [sortParams, dispatchSortParams] = React.useReducer(
    (state, action) => {
      if (action.disableSort) {
        return state;
      }

      const otherDirection = {
        asc: 'desc',
        desc: 'asc'
      };

      return {
        orderBy: action.name,
        orderDirection: otherDirection[state.orderDirection],
        isNumeric: action.cellProps ? action.cellProps.numeric : false
      };
    },
    {
      orderBy: defaultOrderBy,
      orderDirection: defaultOrderDirection,
      isNumeric: false
    }
  );

  const { orderBy, orderDirection, isNumeric } = sortParams;

  const sortedData = React.useMemo(() => {
    return sort(data, orderBy, orderDirection, isNumeric);
  }, [data, orderBy, orderDirection, isNumeric]);

  return (
    <React.Fragment>
      {loading && <Loading />}
      {!loading && data && (
        <AutoSizer disableHeight={maxHeight || propHeight} disableWidth={propWidth}>
          {({ width, height }) => (
            <MuiTable
              {...tableProps}
              fixedRowCount={1}
              orderBy={orderBy}
              orderDirection={orderDirection}
              data={sortedData}
              width={propWidth || width}
              height={propHeight || height}
              maxHeight={maxHeight}
              onHeaderClick={dispatchSortParams}
              includeHeaders={true}
            />
          )}
        </AutoSizer>
      )}
    </React.Fragment>
  );
};

EnhancedTable.propTypes = {
  loading: PropTypes.bool,
  defaultOrderBy: PropTypes.string,
  defaultOrderDirection: PropTypes.string
};

EnhancedTable.defaultProps = {
  loading: false,
  defaultOrderBy: '',
  defaultOrderDirection: 'asc'
};

export default EnhancedTable;
