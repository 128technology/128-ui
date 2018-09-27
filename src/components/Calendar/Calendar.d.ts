import * as React from 'react';
import { Moment } from 'moment';

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
  dayRenderer?: (date: Moment, props:IDayProps, symbol: JSX.Element ) => JSX.Element;
  disableDay?: (date: Moment, isInCurrentMonth: boolean) => boolean;
  selectDay?: (date: Moment) => boolean;
}

declare function Calendar(props: ICalendarProps): JSX.Element;

export default Calendar;
