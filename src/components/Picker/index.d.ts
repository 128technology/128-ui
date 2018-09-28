import * as React from 'react';
import { Moment } from 'moment';

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
  textFieldRenderer?: (startDate: Moment, endDate: Moment, openPopover: () => void, closePopover: () => void) => JSX.Element;
}

declare class Picker extends React.Component<IPickerProps, any> {}

export default Picker;
