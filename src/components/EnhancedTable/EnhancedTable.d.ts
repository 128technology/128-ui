import * as React from 'react';
import * as Immutable from 'immutable';
import { RowSelection } from './enhancedTableUtil';

type GenericObject = { [key: string]: any };
type RowPropsFunction = (datum?: any) => GenericObject;

export interface IEnhancedTableProps {
  columns: Immutable.List<any>;
  dataSource: Immutable.List<any>;
  rowKey?: (datum?: any) => string,
  rowsPerPage?: number,
  loading?: boolean,
  rowSelection?: RowSelection;
  fullHeight?: boolean;
  rowProps?: GenericObject | RowPropsFunction;
  noDataText?: string;
  defaultOrderDirection?: sting;
  defaultOrderBy?: string;
  rowRenderOptions?: Immutable.Map<string, any>;
}

declare class EnhancedTable extends React.Component<IEnhancedTableProps, any> {}

export default EnhancedTable;