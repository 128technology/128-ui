import * as React from 'react';
import * as moment from 'moment';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';

import Day, { IProps as DayProps } from './Day';

const styles = createStyles({
  week: {
    display: 'flex',
    alignItems: 'center'
  }
});

export function inCurrentMonth(month: moment.Moment, date: moment.Moment) {
  const lastMonth = month.clone().subtract(1, 'month');
  const nextMonth = month.clone().add(1, 'month');
  return date.isAfter(lastMonth, 'month') && date.isBefore(nextMonth, 'month');
}

export interface IProps extends WithStyles<typeof styles> {
  date: moment.Moment;
  dayRenderer: DayProps['renderer'];
  days: ReadonlyArray<moment.Moment>;
  disableDay?: (day: moment.Moment, inCurrentMonth: boolean) => boolean;
  selectDay?: (day: moment.Moment) => boolean;
}

export const CalendarWeek: React.FunctionComponent<IProps> = ({
  date,
  days,
  classes,
  dayRenderer,
  disableDay = () => false,
  selectDay = () => false
}) => (
  <div className={classes.week}>
    {days.map(d => (
      <Day
        key={d.toString()}
        date={d}
        inCurrentMonth={inCurrentMonth(date, d)}
        renderer={dayRenderer}
        disabled={disableDay(d, inCurrentMonth(date, d))}
        selected={selectDay(d)}
      />
    ))}
  </div>
);

export default withStyles(styles)(CalendarWeek);
