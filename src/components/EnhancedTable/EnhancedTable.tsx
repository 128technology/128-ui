import * as _ from 'lodash';
import * as React from 'react';
import { AutoSizer } from 'react-virtualized';
import { makeStyles } from '@material-ui/core/styles';
import MuiTable, {
  IMuiVirtualizedTableProps,
  IMuiVirtualizedTableColumn,
  IHeaderClickProps
} from 'mui-virtualized-table';

import naturalSort = require('javascript-natural-sort');

import Loading, { LoadingProps } from '../Loading';

export interface IProps<TRow> extends Omit<IMuiVirtualizedTableProps<TRow>, 'width' | 'columns'> {
  columns: Array<IMuiVirtualizedTableColumn<TRow>>;
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

    const { orderBy, orderDirection } = sortParams;

    return [...data].sort((first, second) => {
      const a = first[orderBy];
      const b = second[orderBy];
      if (_.isNil(a)) {
        return 1;
      }
      if (_.isNil(b)) {
        return -1;
      }

      if (orderDirection === 'desc') {
        return naturalSort(_.toString(b), _.toString(a));
      } else {
        return naturalSort(_.toString(a), _.toString(b));
      }
    });
  }, [data, sortParams]);

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
