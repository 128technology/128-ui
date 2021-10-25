import * as _ from 'lodash';
import * as React from 'react';
import { AutoSizer } from 'react-virtualized';
import { makeStyles } from '@material-ui/core/styles';
import MuiTable, {
  IMuiVirtualizedTableProps,
  IMuiVirtualizedTableColumn,
  IHeaderClickProps
} from '@128technology/mui-virtualized-table';

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

type SortParams<T> = { orderBy: keyof T; orderDirection?: 'asc' | 'desc' };

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
  orderBy: orderByProp,
  orderDirection: orderDirectionProp,
  onHeaderClick: onHeaderClickProp,
  ...tableProps
}: IProps<TRow>) {
  const classes = useStyles();
  const [sortParams, setSortParams] = React.useState<SortParams<TRow> | null>(
    defaultOrderBy
      ? {
          orderBy: defaultOrderBy,
          orderDirection: defaultOrderDirection
        }
      : null
  );

  const naturalSort = React.useMemo(() => new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' }), [])
    .compare;

  const orderByValue = orderByProp ? orderByProp : sortParams ? (sortParams.orderBy as string) : undefined;
  const orderDirectionValue = orderDirectionProp ? orderDirectionProp : sortParams ? sortParams.orderDirection : undefined

  const sortedData = React.useMemo(() => {
    if (!orderByValue) {
      return data;
    }

    const defaultSorter = (first: TRow, second: TRow) => {
      const a = _.get(first, orderByValue);
      const b = _.get(second, orderByValue);
      // Check if value is either {}, [], undefined, null, but NOT 0 or ''.
      if (_.isNil(a) || (_.isObject(a) && _.isEmpty(a))) {
        return 1;
      }
      if (_.isNil(b) || (_.isObject(b) && _.isEmpty(b))) {
        return -1;
      }

      if (orderDirectionValue === 'desc') {
        return naturalSort(_.toString(b), _.toString(a));
      } else {
        return naturalSort(_.toString(a), _.toString(b));
      }
    };

    const currentSortParams = { orderBy: orderByValue as keyof TRow, orderDirection: orderDirectionValue }

    const curColumn = _.find(columns, ['name', orderByValue]);
    const customSorter = curColumn ? curColumn.customSorter : null;
    const sorter = customSorter ? customSorter(currentSortParams) : defaultSorter;

    return [...data].sort(sorter);
  }, [columns, data, orderByValue, orderDirectionValue]);

  const onHeaderClick = React.useCallback((e: React.MouseEvent<HTMLElement>, props: IHeaderClickProps<TRow>) => {
    onHeaderClickProp && onHeaderClickProp(e, props);
    setSortParams(s => {
      if (s && s.orderBy === props.column.name) {
        return {
          ...s,
          orderDirection: s.orderDirection === 'asc' ? 'desc' : 'asc'
        };
      }

      return {
        orderBy: props.column.name as keyof TRow,
        orderDirection: 'desc'
      };
    });
  }, [onHeaderClickProp]);


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
              orderBy={orderByValue}
              orderDirection={orderDirectionValue}
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
