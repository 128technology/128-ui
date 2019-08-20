import * as _ from 'lodash';
import * as React from 'react';
import { AutoSizer } from 'react-virtualized';
import { makeStyles } from '@material-ui/core/styles';
import MuiTable, {
  IMuiVirtualizedTableProps,
  IMuiVirtualizedTableColumn,
  IHeaderClickProps
} from '@128technology/mui-virtualized-table';

import naturalSort = require('javascript-natural-sort');

import Loading, { LoadingProps } from '../Loading';

export interface IProps<TRow> extends Omit<IMuiVirtualizedTableProps<TRow>, 'width' | 'columns'> {
  columns: Array<
    IMuiVirtualizedTableColumn<TRow> & {
      customSorter?: (sortParams: {
        orderBy: keyof TRow;
        orderDirection?: 'asc' | 'desc';
      }) => (a: TRow, b: TRow) => number;
    }
  >;
  defaultOrderBy?: keyof TRow;
  defaultOrderDirection?: 'asc' | 'desc';
  loading?: boolean;
  loadingProps?: LoadingProps;
  width?: number;
}

const useStyles = makeStyles({
  cellHeader: {
    backgroundColor: 'inherit !important',
    fontSize: 'inherit !important'
  },
  cellContents: {
    width: 'auto'
  }
});

export function EnhancedTable<TRow>({
  loading,
  loadingProps,
  defaultOrderBy,
  defaultOrderDirection,
  data,
  width: propWidth,
  height: propHeight,
  maxHeight,
  columns,
  ...tableProps
}: IProps<TRow>) {
  type SortParams = { orderBy: keyof TRow; orderDirection?: 'asc' | 'desc' };
  const classes = useStyles();
  const [sortParams, setSortParams] = React.useState<SortParams | null>(
    defaultOrderBy
      ? {
          orderBy: defaultOrderBy,
          orderDirection: defaultOrderDirection
        }
      : null
  );

  const sortedData = React.useMemo(() => {
    if (!sortParams) {
      return data;
    }

    const defaultSorter = (first: TRow, second: TRow) => {
      const a = _.get(first, orderBy);
      const b = _.get(second, orderBy);
      // Check if value is either {}, [], undefined, null, but NOT 0 or ''.
      if (_.isNil(a) || (_.isObject(a) && _.isEmpty(a))) {
        return 1;
      }
      if (_.isNil(b) || (_.isObject(b) && _.isEmpty(b))) {
        return -1;
      }

      if (orderDirection === 'desc') {
        return naturalSort(_.toString(b), _.toString(a));
      } else {
        return naturalSort(_.toString(a), _.toString(b));
      }
    };

    const { orderBy, orderDirection } = sortParams;

    const curColumn = _.find(columns, ['name', orderBy]);
    const customSorter = curColumn ? curColumn.customSorter : null;
    const sorter = customSorter ? customSorter(sortParams) : defaultSorter;

    return [...data].sort(sorter);
  }, [columns, data, sortParams]);

  const onHeaderClick = React.useCallback((e: React.MouseEvent<HTMLElement>, props: IHeaderClickProps<TRow>) => {
    setSortParams(s => {
      if (s && s.orderBy === props.column.name) {
        return { ...s, orderDirection: s.orderDirection === 'asc' ? 'desc' : 'asc' };
      }

      return {
        orderBy: props.column.name as keyof TRow,
        orderDirection: 'desc'
      };
    });
  }, []);

  return (
    <React.Fragment>
      {loading && <Loading {...loadingProps} />}
      {!loading && data && (
        <AutoSizer disableHeight={!_.isNil(maxHeight || propHeight)} disableWidth={!_.isNil(propWidth)}>
          {({ width, height }) => (
            <MuiTable
              classes={classes}
              {...tableProps}
              fixedRowCount={1}
              orderBy={sortParams ? (sortParams.orderBy as string) : undefined}
              orderDirection={sortParams ? sortParams.orderDirection : undefined}
              data={sortedData}
              width={propWidth || width}
              height={propHeight || height}
              maxHeight={maxHeight}
              includeHeaders={true}
              columns={columns}
              onHeaderClick={onHeaderClick}
            />
          )}
        </AutoSizer>
      )}
    </React.Fragment>
  );
}

export default EnhancedTable;
