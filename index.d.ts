import * as React from 'react';
import * as Immutable from 'immutable';
import * as select from 'react-select/lib/Select';
import { Moment } from 'moment';

export interface IAutocompleteProps extends select.Props {
  options: any[];
  accessors?: {
    value: (d: any) => any;
    label: (d: any) => any;
  };
  groupBy?: (d: any) => any;
  creatable?: boolean;
  async?: boolean;
  loading?: boolean;
  loadOptions?: () => Promise<any[]>;
  selection?: any;
  onChange?: (val: any) => void;
  optionRenderer?: (props: any) => JSX.Element;
  placeholder?: string;
  errorText?: string;
  visibleRows?: number;
  rowHeight?: number;
  disabled?: boolean;
  textFieldProps?: { [key: string]: any };
  classes?: {
    input?: string;
    valueContainer?: string;
    chipFocused?: string;
    chip?: string;
    noOptionsMessage?: string;
    placeholder?: string;
  };
}

declare class Autocomplete extends React.Component<IAutocompleteProps, any> {}

export { Autocomplete };

export interface IDayProps {
  date: Moment;
  classes: boolean;
  inCurrentMonth: boolean;
  renderer: (date: Moment, props: IDayProps, symbol: JSX.Element) => JSX.Element;
  disabled: boolean;
  selected: boolean;
}

export interface ICalendarProps {
  date: Moment;
  dayRenderer?: (date: Moment, props: IDayProps, symbol: JSX.Element) => JSX.Element;
  disableDay?: (date: Moment, isInCurrentMonth: boolean) => boolean;
  selectDay?: (date: Moment) => boolean;
}

declare function Calendar(props: ICalendarProps): JSX.Element;

export { Calendar };

export interface IDurationProps {
  duration?: number;
}

declare class Duration extends React.Component<IDurationProps, any> {}

export { Duration };

type RowSelectionParams = {
  selectorType?: string | null;
  onSelect?: (
    e: React.ChangeEvent,
    isChecked: boolean,
    datum: Immutable.Map<string, any>,
    key: string | number
  ) => void;
  rowIsSelected?: (datum: Immutable.Map<string, any>, key: string | number) => boolean;
  onSelectAll?: (
    e: React.ChangeEvent,
    isChecked: boolean,
    datum: Immutable.Map<string, any>,
    key: Immutable.Set<string | number>
  ) => void;
};
export class RowSelection extends Immutable.Record<RowSelectionParams>({}) {
  selectorType: RowSelectionParams['selectorType'];
  onSelect: RowSelectionParams['onSelect'];
  rowIsSelected: RowSelectionParams['rowIsSelected'];
  onSelectAll: RowSelectionParams['onSelectAll'];
  constructor(params?: RowSelectionParams);
  with(values: RowSelectionParams): void;
}

type GenericObject = { [key: string]: any };
type RowPropsFunction = (datum: any) => GenericObject;

export interface IEnhancedTableProps {
  columns: Immutable.List<Immutable.Map<string, any>>;
  dataSource: Immutable.List<Immutable.Map<string, any>>;
  rowKey?: (datum: Immutable.Map<string, any>) => string;
  rowsPerPage?: number;
  loading?: boolean;
  rowSelection?: RowSelection;
  fullHeight?: boolean;
  rowProps?: GenericObject | RowPropsFunction;
  noDataText?: string;
  defaultOrderDirection?: string;
  defaultOrderBy?: string;
  rowRenderOptions?: any;
}

declare class EnhancedTable extends React.Component<IEnhancedTableProps, any> {}

export { EnhancedTable };

export type LoadingSize = 'small' | 'medium' | 'large' | 'huge';

export interface ILoadingProps {
  size?: LoadingSize;
  block?: boolean;
  showLoadingText?: boolean;
  horizontal?: boolean;
  loadingText?: string;
}

declare function Loading(props: ILoadingProps): JSX.Element;

export { Loading };

export enum MatchTypes {
  CaseSensitive,
  WholeWord,
  Regex
}

export interface IMatchTextProps {
  text: string | number;
  searchString: string;
  matchTypes?: MatchTypes[];
}

declare class MatchText extends React.Component<IMatchTextProps, any> {}

export { MatchText };

export interface IPickerProps {
  classes?: {
    contentContainer?: string;
    calendarContainer?: string;
  };
  maxDate?: Moment;
  minDate?: Moment;
  startDate?: Moment;
  endDate?: Moment;
  defaultStartDate?: Moment;
  defaultEndDate?: Moment;
  hoverDate?: Moment;
  visibleDate?: Moment;
  selectedView?: string;
  yearOnClick?: (e: React.SyntheticEvent, date: Moment) => void;
  minuteOnClick?: (e: React.SyntheticEvent, date: Moment) => void;
  hourOnClick?: (e: React.SyntheticEvent, date: Moment) => void;
  dayOnClick?: (e: React.SyntheticEvent, date: Moment) => void;
  viewOnClick?: (e: React.SyntheticEvent, view: string) => void;
  dayOnMouseEnter?: (e: React.SyntheticEvent, date: Moment) => void;
  dayOnMouseLeave?: (e: React.SyntheticEvent, date: Moment) => void;
  onChange?: (startDate: Moment, endDate: Moment) => void;
  popoverOnClose?: (startDate: Moment, endDate: Moment) => void;
  prevMonthOnClick?: (e: React.SyntheticEvent) => void;
  nextMonthOnClick?: (e: React.SyntheticEvent) => void;
  textFieldRenderer?: (
    startDate: Moment,
    endDate: Moment,
    openPopover: () => void,
    closePopover: () => void
  ) => JSX.Element;
  disableDate?: (d: Moment, inCurrentMonth: boolean) => boolean;
  popoverAnchorOrigin?: { vertical?: string; horizontal?: string };
  popoverTransformOrigin?: { vertical?: string; horizontal?: string };
}

declare class Picker extends React.Component<IPickerProps, any> {}

export { Picker };

export type SpinnerSize = 'small' | 'medium' | 'large' | 'huge';

export interface ISpinnerProps {
  size?: SpinnerSize;
}

declare function Spinner(props: ISpinnerProps): JSX.Element;

export { Spinner };

export type Variant = 'flat' | 'raised';

export interface ISplitButtonProps {
  variant?: Variant;
  color?: string;
  popoverContent: React.ReactNode;
  defaultOnClick: (e: React.SyntheticEvent) => void;
  children: React.ReactNode;
  dropdownIconClassName?: string;
  disabled?: boolean;
  dropdownDisabled?: boolean;
  closePopoverOnClick?: boolean;
}

declare class SplitButton extends React.Component<ISplitButtonProps, any> {}

export { SplitButton };
