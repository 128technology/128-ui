import * as React from 'react';
import * as Immutable from 'immutable';
import * as select from 'react-select/lib/Select';
import { Moment } from 'moment';
import { IMuiVirtualizedTableProps } from 'mui-virtualized-table';

export interface IAutocompleteProps extends select.Props {
  options: any[];
  accessors?: {
    value: (d: any) => any;
    label: (d: any) => any;
  };
  chipAvatar?: (d: any) => React.ReactNode;
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

export interface IEnhancedTableProps<TRowProps> extends IMuiVirtualizedTableProps<TRowProps> {
  loading?: boolean;
}

declare class EnhancedTable extends React.SFC<IEnhancedTableProps> {}

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
