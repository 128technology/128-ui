import * as React from 'react';
import * as Immutable from 'immutable';

type RowSelectionParams = {
  selectorType?: string | null,
  onSelect?: (e: React.ChangeEvent, isChecked: boolean, datum: Immutable.Map<string, any>, key: string | number) => void,
  rowIsSelected?: (datum: Immutable.Map<string, any>, key: string | number) => boolean,
  onSelectAll?: (e: React.ChangeEvent, isChecked: boolean, datum: Immutable.Map<string, any>, key: Immutable.Set<string | number>) => void
}
export class RowSelection extends Immutable.Record<RowSelectionParams>({}) {
  selectorType: RowSelectionParams['selectorType'];
  onSelect: RowSelectionParams['onSelect'];
  rowIsSelected: RowSelectionParams['rowIsSelected'];
  onSelectAll: RowSelectionParams['onSelectAll'];
  constructor(params?: RowSelectionParams)
  with(values: RowSelectionParams)
}

type GenericObject = { [key: string]: any };
type RowPropsFunction = (datum: any) => GenericObject;

export interface IEnhancedTableProps {
  columns: Immutable.List<Immutable.Map<string, any>>;
  dataSource: Immutable.List<Immutable.Map<string, any>>;
  rowKey?: (datum: Immutable.Map<string, any>) => string,
  rowsPerPage?: number,
  loading?: boolean,
  rowSelection?: RowSelection;
  fullHeight?: boolean;
  rowProps?: GenericObject | RowPropsFunction;
  noDataText?: string;
  defaultOrderDirection?: string;
  defaultOrderBy?: string;
  rowRenderOptions?: any;
}

declare class EnhancedTable extends React.Component<IEnhancedTableProps, any> {}

export default EnhancedTable;